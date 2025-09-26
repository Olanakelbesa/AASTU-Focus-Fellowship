import Media from '../models/Media.js';
import { AppError, asyncHandler } from '../middleware/errorsHandler.js';
import { ImageProcessor } from '../utils/imageProcessor.js';
import path from 'path';
import fs from 'fs/promises';

// Upload single media file
export const uploadMedia = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError('No file uploaded', 400);
  }

  const {
    category = 'other',
    tags = [],
    altText,
    description,
    isPublic = true,
    isFeatured = false
  } = req.body;

  // Determine media type from mimetype
  let mediaType = 'document';
  if (req.file.mimetype.startsWith('image/')) mediaType = 'image';
  else if (req.file.mimetype.startsWith('video/')) mediaType = 'video';
  else if (req.file.mimetype.startsWith('audio/')) mediaType = 'audio';

  // Generate file URL
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

  // Process image if it's an image file
  let thumbnailUrl = null;
  let dimensions = null;

  if (mediaType === 'image') {
    // Get image dimensions
    dimensions = await ImageProcessor.getImageDimensions(req.file.path);
    
    // Generate thumbnail
    const thumbnailDir = path.join(process.cwd(), 'uploads', 'thumbnails');
    await fs.mkdir(thumbnailDir, { recursive: true });
    
    const thumbnailPath = path.join(thumbnailDir, `thumb_${req.file.filename}`);
    await ImageProcessor.generateThumbnail(req.file.path, thumbnailPath);
    
    thumbnailUrl = `${baseUrl}/uploads/thumbnails/thumb_${req.file.filename}`;
  }

  // Create media record
  const media = await Media.create({
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
    url: fileUrl,
    thumbnailUrl,
    type: mediaType,
    category,
    tags: tags.length > 0 ? tags.split(',').map(tag => tag.trim()) : [],
    altText,
    description,
    uploadedBy: req.user._id,
    isPublic,
    isFeatured,
    dimensions
  });

  res.status(201).json({
    success: true,
    message: 'Media uploaded successfully',
    data: media
  });
});

// Upload multiple media files
export const uploadMultipleMedia = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new AppError('No files uploaded', 400);
  }

  const {
    category = 'other',
    tags = [],
    isPublic = true
  } = req.body;

  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const uploadedMedia = [];

  for (const file of req.files) {
    // Determine media type
    let mediaType = 'document';
    if (file.mimetype.startsWith('image/')) mediaType = 'image';
    else if (file.mimetype.startsWith('video/')) mediaType = 'video';
    else if (file.mimetype.startsWith('audio/')) mediaType = 'audio';

    // Generate file URL
    const fileUrl = `${baseUrl}/uploads/${file.filename}`;

    // Process image if needed
    let thumbnailUrl = null;
    let dimensions = null;

    if (mediaType === 'image') {
      dimensions = await ImageProcessor.getImageDimensions(file.path);
      
      const thumbnailDir = path.join(process.cwd(), 'uploads', 'thumbnails');
      await fs.mkdir(thumbnailDir, { recursive: true });
      
      const thumbnailPath = path.join(thumbnailDir, `thumb_${file.filename}`);
      await ImageProcessor.generateThumbnail(file.path, thumbnailPath);
      
      thumbnailUrl = `${baseUrl}/uploads/thumbnails/thumb_${file.filename}`;
    }

    // Create media record
    const media = await Media.create({
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path,
      url: fileUrl,
      thumbnailUrl,
      type: mediaType,
      category,
      tags: tags.length > 0 ? tags.split(',').map(tag => tag.trim()) : [],
      uploadedBy: req.user._id,
      isPublic,
      dimensions
    });

    uploadedMedia.push(media);
  }

  res.status(201).json({
    success: true,
    message: `${uploadedMedia.length} media files uploaded successfully`,
    data: uploadedMedia
  });
});

// Get all media with filtering and pagination
export const getAllMedia = asyncHandler(async (req, res) => {
  const {
    type,
    category,
    uploadedBy,
    tags,
    search,
    isPublic,
    isFeatured,
    page = 1,
    limit = 20,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  // Build filter object
  const filter = {};
  
  if (type) filter.type = type;
  if (category) filter.category = category;
  if (uploadedBy) filter.uploadedBy = uploadedBy;
  if (isPublic !== undefined) filter.isPublic = isPublic === 'true';
  if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
  
  if (tags) {
    const tagArray = tags.split(',').map(tag => tag.trim());
    filter.tags = { $in: tagArray };
  }

  // Search functionality
  if (search) {
    filter.$or = [
      { filename: { $regex: search, $options: 'i' } },
      { originalName: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { altText: { $regex: search, $options: 'i' } }
    ];
  }

  // Calculate pagination
  const skip = (page - 1) * limit;
  
  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

  // Execute query
  const [media, total] = await Promise.all([
    Media.find(filter)
      .populate('uploadedBy', 'name email avatar')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v'),
    Media.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    data: media,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalItems: total,
      itemsPerPage: parseInt(limit)
    }
  });
});

// Get media by ID
export const getMediaById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const media = await Media.findById(id)
    .populate('uploadedBy', 'name email avatar');

  if (!media) {
    throw new AppError('Media not found', 404);
  }

  res.json({
    success: true,
    data: media
  });
});

// Update media
export const updateMedia = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const media = await Media.findById(id);

  if (!media) {
    throw new AppError('Media not found', 404);
  }

  // Check authorization
  if (!['admin', 'leader'].includes(req.user.role) && 
      media.uploadedBy.toString() !== req.user._id.toString()) {
    throw new AppError('Not authorized to update this media', 403);
  }

  const updatedMedia = await Media.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  ).populate('uploadedBy', 'name email avatar');

  res.json({
    success: true,
    message: 'Media updated successfully',
    data: updatedMedia
  });
});

// Delete media
export const deleteMedia = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const media = await Media.findById(id);

  if (!media) {
    throw new AppError('Media not found', 404);
  }

  // Check authorization
  if (!['admin', 'leader'].includes(req.user.role) && 
      media.uploadedBy.toString() !== req.user._id.toString()) {
    throw new AppError('Not authorized to delete this media', 403);
  }

  // Delete physical files
  try {
    await fs.unlink(media.path);
    if (media.thumbnailUrl) {
      const thumbnailPath = path.join(process.cwd(), 'uploads', 'thumbnails', path.basename(media.thumbnailUrl));
      await fs.unlink(thumbnailPath);
    }
  } catch (error) {
    console.error('Error deleting physical files:', error);
  }

  await Media.findByIdAndDelete(id);

  res.json({
    success: true,
    message: 'Media deleted successfully'
  });
});

// Bulk update media
export const bulkUpdateMedia = asyncHandler(async (req, res) => {
  const { mediaIds, updates } = req.body;

  if (!mediaIds || !Array.isArray(mediaIds) || mediaIds.length === 0) {
    throw new AppError('Media IDs array is required', 400);
  }

  const result = await Media.updateMany(
    { _id: { $in: mediaIds } },
    updates,
    { runValidators: true }
  );

  res.json({
    success: true,
    message: `${result.modifiedCount} media files updated successfully`,
    data: { modifiedCount: result.modifiedCount }
  });
});

// Bulk delete media
export const bulkDeleteMedia = asyncHandler(async (req, res) => {
  const { mediaIds } = req.body;

  if (!mediaIds || !Array.isArray(mediaIds) || mediaIds.length === 0) {
    throw new AppError('Media IDs array is required', 400);
  }

  // Get media files to delete physical files
  const mediaFiles = await Media.find({ _id: { $in: mediaIds } });

  // Delete physical files
  for (const media of mediaFiles) {
    try {
      await fs.unlink(media.path);
      if (media.thumbnailUrl) {
        const thumbnailPath = path.join(process.cwd(), 'uploads', 'thumbnails', path.basename(media.thumbnailUrl));
        await fs.unlink(thumbnailPath);
      }
    } catch (error) {
      console.error('Error deleting physical files:', error);
    }
  }

  const result = await Media.deleteMany({ _id: { $in: mediaIds } });

  res.json({
    success: true,
    message: `${result.deletedCount} media files deleted successfully`,
    data: { deletedCount: result.deletedCount }
  });
});

// Get media statistics
export const getMediaStats = asyncHandler(async (req, res) => {
  const stats = await Media.aggregate([
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
        totalSize: { $sum: '$size' }
      }
    }
  ]);

  const totalMedia = await Media.countDocuments();
  const totalSize = await Media.aggregate([
    { $group: { _id: null, total: { $sum: '$size' } } }
  ]);

  const categoryStats = await Media.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 }
      }
    }
  ]);

  res.json({
    success: true,
    data: {
      totalMedia,
      totalSize: totalSize[0]?.total || 0,
      byType: stats,
      byCategory: categoryStats
    }
  });
});