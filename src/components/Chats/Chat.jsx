import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaCalendarCheck, FaHospitalUser, FaFileAlt, FaBell } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import { RiBillFill, RiLogoutBoxRFill, RiHome2Line } from 'react-icons/ri';
import logo from '../../assets/images/logo.png';
import Avatar from '../../assets/images/Avatar.png';

const menuItems = [
    { path: '/dashboard', name: 'Personal Health Record', icon: <FaHospitalUser /> },
    { path: '/booking', name: 'Appointment Booking', icon: <FaCalendarCheck /> },
    { path: '/records', name: 'Prescription Access', icon: <FaFileAlt /> },
    { path: '/teleconsultation', name: 'Teleconsultation Access', icon: <IoIosChatboxes /> },
    { path: '/chats', name: 'Chats', icon: <IoIosChatboxes /> },
    { path: '/bills', name: 'Bills', icon: <RiBillFill /> },
];

const Chat = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDoctor, setSearchDoctor] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [message, setMessage] = useState(''); 

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const formatCurrentTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Dummy data for doctors and chat messages
    const doctorschat = [
        {
            name: 'Dr. Daisy Benjamin',
            message: 'Hello, Esther!',
            time: formatCurrentTime(new Date()),
            image: Avatar,
            chatHistory: [
                { sender: 'doctor', message: 'Hello, Esther! How can I assist you today?', time: formatCurrentTime(new Date()) },
                { sender: 'user', message: 'I have a question about my prescription.', time: formatCurrentTime(new Date()) }
            ]
        },
        {
            name: 'Dr. John Smith',
            message: 'Hi, how are you?',
            time: formatCurrentTime(new Date()),
            image: Avatar,
            chatHistory: [
                { sender: 'doctor', message: 'Hi! How can I help you?', time: formatCurrentTime(new Date()) },
                { sender: 'user', message: 'I need some advice on my symptoms.', time: formatCurrentTime(new Date()) }
            ]
        },
        {
            name: 'Dr. Rachel Adams',
            message: 'How are you doing today?',
            time: formatCurrentTime(new Date()),
            image: Avatar,
            chatHistory: [
                { sender: 'doctor', message: 'How are you doing today?', time: formatCurrentTime(new Date()) },
                { sender: 'user', message: 'I feel a bit unwell.', time: formatCurrentTime(new Date()) }
            ]
        },
    ];

    // Filter doctors based on search query
    const filteredDoctors = doctorschat.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchDoctor.toLowerCase())
    );

    // Check if current path is active for menu highlighting
    const isActive = (path) => location.pathname === path;

    // Handle logout action
    const handleLogout = () => navigate('/login');

    // Get the current page's title from the menu
    const currentMenuItem = menuItems.find(item => item.path === location.pathname);
    const pageTitle = currentMenuItem ? currentMenuItem.name : 'Personal Health Record';

    return (
        <div className="bg-gray-100 min-h-screen flex">
            {/* Sidebar */}
            <div className="bg-white w-72 rounded-lg shadow-md p-4">
                <header className="flex items-center justify-center p-4">
                    <img src={logo} alt="Logo" className="mb-4 w-60 h-30" />
                </header>
                <nav className="mt-4">
                    <ul>
                        {menuItems.map(item => (
                            <li
                                key={item.path}
                                className={`mb-3 text-lg px-4 py-2 rounded-lg transition-shadow ${isActive(item.path) ? 'text-[#00bfff] font-bold' : 'text-gray-400'}`}
                            >
                                <Link to={item.path} className="flex items-center gap-2">
                                    {item.icon}
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex flex-col items-center mb-6">
                    <h2 className="text-lg font-semibold text-center mb-2">Hospital Appointment</h2>
                    <p className="text-center text-gray-700 mb-4">
                        You have to fill up the form to be admitted to the hospital.
                    </p>
                    <button className="bg-blue-500 text-white py-3 w-full rounded-full transition duration-200" style={{ background: "#00bfff" }}>
                        Appointment
                    </button>
                </div>
                <button
                    className="flex items-center text-lg font-semibold bg-red-100 text-red-600 rounded-md py-2 px-6 w-full hover:bg-red-200"
                    onClick={handleLogout}
                >
                    <RiLogoutBoxRFill className="mr-3" /> Log Out
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 h-24 mb-6 bg-white">
                    <div className="flex items-center">
                        <RiHome2Line className="text-gray-500 h-6 w-6 mr-2" />
                        <span className="font-semibold" style={{ color: "#00bfff" }}>
                            {pageTitle}
                        </span>
                    </div>
                    <div className="flex items-center justify-end w-[calc(70%-30px)]">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border rounded px-4 py-2 h-10 w-75"
                        />
                        <select className="ml-4 h-10 px-2 border rounded text-gray-500">
                            <option value="ALL">All</option>
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <FaBell className="w-6 h-auto text-gray-500" />
                        <img
                            src={Avatar}
                            alt="Profile"
                            className="h-12 w-12 rounded-full ml-4 bg-blue-200"
                        />
                        <span className="ml-2">Admin Name</span>
                    </div>
                </div>

                {/* Chat and Chat Display */}
                <div className="flex">
                    {/* Chat list */}
                    <div className="w-[340px] h-[700px] bg-white rounded-lg shadow-md ms-5 p-3 overflow-y-auto">
                        <div className="mb-4">
                            <h2 className='mb-5 text-2xl font-semibold'>Chats</h2>
                            <input
                                type="text"
                                placeholder="Search Doctor"
                                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={searchDoctor}
                                onChange={(e) => setSearchDoctor(e.target.value)}
                            />
                        </div>
                        <div className="space-y-4">
                            {filteredDoctors.map((doctor, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-4 p-2 hover:bg-blue-100 rounded-md cursor-pointer"
                                    onClick={() => setSelectedDoctor(doctor)} // Set the selected doctor
                                >
                                    <div className="flex-shrink-0">
                                        <img src={doctor.image} alt={doctor.name} className="h-12 w-12 rounded-full" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{doctor.name}</h3>
                                        <p className="text-gray-500">{doctor.message}</p>
                                        <p className="text-gray-400 text-sm">{doctor.time}</p>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Selected Doctor Chat */}
                    {selectedDoctor ? (
                        <div className="flex-1 bg-white rounded-lg shadow-md p-4 ms-5">
                            <div className="flex items-center mb-4">
                                <img src={selectedDoctor.image} alt={selectedDoctor.name} className="h-12 w-12 rounded-full mr-3" />
                                <h2 className="text-2xl font-semibold">{selectedDoctor.name}</h2>
                            </div>
                            <div className="flex flex-col space-y-2 h-[600px] overflow-y-auto">
                                {selectedDoctor.chatHistory.map((chat, index) => (
                                    <div key={index} className={`flex ${chat.sender === 'doctor' ? 'justify-start' : 'justify-end'}`}>
                                        <div className={`rounded-lg p-2 max-w-[70%] ${chat.sender === 'doctor' ? 'bg-blue-100' : 'bg-green-100'}`}>
                                            {chat.type === 'text' && <p>{chat.message}</p>}
                                            {chat.type === 'image' && (
                                                <img src={chat.file} alt="Uploaded" className="max-w-full h-auto" />
                                            )}
                                            {chat.type === 'pdf' && (
                                                <a href={chat.file} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                                                    View Document
                                                </a>
                                            )}
                                            <span className="text-gray-500 text-sm">{chat.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <p className="text-gray-500">Select a doctor to start chatting</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;
