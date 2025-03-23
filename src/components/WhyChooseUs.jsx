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
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            transition: { duration: 0.3 },
        },
    };

    return (
        <div className="py-12 sm:py-16 overflow-hidden bg-background">
            <div className="container mx-auto px-4 text-center">
                <h2
                    className="text-3xl sm:text-5xl mb-6 sm:mb-12 text-primary font-normal"
                    style={{ fontFamily: "'Tiempos Headline', serif" }}
                >
                    Why Choose Us
                </h2>
                <p 
                    className="text-lg sm:text-xl mb-8 sm:mb-12 text-secondary font-normal max-w-3xl mx-auto"
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
                            className="px-5 py-8 rounded-xl shadow-md border border-border bg-card"
                        >
                            <div className="mb-5 flex justify-center">
                                <div className="p-3 rounded-full bg-primary-light flex items-center justify-center">
                                    <div className="text-primary">
                                        {feature.icon}
                                    </div>
                                </div>
                            </div>
                            <h3
                                className="text-2xl mb-3 text-primary font-normal"
                                style={{ fontFamily: "'Tiempos Headline', serif" }}
                            >
                                {feature.title}
                            </h3>
                            <p 
                                className="text-secondary font-normal"
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

// Add CSS variables for consistent colors across all screens including Mac
const styles = document.createElement('style');
styles.innerHTML = `
  :root {
    --color-background: #FFFFFF;
    --color-card: #FAF6F3;
    --color-primary: #3D2314;
    --color-primary-light: #F2E6DF;
    --color-secondary: #5A3926;
    --color-border: #DBC6B9;
  }
  
  .bg-background { background-color: var(--color-background); }
  .bg-card { background-color: var(--color-card); }
  .text-primary { color: var(--color-primary); }
  .text-secondary { color: var(--color-secondary); }
  .bg-primary-light { background-color: var(--color-primary-light); }
  .border-border { border-color: var(--color-border); }
`;
document.head.appendChild(styles);

export default WhyChooseUs;