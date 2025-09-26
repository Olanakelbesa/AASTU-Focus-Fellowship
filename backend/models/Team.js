import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Team name is required'],
    trim: true,
    maxlength: [100, 'Team name cannot exceed 100 characters'],
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Team description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    enum: ['worship', 'action_and_prayer', 'ebenezer', 'fellowship', 'eleos', 'media', 'administration', 'nathanim', 'other'],
    required: true
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Team leader is required']
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['member', 'assistant_leader', 'coordinator'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  maxMembers: {
    type: Number,
    min: [1, 'Maximum members must be at least 1'],
    default: 20
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
  meetingSchedule: {
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    time: {
      type: String,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter valid time format (HH:MM)']
    },
    location: String
  },
  goals: [{
    type: String,
    maxlength: [200, 'Goal cannot exceed 200 characters']
  }],
  achievements: [{
    title: {
      type: String,
      required: true,
      maxlength: [100, 'Achievement title cannot exceed 100 characters']
    },
    description: {
      type: String,
      maxlength: [300, 'Achievement description cannot exceed 300 characters']
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});


teamSchema.index({ name: 1 });
teamSchema.index({ category: 1, isActive: 1 });
teamSchema.index({ leader: 1 });

teamSchema.virtual('memberCount').get(function() {
  return this.members.filter(member => member.isActive).length;
});

teamSchema.virtual('availableSpots').get(function() {
  return this.maxMembers - this.memberCount;
});

teamSchema.virtual('isFull').get(function() {
  return this.memberCount >= this.maxMembers;
});

teamSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('leader')) {
    const leaderExists = this.members.some(member => 
      member.user.toString() === this.leader.toString()
    );
    
    if (!leaderExists) {
      this.members.push({
        user: this.leader,
        role: 'assistant_leader',
        joinedAt: new Date(),
        isActive: true
      });
    }
  }
  next();
});

const Team = mongoose.model('Team', teamSchema);
export default Team;