import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Search, Heart, MessageSquare } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Sign Up",
      description: "Create your profile and join our trusted community.",
      icon: <UserPlus className="w-12 h-12 text-rose-600" />,
    },
    {
      title: "Find Matches",
      description: "Browse and search for compatible profiles.",
      icon: <Search className="w-12 h-12 text-rose-600" />,
    },
    {
      title: "Express Interest",
      description: "Send requests and connect with potential partners.",
      icon: <Heart className="w-12 h-12 text-rose-600" />,
    },
    {
      title: "Start Your Journey",
      description: "Chat, build connections, and take the next step.",
      icon: <MessageSquare className="w-12 h-12 text-rose-600" />,
    },
  ];

  // Animation variants for cards
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="bg-neutral-50 py-16 sm:py-24 overflow-hidden">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl sm:text-5xl mb-16 text-neutral-800 font-normal">
          How It Works
        </h2>

        <div className="relative">
          {/* Background timeline */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-rose-100 hidden md:block -translate-y-1/2" />

          <div className="flex flex-col md:flex-row gap-8 md:gap-6 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative flex-1"
              >
                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-6 top-1/4 z-10">
                    <svg 
                      width="40" 
                      height="40" 
                      viewBox="0 0 40 40" 
                      fill="none" 
                      className="text-rose-500"
                    >
                      <path 
                        d="M15 8l15 12-15 12" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}

                <div className="bg-white p-8 rounded-xl shadow-md h-full flex flex-col items-center border border-rose-100">
                  {/* Step number */}
                  <div className="bg-rose-50 text-rose-700 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-lg mb-4">
                    {index + 1}
                  </div>
                  
                  {/* Icon circle */}
                  <div className="mb-6 p-4 rounded-full bg-rose-50 shadow-sm">
                    {step.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl mb-3 text-neutral-800 font-medium">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;