import Joi from 'joi';

// Schema for creating a new contact
export const createContactSchema = Joi.object({
  name: Joi.string()
    .required()
    .trim()
    .min(2)
    .max(100)
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 100 characters'
    }),
  
  email: Joi.string()
    .email()
    .required()
    .trim()
    .lowercase()
    .messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required'
    }),
  
  phone: Joi.string()
    .trim()
    .max(20)
    .optional()
    .messages({
      'string.max': 'Phone number cannot exceed 20 characters'
    }),
  
  subject: Joi.string()
    .required()
    .trim()
    .min(5)
    .max(200)
    .messages({
      'string.empty': 'Subject is required',
      'string.min': 'Subject must be at least 5 characters long',
      'string.max': 'Subject cannot exceed 200 characters'
    }),
  
  message: Joi.string()
    .required()
    .trim()
    .min(10)
    .max(2000)
    .messages({
      'string.empty': 'Message is required',
      'string.min': 'Message must be at least 10 characters long',
      'string.max': 'Message cannot exceed 2000 characters'
    }),
  
  category: Joi.string()
    .valid('general', 'support', 'feedback', 'partnership', 'volunteer', 'donation', 'event', 'other')
    .default('general')
    .messages({
      'any.only': 'Invalid category selected'
    }),
  
  priority: Joi.string()
    .valid('low', 'medium', 'high', 'urgent')
    .default('medium')
    .messages({
      'any.only': 'Invalid priority level'
    }),
  
  source: Joi.string()
    .valid('website', 'mobile_app', 'email', 'phone', 'social_media')
    .default('website')
    .messages({
      'any.only': 'Invalid source'
    }),
  
  tags: Joi.array()
    .items(Joi.string().trim())
    .max(10)
    .optional()
    .messages({
      'array.max': 'Cannot exceed 10 tags'
    })
});

// Schema for updating contact status
export const updateContactStatusSchema = Joi.object({
  status: Joi.string()
    .valid('new', 'in_progress', 'responded', 'resolved', 'closed')
    .required()
    .messages({
      'any.only': 'Invalid status value'
    }),
  
  priority: Joi.string()
    .valid('low', 'medium', 'high', 'urgent')
    .optional()
    .messages({
      'any.only': 'Invalid priority level'
    }),
  
  tags: Joi.array()
    .items(Joi.string().trim())
    .max(10)
    .optional()
    .messages({
      'array.max': 'Cannot exceed 10 tags'
    })
});

// Schema for adding response
export const addResponseSchema = Joi.object({
  response: Joi.string()
    .required()
    .trim()
    .min(5)
    .max(1000)
    .messages({
      'string.empty': 'Response message is required',
      'string.min': 'Response must be at least 5 characters long',
      'string.max': 'Response cannot exceed 1000 characters'
    }),
  
  status: Joi.string()
    .valid('responded', 'resolved', 'closed')
    .default('responded')
    .messages({
      'any.only': 'Invalid status value'
    })
});

// Schema for scheduling follow-up
export const scheduleFollowUpSchema = Joi.object({
  scheduledFor: Joi.date()
    .greater('now')
    .required()
    .messages({
      'date.greater': 'Follow-up date must be in the future'
    }),
  
  notes: Joi.string()
    .trim()
    .max(500)
    .optional()
    .messages({
      'string.max': 'Notes cannot exceed 500 characters'
    })
});

// Schema for filtering contacts
export const contactFilterSchema = Joi.object({
  status: Joi.string()
    .valid('new', 'in_progress', 'responded', 'resolved', 'closed')
    .optional(),
  
  category: Joi.string()
    .valid('general', 'support', 'feedback', 'partnership', 'volunteer', 'donation', 'event', 'other')
    .optional(),
  
  priority: Joi.string()
    .valid('low', 'medium', 'high', 'urgent')
    .optional(),
  
  source: Joi.string()
    .valid('website', 'mobile_app', 'email', 'phone', 'social_media')
    .optional(),
  
  isRead: Joi.boolean().optional(),
  
  isArchived: Joi.boolean().optional(),
  
  dateFrom: Joi.date().optional(),
  
  dateTo: Joi.date().optional(),
  
  search: Joi.string().trim().optional(),
  
  page: Joi.number().integer().min(1).default(1),
  
  limit: Joi.number().integer().min(1).max(100).default(20)
});

// Schema for bulk operations
export const bulkUpdateContactSchema = Joi.object({
  contactIds: Joi.array()
    .items(Joi.string().hex().length(24))
    .min(1)
    .max(100)
    .required()
    .messages({
      'array.min': 'At least one contact ID is required',
      'array.max': 'Cannot update more than 100 contacts at once'
    }),
  
  updates: Joi.object({
    status: Joi.string()
      .valid('new', 'in_progress', 'responded', 'resolved', 'closed')
      .optional(),
    
    priority: Joi.string()
      .valid('low', 'medium', 'high', 'urgent')
      .optional(),
    
    category: Joi.string()
      .valid('general', 'support', 'feedback', 'partnership', 'volunteer', 'donation', 'event', 'other')
      .optional(),
    
    tags: Joi.array()
      .items(Joi.string().trim())
      .max(10)
      .optional(),
    
    isRead: Joi.boolean().optional(),
    
    isArchived: Joi.boolean().optional()
  }).min(1).required()
    .messages({
      'object.min': 'At least one update field is required'
    })
});