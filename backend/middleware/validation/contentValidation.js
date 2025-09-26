import Joi from 'joi';

export const createContentSchema = Joi.object({
  title: Joi.string()
    .min(5)
    .max(200)
    .required()
    .messages({
      'string.min': 'Title must be at least 5 characters long',
      'string.max': 'Title cannot exceed 200 characters',
      'any.required': 'Title is required'
    }),
  
  content: Joi.string()
    .min(50)
    .required()
    .messages({
      'string.min': 'Content must be at least 50 characters long',
      'any.required': 'Content is required'
    }),
  
  excerpt: Joi.string()
    .max(300)
    .required()
    .messages({
      'string.max': 'Excerpt cannot exceed 300 characters',
      'any.required': 'Excerpt is required'
    }),
  
  type: Joi.string()
    .valid('article', 'announcement', 'devotional', 'news', 'testimony')
    .default('article'),
  
  category: Joi.string()
    .valid('fellowship', 'spiritual', 'events', 'ministry', 'testimonies', 'general')
    .default('general'),
  
  status: Joi.string()
    .valid('draft', 'published', 'archived')
    .default('draft'),
  
  featured: Joi.boolean().default(false),
  
  tags: Joi.array().items(Joi.string().trim()),
  
  coverImage: Joi.string().uri().allow(null, ''),
  
  metaDescription: Joi.string().max(160),
  
  seoKeywords: Joi.array().items(Joi.string().trim())
});

export const updateContentSchema = Joi.object({
  title: Joi.string().min(5).max(200),
  content: Joi.string().min(50),
  excerpt: Joi.string().max(300),
  type: Joi.string().valid('article', 'announcement', 'devotional', 'news', 'testimony'),
  category: Joi.string().valid('fellowship', 'spiritual', 'events', 'ministry', 'testimonies', 'general'),
  status: Joi.string().valid('draft', 'published', 'archived'),
  featured: Joi.boolean(),
  tags: Joi.array().items(Joi.string().trim()),
  coverImage: Joi.string().uri().allow(null, ''),
  metaDescription: Joi.string().max(160),
  seoKeywords: Joi.array().items(Joi.string().trim())
});

export const contentFilterSchema = Joi.object({
  type: Joi.string().valid('article', 'announcement', 'devotional', 'news', 'testimony'),
  category: Joi.string().valid('fellowship', 'spiritual', 'events', 'ministry', 'testimonies', 'general'),
  status: Joi.string().valid('draft', 'published', 'archived'),
  featured: Joi.boolean(),
  author: Joi.string().hex().length(24),
  search: Joi.string().min(2),
  tags: Joi.string(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sortBy: Joi.string().valid('createdAt', 'updatedAt', 'publishedAt', 'views', 'title').default('createdAt'),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc')
});

export const contentLikeSchema = Joi.object({
  contentId: Joi.string().hex().length(24).required()
});