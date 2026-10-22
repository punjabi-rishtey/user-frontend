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
import Testimonials from "./components/Testimonials";
import MembershipPage from "./components/membershipPage";
import CustomerReviews from "./components/CustomerReviews";
import ResetPasswordPage from "./components/ResetPasswordPage";
import BlockingPage from "./components/BlockingPage";
import SessionLimitPage from "./components/SessionLimitPage";
import ProfileSettings from "./components/ProfileStudioPage";
import CurrentMembershipPage from "./components/CurrentMembershipPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import SafetyStandards from "./components/SafetyStandards";
import AtmosphereCardLab from "./components/lab/AtmosphereCardLab";
import IgHeritageCarousel from "./components/lab/IgHeritageCarousel";
import IgCounsellingPost from "./components/lab/IgCounsellingPost";
import IgConversionCarousel from "./components/lab/IgConversionCarousel";

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
          <Route path="/session-limit" element={<SessionLimitPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/membership-expired" element={<BlockingPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/safety-standards" element={<SafetyStandards />} />
          <Route path="/lab/atmosphere-card" element={<AtmosphereCardLab />} />
          <Route path="/lab/ig-heritage" element={<IgHeritageCarousel />} />
          <Route path="/lab/ig-counselling" element={<IgCounsellingPost />} />
          <Route path="/lab/ig-conversion" element={<IgConversionCarousel />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
