import React from 'react';

const LoginModal = ({ onClose, onLogin }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#4F2F1D' }}>
                    Login or Sign Up
                </h2>
                <p className="mb-4 text-[#4F2F1D]">Please login or sign up to continue.</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded-md transition duration-300"
                        onClick={onLogin}
                    >
                        Login
                    </button>
                    <button
                        className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded-md transition duration-300"
                        onClick={onClose}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;