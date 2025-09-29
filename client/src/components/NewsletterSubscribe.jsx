import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/newsletter/subscribe`, { email });
      if (res.data.success) {
        toast.success(res.data.message || "Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Subscription failed");
      }
    } catch (err) {
  const message = err.response?.data?.message || "Subscription failed. Try again.";
  toast.error(message);
}

    setLoading(false);
  };

  return (
    <div className="container my-5">
      <div className="bg-light p-5 rounded shadow-sm text-center">
        <h4 className="fw-bold mb-3 text-primary-custom">የቅርብ ጊዜ ዜናዎችን ለማግኘት</h4>
        <p className="text-muted mb-4">አዳዲስ ዜናዎችን ከተስፋ የቅድመ ጡረታ ሥልጠና ማዕከል ቀጥታ ወደ ኢሜይልዎ ያግኙ።</p>

        <form
          onSubmit={handleSubscribe}
          className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3"
        >
          <input
            type="email"
            className="form-control form-control-lg w-100 w-sm-50"
            placeholder="ኢሜልዎን ያስገቡ"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ maxWidth: "400px" }}
          />

          <button
            type="submit"
            className="btn bg-primary-custom btn-lg text-white"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSubscribe;
