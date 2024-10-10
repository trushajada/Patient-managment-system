import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaCamera, FaCalendarCheck, FaHospitalUser, FaFileAlt, FaBell } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import { RiBillFill, RiLogoutBoxRFill, RiHome2Line } from 'react-icons/ri';
import logo from '../../assets/images/logo.png';
import sidebar from '../../assets/images/sidebar.png';

// Define your menu items
const menuItems = [
    { path: '/dashboard', name: 'Personal Health Record', icon: <FaHospitalUser /> },
    { path: '/booking', name: 'Appointment Booking', icon: <FaCalendarCheck /> },
    { path: '/records', name: 'Prescription Access', icon: <FaFileAlt /> },
    { path: '/teleconsultation', name: 'Teleconsultation Access', icon: <IoIosChatboxes /> },
    { path: '/chats', name: 'Chats', icon: <IoIosChatboxes /> },
    { path: '/bills', name: 'Bills', icon: <RiBillFill /> },
    { path: '/edit-profile', name: 'Edit Profile', icon: null },
    { path: '/report', name: 'Test Report', icon: null }
];

const TestReport = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [clickedDoctors, setClickedDoctors] = useState(new Set());

    const doctorReport = [
        { name: "Dr. Ryan Vetrov", hospital: "Shamuba Hospital", reportName: "Blood Test", date: "2 Jan, 2022" },
        { name: "Dr. Angel Franci", hospital: "Shamuba Hospital", reportName: "Blood Test", date: "2 Jan, 2022" },
        { name: "Dr. James Kenter", hospital: "Shamuba Hospital", reportName: "Blood Test", date: "2 Jan, 2022" },
        { name: "Dr. Rhiel Madsen", hospital: "Shamuba Hospital", reportName: "Blood Test", date: "2 Jan, 2022" },
        { name: "Dr. Jakob Workman", hospital: "Shamuba Hospital", reportName: "Blood Test", date: "2 Jan, 2022" },
        { name: "Dr. Nolan Culhane", hospital: "Shamuba Hospital", reportName: "Blood Test", date: "2 Jan, 2022" },
        { name: "Dr. Brandon George", hospital: "Shamuba Hospital", reportName: "Blood Test", date: "2 Jan, 2022" },
        { name: "Dr. Omar Bothman", hospital: "Shamuba Hospital", reportName: "Blood Test", date: "2 Jan, 2022" },
        { name: "Dr. Omar Dorwart", hospital: "Shamuba Hospital", reportName: "Blood Test", date: "2 Jan, 2022" },
        { name: "Dr. Martin Saris", hospital: "Shamuba Hospital", reportName: "Blood Test", date: "2 Jan, 2022" },
        { name: "Dr. Alfonso Stanton", hospital: "Shamuba Hospital", reportName: "Blood Test", date: "2 Jan, 2022" },
        { name: "Dr. Brandon Press", hospital: "Shamuba Hospital", reportName: "Blood Test", date: "2 Jan, 2022" }
    ];

    const filteredDoctors = doctorReport.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleEyeClick = (doctor) => {
        setClickedDoctors((prev) => {
            const newClickedDoctors = new Set(prev);
            newClickedDoctors.add(doctor.name); 
            return newClickedDoctors;
        });
        navigate(`/reportdownload`, { state: { doctor } });
    };

    const filteredMenuItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLogout = () => {
        navigate('/login'); 
    };

    const currentMenuItem = menuItems.find(item => item.path === location.pathname);
    const pageTitle = currentMenuItem ? currentMenuItem.name : 'PersonalHealthRecord';

    return (
        <div className="bg-gray-100 min-h-screen flex">
            {/* Sidebar */}
            <div className="bg-white  w-72 rounded-lg shadow-md p-4">
                <header className="flex items-center justify-center p-4">
                    <img src={logo} alt="Logo" className="mb-4 w-60 h-30" />
                </header>
                <nav className="mt-4">
                    <ul>
                        {filteredMenuItems.map(item => (
                            <li
                                key={item.path}
                                className={`mb-3 text-lg px-4 py-2 rounded-lg transition-shadow ${isActive(item.path) ? 'text-blue-400 font-bold' : 'text-gray-400'}`}
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
                    <p className="text-center text-gray-700 mb-4">You have to fill up the form to be admitted to the hospital.</p>
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
            <div className='flex-1 bg-gray-100 flex flex-col'>
                {/* Header Section */}
                <div className="flex items-center justify-between p-4 h-24 mb-6 bg-white">
                <div className="flex items-center">
                        <RiHome2Line className="text-gray-500 h-6 w-6 mr-2" />
                        <span style={{ color: "#00bfff" }} className='font-semibold'>
                        PersonalHealthRecord                        </span>
                        <span className='text-gray-500 ml-4 font-semibold'>Report</span>
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
                            src={"skm"}
                            alt="Profile"
                            className="h-12 w-12 rounded-full ml-4 bg-blue-200"
                        />
                        <span className="ml-2">Admin Name</span>
                    </div>
                </div>
                <div className="container mx-auto p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Doctor Report</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredDoctors.map((doctor, index) => (
                    <div key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', backgroundColor: '#f9f9f9' }}>
                         <div className="flex justify-between items-center">
                         <h2 className="flex justify-between items-center font-semibold text-lg bg-gray-100 p-3 mb-3 cursor-pointer w-full">
                                        {doctor.name}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={4}
                                            stroke="currentColor"
                                            onClick={() => handleEyeClick(doctor)}
                                            className={`w-7 h-7 cursor-pointer transition-colors duration-300 ${
                                                clickedDoctors.has(doctor.id) ? 'text-[#00bfff]' : 'text-gray-500'
                                            } hover:text-[#00bfff] bg-gray-200 p-1`}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 12c0-3.4 5-9 9-9s9 5.6 9 9-5 9-9 9-9-5.6-9-9z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12c0-1.4-1.6-2-3-2s-3 .6-3 2"
                                            />
                                        </svg>

                                    </h2>
                                </div>
                        <p><strong>Disease Name:</strong> {doctor.hospital}</p>
                        <p><strong>Test Report Name:</strong> {doctor.reportName}</p>
                        <p><strong>Report Date:</strong> {doctor.date}</p>
                    </div>
                ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestReport;
