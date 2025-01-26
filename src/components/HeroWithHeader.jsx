import React from 'react';
import videoSrc from '../assets/video.mp4'; // Video path
import logoSrc from '../assets/logo.png'; // Logo path

const HeroWithHeader = () => {
    return (
        <div className="relative h-screen overflow-hidden">
            {/* Local Background Video */}
            <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover">
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* Black Translucent Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Translucent and Blurred Header */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-md">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <div>
                        <img src={logoSrc} alt="Punjabi Matrimony Logo" className="h-16" /> {/* Adjusted size */}
                    </div>
                    {/* Navigation Links */}
                    <nav className="flex space-x-4">
                        <a href="#" className="text-white hover:text-gray-400 transition duration-300">Home</a>
                        <a href="#" className="text-white hover:text-gray-400 transition duration-300">About Us</a>
                        <a href="#" className="text-white hover:text-gray-400 transition duration-300">Services</a>
                        <a href="#" className="text-white hover:text-gray-400 transition duration-300">Contact</a>
                    </nav>
                    {/* Buttons */}
                    <div>
                        <button className="bg-transparent border-2 border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300">Login</button>
                        <button className="ml-4 bg-transparent border-2 border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300">Sign Up</button>
                    </div>
                </div>
            </div>

            {/* Centered Slogan and Stylish Button */}
            <div className="absolute inset-x-0 bottom-0 pb-60 flex flex-col items-center justify-end text-center text-white p-4 font-serif" style={{ maxWidth: '600px', margin: 'auto' }}>
                <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Together Forever</h1>
                <p className="text-2xl mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Join us in celebrating the journey of love and partnership, as we forge connections that stand the test of time and create memories that last a lifetime.</p>
                <button className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-3 px-8 rounded-md" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}>
                    Find Your Partner!
                </button>
            </div>
        </div>
    );
};

export default HeroWithHeader;
