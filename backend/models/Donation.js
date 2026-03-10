import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donor: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        trim: true,
      },
      isAnonymous: {
        type: Boolean,
        default: false,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
    },

    // Donation details
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },

    currency: {
      type: String,
      default: "ETB",
      enum: ["ETB", "USD", "EUR", "GBP"],
    },

    // Payment information
    paymentMethod: {
      type: String,
      required: true,
      enum: [
        "cash",
        "bank_transfer",
        "mobile_money",
        "online_payment",
        "check",
        "other",
      ],
    },

    paymentStatus: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "completed", "failed", "cancelled", "refunded"],
    },

    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },

    // Donation purpose
    purpose: {
      type: String,
      required: true,
      enum: [
        "general_fund",
        "event_sponsorship",
        "building_fund",
        "mission_trip",
        "bible_study_materials",
        "youth_programs",
        "outreach_programs",
        "emergency_relief",
        "other",
      ],
    },

    category: {
      type: String,
      required: true,
      enum: [
        "tithe",
        "offering",
        "special_offering",
        "pledge",
        "memorial",
        "honorarium",
        "sponsorship",
        "other",
      ],
    },

    // Campaign tracking
    campaign: {
      name: String,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
      },
    },

    // Recurring donation
    isRecurring: {
      type: Boolean,
      default: false,
    },

    recurringDetails: {
      frequency: {
        type: String,
        enum: ["weekly", "monthly", "quarterly", "yearly"],
      },
      nextDueDate: Date,
      endDate: Date,
      totalOccurrences: Number,
      currentOccurrence: {
        type: Number,
        default: 0,
      },
    },

    // Donation status
    status: {
      type: String,
      required: true,
      default: "active",
      enum: ["active", "archived", "deleted"],
    },

    // Notes and metadata
    notes: {
      type: String,
      trim: true,
    },

    tags: [String],

    // Receipt and acknowledgment
    receiptSent: {
      type: Boolean,
      default: false,
    },

    receiptSentAt: Date,

    acknowledgmentSent: {
      type: Boolean,
      default: false,
    },

    acknowledgmentSentAt: Date,

    // Timestamps
    donationDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    // Audit trail
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for better performance
donationSchema.index({ "donor.email": 1 });
donationSchema.index({ "donor.userId": 1 });
donationSchema.index({ paymentStatus: 1 });
donationSchema.index({ purpose: 1 });
donationSchema.index({ category: 1 });
donationSchema.index({ donationDate: -1 });
donationSchema.index({ amount: -1 });

// Virtual for total amount in ETB
donationSchema.virtual("amountETB").get(function () {
  if (this.currency === "ETB") return this.amount;
  // Add currency conversion logic here if needed
  return this.amount;
});

// Pre-save middleware
donationSchema.pre("save", function (next) {
  if (this.isRecurring && this.recurringDetails) {
    if (!this.recurringDetails.currentOccurrence) {
      this.recurringDetails.currentOccurrence = 1;
    }
  }
  next();
});

// Instance methods
donationSchema.methods.markAsCompleted = function (transactionId) {
  this.paymentStatus = "completed";
  this.transactionId = transactionId;
  this.receiptSent = true;
  this.receiptSentAt = new Date();
  return this.save();
};

donationSchema.methods.processRecurringDonation = function () {
  if (this.isRecurring && this.recurringDetails) {
    this.recurringDetails.currentOccurrence += 1;

    // Calculate next due date
    const now = new Date();
    switch (this.recurringDetails.frequency) {
      case "weekly":
        this.recurringDetails.nextDueDate = new Date(
          now.getTime() + 7 * 24 * 60 * 60 * 1000,
        );
        break;
      case "monthly":
        this.recurringDetails.nextDueDate = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate(),
        );
        break;
      case "quarterly":
        this.recurringDetails.nextDueDate = new Date(
          now.getFullYear(),
          now.getMonth() + 3,
          now.getDate(),
        );
        break;
      case "yearly":
        this.recurringDetails.nextDueDate = new Date(
          now.getFullYear() + 1,
          now.getMonth(),
          now.getDate(),
        );
        break;
    }

    // Check if recurring donation should end
    if (
      this.recurringDetails.endDate &&
      this.recurringDetails.nextDueDate > this.recurringDetails.endDate
    ) {
      this.isRecurring = false;
    }

    if (
      this.recurringDetails.totalOccurrences &&
      this.recurringDetails.currentOccurrence >=
        this.recurringDetails.totalOccurrences
    ) {
      this.isRecurring = false;
    }
  }
  return this.save();
};

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
