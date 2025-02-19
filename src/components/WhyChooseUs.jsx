import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const WhyChooseUs = () => {
    const features = [
        {
            title: 'Verified Profiles',
            description: 'Every profile is thoroughly verified to ensure authenticity and reliability.',
            icon: <CheckCircle className="text-[#FF3D57] w-10 h-10" />
        },
        {
            title: 'Advanced Matchmaking',
            description: 'Our smart algorithm connects you with the most compatible partners.',
            icon: <CheckCircle className="text-[#FF3D57] w-10 h-10" />
        },
        {
            title: 'Privacy Guaranteed',
            description: 'Your personal information is secured and shared only with your consent.',
            icon: <CheckCircle className="text-[#FF3D57] w-10 h-10" />
        },
        {
            title: 'Dedicated Support',
            description: 'Our support team is here to assist you at every step of your journey.',
            icon: <CheckCircle className="text-[#FF3D57] w-10 h-10" />
        }
    ];

    const cardVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        hover: {
            scale: 1.05,
            backgroundColor: '#FFB6C1',
            transition: { duration: 0.3 },
        },
    };

    return (
        <div className="bg-[#FFFFFF] py-16">
            <div className="container mx-auto px-6 text-center"> {/* Added px-4 for horizontal padding */}
                <h2
                    className="text-5xl font-bold mb-6 text-[#111111]"
                    style={{ fontFamily: "'Lora', serif" }}
                >
                    Why Choose Us
                </h2>
                <p 
                    className="text-xl text-[#333333] mb-12"
                    style={{ fontFamily: "'Merriweather', serif" }}
                >
                    Discover the benefits of joining our platform and find your perfect match with ease.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-11 max-w-7xl mx-auto"> {/* Added max-w-7xl and mx-auto */}
                    {features.map((feature, index) => (
      
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-[#FEEAEA] px-4 py-6 rounded-lg shadow-lg border border-[#FFE5E5]"
                        >

                            <div className="mb-4 flex justify-center">{feature.icon}</div>
                            <h3
                                className="text-2xl font-bold mb-2 text-[#111111]"
                                style={{ fontFamily: "'Lora', serif" }}
                            >
                                {feature.title}
                            </h3>
                            <p 
                                className="text-[#333333]"
                                style={{ fontFamily: "'Merriweather', serif" }}
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