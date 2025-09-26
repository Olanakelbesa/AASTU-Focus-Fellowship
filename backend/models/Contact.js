import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  
  // Message Details
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  
  // Contact Category
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['general', 'support', 'feedback', 'partnership', 'volunteer', 'donation', 'event', 'other'],
      message: 'Invalid category selected'
    },
    default: 'general'
  },
  
  // Priority Level
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Status Management
  status: {
    type: String,
    enum: ['new', 'in_progress', 'responded', 'resolved', 'closed'],
    default: 'new'
  },
  
  // Response Tracking
  response: {
    message: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date,
    responseTime: Number // in hours
  },
  
  // Follow-up
  followUp: {
    required: {
      type: Boolean,
      default: false
    },
    scheduledFor: Date,
    notes: String,
    completed: {
      type: Boolean,
      default: false
    }
  },
  
  // Metadata
  source: {
    type: String,
    enum: ['website', 'mobile_app', 'email', 'phone', 'social_media'],
    default: 'website'
  },
  
  tags: [{
    type: String,
    trim: true
  }],
  
  // System Fields
  isRead: {
    type: Boolean,
    default: false
  },
  
  isArchived: {
    type: Boolean,
    default: false
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better performance
contactSchema.index({ status: 1, priority: 1, createdAt: -1 });
contactSchema.index({ category: 1, status: 1 });
contactSchema.index({ email: 1 });
contactSchema.index({ isRead: 1, status: 1 });

// Pre-save middleware to update response time
contactSchema.pre('save', function(next) {
  if (this.response.respondedAt && this.response.respondedAt > this.createdAt) {
    const responseTime = Math.round((this.response.respondedAt - this.createdAt) / (1000 * 60 * 60));
    this.response.responseTime = responseTime;
  }
  next();
});

// Virtual for response time in hours
contactSchema.virtual('responseTimeHours').get(function() {
  if (this.response.respondedAt) {
    return Math.round((this.response.respondedAt - this.createdAt) / (1000 * 60 * 60));
  }
  return null;
});

// Method to mark as read
contactSchema.methods.markAsRead = function() {
  this.isRead = true;
  return this.save();
};

// Method to update status
contactSchema.methods.updateStatus = function(newStatus, userId) {
  this.status = newStatus;
  if (newStatus === 'responded' && !this.response.respondedBy) {
    this.response.respondedBy = userId;
    this.response.respondedAt = new Date();
  }
  return this.save();
};

// Method to add response
contactSchema.methods.addResponse = function(responseMessage, userId) {
  this.response.message = responseMessage;
  this.response.respondedBy = userId;
  this.response.respondedAt = new Date();
  this.status = 'responded';
  this.isRead = true;
  return this.save();
};

// Method to schedule follow-up
contactSchema.methods.scheduleFollowUp = function(scheduledFor, notes) {
  this.followUp.required = true;
  this.followUp.scheduledFor = scheduledFor;
  this.followUp.notes = notes;
  return this.save();
};

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;