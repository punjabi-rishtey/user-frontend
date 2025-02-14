import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const features = [
  {
    icon: "🏅",
    title: "Genuine profiles",
    description: "The most trusted wedding matrimony brand",
  },
  {
    icon: "🤝",
    title: "Most trusted",
    description: "The most trusted wedding matrimony brand",
  },
  {
    icon: "💍",
    title: "22+ Years of experience",
    description: "The most trusted wedding matrimony brand",
  },
];

const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const navigate = useNavigate();

  const handleFindPartnerClick = () => {
    navigate("/findpartner");
  };

  return (
    <div className="bg-[#F0ECE3] min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Header Section */}
        <motion.header
          className="text-center py-8" // Reduced padding
          style={{ y: headerY }}
        >
          <h1 className="text-5xl font-bold text-[#6B4226] mt-2">About us</h1>
          <p className="text-lg mt-2 text-[#5A3E29]">
            Most Trusted and Premium Matrimony Service.
          </p>

          {/* Features Section */}
          <section className="bg-[#F0ECE3] flex justify-center gap-6 mt-6 flex-wrap py-8">
            {" "}
            {/* Reduced margin and padding */}
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white shadow-lg p-6 rounded-lg text-center w-80"
              >
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="text-lg font-bold mt-3 text-[#4F2F1D]">
                  {feature.title}
                </h3>
                <p className="text-[#5A3E29] mt-1">{feature.description}</p>
              </div>
            ))}
          </section>
        </motion.header>
        <motion.header>
          {/* Welcome Section */}
          <section className="bg-[#F0ECE3] py-12 px-6 md:px-20 relative">
            {" "}
            {/* Reduced padding */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
              {/* Left Side - Image */}
              <div className="relative w-full md:w-1/2">
                <img
                  src="src\assets\4.jpg"
                  alt="Wedding Couple"
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </div>

              {/* Right Side - Text */}
              <div className="w-full md:w-1/2 md:pl-16 text-center md:text-left">
                <h2 className="text-4xl font-serif font-bold text-[#6b3e1f]">
                  WELCOME TO <br />
                  <span className="text-[#d72664]">
                    PUNJABI RISHTEY WEDDING MATRIMONY
                  </span>
                </h2>
                <p className="text-gray-700 mt-4">
                  Marriage is a lifetime promise, a beautiful blend of two
                  lives, two loves, and two hearts. It is a wonderful, mystical
                  moment when a beautiful love story starts.
                </p>
                <p className="mt-2">
                  <button
                    onClick={handleFindPartnerClick}
                    className="text-[#d72664] font-semibold"
                  >
                    Click here
                  </button>{" "}
                  to start your matrimony service now.
                </p>
                <hr className="border-t border-gray-300 my-4" />
                <p className="text-gray-600">
                  Shri Balraj Sablok established "Punjabi Marriage Forum (Now
                  Punjabi-Rishtey, our digital platform)" in 2000 and has been
                  running successfully for 22 years.
                </p>

                {/* Contact Info */}
                <div className="flex flex-col md:flex-row items-center mt-6 space-y-4 md:space-y-0 md:space-x-8">
                  <div className="flex items-center space-x-3">
                    <span className="bg-black text-white p-3 rounded-full">
                      📞
                    </span>
                    <div>
                      <p className="text-gray-500 text-sm">Enquiry</p>
                      <p className="font-semibold text-lg">+91-7354619960</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-black text-white p-3 rounded-full">
                      ✉️
                    </span>
                    <div>
                      <p className="text-gray-500 text-sm">Get Support</p>
                      <p className="font-semibold text-lg">info@example.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </motion.header>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
