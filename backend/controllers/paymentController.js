import Donation from '../models/Donation.js';
import chapaService from '../services/chapaService.js';

export const initializePayment = async (req, res) => {
  try {
    const { donor, amount, currency, purpose, category, notes } = req.body;

    // Validate required fields
    if (!donor?.name || !donor?.email || !amount || !purpose || !category) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate amount
    if (amount < 0.01) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be at least 0.01'
      });
    }

    // Create donation record
    const donation = new Donation({
      donor,
      amount,
      currency: currency || 'ETB',
      purpose,
      category,
      notes,
      paymentMethod: 'online_payment',
      paymentStatus: 'pending',
      createdBy: req.user?.id // If you have user authentication
    });

    await donation.save();

    // Initialize Chapa payment
    const paymentResult = await chapaService.initializePayment(donation);

    res.json({
      success: true,
      message: 'Payment initialized successfully',
      data: {
        donationId: donation._id,
        checkoutUrl: paymentResult.checkoutUrl,
        transactionRef: paymentResult.transactionRef
      }
    });

  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment initialization failed',
      error: error.message
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const verification = await chapaService.verifyPayment(transactionId);

    res.json({
      success: true,
      data: verification.data
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed'
    });
  }
};

export const getPaymentStatus = async (req, res) => {
  try {
    const { donationId } = req.params;

    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    res.json({
      success: true,
      data: {
        donationId: donation._id,
        paymentStatus: donation.paymentStatus,
        transactionId: donation.transactionId,
        amount: donation.amount,
        currency: donation.currency
      }
    });

  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get payment status'
    });
  }
};