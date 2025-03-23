import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Clock, Headphones } from 'lucide-react';

const WhyChooseUs = () => {
    const features = [
        {
            title: 'Verified Profiles',
            description: 'Every profile is thoroughly verified to ensure authenticity and reliability.',
            icon: <Shield className="w-10 h-10" />
        },
        {
            title: 'Advanced Matchmaking',
            description: 'Our smart algorithm connects you with the most compatible partners.',
            icon: <CheckCircle className="w-10 h-10" />
        },
        {
            title: 'Privacy Guaranteed',
            description: 'Your personal information is secured and shared only with your consent.',
            icon: <Clock className="w-10 h-10" />
        },
        {
            title: 'Dedicated Support',
            description: 'Our support team is here to assist you at every step of your journey.',
            icon: <Headphones className="w-10 h-10" />
        }
    ];

    const cardVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        hover: {
            scale: 1.05,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.3 },
        },
    };

    return (
        <div className="why-bg py-12 sm:py-16 overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                <h2
                    className="text-3xl sm:text-5xl mb-6 sm:mb-12 why-title font-normal"
                    style={{ fontFamily: "'Tiempos Headline', serif" }}
                >
                    Why Choose Us
                </h2>
                <p 
                    className="text-lg sm:text-xl mb-8 sm:mb-12 why-text font-normal max-w-3xl mx-auto"
                    style={{ fontFamily: "'Modern Era', sans-serif" }}
                >
                    Discover the benefits of joining our platform and find your perfect match with ease.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="px-5 py-8 rounded-xl shadow-md border why-border why-card"
                        >
                            <div className="mb-5 flex justify-center">
                                <div className="p-3 rounded-full why-icon-bg flex items-center justify-center">
                                    <div className="why-icon">
                                        {feature.icon}
                                    </div>
                                </div>
                            </div>
                            <h3
                                className="text-2xl mb-3 why-title font-normal"
                                style={{ fontFamily: "'Tiempos Headline', serif" }}
                            >
                                {feature.title}
                            </h3>
                            <p 
                                className="why-text font-normal"
                                style={{ fontFamily: "'Modern Era', sans-serif" }}
                            >
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Define CSS variables specifically for this component
const stylesTag = document.createElement('style');
stylesTag.innerHTML = `
  /* WHY CHOOSE US STYLES */
  :root {
    --why-bg: #FFFFF9;
    --why-card: #F5F0E5;
    --why-title: #2D1A0C;
    --why-text: #5A3926;
    --why-icon: #5A3926;
    --why-icon-bg: #F4EAE2;
    --why-border: #E8D6C8;
  }
  
  .why-bg { background-color: var(--why-bg); }
  .why-card { background-color: var(--why-card); }
  .why-title { color: var(--why-title); }
  .why-text { color: var(--why-text); }
  .why-icon { color: var(--why-icon); }
  .why-icon-bg { background-color: var(--why-icon-bg); }
  .why-border { border-color: var(--why-border); }
  
  .shadow-md {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                0 2px 4px -1px rgba(0, 0, 0, 0.06), 
                0 0 0 1px rgba(0, 0, 0, 0.03);
  }
`;
document.head.appendChild(stylesTag);

export default WhyChooseUs;