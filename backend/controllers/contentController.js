import Content from '../models/Content.js';
import { AppError, asyncHandler } from '../middleware/errorsHandler.js';

// Create new content
export const createContent = asyncHandler(async (req, res) => {
  const contentData = {
    ...req.body,
    author: req.user._id
  };

  const content = await Content.create(contentData);

  res.status(201).json({
    success: true,
    message: 'Content created successfully',
    data: content
  });
});

// Get all content with filtering and pagination
export const getAllContent = asyncHandler(async (req, res) => {
  const {
    type,
    category,
    status = 'published', // Default to published for public access
    featured,
    author,
    search,
    tags,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  // Build filter object
  const filter = {};
  
  if (type) filter.type = type;
  if (category) filter.category = category;
  if (status) filter.status = status;
  if (featured !== undefined) filter.featured = featured === 'true';
  if (author) filter.author = author;
  
  if (tags) {
    const tagArray = tags.split(',').map(tag => tag.trim());
    filter.tags = { $in: tagArray };
  }

  // Search functionality
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } }
    ];
  }

  // Calculate pagination
  const skip = (page - 1) * limit;
  
  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

  // Execute query
  const [content, total] = await Promise.all([
    Content.find(filter)
      .populate('author', 'name email avatar')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v'),
    Content.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    data: content,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalItems: total,
      itemsPerPage: parseInt(limit)
    }
  });
});

// Get content by ID
export const getContentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const content = await Content.findById(id)
    .populate('author', 'name email avatar')
    .populate('likes', 'name email avatar');

  if (!content) {
    throw new AppError('Content not found', 404);
  }

  // Increment views for published content
  if (content.status === 'published') {
    await content.incrementViews();
  }

  res.json({
    success: true,
    data: content
  });
});

// Get content by slug
export const getContentBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const content = await Content.findOne({ slug, status: 'published' })
    .populate('author', 'name email avatar')
    .populate('likes', 'name email avatar');

  if (!content) {
    throw new AppError('Content not found', 404);
  }

  // Increment views
  await content.incrementViews();

  res.json({
    success: true,
    data: content
  });
});

// Update content
export const updateContent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const content = await Content.findById(id);

  if (!content) {
    throw new AppError('Content not found', 404);
  }

  // Check authorization
  if (!['admin', 'leader'].includes(req.user.role) && 
      content.author.toString() !== req.user._id.toString()) {
    throw new AppError('Not authorized to update this content', 403);
  }

  // Handle status change to published
  if (updateData.status === 'published' && content.status !== 'published') {
    updateData.publishedAt = new Date();
  }

  // If title is being updated, regenerate slug
  if (updateData.title && updateData.title !== content.title) {
    // Remove title from updateData to let pre-save middleware handle slug generation
    delete updateData.title;
    // We'll update the title separately to trigger slug regeneration
  }

  const updatedContent = await Content.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  ).populate('author', 'name email avatar');

  // If title was updated, regenerate slug
  if (updateData.title && updateData.title !== content.title) {
    updatedContent.title = updateData.title;
    await updatedContent.save(); // This will trigger pre-save middleware
  }

  res.json({
    success: true,
    message: 'Content updated successfully',
    data: updatedContent
  });
});

// Delete content
export const deleteContent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const content = await Content.findById(id);

  if (!content) {
    throw new AppError('Content not found', 404);
  }

  // Check authorization
  if (!['admin', 'leader'].includes(req.user.role) && 
      content.author.toString() !== req.user._id.toString()) {
    throw new AppError('Not authorized to delete this content', 403);
  }

  await Content.findByIdAndDelete(id);

  res.json({
    success: true,
    message: 'Content deleted successfully'
  });
});

// Toggle content like
export const toggleContentLike = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const content = await Content.findById(id);

  if (!content) {
    throw new AppError('Content not found', 404);
  }

  if (content.status !== 'published') {
    throw new AppError('Cannot like unpublished content', 400);
  }

  await content.toggleLike(req.user._id);

  res.json({
    success: true,
    message: 'Like toggled successfully',
    data: {
      likeCount: content.likeCount,
      isLiked: content.likes.includes(req.user._id)
    }
  });
});

// Get user's content
export const getUserContent = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const skip = (page - 1) * limit;

  const filter = { author: req.user._id };
  if (status) filter.status = status;

  const [content, total] = await Promise.all([
    Content.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v'),
    Content.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    data: content,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalItems: total,
      itemsPerPage: parseInt(limit)
    }
  });
});

// Get featured content
export const getFeaturedContent = asyncHandler(async (req, res) => {
  const { limit = 5 } = req.query;

  const featuredContent = await Content.find({
    featured: true,
    status: 'published'
  })
    .populate('author', 'name email avatar')
    .sort({ publishedAt: -1 })
    .limit(parseInt(limit))
    .select('-__v');

  res.json({
    success: true,
    data: featuredContent
  });
});

// Get content statistics (admin only)
export const getContentStats = asyncHandler(async (req, res) => {
  const stats = await Content.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalViews: { $sum: '$views' }
      }
    }
  ]);

  const totalContent = await Content.countDocuments();
  const totalPublished = await Content.countDocuments({ status: 'published' });
  const totalViews = await Content.aggregate([
    { $group: { _id: null, total: { $sum: '$views' } } }
  ]);

  res.json({
    success: true,
    data: {
      totalContent,
      totalPublished,
      totalViews: totalViews[0]?.total || 0,
      byStatus: stats
    }
  });
});