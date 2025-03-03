import { useState } from "react";
import axios from "axios";

const CashfreePayment = () => {
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount,
        currency: "INR",
        customer_email: "harshit@example.com",
        customer_phone: "9999999999",
      });

      if (data && data.payment_link) {
        window.location.href = data.payment_link;
      } else {
        console.error("Payment initiation failed:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Cashfree Payment</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mb-4"
      />
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
    </div>
  );
};

export default CashfreePayment;
