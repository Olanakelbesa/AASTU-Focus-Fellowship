import Joi from 'joi';

export const uploadMediaSchema = Joi.object({
  category: Joi.string()
    .valid('events', 'gallery', 'content', 'profiles', 'documents', 'other')
    .default('other'),
  
    tags: Joi.alternatives().try(
      Joi.array().items(Joi.string().trim()),
      Joi.string().custom((value, helpers) => {
        if (typeof value === 'string' && value.trim()) {
          return value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        }
        return [];
      })
    ).default([]),
  
  altText: Joi.string().max(200),
  
  description: Joi.string().max(500),
  
  isPublic: Joi.boolean().default(true),
  
  isFeatured: Joi.boolean().default(false)
});

export const updateMediaSchema = Joi.object({
  filename: Joi.string().trim(),
  
  category: Joi.string()
    .valid('events', 'gallery', 'content', 'profiles', 'documents', 'other'),
  
  tags: Joi.array().items(Joi.string().trim()),
  
  altText: Joi.string().max(200),
  
  description: Joi.string().max(500),
  
  isPublic: Joi.boolean(),
  
  isFeatured: Joi.boolean()
});

export const mediaFilterSchema = Joi.object({
  type: Joi.string().valid('image', 'document', 'video', 'audio'),
  category: Joi.string().valid('events', 'gallery', 'content', 'profiles', 'documents', 'other'),
  uploadedBy: Joi.string().hex().length(24),
  tags: Joi.string(),
  search: Joi.string().min(2),
  isPublic: Joi.boolean(),
  isFeatured: Joi.boolean(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  sortBy: Joi.string().valid('createdAt', 'updatedAt', 'size', 'filename').default('createdAt'),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc')
});

export const mediaBulkUpdateSchema = Joi.object({
  mediaIds: Joi.array().items(Joi.string().hex().length(24)).min(1).required(),
  updates: Joi.object({
    category: Joi.string().valid('events', 'gallery', 'content', 'profiles', 'documents', 'other'),
    tags: Joi.array().items(Joi.string().trim()),
    isPublic: Joi.boolean(),
    isFeatured: Joi.boolean()
  }).required()
});