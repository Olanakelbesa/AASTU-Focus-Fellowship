import analyticsService from '../services/analyticsService.js';
import { AppError } from '../middleware/errorsHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

// Get user analytics
export const getUserAnalytics = asyncHandler(async (req, res) => {
  const { timeRange = '30d', filters = {} } = req.query;

  const analytics = await analyticsService.getUserAnalytics(timeRange, filters);

  res.json({
    success: true,
    data: analytics
  });
});

// Get event analytics
export const getEventAnalytics = asyncHandler(async (req, res) => {
  const { timeRange = '30d', filters = {} } = req.query;

  const analytics = await analyticsService.getEventAnalytics(timeRange, filters);

  res.json({
    success: true,
    data: analytics
  });
});

// Get financial analytics
export const getFinancialAnalytics = asyncHandler(async (req, res) => {
  const { timeRange = '30d', filters = {} } = req.query;

  const analytics = await analyticsService.getFinancialAnalytics(timeRange, filters);

  res.json({
    success: true,
    data: analytics
  });
});

// Get content analytics
export const getContentAnalytics = asyncHandler(async (req, res) => {
  const { timeRange = '30d', filters = {} } = req.query;

  const analytics = await analyticsService.getContentAnalytics(timeRange, filters);

  res.json({
    success: true,
    data: analytics
  });
});

// Get team analytics
export const getTeamAnalytics = asyncHandler(async (req, res) => {
  const { timeRange = '30d', filters = {} } = req.query;

  const analytics = await analyticsService.getTeamAnalytics(timeRange, filters);

  res.json({
    success: true,
    data: analytics
  });
});

// Get comprehensive dashboard data
export const getDashboardData = asyncHandler(async (req, res) => {
  const { timeRange = '30d', filters = {} } = req.query;

  const dashboardData = await analyticsService.getDashboardData(timeRange, filters);

  res.json({
    success: true,
    data: dashboardData
  });
});

// Export analytics data
export const exportAnalyticsData = asyncHandler(async (req, res) => {
  const { timeRange = '30d', format = 'json', filters = {} } = req.query;

  if (!['json', 'csv', 'excel', 'pdf'].includes(format)) {
    throw new AppError('Invalid export format. Supported formats: json, csv, excel, pdf', 400);
  }

  const data = await analyticsService.exportAnalyticsData(timeRange, format, filters);

  if (format === 'json') {
    res.json({
      success: true,
      data
    });
  } else {
    // Set appropriate headers for file downloads
    const filename = `analytics_${timeRange}_${new Date().toISOString().split('T')[0]}.${format}`;
    
    res.setHeader('Content-Type', this.getContentType(format));
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(data);
  }
});

// Track custom analytics event
export const trackEvent = asyncHandler(async (req, res) => {
  const { eventType, metadata, sessionData } = req.body;

  if (!eventType) {
    throw new AppError('Event type is required', 400);
  }

  const event = await analyticsService.trackEvent(
    eventType,
    req.user?._id,
    metadata,
    {
      ...sessionData,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    }
  );

  res.json({
    success: true,
    message: 'Event tracked successfully',
    data: event
  });
});

// Get analytics summary
export const getAnalyticsSummary = asyncHandler(async (req, res) => {
  const { timeRange = '30d' } = req.query;

  const [
    userSummary,
    eventSummary,
    contentSummary,
    teamSummary
  ] = await Promise.all([
    analyticsService.getUserAnalytics(timeRange),
    analyticsService.getEventAnalytics(timeRange),
    analyticsService.getContentAnalytics(timeRange),
    analyticsService.getTeamAnalytics(timeRange)
  ]);

  const summary = {
    users: userSummary.summary,
    events: eventSummary.summary,
    content: contentSummary.summary,
    teams: teamSummary.summary,
    timeRange,
    lastUpdated: new Date()
  };

  res.json({
    success: true,
    data: summary
  });
});

// Helper method for content type
const getContentType = (format) => {
  const contentTypes = {
    csv: 'text/csv',
    excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    pdf: 'application/pdf'
  };
  return contentTypes[format] || 'application/json';
};