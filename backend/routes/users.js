import express from 'express';
import { requireAuth, verifyJWT, requireAdmin } from '../middleware/auth.js';
import { changePassword, deactivateUser, deleteUser, getAllUsers, getProfile, getUserById, updateProfile, updateUser } from '../controllers/userController.js';
import { changePasswordSchema, updateUserSchema, adminUpdateUserSchema, validateRequest } from '../middleware/validation/index.js';

const router = express.Router();

router.use(verifyJWT);

// user profile routes
router.get('/profile', requireAuth, getProfile);
router.put('/profile', requireAuth, validateRequest(updateUserSchema), updateProfile);
router.put('/change-password', requireAuth, validateRequest(changePasswordSchema), changePassword);

// Admin routes
router.get('/', requireAuth, getAllUsers);
router.get('/:id', requireAuth, getUserById);
router.put('/:id', requireAdmin, validateRequest(adminUpdateUserSchema), updateUser);
router.delete('/:id', requireAdmin, deleteUser);
router.patch('/:id/deactivate', requireAdmin, deactivateUser);

export default router;