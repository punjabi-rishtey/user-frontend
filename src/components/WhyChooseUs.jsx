import React from 'react';
import { CheckCircle } from 'lucide-react'; // For icons; replace with your preferred library if needed

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

    return (
        <div className="bg-gradient-to-t from-[#EFE3D8] via-[#F8F3EB] to-[#FAF3E0] py-16">
            <div className="container mx-auto text-center">
                <h2
                    className="text-4xl font-bold mb-6"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#4F2F1D' }}
                >
                    Why Choose Us
                </h2>
                <p className="text-lg text-[#5A3E29] mb-12">
                    Discover the benefits of joining our platform and find your perfect match with ease.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border border-[#D1BFA7]"
                        >
                            <div className="mb-4 flex justify-center">{feature.icon}</div>
                            <h3
                                className="text-xl font-semibold mb-2 text-[#4F2F1D]"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                {feature.title}
                            </h3>
                            <p className="text-[#5A3E29]">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
