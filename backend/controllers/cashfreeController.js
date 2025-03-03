const axios = require("axios");
require("dotenv").config();

const CASHFREE_URL = "https://api.cashfree.com/pg"; // Use production URL when going live

// @desc    Create Payment Order
// @route   POST /api/payment/create-order
const createOrder = async (req, res) => {
  try {
    const { amount, currency, customer_email, customer_phone } = req.body;

    const headers = {
      "Content-Type": "application/json",
      "x-client-id": process.env.CASHFREE_APP_ID,
      "x-client-secret": process.env.CASHFREE_SECRET_KEY,
      "x-api-version": "2022-09-01",
    };

    const orderData = {
      order_id: `order_${Math.floor(Math.random() * 1000000)}`,
      order_amount: amount,
      order_currency: currency,
      customer_details: {
        customer_email,
        customer_phone,
      },
      order_meta: {
        return_url: `http://localhost:5173/payment-success?order_id={order_id}`,
      },
    };

    const { data } = await axios.post(CASHFREE_URL, orderData, { headers });

    res.json(data);
  } catch (error) {
    console.error("Cashfree Payment Error:", error);
    res.status(500).json({ message: "Payment failed", error });
  }
};

module.exports = { createOrder };
