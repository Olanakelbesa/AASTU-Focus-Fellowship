import Donation from '../models/Donation.js';

export const processRecurringDonation = async (donationId) => {
  try {
    const donation = await Donation.findById(donationId);
    
    if (!donation || !donation.isRecurring) {
      return false;
    }

    await donation.processRecurringDonation();
    return true;
    
  } catch (error) {
    console.error('Recurring donation processing error:', error);
    return false;
  }
};

export const sendPaymentReceipt = async (donationId) => {
  try {
    const donation = await Donation.findById(donationId);
    
    if (!donation) {
      return false;
    }

    // Implement email sending logic here
    // You can use nodemailer or any email service
    
    donation.receiptSent = true;
    donation.receiptSentAt = new Date();
    await donation.save();
    
    return true;
    
  } catch (error) {
    console.error('Receipt sending error:', error);
    return false;
  }
};

export const updateCampaignTotals = async (donationId) => {
  try {
    const donation = await Donation.findById(donationId);
    
    if (!donation || !donation.campaign?.id) {
      return false;
    }

    // Implement campaign total update logic
    // Update campaign model with new donation amount
    
    return true;
    
  } catch (error) {
    console.error('Campaign update error:', error);
    return false;
  }
};