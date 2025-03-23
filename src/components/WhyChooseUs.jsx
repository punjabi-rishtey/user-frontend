import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const WhyChooseUs = () => {
    const features = [
        {
            title: 'Verified Profiles',
            description: 'Every profile is thoroughly verified to ensure authenticity and reliability.',
            icon: <CheckCircle className="text-[#4F2F1D] w-10 h-10" />
        },
        {
            title: 'Advanced Matchmaking',
            description: 'Our smart algorithm connects you with the most compatible partners.',
            icon: <CheckCircle className="text-[#4F2F1D] w-10 h-10" />
        },
        {
            title: 'Privacy Guaranteed',
            description: 'Your personal information is secured and shared only with your consent.',
            icon: <CheckCircle className="text-[#4F2F1D] w-10 h-10" />
        },
        {
            title: 'Dedicated Support',
            description: 'Our support team is here to assist you at every step of your journey.',
            icon: <CheckCircle className="text-[#4F2F1D] w-10 h-10" />
        }
    ];

    const cardVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        hover: {
            scale: 1.05,
            backgroundColor: '#F5EDE7',
            transition: { duration: 0.3 },
        },
    };

    return (
        <div className="bg-[#FFFFFF] py-12 sm:py-16 overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                <h2
                    className="text-3xl sm:text-5xl mb-6 sm:mb-12 text-[#4F2F1D]"
                    style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
                >
                    Why Choose Us
                </h2>
                <p 
                    className="text-lg sm:text-xl text-[#6B4132] mb-8 sm:mb-12"
                    style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
                >
                    Discover the benefits of joining our platform and find your perfect match with ease.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-11 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-[#F5EDE7] px-4 py-6 rounded-lg shadow-lg border border-[#E5D3C8]"
                        >
                            <div className="mb-4 flex justify-center">{feature.icon}</div>
                            <h3
                                className="text-2xl mb-2 text-[#4F2F1D]"
                                style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}
                            >
                                {feature.title}
                            </h3>
                            <p 
                                className="text-[#6B4132]"
                                style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}
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

export default WhyChooseUs;