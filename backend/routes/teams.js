import express from 'express';
import { requireAuth, requireLeader, verifyJWT } from '../middleware/auth.js';
import {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  addMember,
  removeMember,
  updateMemberRole,
  getUserTeams,
  joinTeam,
  leaveTeam
} from '../controllers/teamController.js';
import {
  createTeamSchema,
  updateTeamSchema,
  addMemberSchema,
  updateMemberRoleSchema,
  teamFilterSchema
} from '../middleware/validation/teamValidation.js';
import { validateRequest } from '../middleware/validation.js';

const router = express.Router();

// Public routes (no auth required)
router.get('/', getAllTeams);
router.get('/:id', getTeamById);

// Protected routes (require auth)
router.use(verifyJWT);

// User team management
router.get('/user/teams', getUserTeams);
router.post('/:id/join', joinTeam);
router.post('/:id/leave', leaveTeam);

// Team management (admin/leader only)
router.post('/', requireLeader, validateRequest(createTeamSchema), createTeam);
router.put('/:id', requireLeader, validateRequest(updateTeamSchema), updateTeam);
router.delete('/:id', requireLeader, deleteTeam);

// Member management (team leader or admin only)
router.post('/:id/members', requireLeader, validateRequest(addMemberSchema), addMember);
router.delete('/:id/members', requireLeader, validateRequest(addMemberSchema), removeMember);
router.put('/:id/members/role', requireLeader, validateRequest(updateMemberRoleSchema), updateMemberRole);

export default router;