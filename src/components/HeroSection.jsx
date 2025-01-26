import React from 'react';

const HeroSection = () => {
    return (
        <div className="relative">
            <div className="background-video-container">
                <iframe className="background-video" style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
                    src="https://www.youtube.com/embed/yKALM7Lydok?autoplay=1&mute=1&loop=1&playlist=yKALM7Lydok&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            </div>
            <div className="content absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Vikram Singh &amp; <br/> Neha Kapoor</h1>
                <p className="text-xl mb-8">Forever Starts Here: Your Love, Your Journey, Your Wedding Wonderland!</p>
                <a href="#" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Reservations</a>
            </div>
        </div>
    );
}

export default HeroSection;
