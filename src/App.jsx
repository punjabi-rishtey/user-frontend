import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HeroWithHeader from './components/HeroWithHeader';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import SuccessStories from './components/SuccessStories';
import Footer from './components/Footer';
import FindPartner from './components/FindPartner';
import Profile from './components/Profile';
import ProfileDetail from './components/ProfileDetail';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<>
            <HeroWithHeader />
            <HowItWorks />
            <SuccessStories />
            <WhyChooseUs />
            <Footer />
          </>} />
          <Route path="/findpartner" element={<FindPartner />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<ProfileDetail />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;