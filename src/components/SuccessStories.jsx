import React from 'react';

const SuccessStories = () => {
    const stories = [
        {
            name: 'Shalini and Vicky',
            quote: 'We found love and companionship on this amazing platform. It was everything we dreamed of and more!',
            image: 'https://punjabi-rishtey.com/uploads/stories/20230329152147.jpg'
        },
        {
            name: 'Taranjeet and Simran',
            quote: 'Thank you for helping us find each other! We are now happily married and couldn’t be more grateful.',
            image: 'https://punjabi-rishtey.com/uploads/stories/20230329140724.jpg'
        },
        {
            name: 'Vivek and Sakshi Manchanda',
            quote: 'The perfect match! This platform made it so easy to find someone who truly understands me.',
            image: 'https://punjabi-rishtey.com/uploads/stories/20221203124705.jpg'
        },
        {
            name: 'Lakshita and Rachit',
            quote: 'We never imagined finding someone so perfect for us. Thank you for bringing us together!',
            image: 'https://punjabi-rishtey.com/uploads/stories/20221203124846.jpg'
        }
    ];

    return (
        <div className="bg-[#FAF3E0] py-16 relative">
            <div className="container mx-auto text-center relative">
                <h2
                    className="text-4xl font-bold mb-12"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#4F2F1D' }}
                >
                    Success Stories
                </h2>

                {/* Central Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-[2px] bg-[#6B4226]"></div>

                <div className="relative space-y-16">
                    {stories.map((story, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col md:flex-row items-center ${
                                index % 2 === 0 ? 'md:flex-row-reverse' : ''
                            }`}
                        >
                            {/* Image */}
                            <div className="w-32 h-32 mb-4 md:mb-0 md:w-40 md:h-40 flex-shrink-0 mx-auto md:mx-0 relative z-10">
                                <img
                                    src={story.image}
                                    alt={story.name}
                                    className="w-full h-full object-cover rounded-full shadow-lg"
                                />
                            </div>

                            {/* Content */}
                            <div
                                className={`bg-white p-6 rounded-lg shadow-lg flex flex-col text-left ${
                                    index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                                }`}
                                style={{ maxWidth: '500px' }}
                            >
                                <h3
                                    className="text-2xl font-semibold text-[#4F2F1D] mb-2"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    {story.name}
                                </h3>
                                <p className="text-[#5A3E29] italic">{`"${story.quote}"`}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuccessStories;
