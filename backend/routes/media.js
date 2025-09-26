import express from 'express';
import { requireAuth, requireLeader, verifyJWT } from '../middleware/auth.js';
import {
  uploadMedia,
  uploadMultipleMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
  bulkUpdateMedia,
  bulkDeleteMedia,
  getMediaStats
} from '../controllers/mediaController.js';
import {
  uploadSingle,
  uploadMultiple,
  uploadImage,
  uploadDocument
} from '../config/multer.js';
import {
  uploadMediaSchema,
  updateMediaSchema,
  mediaFilterSchema,
  mediaBulkUpdateSchema,
  validateRequest
} from '../middleware/validation/index.js';

const router = express.Router();

// Public routes (no auth required)
router.get('/', getAllMedia);
router.get('/:id', getMediaById);

// Protected routes (require auth)
router.use(verifyJWT);

// Upload routes
router.post('/upload', uploadSingle, validateRequest(uploadMediaSchema), uploadMedia);
router.post('/upload/multiple', uploadMultiple, validateRequest(mediaFilterSchema), uploadMultipleMedia);
router.post('/upload/image', uploadImage, validateRequest(uploadMediaSchema), uploadMedia);
router.post('/upload/document', uploadDocument, validateRequest(uploadMediaSchema), uploadMedia);

// Media management (admin/leader only)
router.put('/:id', requireLeader, validateRequest(updateMediaSchema), updateMedia);
router.delete('/:id', requireLeader, deleteMedia);

// Bulk operations (admin/leader only)
router.put('/bulk/update', requireLeader, validateRequest(mediaBulkUpdateSchema), bulkUpdateMedia);
router.delete('/bulk/delete', requireLeader, bulkDeleteMedia);

// Admin only routes
router.get('/admin/stats', requireLeader, getMediaStats);

export default router;