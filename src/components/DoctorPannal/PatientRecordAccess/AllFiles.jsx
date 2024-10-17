import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { RiHome2Line } from 'react-icons/ri';
import { FaBell, FaCalendarAlt, FaEye ,FaHospitalUser, FaFileAlt} from 'react-icons/fa';
import { FaBriefcaseMedical, FaCalendarCheck } from "react-icons/fa6";
import { IoIosChatboxes } from "react-icons/io";
import { MdWifiCalling } from "react-icons/md";
import { RiLogoutBoxRFill } from "react-icons/ri";
import logo from '../../../assets/images/logo.png';
import sidebar from '../../../assets/images/sidebar.png';

const AllFiles = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);
    const { savedRecords } = location.state || { savedRecords: [] };

    const menuItems = [
        { path: '/doctorDashboard', name: 'Appointment Management', icon: <FaCalendarCheck /> },
        { path: '/patientRecord', name: 'Patient Record Access', icon: <FaCalendarCheck /> },
        {
            path: '/create', name: 'Prescription Tool', icon: <FaHospitalUser />,
            submenu: [
                { path: '/create', name: 'Create' },
                { path: '/manage', name: 'Manage' }
            ]
        },
        { path: '/module', name: 'Teleconsultation Module', icon: <FaFileAlt /> },
        { path: '/chats', name: 'Chats', icon: <IoIosChatboxes /> },
    ];


    const prescriptionDetails = [
        { label: "Hospital Name", value: "Medical Center" },
        { label: "Prescription Date", value: "2 Jan, 2022" },
        { label: "Patient Name", value: "Alabatro Bhajirao" },
        { label: "Age", value: "36 Year" },
        { label: "Gender", value: "Male" },
        { label: "Address", value: "B-105 Virat Bungalows Punagam Motavaracha Jamnagar." }
    ];

    const toggleDropdown = (itemName) => {
        setOpenDropdown(openDropdown === itemName ? null : itemName);
    };

    const handleLogout = () => {
        localStorage.removeItem('dashlogin');
        navigate('/login');
    };

    const handleFullPrescriptionClick = () => {
        // Pass only serializable data, e.g., prescription details
        const serializedPrescription = prescriptionDetails.map(detail => ({
            label: detail.label,
            value: detail.value,
        }));

        navigate('/RecordPrescription', { state: { prescription: serializedPrescription } });
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="bg-gray-100 min-h-screen flex">
            {/* Sidebar */}
            <div className="bg-white max-w-[314px] rounded-lg shadow-md p-4">
                <header className="flex items-center justify-center p-4">
                    <img src={logo} alt="Logo" className="mb-4 w-60 h-30" />
                </header>
                <nav className="mt-4">
                    <ul>
                        {menuItems.map((item) => (
                            <li
                                key={item.path}
                                className={`mb-3 text-lg px-4 py-2 rounded-lg transition-shadow ${isActive(item.path) ? 'text-[#00bfff] font-bold' : 'text-gray-400'}`}
                            >
                                <Link to={item.path} className="flex items-center gap-2">
                                    {item.icon} {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex flex-col items-center mb-6">
                    <img src={sidebar} alt="sidebar" className="w-[182px] h-[164px] mb-4" />
                    <h2 className="text-lg font-semibold text-center mb-2">Hospital Appointment</h2>
                    <p className="text-center text-gray-700 mb-4">You have to fill up the form to be admitted to the hospital.</p>
                    <button className="bg-blue-500 text-white py-3 w-full rounded-full transition duration-200" style={{ background: '#00bfff' }}>
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

            {/* Content */}
            <div className="flex-1 bg-gray-100 flex flex-col">
                <div className="flex items-center justify-between p-4 h-24 mb-6 bg-white">
                    <div className="flex items-center">
                        <RiHome2Line className="text-gray-500 h-6 w-6 mr-2" />
                        <span style={{ color: "#00bfff" }} className='font-semibold'>
                            {menuItems.find(item => item.path === location.pathname)?.name || 'Patient Record Access'}
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
                            src="user_profile_picture_url" // Replace with actual URL
                            alt="Profile"
                            className="h-12 w-12 rounded-full ml-4 bg-blue-200"
                        />
                        <span className="ml-2">Admin Name</span>
                    </div>
                </div>

                <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
                    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-6 ">All Files</h2>

                        {savedRecords.length > 0 ? (
                            savedRecords.map((record, index) => (
                                <div key={index} className="p-6 rounded-lg shadow-md mb-8">
                                    <h3 className="text-xl font-semibold mb-4">All Uploaded Files</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 mb-6">
                                        {record.files && record.files.map((file, idx) => (
                                            <div key={idx} className="bg-gray-50 p-3 border rounded-lg flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={file.name}
                                                        className="w-12 h-12 object-cover rounded mr-3"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium">{file.name}</p>
                                                        <p className="text-xs text-gray-500">5.09 MB</p>
                                                    </div>
                                                </div>
                                                <button className="text-blue-500">
                                                    <FaEye />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <h3 className="text-xl font-semibold mb-4">Prescription</h3>
                                    <div className="p-6 relative">
                                        {/* Prescription Container */}
                                        <div className="p-4 rounded-lg border mt-6 w-full bg-gray-100 relative">
                                            {/* Logo and Doctor's Name */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center mb-4">
                                                <img src={logo} alt="logo" className="w-72 mx-auto sm:mx-0" />
                                                <h1 className="text-2xl text-center sm:text-right text-[#00bfff]">Dr. Bharat Patel</h1>
                                            </div>

                                            {/* Prescription Details */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                                                {prescriptionDetails.map((detail, idx) => (
                                                    <p
                                                        key={idx}
                                                        className={`text-md ${detail.label === "Gender" || detail.label === "Address" ? "sm:col-span-2" : ""}`}
                                                    >
                                                        <strong>{detail.label}:</strong> {detail.value}
                                                    </p>
                                                ))}
                                            </div>

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center rounded-lg">
                                                <button
                                                    onClick={handleFullPrescriptionClick}
                                                    className="bg-[#00bfff] text-white px-4 py-2 rounded-lg shadow-md"
                                                >
                                                    View Full Prescription
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">Description</h3>
                                    <p className="text-sm text-gray-700">{record.description}</p>
                                </div>
                            ))
                        ) : (
                            <p>No records found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllFiles;
