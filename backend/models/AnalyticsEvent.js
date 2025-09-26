import mongoose from 'mongoose';

const analyticsEventSchema = new mongoose.Schema({
  // Event identification
  eventType: {
    type: String,
    required: true,
    enum: [
      'user_registration',
      'user_login',
      'event_created',
      'event_attended',
      'donation_made',
      'content_viewed',
      'content_liked',
      'team_joined',
      'contact_submitted',
      'media_uploaded',
      'admin_action'
    ]
  },

  // User information
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Some events might not have a user
  },

  // Event metadata
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },

  // Session information
  sessionId: String,
  userAgent: String,
  ipAddress: String,

  // Location data
  location: {
    country: String,
    region: String,
    city: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },

  // Device information
  device: {
    type: String, // mobile, desktop, tablet
    browser: String,
    os: String,
    screenResolution: String
  },

  // Timestamp
  timestamp: {
    type: Date,
    default: Date.now
  },

  // Performance metrics
  performance: {
    loadTime: Number, // in milliseconds
    responseTime: Number
  },

  // Custom properties
  properties: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Indexes for better performance
analyticsEventSchema.index({ eventType: 1, timestamp: -1 });
analyticsEventSchema.index({ userId: 1, timestamp: -1 });
analyticsEventSchema.index({ timestamp: -1 });
analyticsEventSchema.index({ 'metadata.eventId': 1 });
analyticsEventSchema.index({ 'metadata.category': 1 });

const AnalyticsEvent = mongoose.model('AnalyticsEvent', analyticsEventSchema);

export default AnalyticsEvent;