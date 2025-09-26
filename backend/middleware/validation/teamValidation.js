import Joi from 'joi';

// Team creation validation schema
export const createTeamSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Team name must be at least 3 characters long',
      'string.max': 'Team name cannot exceed 100 characters',
      'any.required': 'Team name is required'
    }),
  description: Joi.string()
    .min(10)
    .max(500)
    .required()
    .messages({
      'string.min': 'Team description must be at least 10 characters long',
      'string.max': 'Description cannot exceed 500 characters',
      'any.required': 'Team description is required'
    }),
  category: Joi.string()
    .valid('worship', 'prayer', 'outreach', 'fellowship', 'technical', 'media', 'administration', 'other')
    .required()
    .messages({
      'any.only': 'Please select a valid team category',
      'any.required': 'Team category is required'
    }),
  maxMembers: Joi.number()
    .min(1)
    .max(100)
    .default(20)
    .messages({
      'number.min': 'Maximum members must be at least 1',
      'number.max': 'Maximum members cannot exceed 100'
    }),
  image: Joi.string()
    .uri()
    .optional(),
  isPublic: Joi.boolean()
    .default(true),
  meetingSchedule: Joi.object({
    day: Joi.string()
      .valid('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')
      .optional(),
    time: Joi.string()
      .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .optional()
      .messages({
        'string.pattern.base': 'Please enter valid time format (HH:MM)'
      }),
    location: Joi.string()
      .max(200)
      .optional()
  }).optional(),
  goals: Joi.array()
    .items(Joi.string().max(200))
    .max(5)
    .optional()
});

// Team update validation schema
export const updateTeamSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .optional(),
  description: Joi.string()
    .min(10)
    .max(500)
    .optional(),
  category: Joi.string()
    .valid('worship', 'prayer', 'outreach', 'fellowship', 'technical', 'media', 'administration', 'other')
    .optional(),
  maxMembers: Joi.number()
    .min(1)
    .max(100)
    .optional(),
  image: Joi.string()
    .uri()
    .optional(),
  isActive: Joi.boolean()
    .optional(),
  isPublic: Joi.boolean()
    .optional(),
  meetingSchedule: Joi.object({
    day: Joi.string()
      .valid('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'),
    time: Joi.string()
      .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    location: Joi.string()
      .max(200)
  }).optional(),
  goals: Joi.array()
    .items(Joi.string().max(200))
    .max(5)
    .optional()
});

// Add member to team schema
export const addMemberSchema = Joi.object({
  userId: Joi.string()
    .required()
    .messages({
      'any.required': 'User ID is required'
    }),
  role: Joi.string()
    .valid('member', 'assistant_leader', 'coordinator')
    .default('member')
    .messages({
      'any.only': 'Role must be member, assistant_leader, or coordinator'
    })
});

// Update member role schema
export const updateMemberRoleSchema = Joi.object({
  userId: Joi.string()
    .required()
    .messages({
      'any.required': 'User ID is required'
    }),
  role: Joi.string()
    .valid('member', 'assistant_leader', 'coordinator')
    .required()
    .messages({
      'any.required': 'Role is required',
      'any.only': 'Role must be member, assistant_leader, or coordinator'
    })
});

// Team search/filter schema
export const teamFilterSchema = Joi.object({
  category: Joi.string()
    .valid('worship', 'prayer', 'outreach', 'fellowship', 'technical', 'media', 'administration', 'other')
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
    .max(50)
    .default(10),
  sortBy: Joi.string()
    .valid('name', 'createdAt', 'memberCount')
    .default('name'),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('asc')
});