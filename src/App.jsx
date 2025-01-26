import React from 'react';
import HeroWithHeader from './components/HeroWithHeader';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import SuccessStories from './components/SuccessStories';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <HeroWithHeader />
      <HowItWorks />
      <SuccessStories/>
      <WhyChooseUs />
      <Footer />
      {/* Other components */}
    </div>
  );
}

export default App;
