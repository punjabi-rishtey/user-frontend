import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaGift, FaTimes, FaPercent } from "react-icons/fa";
import { AuthProvider } from "./context/AuthContext";
import HeroWithHeader from "./components/HeroWithHeader";
import WhyChooseUs from "./components/WhyChooseUs";
import HowItWorks from "./components/HowItWorks";
import SuccessStories from "./components/SuccessStories";
import Footer from "./components/Footer";
import FindPartner from "./components/FindPartner";
import Profile from "./components/Profile";
import ProfileDetail from "./components/ProfileDetail";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import AboutPage from "./components/AboutPage";
import ContactUs from "./components/ContactUs";
import Profilepage from "./components/Profilepage";
import Testimonials from "./components/Testimonials";
import MembershipPage from "./components/membershipPage";
import CustomerReviews from "./components/CustomerReviews";
import ResetPasswordPage from "./components/ResetPasswordPage";
import BlockingPage from "./components/BlockingPage";
import ProfileSettings from "./components/Profilepage";
import CurrentMembershipPage from "./components/CurrentMembershipPage"

// Promotional Message Component
const PromotionalMessage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const closePromo = (e) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-24 right-4 z-50"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <div 
            className="relative cursor-pointer group"
            onClick={toggleOpen}
          >
            {/* Icon Button */}
            <motion.div
              className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#990000] to-[#4F2F1D] text-white shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                rotate: isOpen ? 0 : [0, -10, 10, -10, 10, 0],
                scale: isOpen ? 1 : [1, 1.05, 1, 1.05, 1]
              }}
              transition={{
                rotate: {
                  repeat: isOpen ? 0 : Infinity,
                  repeatDelay: 2,
                  duration: 1
                },
                scale: {
                  repeat: isOpen ? 0 : Infinity,
                  repeatDelay: 2,
                  duration: 1
                }
              }}
            >
              <FaPercent size={24} />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
                50
              </span>
            </motion.div>

            {/* Close button */}
            {/* <button
              className="absolute -top-2 -right-2 bg-white/90 p-1 rounded-full shadow-md hover:bg-white text-gray-700 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={closePromo}
            >
              <FaTimes size={12} />
            </button> */}

            {/* Expanded Message */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="absolute top-0 right-20 w-64 p-4 rounded-lg bg-white shadow-xl border-l-4 border-[#990000]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h3 className="text-lg font-bold text-[#4F2F1D] mb-1">Limited Time Offer!</h3>
                  <p className="text-gray-700 mb-2">Get 50% off on Premium membership plans today!</p>
                  <a 
                    href="/membership" 
                    className="inline-block bg-gradient-to-r from-[#990000] to-[#4F2F1D] text-white py-2 px-4 rounded-md text-sm font-medium hover:from-[#800000] hover:to-[#3F1F0D] transition-all"
                  >
                    Claim Now
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <AuthProvider>
      <div className="App">
        {/* Conditional rendering of Promotional Message only on home page */}
        {isHomePage && <PromotionalMessage />}
        
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroWithHeader />
                <HowItWorks />
                <SuccessStories />
                <WhyChooseUs />
                <CustomerReviews />
                <Footer />
              </>
            }
          />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/current-plan" element={<CurrentMembershipPage />} />
          <Route path="/findpartner" element={<FindPartner />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<ProfileDetail />} />
          <Route path="/profilepage" element={<ProfileSettings />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/membership-expired" element={<BlockingPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;