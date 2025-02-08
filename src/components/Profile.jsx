import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoSrc from '../assets/logo.png'; // Logo path

const Profile = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] flex flex-col justify-between">
            {/* Solid Color Header */}
            <div className="w-full p-4 bg-[#4F2F1D] shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <div>
                        <img src={logoSrc} alt="Punjabi Matrimony Logo" className="h-16" />
                    </div>
                    {/* Navigation Links */}
                    <nav className="flex space-x-4">
                        <a href="#" onClick={() => navigate('/')} className="text-white hover:text-gray-400 transition duration-300">Home</a>
                        <a href="#" className="text-white hover:text-gray-400 transition duration-300">About Us</a>
                        <a href="#" className="text-white hover:text-gray-400 transition duration-300">Services</a>
                        <a href="#" className="text-white hover:text-gray-400 transition duration-300">Contact</a>
                    </nav>
                </div>
            </div>

            {/* Profile Content */}
            <div className="flex flex-grow items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#4F2F1D' }}>
                        Profile
                    </h2>
                    <button
                        className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded-md transition duration-300"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Solid Color Footer */}
            <div className="w-full p-4 bg-[#4F2F1D] shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <p className="text-white">© 2023 Punjabi Matrimony. All rights reserved.</p>
                    <nav className="flex space-x-4">
                        <a href="#" className="text-white hover:text-gray-400 transition duration-300">Privacy Policy</a>
                        <a href="#" className="text-white hover:text-gray-400 transition duration-300">Terms of Service</a>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Profile;