import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaCalendarCheck, FaHospitalUser, FaFileAlt, FaBell, FaDownload, FaCalendarAlt, FaTimesCircle, FaEye } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import { RiBillFill, RiLogoutBoxRFill, RiHome2Line } from 'react-icons/ri';
import logo from '../../assets/images/logo.png';
import sidebar from '../../assets/images/sidebar.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaImage } from "react-icons/fa";


// Define your menu items
const menuItems = [
    { path: '/dashboard', name: 'Personal Health Record', icon: <FaHospitalUser /> },
    { path: '/booking', name: 'Appointment Booking', icon: <FaCalendarCheck /> },
    { path: '/records', name: 'Prescription Access', icon: <FaFileAlt /> },
    { path: '/teleconsultation', name: 'Teleconsultation Access', icon: <IoIosChatboxes /> },
    { path: '/chats', name: 'Chats', icon: <IoIosChatboxes /> },
    { path: '/bills', name: 'Bills', icon: <RiBillFill /> },
    { path: '/edit-profile', name: 'Edit Profile', icon: null }
];

const PrescriptionAccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [clickedDoctors, setClickedDoctors] = useState(new Set());
    const [uploadedImages, setUploadedImages] = useState({});
    const [startDate, setStartDate] = useState(null);  // DatePicker start date
    const [endDate, setEndDate] = useState(null);  // DatePicker end date
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    // Function to format current time as HH:MM
    const formatCurrentTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };


    // Handle image upload
    const handleImageUpload = (e, doctorId) => {
        const file = e.target.files[0];
        if (file && file.type === 'image/jpeg') {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedImages((prevImages) => ({
                    ...prevImages,
                    [doctorId]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a JPG image.');
        }
    };

    // Sample data for doctors
    const doctorsData = [
        { id: 1, name: "Dr. Ryan Vetrov", hospital: "Artemis Hospital", disease: "Viral Infection", date: "2 Jan, 2022", time: "10:00 AM" },
        { id: 2, name: "Dr. Omar Herwitz", hospital: "Artemis Hospital", disease: "Viral Infection", date: "2 Jan, 2022", time: "10:30 AM" },
        // Add more doctor entries here...
    ];

    // Filter doctors based on search term
    const filteredDoctors = doctorsData.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Highlight active sidebar item
    const isActive = (path) => location.pathname === path;

    // Handle download click
    const handleDownloadClick = (doctor) => {
        console.log(`Download doctor data for: ${doctor.name}`);
        setClickedDoctors((prev) => {
            const newClickedDoctors = new Set(prev);
            newClickedDoctors.add(doctor.id);
            return newClickedDoctors;
        });
        navigate(`/Accessdownload`, { state: { doctor } });
    };

    // Filter menu items based on search term
    const filteredMenuItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle Logout
    const handleLogout = () => {
        navigate('/login');
    };

    // Get the current page title
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
                        {filteredMenuItems.map(item => (
                            <li
                                key={item.path}
                                className={`mb-3 text-lg px-4 py-2 rounded-lg transition-shadow ${isActive(item.path) ? 'text-[#00bfff] font-bold' : 'text-gray-400'
                                    }`}
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
                    <button
                        className="bg-blue-500 text-white py-3 w-full rounded-full transition duration-200"
                        style={{ background: "#00bfff" }}
                    >
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
                            src={"skm"} // Placeholder for profile image
                            alt="Profile"
                            className="h-12 w-12 rounded-full ml-4 bg-blue-200"
                        />
                        <span className="ml-2">Admin Name</span>
                    </div>
                </div>
                {/* Doctor Prescriptions */}
                <div className="container mx-auto p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Doctor Prescriptions</h1>
                        <div className="flex items-center border rounded-lg p-2 space-x-2">
                            <FaCalendarAlt className="text-gray-500" />
                            <DatePicker
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update) => {
                                    const [start, end] = update;
                                    setStartDate(start);
                                    setEndDate(end);
                                }}
                                placeholderText="Select dates"
                                className="outline-none h-10"
                            />
                            {startDate && endDate && (
                                <FaTimesCircle
                                    onClick={() => {
                                        setStartDate(null);
                                        setEndDate(null);
                                    }}
                                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                />
                            )}
                        </div>
                    </div>
                    {/* Grid for Doctor Prescriptions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredDoctors.map(doctor => (
                            <div key={doctor.id} className="border p-4 rounded-lg shadow-md bg-white">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">{doctor.name}</h3>
                                    <div className="flex space-x-2">
                                        <FaEye
                                            className="w-7 h-7 cursor-pointer transition-colors duration-300 text-gray-500 hover:text-[#00bfff] p-1"
                                        />
                                        <FaDownload
                                            onClick={() => handleDownloadClick(doctor)} // Ensure this function exists
                                            className={`w-7 h-7 cursor-pointer transition-colors duration-300 ${clickedDoctors.has(doctor.id) ? 'text-[#00bfff]' : 'text-gray-500'
                                                } hover:text-[#00bfff] bg-gray-200 p-1`}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between mt-2">
                                    <strong className="text-gray-400">Hospital:</strong>
                                    <div className="text-gray-900">{doctor.hospital}</div>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <strong className="text-gray-400">Disease:</strong>
                                    <div className="text-gray-900">{doctor.disease}</div>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <strong className="text-gray-400">Date:</strong>
                                    <div className="text-gray-900">{doctor.date}</div>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <strong className="text-gray-400">Time:</strong>
                                    <div className="text-gray-900">{formatCurrentTime(currentTime)}</div>

                                </div>

                                <div className="flex justify-between mt-4">
                                    <label className=" flex cursor-pointer text-black-500 border text-lg font-bold
                                     p-4 w-full text-center ">
                                        <FaImage className='me-4 text-2xl' />
                                        Prescription Image-jpg
                                        <input
                                            type="file"
                                            onChange={(e) => handleImageUpload(e, doctor.id)}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {uploadedImages[doctor.id] && (
                                    <img
                                        src={uploadedImages[doctor.id]}
                                        alt={`Uploaded for ${doctor.name}`}
                                        className="mt-2 w-full h-32 object-cover rounded"
                                    />
                                )}
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionAccess;

