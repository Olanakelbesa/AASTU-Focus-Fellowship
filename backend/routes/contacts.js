import express from 'express';
import { requireAuth, requireLeader, verifyJWT } from '../middleware/auth.js';
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  addResponse,
  scheduleFollowUp,
  markAsResolved,
  archiveContact,
  deleteContact,
  bulkUpdateContacts,
  bulkDeleteContacts,
  getContactStats,
  getFollowUpTasks,
  markFollowUpCompleted
} from '../controllers/contactController.js';
import {
  createContactSchema,
  updateContactStatusSchema,
  addResponseSchema,
  scheduleFollowUpSchema,
  contactFilterSchema,
  bulkUpdateContactSchema,
  validateRequest
} from '../middleware/validation/index.js';

const router = express.Router();


router.post('/', validateRequest(createContactSchema), createContact);

router.use(verifyJWT);

router.get('/', contactFilterSchema ? validateRequest(contactFilterSchema) : (req, res, next) => next(), getAllContacts);

router.get('/:id', getContactById);

router.patch('/:id/status', requireLeader, validateRequest(updateContactStatusSchema), updateContactStatus);

router.post('/:id/response', requireLeader, validateRequest(addResponseSchema), addResponse);

router.post('/:id/follow-up', requireLeader, validateRequest(scheduleFollowUpSchema), scheduleFollowUp);

router.patch('/:id/resolve', requireLeader, markAsResolved);

router.patch('/:id/archive', requireLeader, archiveContact);

router.delete('/:id', requireAuth, deleteContact);

router.put('/bulk/update', requireLeader, validateRequest(bulkUpdateContactSchema), bulkUpdateContacts);
router.delete('/bulk/delete', requireAuth, bulkDeleteContacts);

router.get('/admin/stats', requireLeader, getContactStats);
router.get('/admin/follow-ups', requireLeader, getFollowUpTasks);
router.patch('/admin/follow-ups/:id/complete', requireLeader, markFollowUpCompleted);

export default router;