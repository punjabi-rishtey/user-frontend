import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const features = [
  {
    icon: "🏅",
    title: "Genuine Profiles",
    description: "Verified and authentic profiles for your perfect match",
  },
  {
    icon: "🤝",
    title: "Most Trusted",
    description: "24+ years of trusted matchmaking experience",
  },
  {
    icon: "💍",
    title: "Success Stories",
    description: "Thousands of happy couples found their soulmates",
  },
];

const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const navigate = useNavigate();

  const handleFindPartnerClick = () => {
    navigate("/findpartner");
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="bg-[#FCF9F2] min-h-screen flex flex-col overflow-x-hidden">
      <Header />

      <main className="flex-grow overflow-x-hidden">
        <motion.header className="text-center py-8 sm:py-16" style={{ y: headerY }}>
          <h1
            className="text-5xl text-center mb-12 text-[#111111]"
            style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
          >
            About us
          </h1>
          <p
            className="text-xl text-[#333333]"
            style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
          >
            Most Trusted and Premium Matrimony Service.
          </p>

          <section className="bg-[#FCF9F2] flex justify-center gap-8 mt-12 flex-wrap pb-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-[#F5EDE7] shadow-lg p-6 sm:p-8 rounded-lg text-center w-full sm:w-96 transition-all duration-300 hover:bg-[#E5D3C8]"
              >
                <div className="text-6xl mb-6 text-[#4F2F1D]">
                  {feature.icon}
                </div>
                <h3
                  className="text-2xl text-[#4F2F1D]"
                  style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-lg text-[#6B4132] mt-4"
                  style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </section>
        </motion.header>
        <motion.section className="bg-[#FCF9F2] pt-0 pb-8 sm:pb-16 px-4 sm:px-6 md:px-20 overflow-hidden">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div
              className="relative w-full md:w-1/2"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="https://res.cloudinary.com/dkbzoosmm/image/upload/v1741775335/m5fdkw0mjynkn0hzlb3l.jpg"
                alt="Wedding Couple"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </motion.div>

            <div className="w-full md:w-1/2 md:pl-16 text-center md:text-left px-4 sm:px-0">
              <h2
                className="text-3xl sm:text-4xl text-[#111111] leading-tight mt-0"
                style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
              >
                WELCOME TO <br />
                <span className="text-[#FF3D57]">
                  PUNJABI RISHTEY WEDDING MATRIMONY
                </span>
              </h2>
              <p
                className="text-[#333333] mt-6 text-lg leading-relaxed"
                style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
              >
                Marriage is a lifetime promise, a beautiful blend of two lives,
                two loves, and two hearts. It is a wonderful, mystical moment
                when a beautiful love story starts.
              </p>

              <div className="mt-6">
                <button
                  onClick={handleFindPartnerClick}
                  className="bg-[#F5EDE7] text-[#4F2F1D] font-semibold text-lg px-6 py-2 rounded-md hover:bg-[#E5D3C8] transition-all duration-300"
                  style={{ fontFamily: "'Modern Era', sans-serif" }}
                >
                  Click here
                </button>
                <span 
                  className="text-[#333333] ml-2"
                  style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                >
                  to start your matrimony service now.
                </span>
              </div>

              <hr className="border-t border-[#FEEAEA] my-8" />

              <p
                className="text-[#333333] text-lg"
                style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
              >
                "Punjabi Marriage Forum (Now
                Punjabi-Rishtey, our digital platform)" in 2000 and has been
                running successfully for 25 years.
              </p>

              <div className="flex flex-col md:flex-row items-center mt-8 space-y-4 md:space-y-0 md:space-x-12">
                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="bg-[#F5EDE7] text-[#4F2F1D] p-4 rounded-full text-2xl hover:bg-[#E5D3C8] transition-all duration-300">
                    📞
                  </span>
                  <div>
                    <p
                      className="text-[#333333] text-sm"
                      style={{ fontFamily: "'Merriweather', serif" }}
                    >
                      Enquiry
                    </p>
                    <p
                      className="font-bold text-[#111111] text-lg"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      +91-7354619960
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="bg-[#F5EDE7] text-[#4F2F1D] p-4 rounded-full text-2xl hover:bg-[#E5D3C8] transition-all duration-300">
                    ✉️
                  </span>
                  <div>
                    <p
                      className="text-[#333333] text-sm"
                      style={{ fontFamily: "'Merriweather', serif" }}
                    >
                      Get Support
                    </p>
                    <p
                      className="font-bold text-[#111111] text-lg"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      info@example.com
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
