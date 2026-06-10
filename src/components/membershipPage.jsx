import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";
import { apiUrl } from "../config/constants";
import { authApi, isSessionExpiryError } from "../config/authClient";

const MembershipPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    screenshot: null,
    couponCode: "",
    membershipId: "",
    transactionId: "",
  });
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponSavings, setCouponSavings] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [success, setSuccess] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, refreshUser } = useAuth();

  const formatDuration = (duration) =>
    `${duration} month${Number(duration) === 1 ? "" : "s"}`;

  // Refresh user data when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      refreshUser();
    }
  }, [isAuthenticated, refreshUser]);

  // Improved authentication check - prevent premature redirects
  // useEffect(() => {
  //   // Only perform redirection after we've confirmed authentication status
  //   if (authChecked && !isAuthenticated) {
  //     navigate("/login", { replace: true });
  //   }
  // }, [authChecked, isAuthenticated, navigate]);

  // Check authentication properly with timeout for initialization
  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // If we have a token but auth context says not authenticated,
      // wait a moment for the auth context to catch up (it might still be initializing)
      if (!isAuthenticated) {
        const timeout = setTimeout(() => {
          console.log(
            "Auth context hasn't updated after delay, considering user not authenticated"
          );
          setAuthChecked(true);
        }, 1500); // Give the auth context 1.5 seconds to initialize

        return () => clearTimeout(timeout);
      } else {
        // We have a token and auth context says we're authenticated
        setAuthChecked(true);
      }
    } else {
      // No token exists, definitely not authenticated
      setAuthChecked(true);
    }
  }, [isAuthenticated]);

  // Debug authentication state
  // useEffect(() => {
  //   console.log("Auth state:", {
  //     isAuthenticated,
  //     hasToken: !!localStorage.getItem('token'),
  //     authChecked,
  //     user
  //   });
  // }, [isAuthenticated, authChecked, user]);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await fetch(apiUrl("/api/memberships/all"));
        if (!response.ok) throw new Error("Failed to fetch membership plans");

        const data = await response.json();
        setPlans(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberships();
  }, []);

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handlePlanClick = (plan) => {
    // Check authentication before opening modal
    if (!isAuthenticated) {
      setError("You must be logged in to subscribe to a plan");
      navigate("/login");
      return;
    }

    setSelectedPlan(plan);
    setShowModal(true);
    // console.log(">>>> plan selected: (membershipId): ", plan._id)
    // Reset form and coupon state when opening modal
    setFormData({
      name: "",
      phone: "",
      screenshot: null,
      couponCode: "",
      membershipId: plan._id,
      transactionId: "",
    });
    setPreviewUrl(null);
    setCouponApplied(false);
    setCouponSavings(0);
    setCouponMessage("");
    setFinalPrice(plan.price);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [qr, setQr] = useState(null);
  const fetchQR = async () => {
    try {
      const res = await fetch(apiUrl("/api/admin/auth/qr"));
      const data = await res.json();
      console.log(data);
      setQr(data);
    } catch (err) {
      console.error("Failed to fetch QR:", err);
    }
  };

  useEffect(() => {
    fetchQR();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image of your payment screenshot.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Payment screenshot must be smaller than 5MB.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        screenshot: file,
      }));

      // Create preview URL for the image
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setError(null);
    }
  };

  // Handle coupon code application
  const handleApplyCoupon = async () => {
    if (!formData.couponCode.trim()) {
      setCouponMessage("");
      setError("Please enter a coupon code.");
      return;
    }

    try {
      setError(null);
      setCouponMessage("");
      // Call API to validate coupon
      const response = await authApi.post(
        apiUrl("/api/coupons/validate"),
        { code: formData.couponCode },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Process response
      if (response.data && response.data.discountValue) {
        // Get discount information from response
        const discount = response.data.discountValue;
        const discountType = response.data.discountType;

        // Calculate new price based on discount type
        let newPrice = selectedPlan.price;
        let savings = 0;
        if (discountType === "percentage") {
          savings = (selectedPlan.price * discount) / 100;
          newPrice = selectedPlan.price - savings;
        } else if (discountType === "flat") {
          savings = discount;
          newPrice = selectedPlan.price - savings;
        }

        // Make sure price doesn't go below zero
        newPrice = Math.max(0, newPrice);
        savings = Math.min(selectedPlan.price, Math.max(0, savings));

        // Update state
        setCouponApplied(true);
        setCouponSavings(savings);
        setFinalPrice(Math.round(newPrice));
        setCouponMessage("Coupon applied.");
        setError(null);
      } else {
        throw new Error(response.data?.message || "Coupon not valid.");
      }
    } catch (err) {
      if (isSessionExpiryError(err)) {
        return;
      }

      console.error("Coupon application error:", err);
      setCouponMessage("");
      setError(
        err.response?.data?.message || err.message || "Coupon not valid."
      );
      setCouponApplied(false);
      setCouponSavings(0);
      setFinalPrice(selectedPlan.price);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // First check if user is authenticated
    if (!isAuthenticated) {
      setError("You must be logged in to subscribe to a plan");
      return;
    }

    if (!formData.membershipId || !selectedPlan) {
      setError("Please select a membership plan.");
      return;
    }

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    const phone = formData.phone.trim();
    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!formData.screenshot) {
      setError("Please upload your payment screenshot.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create form data for submission with only the required fields
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("fullName", formData.name.trim());
      formDataToSubmit.append("phoneNumber", phone);
      formDataToSubmit.append("image", formData.screenshot);
      formDataToSubmit.append("membershipId", formData.membershipId);

      // Include coupon code and discount information if applied
      if (couponApplied && formData.couponCode) {
        formDataToSubmit.append(
          "couponCode",
          formData.couponCode.trim().toUpperCase()
        );
      }

      const response = await authApi.post(
        apiUrl("/api/users/subscribe"),
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.success) {
        setSuccess(true);
        closeModal();

        // Refresh user data to update subscription status
        if (refreshUser) {
          await refreshUser();
        }
      } else {
        throw new Error(response.data?.message || "Payment submission failed");
      }
    } catch (err) {
      if (isSessionExpiryError(err)) {
        return;
      }

      console.error("Payment submission error:", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Failed to submit payment request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Don't render anything substantial until we've checked authentication
  if (!authChecked) {
    return (
      <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-[#4F2F1D] text-xl">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  // If not authenticated, show a message
  // if (authChecked && !isAuthenticated) {
  //   return (
  //     <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
  //       <Header />
  //       <div className="flex-grow flex items-center justify-center">
  //         <div className="bg-[#F5EDE7] p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
  //           <h2
  //             className="text-2xl mb-4 text-[#4F2F1D] text-center"
  //             style={{
  //               fontFamily: "'Tiempos Headline', serif",
  //               fontWeight: 400,
  //             }}
  //           >
  //             Authentication Required
  //           </h2>
  //           <p
  //             className="text-[#6B4132] mb-6 text-center"
  //             style={{
  //               fontFamily: "'Modern Era', sans-serif",
  //               fontWeight: 400,
  //             }}
  //           >
  //             Please log in to access membership plans.
  //           </p>
  //           <div className="flex justify-center">
  //             <button
  //               onClick={() => navigate("/login")}
  //               className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-6 rounded-lg transition duration-300"
  //               style={{
  //                 fontFamily: "'Modern Era', sans-serif",
  //                 fontWeight: 400,
  //               }}
  //             >
  //               Log In
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //       <Footer />
  //     </div>
  //   );
  // }

  // If payment was successful, show success message
  if (success) {
    return (
      <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-[#F5EDE7] p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h2
              className="text-2xl mb-4 text-[#4F2F1D] text-center"
              style={{
                fontFamily: "'Tiempos Headline', serif",
                fontWeight: 400,
              }}
            >
              Payment Request Submitted
            </h2>
            <p
              className="text-[#6B4132] mb-6 text-center"
              style={{
                fontFamily: "'Modern Era', sans-serif",
                fontWeight: 400,
              }}
            >
              Your payment request has been submitted. Our team will verify the
              screenshot and activate your membership shortly.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setSuccess(false);
                  navigate("/");
                }}
                className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                style={{
                  fontFamily: "'Modern Era', sans-serif",
                  fontWeight: 400,
                }}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#FCF9F2] min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-16 px-6">
        <h2
          className="text-5xl text-center mb-12 text-[#4F2F1D]"
          style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
        >
          Choose Your Perfect Plan
        </h2>

        {error && (
          <div className="mb-8 max-w-3xl mx-auto bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center text-[#4F2F1D] text-xl">
            Loading membership plans...
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative w-full md:w-[380px] p-8 rounded-lg shadow-lg hover:ring-2 hover:ring-[#4F2F1D] bg-[#F5EDE7] cursor-pointer"
                onClick={() => handlePlanClick(plan)}
              >
                {plan.mostPopular && (
                  <div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#4F2F1D] text-[#E5D3C8] px-4 py-1 rounded-full z-10"
                    style={{
                      fontFamily: "'Modern Era', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <h3
                  className="text-2xl mb-4 text-[#4F2F1D]"
                  style={{
                    fontFamily: "'Tiempos Headline', serif",
                    fontWeight: 400,
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-3xl mb-2 text-[#4F2F1D]"
                  style={{
                    fontFamily: "'Tiempos Headline', serif",
                    fontWeight: 400,
                  }}
                >
                  ₹{plan.price}
                  <span
                    className="text-[#6B4132] text-lg ml-1"
                    style={{
                      fontFamily: "'Modern Era', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    for {formatDuration(plan.duration)}
                  </span>
                </p>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-[#6B4132]"
                      style={{
                        fontFamily: "'Modern Era', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {feature.available ? (
                        <span className="text-[#4F2F1D] mr-2">✓</span>
                      ) : (
                        <span className="text-[#8B7355] mr-2">✕</span>
                      )}
                      {feature.feature}
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-3 text-[#E5D3C8] bg-[#4F2F1D] rounded-md hover:bg-[#6B4132] transition-colors"
                  style={{
                    fontFamily: "'Modern Era', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  Select Plan
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Payment Modal */}
      <AnimatePresence>
        {showModal && selectedPlan && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 overflow-y-auto"
              variants={backgroundVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeModal}
            >
              <motion.div
                className="bg-white rounded-lg p-6 w-full max-w-3xl my-8 z-50"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3
                    className="text-xl text-[#4F2F1D]"
                    style={{
                      fontFamily: "'Tiempos Headline', serif",
                      fontWeight: 400,
                    }}
                  >
                    Complete Your {selectedPlan.name} Subscription
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-[#6B4132] hover:text-[#4F2F1D] text-2xl"
                  >
                    ×
                  </button>
                </div>

                {error && (
                  <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded">
                    {error}
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-6">
                  {/* QR Code Section */}
                  <div className="flex-1 bg-[#F9F3EE] p-6 rounded-lg">
                    <h4
                      className="text-lg mb-4 text-center text-[#4F2F1D]"
                      style={{
                        fontFamily: "'Tiempos Headline', serif",
                        fontWeight: 400,
                      }}
                    >
                      Scan to Pay ₹
                      {couponApplied ? finalPrice : selectedPlan.price}
                      {couponApplied && (
                        <span className="block mt-1 text-sm text-green-600">
                          Coupon applied. You save ₹{couponSavings.toFixed(2)}
                        </span>
                      )}
                    </h4>

                    <div className="flex justify-center mb-4">
                      {/* QR code container with white background */}
                      <div className="w-48 h-48 bg-white p-4 rounded-lg flex items-center justify-center">
                        {!qr && (
                          <div className="w-full h-full bg-[#F1F1F1] flex items-center justify-center">
                            <span className="text-gray-500">QR Code</span>
                          </div>
                        )}
                        {qr && (
                          <div className="mb-6 text-center w-full h-full bg-[#F1F1F1] flex items-center justify-center">
                            <img
                              src={qr?.imageUrl}
                              alt="QR Code"
                              className="w-48 h-48 object-contain mx-auto"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className="text-center text-[#6B4132]"
                      style={{
                        fontFamily: "'Modern Era', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      <p className="mb-1 text-sm">
                        UPI ID: {qr?.name || "yourcompany@upi"}
                      </p>
                      <p className="text-sm">
                        Pay the exact amount shown above, then upload the
                        payment screenshot.
                      </p>
                    </div>
                  </div>

                  {/* Form Section */}
                  <div className="flex-1">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-[#4F2F1D]"
                          style={{
                            fontFamily: "'Modern Era', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#4F2F1D]"
                          style={{ fontFamily: "'Modern Era', sans-serif" }}
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-[#4F2F1D]"
                          style={{
                            fontFamily: "'Modern Era', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#4F2F1D]"
                          style={{ fontFamily: "'Modern Era', sans-serif" }}
                          placeholder="Enter your phone number"
                          maxLength={10}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="couponCode"
                          className="block mb-2 text-[#4F2F1D]"
                          style={{
                            fontFamily: "'Modern Era', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          Coupon Code
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            id="couponCode"
                            name="couponCode"
                            value={formData.couponCode}
                            onChange={handleInputChange}
                            disabled={couponApplied}
                            className={`flex-1 p-3 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#4F2F1D] ${
                              couponApplied ? "bg-gray-100" : ""
                            }`}
                            style={{ fontFamily: "'Modern Era', sans-serif" }}
                            placeholder="Enter coupon code (if available)"
                          />
                          <button
                            type="button"
                            onClick={
                                  couponApplied
                                ? () => {
                                    setCouponApplied(false);
                                    setCouponSavings(0);
                                    setFinalPrice(selectedPlan.price);
                                    setCouponMessage("");
                                    setFormData((prev) => ({
                                      ...prev,
                                      couponCode: "",
                                    }));
                                  }
                                : handleApplyCoupon
                            }
                            className={`px-4 py-2 rounded-md transition-colors ${
                              couponApplied
                                ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                : "bg-[#4F2F1D] hover:bg-[#6B4132] text-white"
                            }`}
                            style={{
                              fontFamily: "'Modern Era', sans-serif",
                              fontWeight: 500,
                            }}
                          >
                            {couponApplied ? "Remove" : "Apply"}
                          </button>
                        </div>
                        {couponApplied && (
                          <p className="mt-2 text-sm text-green-600">
                            {couponMessage} You save ₹
                            {couponSavings.toFixed(2)}.
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="screenshot"
                          className="block mb-2 text-[#4F2F1D]"
                          style={{
                            fontFamily: "'Modern Era', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          Payment Screenshot *
                        </label>
                        <p className="mb-2 text-sm text-[#6B4132]">
                          Upload a clear screenshot that shows the paid amount,
                          date, and UPI transaction details.
                        </p>

                        <div
                          onClick={() => fileInputRef.current.click()}
                          className="w-full p-3 border border-dashed border-[#C9C9C9] rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-[#4F2F1D] transition-colors"
                        >
                          {previewUrl ? (
                            <img
                              src={previewUrl}
                              alt="Payment screenshot preview"
                              className="max-h-40 object-contain mb-2"
                            />
                          ) : (
                            <div className="flex text-center py-6">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="#6B4132"
                                viewBox="0 0 24 24"
                              >
                                <path d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5z"></path>
                                <path d="m8 11-3 4h11l-4-6-3 4z"></path>
                                <path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
                              </svg>
                              <p
                                className="mt-2 text-sm text-[#6B4132]"
                                style={{
                                  fontFamily: "'Modern Era', sans-serif",
                                }}
                              >
                                Click to upload payment screenshot
                              </p>
                            </div>
                          )}

                          <input
                            type="file"
                            id="screenshot"
                            name="screenshot"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="transactionId"
                          className="block mb-2 text-[#4F2F1D]"
                          style={{
                            fontFamily: "'Modern Era', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          UPI Transaction ID
                        </label>
                        <input
                          type="text"
                          id="transactionId"
                          name="transactionId"
                          value={formData.transactionId}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#4F2F1D]"
                          style={{ fontFamily: "'Modern Era', sans-serif" }}
                          placeholder="Optional"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 mt-2 text-white ${
                          isSubmitting
                            ? "bg-[#8B7355]"
                            : "bg-[#53392A] hover:bg-[#6B4132]"
                        } rounded-md transition-colors`}
                        style={{
                          fontFamily: "'Modern Era', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {isSubmitting
                          ? "Submitting..."
                          : "Submit Payment Details"}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default MembershipPage;
