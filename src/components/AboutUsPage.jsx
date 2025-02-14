import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoSrc from '../assets/logo.png'; // Logo path
import Footer from './Footer';
import Header from './Header';

const AboutUsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100">
            <Header />

            {/* About Us Content */}
            <div className="flex-grow flex items-center justify-center my-16">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                    <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#4F2F1D' }}>
                        About Us
                    </h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Welcome to Punjabi Matrimony, your trusted platform for finding your perfect life partner within the Punjabi community. Our mission is to connect individuals who share similar values, traditions, and cultural backgrounds.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        At Punjabi Matrimony, we believe in the power of love and the importance of family. Our platform is designed to make the process of finding a life partner as seamless and enjoyable as possible. We offer a range of features to help you connect with potential matches, including advanced search filters, verified profiles, and secure messaging.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Join us today and start your journey towards finding your perfect match. Together, we can create beautiful love stories and lasting relationships.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AboutUsPage;