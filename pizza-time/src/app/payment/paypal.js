"use client"
// pages/api/paypal.js
import axios from 'axios';

export default async function handler(req, res) {
  const { orderId } = req.body;

  try {
    const response = await axios.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`, {}, {
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
