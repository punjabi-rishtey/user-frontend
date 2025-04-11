import React, { useState } from "react";

const ForgotPasswordPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendResetLink = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://backend-nm1z.onrender.com/api/users/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setMessage("Reset link sent! Check your email.");
      } else {
        setMessage(data.message || "Failed to send reset link.");
      }
    } catch (error) {
      setMessage("Error sending reset link. Try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F5EDE7] p-8 rounded-lg shadow-2xl w-full max-w-md z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl mb-6 text-[#4F2F1D] font-semibold">
          Forgot Password?
        </h2>

        {message && <p className="text-green-600">{message}</p>}

        <label className="block text-[#6B4132] mb-2">Enter your email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-[#6B4132] rounded-lg"
          required
        />
        <button
          onClick={handleSendResetLink}
          className={`mt-4 bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <button
          onClick={onClose}
          className="mt-4 text-[#4A4A4A] hover:text-[#2D2D2D] hover:underline"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default ForgotPasswordPopup;
