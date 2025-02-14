import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoSrc from '../assets/logo.png'; // Logo path

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full p-4 bg-[#4F2F1D] shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <img src={logoSrc} alt="Punjabi Matrimony Logo" className="h-16" />
                </div>
                <nav className="flex space-x-4">
                    <a href="#" onClick={() => navigate('/')} className="text-white hover:text-gray-400 transition duration-300">Home</a>
                    <a href="#" onClick={() => navigate('/about')} className="text-white hover:text-gray-400 transition duration-300">About Us</a>
                    <a href="#" className="text-white hover:text-gray-400 transition duration-300">Services</a>
                    <a href="#" className="text-white hover:text-gray-400 transition duration-300">Contact</a>
                </nav>
            </div>
        </div>
    );
};

export default Header;