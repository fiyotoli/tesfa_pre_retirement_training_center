// routes/newsletterRoute.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const data = {
    email_address: email,
    status: 'subscribed', // or 'pending' for double opt-in
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `apikey ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return res.json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    const errData = error.response?.data;

    if (errData?.title === 'Member Exists') {
      return res.json({ success: true, message: 'You are already subscribed!' });
    }

    console.error('Mailchimp error:', errData || error.message);

    return res.status(500).json({
      success: false,
      message: errData?.detail || 'Subscription failed. Please try again later.',
    });
  }
});

export default router;
