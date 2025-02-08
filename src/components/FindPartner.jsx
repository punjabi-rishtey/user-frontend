import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoSrc from '../assets/logo.png';
import profileIcon from '../assets/profile.png';
import LoginModal from './LoginModal';

const dummyData = [
    { id: 1, name: 'John Doe', gender: 'male', caste: 'khatri', manglik: 'non_manglik', maritalStatus: 'never_married', religion: 'hindu', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Jane Smith', gender: 'female', caste: 'arora', manglik: 'manglik', maritalStatus: 'divorced', religion: 'sikh', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Sam Wilson', gender: 'male', caste: 'brahmin', manglik: 'partial_manglik', maritalStatus: 'widow_widower', religion: 'jain', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Alice Johnson', gender: 'female', caste: 'multani', manglik: 'non_manglik', maritalStatus: 'never_married', religion: 'buddhist', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Michael Brown', gender: 'male', caste: 'other', manglik: 'manglik', maritalStatus: 'divorced', religion: 'hindu', image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Emily Davis', gender: 'female', caste: 'khatri', manglik: 'partial_manglik', maritalStatus: 'widow_widower', religion: 'sikh', image: 'https://via.placeholder.com/150' },
    { id: 7, name: 'David Wilson', gender: 'male', caste: 'arora', manglik: 'non_manglik', maritalStatus: 'never_married', religion: 'jain', image: 'https://via.placeholder.com/150' },
    { id: 8, name: 'Sophia Martinez', gender: 'female', caste: 'brahmin', manglik: 'manglik', maritalStatus: 'divorced', religion: 'buddhist', image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'James Anderson', gender: 'male', caste: 'multani', manglik: 'partial_manglik', maritalStatus: 'widow_widower', religion: 'hindu', image: 'https://via.placeholder.com/150' },
    { id: 10, name: 'Olivia Thomas', gender: 'female', caste: 'other', manglik: 'non_manglik', maritalStatus: 'never_married', religion: 'sikh', image: 'https://via.placeholder.com/150' },
    { id: 11, name: 'Daniel Jackson', gender: 'male', caste: 'khatri', manglik: 'manglik', maritalStatus: 'divorced', religion: 'jain', image: 'https://via.placeholder.com/150' },
    { id: 12, name: 'Isabella White', gender: 'female', caste: 'arora', manglik: 'partial_manglik', maritalStatus: 'widow_widower', religion: 'buddhist', image: 'https://via.placeholder.com/150' },
    { id: 13, name: 'Matthew Harris', gender: 'male', caste: 'brahmin', manglik: 'non_manglik', maritalStatus: 'never_married', religion: 'hindu', image: 'https://via.placeholder.com/150' },
    { id: 14, name: 'Ava Martin', gender: 'female', caste: 'multani', manglik: 'manglik', maritalStatus: 'divorced', religion: 'sikh', image: 'https://via.placeholder.com/150' },
    { id: 15, name: 'Henry Lee', gender: 'male', caste: 'other', manglik: 'partial_manglik', maritalStatus: 'widow_widower', religion: 'jain', image: 'https://via.placeholder.com/150' },
];

const FindPartner = () => {
    const [filters, setFilters] = useState({
        gender: '',
        caste: '',
        manglik: '',
        maritalStatus: '',
        religion: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProfile, setSelectedProfile] = useState(null);

    const navigate = useNavigate();
    const { isAuthenticated, showLoginModal, toggleLoginModal, login } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            toggleLoginModal();
        }
    }, [isAuthenticated]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleClearFilters = () => {
        setFilters({
            gender: '',
            caste: '',
            manglik: '',
            maritalStatus: '',
            religion: ''
        });
        setSearchTerm('');
    };

    const handleProfileClick = (profile) => {
        setSelectedProfile(profile);
    };

    const handleCloseProfileModal = () => {
        setSelectedProfile(null);
    };

    const filteredData = dummyData.filter(item => {
        return (
            (filters.gender === '' || item.gender === filters.gender) &&
            (filters.caste === '' || item.caste === filters.caste) &&
            (filters.manglik === '' || item.manglik === filters.manglik) &&
            (filters.maritalStatus === '' || item.maritalStatus === filters.maritalStatus) &&
            (filters.religion === '' || item.religion === filters.religion) &&
            (searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] flex flex-col justify-between relative">
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
                    {/* Buttons */}
                    <div>
                        {isAuthenticated ? (
                            <img
                                src={profileIcon}
                                alt="Profile"
                                className="h-10 w-10 rounded-full cursor-pointer"
                                onClick={() => navigate('/profile')}
                            />
                        ) : (
                            <>
                                <button className="bg-transparent border-2 border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300" onClick={() => toggleLoginModal()}>Login</button>
                                <button className="ml-4 bg-transparent border-2 border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300" onClick={() => toggleLoginModal()}>Sign Up</button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-grow">
                {/* Sidebar for Filters */}
                <div className="w-1/4 p-8 bg-white shadow-lg">
                    <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#4F2F1D' }}>
                        Filters
                    </h2>
                    <div className="mb-4">
                        <label className="block text-[#4F2F1D] mb-2 font-semibold">Gender</label>
                        <select name="gender" value={filters.gender} onChange={handleChange} className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]">
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#4F2F1D] mb-2 font-semibold">Caste</label>
                        <select name="caste" value={filters.caste} onChange={handleChange} className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]">
                            <option value="">Select Caste</option>
                            <option value="khatri">Khatri</option>
                            <option value="arora">Arora</option>
                            <option value="multani">Multani</option>
                            <option value="brahmin">Brahmin</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#4F2F1D] mb-2 font-semibold">Manglik</label>
                        <select name="manglik" value={filters.manglik} onChange={handleChange} className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]">
                            <option value="">Select Manglik</option>
                            <option value="manglik">Manglik</option>
                            <option value="partial_manglik">Partial Manglik</option>
                            <option value="non_manglik">Non Manglik</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#4F2F1D] mb-2 font-semibold">Marital Status</label>
                        <select name="maritalStatus" value={filters.maritalStatus} onChange={handleChange} className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]">
                            <option value="">Select Marital Status</option>
                            <option value="never_married">Never Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widow_widower">Widow/Widower</option>
                            <option value="awaiting_divorce">Awaiting Divorce</option>
                            <option value="annulled">Annulled</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#4F2F1D] mb-2 font-semibold">Religion</label>
                        <select name="religion" value={filters.religion} onChange={handleChange} className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]">
                            <option value="">Select Religion</option>
                            <option value="hindu">Hindu</option>
                            <option value="sikh">Sikh</option>
                            <option value="jain">Jain</option>
                            <option value="buddhist">Buddhist</option>
                        </select>
                    </div>
                    <button
                        className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded-md transition duration-300"
                        onClick={handleClearFilters}
                    >
                        Clear Filters
                    </button>
                </div>

                {/* Main Content for Search Results */}
                <div className="w-3/4 p-8">
                    <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#4F2F1D' }}>
                        Search Results
                    </h2>
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 border border-[#D1BFA7] rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-8">
                        {filteredData.map(item => (
                            <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 cursor-pointer" onClick={() => handleProfileClick(item)}>
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-full mr-6" />
                                    <div>
                                        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#4F2F1D' }}>
                                            {item.name}
                                        </h3>
                                        <p className="text-[#4F2F1D] mb-1"><strong>Gender:</strong> {item.gender}</p>
                                        <p className="text-[#4F2F1D] mb-1"><strong>Caste:</strong> {item.caste}</p>
                                        <p className="text-[#4F2F1D] mb-1"><strong>Manglik:</strong> {item.manglik}</p>
                                        <p className="text-[#4F2F1D] mb-1"><strong>Marital Status:</strong> {item.maritalStatus}</p>
                                        <p className="text-[#4F2F1D]"><strong>Religion:</strong> {item.religion}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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

            {/* Add modal overlay */}
            {!isAuthenticated && showLoginModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                    <LoginModal onClose={toggleLoginModal} onLogin={login} />
                </div>
            )}

            {/* Profile Modal */}
            {selectedProfile && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#4F2F1D' }}>
                            {selectedProfile.name}
                        </h2>
                        <img src={selectedProfile.image} alt={selectedProfile.name} className="w-24 h-24 rounded-full mb-4 mx-auto" />
                        <p className="text-[#4F2F1D] mb-1"><strong>Gender:</strong> {selectedProfile.gender}</p>
                        <p className="text-[#4F2F1D] mb-1"><strong>Caste:</strong> {selectedProfile.caste}</p>
                        <p className="text-[#4F2F1D] mb-1"><strong>Manglik:</strong> {selectedProfile.manglik}</p>
                        <p className="text-[#4F2F1D] mb-1"><strong>Marital Status:</strong> {selectedProfile.maritalStatus}</p>
                        <p className="text-[#4F2F1D] mb-1"><strong>Religion:</strong> {selectedProfile.religion}</p>
                        <button
                            className="bg-[#990000] hover:bg-[#800000] text-white font-bold py-2 px-4 rounded-md transition duration-300 mt-4"
                            onClick={handleCloseProfileModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindPartner;