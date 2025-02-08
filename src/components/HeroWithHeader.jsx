import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import videoSrc from '../assets/video.mp4'; // Video path
import logoSrc from '../assets/logo.png'; // Logo path
import profileIcon from '../assets/profile.png'; // Profile icon path
import LoginModal from './LoginModal';
import { useAuth } from '../context/AuthContext';

const HeroWithHeader = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false); // State to track video load status
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, login, signup, toggleLoginModal } = useAuth();

    const handleFindPartnerClick = () => {
        navigate('/findpartner');
    };

    const handleLogin = () => {
        login();
        setShowModal(false);
    };

    const handleSignup = () => {
        signup();
        setShowModal(false);
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <div className="relative h-screen overflow-hidden bg-[#800000]"> {/* Default maroon background */}
            {/* Loader */}
            {!isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
                </div>
            )}

            {/* Local Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
                    isVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onCanPlayThrough={() => setIsVideoLoaded(true)} // Trigger when the video can play through
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Black Translucent Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Translucent and Blurred Header */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-md z-10">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <div>
                        <img src={logoSrc} alt="Punjabi Matrimony Logo" className="h-16" />
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
                        {isAuthenticated ? (
                            <img
                                src={profileIcon}
                                alt="Profile"
                                className="h-10 w-10 rounded-full cursor-pointer"
                                onClick={handleProfileClick}
                            />
                        ) : (
                            <>
                                <button className="bg-transparent border-2 border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300" onClick={() => setShowModal(true)}>Login</button>
                                <button className="ml-4 bg-transparent border-2 border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300" onClick={() => setShowModal(true)}>Sign Up</button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Centered Slogan and Stylish Button */}
            <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 text-center text-white px-4 z-10">
                <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Together Forever
                </h1>
                <p className="text-2xl mb-8 max-w-3xl mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Join us in celebrating the journey of love and partnership, as we forge connections that stand the test of time and create memories that last a lifetime.
                </p>
                <button 
                    className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-3 px-8 rounded-md transition duration-300 shadow-lg"
                    onClick={handleFindPartnerClick}
                >
                    Find Your Partner!
                </button>
            </div>

            {showModal && <LoginModal onClose={() => setShowModal(false)} onLogin={handleLogin} onSignup={handleSignup} />}
        </div>
    );
};

export default HeroWithHeader;