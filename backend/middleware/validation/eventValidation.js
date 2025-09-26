import Joi from 'joi';

// Event creation validation schema
export const createEventSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Event title must be at least 3 characters long',
      'string.max': 'Event title cannot exceed 100 characters',
      'any.required': 'Event title is required'
    }),
  description: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.min': 'Event description must be at least 10 characters long',
      'string.max': 'Event description cannot exceed 1000 characters',
      'any.required': 'Event description is required'
    }),
  date: Joi.date()
    .min('now')
    .required()
    .messages({
      'date.min': 'Event date must be in the future',
      'any.required': 'Event date is required'
    }),
  startTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required()
    .messages({
      'string.pattern.base': 'Please enter valid start time format (HH:MM)',
      'any.required': 'Start time is required'
    }),
  endTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required()
    .messages({
      'string.pattern.base': 'Please enter valid end time format (HH:MM)',
      'any.required': 'End time is required'
    }),
  location: Joi.string()
    .min(3)
    .max(200)
    .required()
    .messages({
      'string.min': 'Location must be at least 3 characters long',
      'string.max': 'Location cannot exceed 200 characters',
      'any.required': 'Event location is required'
    }),
  category: Joi.string()
    .valid('worship', 'bible_study', 'prayer', 'fellowship', 'outreach', 'training', 'other')
    .default('other'),
  maxAttendees: Joi.number()
    .min(1)
    .optional(),
  image: Joi.string()
    .uri()
    .optional(),
  isPublic: Joi.boolean()
    .default(true),
  tags: Joi.array()
    .items(Joi.string().max(20))
    .max(10)
    .optional()
});

// Event update validation schema
export const updateEventSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .optional(),
  description: Joi.string()
    .min(10)
    .max(1000)
    .optional(),
  date: Joi.date()
    .min('now')
    .optional(),
  startTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional(),
  endTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional(),
  location: Joi.string()
    .min(3)
    .max(200)
    .optional(),
  category: Joi.string()
    .valid('worship', 'bible_study', 'prayer', 'fellowship', 'outreach', 'training', 'other')
    .optional(),
  maxAttendees: Joi.number()
    .min(1)
    .optional(),
  image: Joi.string()
    .uri()
    .optional(),
  isActive: Joi.boolean()
    .optional(),
  isPublic: Joi.boolean()
    .optional(),
  tags: Joi.array()
    .items(Joi.string().max(20))
    .max(10)
    .optional()
});

// Event registration validation schema
export const eventRegistrationSchema = Joi.object({
  eventId: Joi.string()
    .required()
    .messages({
      'any.required': 'Event ID is required'
    })
});

// Event attendance validation schema
export const eventAttendanceSchema = Joi.object({
  eventId: Joi.string()
    .required()
    .messages({
      'any.required': 'Event ID is required'
    }),
  userId: Joi.string()
    .required()
    .messages({
      'any.required': 'User ID is required'
    }),
  status: Joi.string()
    .valid('registered', 'attended', 'cancelled')
    .required()
    .messages({
      'any.required': 'Status is required',
      'any.only': 'Status must be registered, attended, or cancelled'
    })
});

// Event search/filter validation schema
export const eventFilterSchema = Joi.object({
  category: Joi.string()
    .valid('worship', 'bible_study', 'prayer', 'fellowship', 'outreach', 'training', 'other')
    .optional(),
  upcoming: Joi.boolean()
    .optional(),
  search: Joi.string()
    .max(100)
    .optional(),
  page: Joi.number()
    .integer()
    .min(1)
    .default(1),
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),
  sortBy: Joi.string()
    .valid('date', 'title', 'createdAt', 'currentAttendees')
    .default('date'),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('asc')
});