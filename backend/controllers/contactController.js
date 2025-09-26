import Contact from '../models/Contact.js';
import { AppError } from '../middleware/errorsHandler.js';
import asyncHandler from '../utils/asyncHandler.js';
import emailService from '../services/emailService.js';

// Create new contact (public)
export const createContact = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    subject,
    message,
    category,
    priority,
    source,
    tags
  } = req.body;

  // Create contact
  const contact = await Contact.create({
    name,
    email,
    phone,
    subject,
    message,
    category,
    priority,
    source,
    tags
  });

try {
      
    await emailService.sendContactNotification(contact);

    await emailService.sendAutoResponse(contact)

} catch (error) {
    console.error('Email sending failed: ', error);
}

  res.status(201).json({
    success: true,
    message: 'Thank you for your message. We will get back to you soon!',
    data: {
      id: contact._id,
      reference: `#${contact._id.toString().slice(-8).toUpperCase()}`
    }
  });
});


// Get all contacts (admin/leader only)
export const getAllContacts = asyncHandler(async (req, res) => {
  const {
    status,
    category,
    priority,
    source,
    isRead,
    isArchived,
    dateFrom,
    dateTo,
    search,
    page = 1,
    limit = 20
  } = req.query;

  // Build filter object
  const filter = {};

  if (status) filter.status = status;
  if (category) filter.category = category;
  if (priority) filter.priority = priority;
  if (source) filter.source = source;
  if (isRead !== undefined) filter.isRead = isRead === 'true';
  if (isArchived !== undefined) filter.isArchived = isArchived === 'true';

  // Date range filter
  if (dateFrom || dateTo) {
    filter.createdAt = {};
    if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
    if (dateTo) filter.createdAt.$lte = new Date(dateTo);
  }

  // Search filter
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { subject: { $regex: search, $options: 'i' } },
      { message: { $regex: search, $options: 'i' } }
    ];
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Get contacts with pagination
  const contacts = await Contact.find(filter)
    .populate('response.respondedBy', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  // Get total count
  const total = await Contact.countDocuments(filter);

  // Calculate pagination info
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  res.json({
    success: true,
    data: contacts,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalItems: total,
      itemsPerPage: parseInt(limit),
      hasNextPage,
      hasPrevPage
    }
  });
});

// Get contact by ID (admin/leader only)
export const getContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findById(id)
    .populate('response.respondedBy', 'name email');

  if (!contact) {
    throw new AppError('Contact not found', 404);
  }

  // Mark as read if not already read
  if (!contact.isRead) {
    contact.markAsRead();
  }

  res.json({
    success: true,
    data: contact
  });
});

// Update contact status (admin/leader only)
export const updateContactStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, priority, tags } = req.body;

  const contact = await Contact.findById(id);

  if (!contact) {
    throw new AppError('Contact not found', 404);
  }

  // Update fields
  if (status) contact.status = status;
  if (priority) contact.priority = priority;
  if (tags) contact.tags = tags;

  // Update status with user info
  if (status && ['responded', 'resolved', 'closed'].includes(status)) {
    contact.response.respondedBy = req.user._id;
    contact.response.respondedAt = new Date();
  }

  await contact.save();

  res.json({
    success: true,
    message: 'Contact updated successfully',
    data: contact
  });
});

// Add response to contact (admin/leader only)
export const addResponse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { response: responseMessage, status } = req.body;

  const contact = await Contact.findById(id);

  if (!contact) {
    throw new AppError('Contact not found', 404);
  }

  // Add response
  await contact.addResponse(responseMessage, req.user._id);

  // Update status if provided
  if (status && status !== 'responded') {
    contact.status = status;
    await contact.save();
  }

  // TODO: Send email response to user

  res.json({
    success: true,
    message: 'Response added successfully',
    data: contact
  });
});

// Schedule follow-up (admin/leader only)
export const scheduleFollowUp = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { scheduledFor, notes } = req.body;

  const contact = await Contact.findById(id);

  if (!contact) {
    throw new AppError('Contact not found', 404);
  }

  // Schedule follow-up
  await contact.scheduleFollowUp(scheduledFor, notes);

  res.json({
    success: true,
    message: 'Follow-up scheduled successfully',
    data: contact
  });
});

// Mark contact as resolved (admin/leader only)
export const markAsResolved = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findById(id);

  if (!contact) {
    throw new AppError('Contact not found', 404);
  }

  contact.status = 'resolved';
  contact.response.respondedBy = req.user._id;
  contact.response.respondedAt = new Date();
  contact.isRead = true;

  await contact.save();

  res.json({
    success: true,
    message: 'Contact marked as resolved',
    data: contact
  });
});

// Archive contact (admin/leader only)
export const archiveContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findById(id);

  if (!contact) {
    throw new AppError('Contact not found', 404);
  }

  contact.isArchived = !contact.isArchived;
  await contact.save();

  res.json({
    success: true,
    message: `Contact ${contact.isArchived ? 'archived' : 'unarchived'} successfully`,
    data: contact
  });
});

// Delete contact (admin only)
export const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findById(id);

  if (!contact) {
    throw new AppError('Contact not found', 404);
  }

  await Contact.findByIdAndDelete(id);

  res.json({
    success: true,
    message: 'Contact deleted successfully'
  });
});

// Bulk update contacts (admin/leader only)
export const bulkUpdateContacts = asyncHandler(async (req, res) => {
  const { contactIds, updates } = req.body;

  // Validate contact IDs
  const validIds = contactIds.filter(id => /^[0-9a-fA-F]{24}$/.test(id));

  if (validIds.length === 0) {
    throw new AppError('No valid contact IDs provided', 400);
  }

  // Update contacts
  const result = await Contact.updateMany(
    { _id: { $in: validIds } },
    { $set: updates },
    { new: true }
  );

  res.json({
    success: true,
    message: `${result.modifiedCount} contacts updated successfully`,
    data: {
      modifiedCount: result.modifiedCount,
      matchedCount: result.matchedCount
    }
  });
});

// Bulk delete contacts (admin only)
export const bulkDeleteContacts = asyncHandler(async (req, res) => {
  const { contactIds } = req.body;

  // Validate contact IDs
  const validIds = contactIds.filter(id => /^[0-9a-fA-F]{24}$/.test(id));

  if (validIds.length === 0) {
    throw new AppError('No valid contact IDs provided', 400);
  }

  // Delete contacts
  const result = await Contact.deleteMany({ _id: { $in: validIds } });

  res.json({
    success: true,
    message: `${result.deletedCount} contacts deleted successfully`,
    data: {
      deletedCount: result.deletedCount
    }
  });
});

// Get contact statistics (admin/leader only)
export const getContactStats = asyncHandler(async (req, res) => {
  const stats = await Contact.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        new: { $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] } },
        inProgress: { $sum: { $cond: [{ $eq: ['$status', 'in_progress'] }, 1, 0] } },
        responded: { $sum: { $cond: [{ $eq: ['$status', 'responded'] }, 1, 0] } },
        resolved: { $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] } },
        closed: { $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] } },
        urgent: { $sum: { $cond: [{ $eq: ['$priority', 'urgent'] }, 1, 0] } },
        high: { $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] } },
        unread: { $sum: { $cond: [{ $eq: ['$isRead', false] }, 1, 0] } }
      }
    }
  ]);

  // Category breakdown
  const categoryStats = await Contact.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);

  // Monthly trend (last 6 months)
  const monthlyTrend = await Contact.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
        }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } }
  ]);

  // Response time statistics
  const responseTimeStats = await Contact.aggregate([
    {
      $match: {
        'response.responseTime': { $exists: true, $ne: null }
      }
    },
    {
      $group: {
        _id: null,
        avgResponseTime: { $avg: '$response.responseTime' },
        minResponseTime: { $min: '$response.responseTime' },
        maxResponseTime: { $max: '$response.responseTime' }
      }
    }
  ]);

  res.json({
    success: true,
    data: {
      overview: stats[0] || {
        total: 0,
        new: 0,
        inProgress: 0,
        responded: 0,
        resolved: 0,
        closed: 0,
        urgent: 0,
        high: 0,
        unread: 0
      },
      categoryBreakdown: categoryStats,
      monthlyTrend,
      responseTime: responseTimeStats[0] || {
        avgResponseTime: 0,
        minResponseTime: 0,
        maxResponseTime: 0
      }
    }
  });
});

// Get follow-up tasks (admin/leader only)
export const getFollowUpTasks = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const followUps = await Contact.find({
    'followUp.required': true,
    'followUp.completed': false,
    'followUp.scheduledFor': { $lte: new Date() }
  })
    .populate('response.respondedBy', 'name email')
    .sort({ 'followUp.scheduledFor': 1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Contact.countDocuments({
    'followUp.required': true,
    'followUp.completed': false,
    'followUp.scheduledFor': { $lte: new Date() }
  });

  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    data: followUps,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalItems: total,
      itemsPerPage: parseInt(limit)
    }
  });
});

// Mark follow-up as completed (admin/leader only)
export const markFollowUpCompleted = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findById(id);

  if (!contact) {
    throw new AppError('Contact not found', 404);
  }

  if (!contact.followUp.required) {
    throw new AppError('This contact does not have a follow-up scheduled', 400);
  }

  contact.followUp.completed = true;
  await contact.save();

  res.json({
    success: true,
    message: 'Follow-up marked as completed',
    data: contact
  });
});