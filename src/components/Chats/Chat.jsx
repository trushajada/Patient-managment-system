
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaCalendarCheck, FaHospitalUser, FaFileAlt, FaBell } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import { RiBillFill, RiLogoutBoxRFill, RiHome2Line } from 'react-icons/ri';
import logo from '../../assets/images/logo.png';
import Avatar from '../../assets/images/Avatar.png';
import sidebar from '../../assets/images/sidebar.png';

// Define menu items for sidebar
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
    const [file, setFile] = useState(null); // New state for handling file uploads

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
                { sender: 'doctor', message: 'Hello, Esther! How can I assist you today?', time: formatCurrentTime(new Date()), file: null },
                { sender: 'user', message: 'I have a question about my prescription.', time: formatCurrentTime(new Date()), file: null }
            
            ]
        },
        {
            name: 'Dr. John Smith',
            message: 'Hi, how are you?',
            time: formatCurrentTime(new Date()),
            image: Avatar,
            chatHistory: [
                { sender: 'doctor', message: 'Hello, Esther! How can I assist you today?', time: formatCurrentTime(new Date()), file: null },
                { sender: 'user', message: 'I have a question about my prescription.', time: formatCurrentTime(new Date()), file: null }
            ]
        },
        {
            name: 'Dr. Rachel Adams',
            message: 'How are you doing today?',
            time: formatCurrentTime(new Date()),
            image: Avatar,
            chatHistory: [
                { sender: 'doctor', message: 'Hello, Esther! How can I assist you today?', time: formatCurrentTime(new Date()), file: null },
                { sender: 'user', message: 'I have a question about my prescription.', time: formatCurrentTime(new Date()), file: null }            ]
        },
    ];

    const filteredDoctors = doctorschat.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchDoctor.toLowerCase())
    );

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => navigate('/login');

    const currentMenuItem = menuItems.find(item => item.path === location.pathname);
    const pageTitle = currentMenuItem ? currentMenuItem.name : 'Personal Health Record';

    const handleSendMessage = () => {
        if (message.trim() || file) {
            const newMessage = {
                sender: 'user',
                message: message || '',
                time: formatCurrentTime(new Date()),
                file: file ? URL.createObjectURL(file) : null // Add the file if available
            };
            selectedDoctor.chatHistory.push(newMessage);
            setMessage(''); // Clear message input
            setFile(null); // Clear file input
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Set the selected file
    };

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
                    <img src={sidebar} alt="sidebar" className="w-[182px] h-[164px] mb-4" />
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
                                    className="flex items-center space-x-4 p-2 hover:bg-blue-100 cursor-pointer"
                                    onClick={() => setSelectedDoctor(doctor)}
                                >
                                    <img src={doctor.image} alt={doctor.name} className="h-10 w-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-lg">{doctor.name}</p>
                                        <p className="text-gray-500">{doctor.message}</p>
                                    </div>
                                    <p className="ml-auto text-sm text-gray-400">{doctor.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
    
                    {/* Chat window */}
                    <div className="flex-1 bg-white rounded-lg shadow-md p-5 ml-5">
                        {selectedDoctor ? (
                            <>
                                <div className="flex items-center mb-6">
                                    <img
                                        src={selectedDoctor.image}
                                        alt={selectedDoctor.name}
                                        className="h-12 w-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <p className="text-lg font-semibold">{selectedDoctor.name}</p>
                                        <p className="text-sm text-gray-500">Online</p>
                                    </div>
                                </div>
                                <div className="h-[400px] overflow-y-auto mb-6 border p-3">
                                    {selectedDoctor.chatHistory.map((chat, index) => (
                                        <div
                                            key={index}
                                            className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                                        >
                                            <div className={`${chat.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'} p-3 rounded-lg max-w-md`}>
                                                <p>{chat.message}</p>
                                                {chat.file && (
                                                    <div className="mt-2">
                                                        {chat.file.endsWith('.pdf') ? (
                                                            <a href={chat.file} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                                                View PDF
                                                            </a>
                                                        ) : (
                                                            <img src={chat.file} alt="Uploaded file" className="w-32 h-32 object-cover rounded-lg bg-gray-400" />
                                                        )}
                                                    </div>
                                                )}
                                                <p className="text-xs mt-2 text-right">{chat.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-400">Select a doctor to start chatting</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
    
};


export default Chat;
