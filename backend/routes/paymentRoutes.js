import express from 'express';
import { 
  initializePayment, 
  verifyPayment, 
  getPaymentStatus 
} from '../controllers/paymentController.js';
import { 
  handleChapaWebhook, 
  testWebhook 
} from '../controllers/webhookController.js';

const router = express.Router();

// Payment routes
router.post('/initialize', initializePayment);
router.get('/verify/:transactionId', verifyPayment);
router.get('/status/:donationId', getPaymentStatus);

// Webhook routes
router.post('/webhooks/chapa', handleChapaWebhook);
router.post('/webhooks/test/:donationId', testWebhook); // For testing

export default router;