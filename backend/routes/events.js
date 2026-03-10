import express from 'express';
import { requireAuth, requireLeader, verifyJWT } from '../middleware/auth.js';
import  upload  from "../middleware/upload.js";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  cancelEventRegistration,
  getUserEvents,
  markAttendance
} from '../controllers/eventController.js';
import {
  createEventSchema,
  updateEventSchema,
  eventRegistrationSchema,
  validateRequest
} from '../middleware/validation/index.js';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);

router.use(verifyJWT);

router.get('/user/registered', getUserEvents);
router.post('/register', validateRequest(eventRegistrationSchema), registerForEvent);
router.post('/cancel', validateRequest(eventRegistrationSchema), cancelEventRegistration);

router.post('/', requireLeader, validateRequest(createEventSchema), upload.single("image"), createEvent);
router.put('/:id', requireLeader, validateRequest(updateEventSchema), updateEvent);
router.delete('/:id', requireLeader, deleteEvent);
router.post('/attendance', requireLeader, markAttendance);

export default router;