import Joi from 'joi';

// Common ID validation
export const idParamSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid ID format',
      'any.required': 'ID parameter is required'
    })
});

// Pagination validation
export const paginationSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1),
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
});

// Search validation
export const searchSchema = Joi.object({
  search: Joi.string()
    .min(1)
    .max(100)
    .optional(),
  ...paginationSchema.describe().keys
});

// Date range validation
export const dateRangeSchema = Joi.object({
  startDate: Joi.date()
    .optional(),
  endDate: Joi.date()
    .min(Joi.ref('startDate'))
    .optional()
    .messages({
      'date.min': 'End date must be after start date'
    })
});