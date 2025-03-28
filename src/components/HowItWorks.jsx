// HowItWorks Component with Updated Animations
import React from "react";
import { motion } from 'framer-motion';
import { UserPlus, Search, Heart, MessageSquare } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Sign Up",
      description: "Create your profile and join our trusted community.",
      icon: <UserPlus className="w-14 h-14 text-[#4F2F1D]" />,
    },
    {
      title: "Find Matches",
      description: "Browse and search for compatible profiles.",
      icon: <Search className="w-14 h-14 text-[#4F2F1D]" />,
    },
    {
      title: "Express Interest",
      description: "Send requests and connect with potential partners.",
      icon: <Heart className="w-14 h-14 text-[#4F2F1D]" />,
    },
    {
      title: "Start Your Journey",
      description: "Chat, build connections, and take the next step.",
      icon: <MessageSquare className="w-14 h-14 text-[#4F2F1D]" />,
    },
  ];

  // Using the same cardVariants as WhyChooseUs for consistency
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      backgroundColor: '#F5EDE7',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: { duration: 0.3 },
    },
  };

  const arrowVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    hover: { x: [0, 5, 0], transition: { repeat: Infinity, duration: 1 } }
  };

  return (
    <div className="bg-[#FFFFFF] py-12 sm:py-16 overflow-hidden">
      <div className="container mx-auto text-center px-4">
        <h2
          className="text-3xl sm:text-4xl mb-8 sm:mb-12 text-[#4F2F1D]"
          style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
        >
          How It Works
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-center w-full md:w-auto">
              <motion.div
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative flex flex-col items-center bg-[#F5EDE7] p-4 sm:p-6 rounded-lg shadow-lg border border-[#E5D3C8] w-full"
              >
                {/* Icon */}
                <div className="mb-4 p-4 rounded-full bg-[#FFFFFF]">
                  {step.icon}
                </div>
                {/* Title */}
                <h3
                  className="text-xl sm:text-2xl mb-2 text-[#4F2F1D]"
                  style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
                >
                  {step.title}
                </h3>
                {/* Description */}
                <p 
                  className="text-[#6B4132] text-sm sm:text-base"
                  style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                >
                  {step.description}
                </p>
              </motion.div>
              
              {/* Arrow with animation */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2"
                  variants={arrowVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="text-[#4F2F1D]"
                  >
                    <path 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;