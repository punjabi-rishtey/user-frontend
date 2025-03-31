import React from 'react';
import { CheckCircle } from 'lucide-react';

const WhyChooseUs = () => {
    const features = [
        {
            title: 'Verified Profiles',
            description: 'Every profile is thoroughly verified to ensure authenticity and reliability.',
            icon: <CheckCircle className="text-orange-800 w-10 h-10" />
        },
        {
            title: 'Advanced Matchmaking',
            description: 'Our smart algorithm connects you with the most compatible partners.',
            icon: <CheckCircle className="text-orange-800 w-10 h-10" />
        },
        {
            title: 'Privacy Guaranteed',
            description: 'Your personal information is secured and shared only with your consent.',
            icon: <CheckCircle className="text-orange-800 w-10 h-10" />
        },
        {
            title: 'Dedicated Support',
            description: 'Our support team is here to assist you at every step of your journey.',
            icon: <CheckCircle className="text-orange-800 w-10 h-10" />
        }
    ];

    // Card animation variants
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

    return (
        <div className="relative bg-amber-50 py-12 sm:py-16 overflow-hidden">
            {/* Traditional Indian Pattern Background - Top Border */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-orange-800 overflow-hidden">
                <div className="flex justify-center">
                    {Array.from({ length: 30 }).map((_, index) => (
                        <div key={`top-pattern-${index}`} className="w-8 h-8 relative">
                            <div className="absolute inset-0 bg-orange-700 rotate-45 transform origin-center scale-50"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lotus Pattern Left */}
            <div className="absolute left-0 top-1/3 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-orange-800 fill-current">
                    {/* Lotus flower pattern */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <path 
                            key={`lotus-petal-left-${i}`} 
                            d={`M 50 50 
                               Q ${50 + 25 * Math.cos(i * Math.PI / 4)} ${50 + 25 * Math.sin(i * Math.PI / 4)}, 
                               ${50 + 50 * Math.cos(i * Math.PI / 4)} ${50 + 50 * Math.sin(i * Math.PI / 4)}
                               Q ${50 + 25 * Math.cos((i + 0.5) * Math.PI / 4)} ${50 + 25 * Math.sin((i + 0.5) * Math.PI / 4)},
                               50 50`} 
                        />
                    ))}
                    <circle cx="50" cy="50" r="10" />
                </svg>
            </div>

            {/* Lotus Pattern Right */}
            <div className="absolute right-0 top-2/3 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-orange-800 fill-current">
                    {/* Lotus flower pattern */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <path 
                            key={`lotus-petal-right-${i}`} 
                            d={`M 50 50 
                               Q ${50 + 25 * Math.cos(i * Math.PI / 4)} ${50 + 25 * Math.sin(i * Math.PI / 4)}, 
                               ${50 + 50 * Math.cos(i * Math.PI / 4)} ${50 + 50 * Math.sin(i * Math.PI / 4)}
                               Q ${50 + 25 * Math.cos((i + 0.5) * Math.PI / 4)} ${50 + 25 * Math.sin((i + 0.5) * Math.PI / 4)},
                               50 50`} 
                        />
                    ))}
                    <circle cx="50" cy="50" r="10" />
                </svg>
            </div>

            {/* Traditional Rangoli Pattern Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <svg viewBox="0 0 600 600" className="w-full max-w-4xl text-orange-800 fill-current">
                    {/* Central floral element */}
                    <circle cx="300" cy="300" r="15" />
                    
                    {/* Inner geometric patterns */}
                    <path d="M300,240 L360,300 L300,360 L240,300 Z" fillOpacity="0.7" />
                    
                    {/* Outer circular patterns with dashed lines */}
                    <circle cx="300" cy="300" r="100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10,5" />
                    <circle cx="300" cy="300" r="150" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="15,5" />
                    <circle cx="300" cy="300" r="200" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5,10" />
                    
                    {/* Radiating lines */}
                    {Array.from({ length: 16 }).map((_, i) => (
                        <line 
                            key={`rangoli-line-${i}`}
                            x1="300" 
                            y1="300" 
                            x2={300 + 250 * Math.cos(i * Math.PI / 8)} 
                            y2={300 + 250 * Math.sin(i * Math.PI / 8)} 
                            stroke="currentColor" 
                            strokeWidth="1" 
                            strokeDasharray="8,12" 
                        />
                    ))}
                    
                    {/* Decorative dots along the outer circle */}
                    {Array.from({ length: 24 }).map((_, i) => (
                        <circle 
                            key={`rangoli-dot-${i}`}
                            cx={300 + 230 * Math.cos(i * Math.PI / 12)} 
                            cy={300 + 230 * Math.sin(i * Math.PI / 12)} 
                            r="5" 
                        />
                    ))}
                </svg>
            </div>

            {/* Subtle kolam-inspired dot pattern */}
            <div className="absolute inset-0 opacity-7 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="kolam-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                        <circle cx="5" cy="5" r="1" fill="#4F2F1D" opacity="0.3" />
                        <circle cx="15" cy="15" r="1" fill="#4F2F1D" opacity="0.3" />
                        <circle cx="25" cy="25" r="1" fill="#4F2F1D" opacity="0.3" />
                    </pattern>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#kolam-dots)" />
                </svg>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 text-center relative z-10">
                {/* Decorative divider above title */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-64 h-1">
                        <div className="absolute inset-0 bg-orange-800"></div>
                        <div className="absolute inset-x-0 -top-1.5 mx-auto w-8 h-4 bg-amber-50">
                            <div className="w-8 h-4 bg-amber-50 rotate-45 transform origin-center translate-y-0.5"></div>
                        </div>
                    </div>
                </div>

                <h2 className="text-3xl sm:text-4xl mb-2 text-orange-800 font-medium relative inline-block"
                    style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}>
                    Why Choose Us
                    {/* Decorative underline */}
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-orange-800 opacity-30"></span>
                </h2>

                {/* Traditional Indian swirl decorative element */}
                <div className="flex justify-center mb-6 mt-2">
                    <svg viewBox="0 0 100 20" className="h-4 text-orange-800 fill-current opacity-70">
                        <path d="M20,10 Q30,5 40,10 T60,10 T80,10" fill="none" stroke="currentColor" strokeWidth="2" />
                        <circle cx="10" cy="10" r="2" />
                        <circle cx="90" cy="10" r="2" />
                    </svg>
                </div>

                <p className="text-base sm:text-lg text-orange-900 mb-8 sm:mb-12 max-w-2xl mx-auto"
                    style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}>
                    Discover the benefits of joining our platform and find your perfect match with our traditional values and modern approach.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative bg-gradient-to-b from-amber-50 to-orange-50 px-4 py-6 rounded-lg shadow-md border border-orange-200 group transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                        >
                            {/* Corner decorative patterns */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-800 opacity-60 rounded-tl"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-800 opacity-60 rounded-tr"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-800 opacity-60 rounded-bl"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-800 opacity-60 rounded-br"></div>

                            <div className="relative z-10">
                                <div className="mb-4 flex justify-center">
                                    <div className="bg-orange-100 rounded-full p-2 group-hover:bg-orange-200 transition duration-300">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl sm:text-2xl mb-2 text-orange-900"
                                    style={{ fontFamily: "'Tiempos Headline', serif", fontWeight: 400 }}>
                                    {feature.title}
                                </h3>
                                <p className="text-orange-800 text-sm sm:text-base"
                                    style={{ fontFamily: "'Modern Era', sans-serif", fontWeight: 400 }}>
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Traditional Indian Pattern Background - Bottom Border */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-orange-800 overflow-hidden">
                <div className="flex justify-center">
                    {Array.from({ length: 30 }).map((_, index) => (
                        <div key={`bottom-pattern-${index}`} className="w-8 h-8 relative">
                            <div className="absolute inset-0 bg-orange-700 rotate-45 transform origin-center scale-50"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;