import { asyncHandler } from '../middleware/errorsHandler.js';
import { AppError } from '../middleware/errorsHandler.js';
import Event from '../models/Event.js';
import User from '../models/User.js';

// Create new event
export const createEvent = asyncHandler(async (req, res) => {
  const eventData = {
    ...req.body,
    createdBy: req.user._id
  };

  // Check if end time is after start time
  if (req.body.startTime >= req.body.endTime) {
    throw new AppError('End time must be after start time', 400);
  }

  const event = await Event.create(eventData);

  res.status(201).json({
    success: true,
    message: 'Event created successfully',
    data: event
  });
});

// Get all events (with filters)
export const getAllEvents = asyncHandler(async (req, res) => {
  const {
    category,
    upcoming,
    search,
    page = 1,
    limit = 10,
    sortBy = 'date',
    sortOrder = 'asc'
  } = req.query;

  // Build filter
  const filter = { isActive: true };
  
  if (category) {
    filter.category = category;
  }
  
  if (upcoming === 'true') {
    filter.date = { $gte: new Date() };
  }
  
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } }
    ];
  }

  // Build sort
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // Pagination
  const skip = (page - 1) * limit;

  const events = await Event.find(filter)
    .populate('createdBy', 'name email')
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Event.countDocuments(filter);

  res.json({
    success: true,
    data: events,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// Get single event
export const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)
    .populate('createdBy', 'name email')
    .populate('attendees.user', 'name email avatar');

  if (!event) {
    throw new AppError('Event not found', 404);
  }

  if (!event.isActive) {
    throw new AppError('Event is not active', 400);
  }

  res.json({
    success: true,
    data: event
  });
});

// Update event
export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    throw new AppError('Event not found', 404);
  }

  // Check if user can update this event
  if (event.createdBy.toString() !== req.user._id.toString() && !['admin', 'leader'].includes(req.user.role)) {
    throw new AppError('Not authorized to update this event', 403);
  }

  // Check if end time is after start time
  if (req.body.startTime && req.body.endTime && req.body.startTime >= req.body.endTime) {
    throw new AppError('End time must be after start time', 400);
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('createdBy', 'name email');

  res.json({
    success: true,
    message: 'Event updated successfully',
    data: updatedEvent
  });
});

// Delete event
export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    throw new AppError('Event not found', 404);
  }

  // Check if user can delete this event
  if (event.createdBy.toString() !== req.user._id.toString() && !['admin', 'leader'].includes(req.user.role)) {
    throw new AppError('Not authorized to delete this event', 403);
  }

  await Event.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Event deleted successfully'
  });
});

// Register for event
export const registerForEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user._id;

  const event = await Event.findById(eventId);
  if (!event) {
    throw new AppError('Event not found', 404);
  }

  if (!event.isActive) {
    throw new AppError('Event is not active', 400);
  }

  // Check if event is full
  if (event.isFull) {
    throw new AppError('Event is full', 400);
  }

  // Check if user is already registered
  const existingRegistration = event.attendees.find(
    attendee => attendee.user.toString() === userId.toString()
  );

  if (existingRegistration) {
    if (existingRegistration.status === 'cancelled') {
      // Reactivate cancelled registration
      existingRegistration.status = 'registered';
      await event.save();
      
      return res.json({
        success: true,
        message: 'Event registration reactivated',
        data: event
      });
    } else {
      throw new AppError('Already registered for this event', 400);
    }
  }

  // Add user to attendees
  event.attendees.push({
    user: userId,
    status: 'registered'
  });

  await event.save();

  res.json({
    success: true,
    message: 'Successfully registered for event',
    data: event
  });
});

// Cancel event registration
export const cancelEventRegistration = asyncHandler(async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user._id;

  const event = await Event.findById(eventId);
  if (!event) {
    throw new AppError('Event not found', 404);
  }

  const attendeeIndex = event.attendees.findIndex(
    attendee => attendee.user.toString() === userId.toString()
  );

  if (attendeeIndex === -1) {
    throw new AppError('Not registered for this event', 400);
  }

  event.attendees[attendeeIndex].status = 'cancelled';
  await event.save();

  res.json({
    success: true,
    message: 'Event registration cancelled',
    data: event
  });
});

// Get user's registered events
export const getUserEvents = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const events = await Event.find({
    'attendees.user': userId,
    'attendees.status': { $ne: 'cancelled' }
  })
    .populate('createdBy', 'name email')
    .sort({ date: 1 });

  res.json({
    success: true,
    data: events
  });
});

// Mark attendance (for event organizers)
export const markAttendance = asyncHandler(async (req, res) => {
  const { eventId, userId, status } = req.body;

  const event = await Event.findById(eventId);
  if (!event) {
    throw new AppError('Event not found', 404);
  }

  // Check if user can mark attendance
  if (event.createdBy.toString() !== req.user._id.toString() && !['admin', 'leader'].includes(req.user.role)) {
    throw new AppError('Not authorized to mark attendance', 403);
  }

  const attendee = event.attendees.find(
    a => a.user.toString() === userId
  );

  if (!attendee) {
    throw new AppError('User not registered for this event', 400);
  }

  attendee.status = status;
  await event.save();

  res.json({
    success: true,
    message: 'Attendance marked successfully',
    data: event
  });
});