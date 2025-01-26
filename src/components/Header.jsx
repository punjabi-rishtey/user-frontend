import React from 'react';

const Header = () => {
    return (
        <header className="bg-black text-white p-4 flex justify-between items-center">
            <div className="logo text-xl font-bold">
                <a href="/" className="hover:text-gray-300">PunjabiMatrimony</a>
            </div>
            <nav className="flex space-x-4">
                <a href="#" className="hover:text-gray-400">Home</a>
                <a href="#" className="hover:text-gray-400">About Us</a>
                <a href="#" className="hover:text-gray-400">Services</a>
                <a href="#" className="hover:text-gray-400">Contact</a>
            </nav>
            <div>
                <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 mr-2">Login</button>
                <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-700">Sign Up</button>
            </div>
        </header>
    );
}

export default Header;
