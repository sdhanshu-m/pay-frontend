import { useState, useEffect } from "react";
import API from "../api/axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState<any[]>([]);

const loadHistory = async () => {
  try {
    const res = await API.get("/payment/history");
    setHistory(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.log("History error", err);
    setHistory([]);
  }
};

  useEffect(() => {
  if (!localStorage.getItem("token")) return;
  loadHistory();
}, []);

  const handlePayment = async () => {
    try {
      setError("");

      const { data } = await API.post("/payment/create-order", {
        amount: Number(amount),
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,

        handler: async function (response: any) {
          await API.post("/payment/verify-payment", response);
          loadHistory();
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg mb-2">Make Payment</h2>

      <input
        className="border p-2 mr-2"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handlePayment} className="bg-blue-500 text-white p-2">
        Pay
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <h3 className="mt-6">History</h3>

      {history.map((p) => (
        <div key={p.id} className="border p-2 mt-2">
          <p>Amount: ₹{p.amount}</p>
          <p>Status: {p.status}</p>
        </div>
      ))}
    </div>
  );
}