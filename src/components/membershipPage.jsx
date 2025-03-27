import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

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
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await fetch("https://backend-nm1z.onrender.com/api/memberships/all");
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
    setSelectedPlan(plan);
    setShowModal(true);
    // Reset form when opening modal
    setFormData({
      name: "",
      phone: "",
      screenshot: null
    });
    setPreviewUrl(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        screenshot: file
      }));
      
      // Create preview URL for the image
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.screenshot) {
      alert("Please fill all required fields");
      return;
    }
    
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("planId", selectedPlan._id);
      data.append("paymentScreenshot", formData.screenshot);
      
      // For demonstration - replace with your actual API endpoint
      // const response = await fetch("https://backend-nm1z.onrender.com/api/payments/submit", {
      //   method: "POST",
      //   body: data
      // });
      
      // if (!response.ok) throw new Error("Failed to submit payment");
      
      // For demo purposes just show success
      alert("Payment details submitted successfully! We'll verify and confirm your membership.");
      setShowModal(false);
    } catch (err) {
      alert(`Error submitting payment: ${err.message}`);
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
    exit: { opacity: 0, scale: 0.9 }
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

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

        {loading ? (
          <p className="text-center text-[#4F2F1D] text-xl">Loading membership plans...</p>
        ) : error ? (
          <p className="text-center text-red-600 text-xl">Error: {error}</p>
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
                    style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                  >
                    Most Popular
                  </div>
                )}

                <h3 
                  className="text-2xl mb-4 text-[#4F2F1D]"
                  style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
                >
                  {plan.name}
                </h3>
                <p 
                  className="text-3xl mb-2 text-[#4F2F1D]"
                  style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
                >
                  ₹{plan.price}
                  <span 
                    className="text-[#6B4132] text-lg ml-1"
                    style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                  >
                    /month
                  </span>
                </p>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li 
                      key={i} 
                      className="flex items-center text-[#6B4132]"
                      style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
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
                  style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 500 }}
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
              className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center"
              variants={backgroundVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeModal}
            >
              <motion.div 
                className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 z-50"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 
                    className="text-xl text-[#4F2F1D]"
                    style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
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

                <div className="flex flex-col md:flex-row gap-6">
                  {/* QR Code Section */}
                  <div className="flex-1 bg-[#F9F3EE] p-6 rounded-lg">
                    <h4 
                      className="text-lg mb-4 text-center text-[#4F2F1D]"
                      style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
                    >
                      Scan to Pay ₹{selectedPlan.price}
                    </h4>
                    
                    <div className="flex justify-center mb-4">
                      {/* QR code container with white background */}
                      <div className="w-48 h-48 bg-white p-4 rounded-lg flex items-center justify-center">
                        <div className="w-full h-full bg-[#F1F1F1] flex items-center justify-center">
                          <span className="text-gray-500">QR Code</span>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className="text-center text-[#6B4132]"
                      style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                    >
                      <p className="mb-1 text-sm">UPI ID: yourcompany@upi</p>
                      <p className="text-sm">After payment, please fill the form →</p>
                    </div>
                  </div>

                  {/* Form Section */}
                  <div className="flex-1">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label 
                          htmlFor="name" 
                          className="block mb-2 text-[#4F2F1D]"
                          style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 500 }}
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
                        />
                      </div>
                      
                      <div>
                        <label 
                          htmlFor="phone" 
                          className="block mb-2 text-[#4F2F1D]"
                          style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 500 }}
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
                        />
                      </div>
                      
                      <div>
                        <label 
                          htmlFor="screenshot" 
                          className="block mb-2 text-[#4F2F1D]"
                          style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 500 }}
                        >
                          Payment Screenshot *
                        </label>
                        
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
                            <div className="text-center py-6">
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#6B4132" viewBox="0 0 24 24">
                                <path d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5z"></path>
                                <path d="m8 11-3 4h11l-4-6-3 4z"></path>
                                <path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
                              </svg>
                              <p 
                                className="mt-2 text-sm text-[#6B4132]"
                                style={{ fontFamily: "'Modern Era', sans-serif" }}
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
                      
                      <button 
                        type="submit"
                        className="w-full py-3 mt-6 text-white bg-[#53392A] rounded-md hover:bg-[#6B4132] transition-colors"
                        style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 500 }}
                      >
                        Submit Payment Details
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