import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Event title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Event description is required'],
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    date: {
        type: Date,
        required: [true, 'Event date is required']
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required'],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter valid time format (HH:MM)']
    },
    endTime: {
        type: String,
        required: [true, 'End time is required'],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter valid time format (HH:MM)']
    },
    location : {
        type: String,
        required: [true, 'Event location is required'],
        trim: true,
        maxlength: [200, 'Location cannot exceed 200 characters'],
    },
    category : {
        type: String,
        enum: ['worship', 'bible_study', 'prayer', 'fellowship', 'break_mission', 'outreach', 'training', 'other'],
        default: 'other',
        required: true
    },
    maxAttendees: {
        type: Number,
        min: [1, 'Maximum attendees must be at least 1'],
        default: null
    },
    currentAttendees: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attendees: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        registeredAt: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['registered', 'attended', 'cancelled'],
            default: 'registered'
        }
    }],
    tags: [{
        type: String,
        trim: true,
        maxlength: [20, "Tag cannot exceed 20 characters"]
    }]
}, {
    timestamps: true
});

eventSchema.index({date: 1, isActive: 1});
eventSchema.index({category: 1, isActive: 1});
eventSchema.index({createdBy: 1});

eventSchema.virtual('isFull').get(function(){
    return this.maxAttendees && this.currentAttendees >= this.maxAttendees;
});

eventSchema.virtual('isUpcoming').get(function() {
    return new Date() < this.date;
});

eventSchema.pre('save', function(next) {
    if (this.isModified('attendees')) {
      this.currentAttendees = this.attendees.filter(a => a.status !== 'cancelled').length;
    }
    next();
});

eventSchema.statics.findUpcoming = function() {
    return this.find({
      date: { $gte: new Date() },
      isActive: true
    }).sort({ date: 1 });
};

eventSchema.statics.findByCategory = function(category) {
    return this.find({
      category,
      isActive: true
    }).sort({ date: 1 });
  };

const Event = mongoose.model('Event', eventSchema);
export default Event;