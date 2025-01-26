import React from 'react';

const FeatureCard = ({ title, description, icon }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 text-center">
            <img className="w-12 h-12 mx-auto mb-4" src={icon} alt="Feature icon" />
            <h3 className="font-semibold text-lg text-green-600">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

const Features = () => {
    const features = [
        {
            title: "Verified Profiles",
            description: "Every profile is thoroughly verified to ensure the authenticity and commitment of members.",
            icon: "https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/user-id-icon.png"  // Placeholder icon, replace with your own
        },
        {
            title: "Secure Privacy",
            description: "We respect your privacy and provide the highest level of confidentiality with our secure platform.",
            icon: "https://icons.iconarchive.com/icons/graphicloads/100-flat/256/lock-icon.png"  // Placeholder icon, replace with your own
        },
        {
            title: "Cultural Connection",
            description: "Our services are tailored to embrace the rich Punjabi culture and traditions in the matchmaking process.",
            icon: "https://icons.iconarchive.com/icons/iconscity/flags/256/punjab-flag-icon.png"  // Placeholder icon, replace with your own
        }
    ];

    return (
        <div className="py-12 bg-gray-100">
            <div className="container mx-auto px-6">
                <h2 className="text-center text-3xl font-semibold text-green-600 mb-8">Key Features</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
