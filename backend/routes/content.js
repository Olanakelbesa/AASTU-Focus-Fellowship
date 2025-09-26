import express from 'express';
import { requireAuth, requireLeader, verifyJWT } from '../middleware/auth.js';
import {
  createContent,
  getAllContent,
  getContentById,
  getContentBySlug,
  updateContent,
  deleteContent,
  toggleContentLike,
  getUserContent,
  getFeaturedContent,
  getContentStats
} from '../controllers/contentController.js';
import {
  createContentSchema,
  updateContentSchema,
  contentLikeSchema,
  validateRequest
} from '../middleware/validation/index.js';

const router = express.Router();

// Public routes (no auth required)
router.get('/', getAllContent);
router.get('/featured', getFeaturedContent);
router.get('/slug/:slug', getContentBySlug);
router.get('/:id', getContentById);

// Protected routes (require auth)
router.use(verifyJWT);

// User content management
router.get('/user/content', getUserContent);
router.post('/:id/like', validateRequest(contentLikeSchema), toggleContentLike);

// Content management (admin/leader only)
router.post('/', requireLeader, validateRequest(createContentSchema), createContent);
router.put('/:id', validateRequest(updateContentSchema), updateContent);
router.delete('/:id', deleteContent);

// Admin only routes
router.get('/admin/stats', requireLeader, getContentStats);

export default router;