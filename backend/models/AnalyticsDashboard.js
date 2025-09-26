import mongoose from 'mongoose';

const dashboardWidgetSchema = new mongoose.Schema({
  widgetType: {
    type: String,
    required: true,
    enum: [
      'chart',
      'metric',
      'table',
      'progress',
      'list',
      'map'
    ]
  },

  title: {
    type: String,
    required: true
  },

  description: String,

  config: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },

  position: {
    x: Number,
    y: Number,
    width: Number,
    height: Number
  },

  isVisible: {
    type: Boolean,
    default: true
  },

  refreshInterval: Number, // in seconds, null for manual refresh
});

const dashboardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: String,

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  isPublic: {
    type: Boolean,
    default: false
  },

  widgets: [dashboardWidgetSchema],

  layout: {
    type: String,
    enum: ['grid', 'flexible', 'custom'],
    default: 'grid'
  },

  theme: {
    type: String,
    enum: ['light', 'dark', 'auto'],
    default: 'light'
  },

  lastViewed: Date,

  viewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

dashboardSchema.index({ owner: 1, isPublic: 1 });
dashboardSchema.index({ name: 1 });

const AnalyticsDashboard = mongoose.model('AnalyticsDashboard', dashboardSchema);

export default AnalyticsDashboard;