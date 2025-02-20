import React from "react";
import { Routes, Route } from "react-router-dom";
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
import MembershipPage from "./components/membershipPage"; // Add this import

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroWithHeader />
                <HowItWorks />
                <SuccessStories />
                <WhyChooseUs />
                <Footer />
              </>
            }
          />
          {/* ... existing routes ... */}
          <Route path="/membership" element={<MembershipPage />} /> {/* Add this route */}
          <Route path="/findpartner" element={<FindPartner />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<ProfileDetail />} />
          <Route path="/profilepage" element={<Profilepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;