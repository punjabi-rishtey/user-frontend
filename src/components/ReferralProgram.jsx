import React, { useState } from "react";
import { motion } from "framer-motion";

const ReferralProgram = () => {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Example referral code - in a real app, this would come from the user's profile
  const referralCode = "FRIEND25";
  const referralLink = `https://yourwebsite.com/signup?ref=${referralCode}`;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    
    // Reset the copied state after 3 seconds
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send the email to your backend
    console.log(`Sending referral to: ${email}`);
    setSubmitted(true);
    setEmail("");
    
    // Reset the submitted state after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-16 px-6 bg-[#F5EDE7]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#FCF9F2] rounded-lg shadow-lg overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            {/* Left section - Information */}
            <div className="p-8 md:p-12 md:w-7/12">
              <h3 
                className="text-3xl mb-4 text-[#4F2F1D]"
                style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
              >
                Refer Friends & Earn Rewards
              </h3>
              
              <p 
                className="text-[#6B4132] mb-6"
                style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
              >
                Share your love for our services with friends and family. For each friend who signs up with your referral code, you'll both get ₹500 off your next month's subscription.
              </p>
              
              <div className="mb-8">
                <div 
                  className="text-sm text-[#6B4132] mb-2"
                  style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 500 }}
                >
                  Your Referral Code:
                </div>
                <div className="flex">
                  <div 
                    className="bg-white border border-[#E5D3C8] rounded-l-md p-3 flex-grow"
                    style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 600 }}
                  >
                    {referralCode}
                  </div>
                  <button 
                    onClick={handleCopyLink}
                    className={`px-4 rounded-r-md transition-colors ${copied ? 'bg-[#4F2F1D] text-white' : 'bg-[#E5D3C8] text-[#4F2F1D] hover:bg-[#D9C3B4]'}`}
                    style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 500 }}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              
              <div>
                <h4 
                  className="text-lg mb-4 text-[#4F2F1D]"
                  style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
                >
                  Invite via Email
                </h4>
                
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="friend@example.com"
                    required
                    className="flex-grow p-3 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#4F2F1D]"
                    style={{ fontFamily: "'Modern Era', sans-serif" }}
                  />
                  <button 
                    type="submit"
                    className="py-3 px-6 bg-[#4F2F1D] text-white rounded-md hover:bg-[#6B4132] transition-colors"
                    style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 500 }}
                  >
                    {submitted ? 'Sent!' : 'Send Invite'}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Right section - Benefits */}
            <div className="bg-[#53392A] text-white p-8 md:p-12 md:w-5/12">
              <h4 
                className="text-2xl mb-6"
                style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
              >
                How It Works
              </h4>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-3 bg-[#E5D3C8] text-[#4F2F1D] w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    1
                  </div>
                  <div style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}>
                    Share your unique referral code with friends
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="mr-3 bg-[#E5D3C8] text-[#4F2F1D] w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    2
                  </div>
                  <div style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}>
                    They sign up using your code during registration
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="mr-3 bg-[#E5D3C8] text-[#4F2F1D] w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    3
                  </div>
                  <div style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}>
                    They get ₹500 off their first month
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="mr-3 bg-[#E5D3C8] text-[#4F2F1D] w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    4
                  </div>
                  <div style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}>
                    You get ₹500 off your next bill for each successful referral
                  </div>
                </li>
              </ul>
              
              <div 
                className="mt-8 p-4 bg-[#6B4132] rounded-md"
                style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
              >
                <div className="text-[#E5D3C8] text-sm mb-1">No Limit!</div>
                <div className="text-white">Refer as many friends as you want and keep earning rewards.</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReferralProgram;