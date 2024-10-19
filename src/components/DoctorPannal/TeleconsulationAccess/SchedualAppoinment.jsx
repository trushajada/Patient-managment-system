import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { RiHome2Line, RiLogoutBoxRFill } from 'react-icons/ri';
import { FaBell, FaChevronDown, FaCalendarCheck, FaHospitalUser, FaFileAlt, FaEye } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import logo from '../../../assets/images/logo.png';
import sidebar from '../../../assets/images/sidebar.png';
import { BsFillCalendarEventFill } from "react-icons/bs";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaCalendarXmark } from "react-icons/fa6";

const appointmentsData = [
    {
        id: 1,
        doctorName: "Dr. Ryan Vetrovs",
        type: "Online",
        hospital: "Shamuba Hospital",
        date: "2022-01-02",
        time: "10:20 AM",
        issue: "Feeling Tired",
    },
    {
        id: 2,
        doctorName: "Dr. Amelia Stone",
        type: "Online",
        hospital: "Green Valley Clinic",
        date: "2022-02-05",
        time: "11:30 AM",
        issue: "Headache",
    },
    {
        id: 3,
        doctorName: "Dr. Michael Ross",
        type: "Online",
        hospital: "City Hospital",
        date: "2022-03-12",
        time: "9:00 AM",
        issue: "Back Pain",
    },
    {
        id: 4,
        doctorName: "Dr. Sophie Turner",
        type: "Online",
        hospital: "Lakeside Hospital",
        date: "2022-04-20",
        time: "3:45 PM",
        issue: "Skin Rash",
    }
];

const SchedualAppoinment = () => {
    const [headerSearchTerm, setHeaderSearchTerm] = useState('');
    const [tableSearchTerm, setTableSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);
    const [appointments, setAppointments] = useState(appointmentsData);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/doctorDashboard', name: 'Appointment Management', icon: <FaCalendarCheck /> },
        { path: '/patientRecord', name: 'Patient Record Access', icon: <FaCalendarCheck /> },
        {
            path: '/create', name: 'Prescription Tool', icon: <FaHospitalUser />,
            subItems: [
                { path: '/create', name: 'Create' },
                { path: '/manage', name: 'Manage' }
            ]
        },
        { path: '/module', name: 'Teleconsultation Module', icon: <FaFileAlt /> },
        { path: '/chats', name: 'Chats', icon: <IoIosChatboxes /> },
    ];

    const toggleDropdown = (itemName) => {
        setOpenDropdown(openDropdown === itemName ? null : itemName);
    };

    const isActive = (path) => location.pathname === path;

    const filteredAppointments = appointments.filter((appointment) => {
        const matchesDoctorName = appointment.doctorName.toLowerCase().includes(tableSearchTerm.toLowerCase());
        const matchesDate = selectedDate ? appointment.date === selectedDate : true;
        return matchesDoctorName && matchesDate;
    });

    const handleLogout = () => {
        navigate('/login');
    };

    const handleNavigateToTimeSlot = () => {
    };
    const handleCancelAppointment = (id) => {
        setAppointments(prevAppointments =>
            prevAppointments.filter(appointment => appointment.id !== id)
        );
    };
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
                            <li key={item.path} className={`mb-3 px-4 py-2 rounded-lg ${isActive(item.path) ? 'text-[#00bfff] font-bold' : 'text-gray-400'}`}>
                                <div onClick={item.subItems ? () => toggleDropdown(item.name) : undefined} className="flex items-center gap-2 cursor-pointer">
                                    {item.icon}
                                    {item.subItems ? (
                                        <>
                                            <span>{item.name}</span>
                                            <FaChevronDown className={`ml-auto ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                                        </>
                                    ) : (
                                        <Link to={item.path} className="flex items-center gap-2">{item.name}</Link>
                                    )}
                                </div>
                                {openDropdown === item.name && item.subItems && (
                                    <ul className="pl-4 mt-2">
                                        {item.subItems.map((subItem) => (
                                            <li key={subItem.path} className="mb-2 px-2 py-1">
                                                <Link to={subItem.path} className={`${isActive(subItem.path) ? 'text-[#00bfff] font-bold' : 'text-gray-400'}`}>
                                                    {subItem.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex flex-col items-center mb-6">
                    <img src={sidebar} alt="sidebar" className="w-[182px] h-[164px] mb-4" />
                    <h2 className="text-lg font-semibold text-center mb-2">Hospital Appointment</h2>
                    <p className="text-center text-gray-700 mb-4">You have to fill up the form to be admitted to the hospital.</p>
                    <button className="bg-[#00bfff] text-white py-3 w-full rounded-full">Appointment</button>
                </div>
                <button onClick={handleLogout} className="flex items-center bg-red-100 text-red-600 rounded-md py-2 px-6 w-full hover:bg-red-200">
                    <RiLogoutBoxRFill className="mr-3" /> Log Out
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 bg-gray-100 flex flex-col">
                <div className="flex items-center justify-between p-4 h-24 mb-6 bg-white">
                    <div className="flex items-center">
                        <RiHome2Line className="text-gray-500 h-6 w-6 mr-2" />
                        <span style={{ color: "#00bfff " }} className='font-semibold'>
                            {menuItems.find(item => item.path === location.pathname)?.name || 'Appointment Management'}
                        </span>
                    </div>
                    <div className="flex items-center justify-end w-[calc(70%-30px)]">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={headerSearchTerm}
                            onChange={(e) => setHeaderSearchTerm(e.target.value)}
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
                        <img src="user_profile_picture_url" alt="Profile" className="h-12 w-12 rounded-full ml-4 bg-blue-200" />
                        <span className="ml-2">Admin Name</span>
                    </div>
                </div>
                <div className="flex mb-4 p-4">
                    <Link to="/module" className="text-gray-500 py-2 px-4 rounded" style={{ color: "#00bfff", borderBottom: "5px solid #00bfff" }}>Scheduled Appointments</Link>
                    <Link to="/Previousappo" className="text-gray-500 py-2 px-4 rounded">Previous Appointments</Link>
                    <Link to="/Cancleappo" className="text-gray-500 py-2 px-4 rounded">Cancle Appointments</Link>
                    <Link to="/pendding" className="text-gray-500 py-2 px-4 rounded">Pendding Appointments</Link>

                </div>
                <div className="flex-1  flex flex-col p-4 ">
                    <div className="bg-white shadow-lg p-6 rounded-lg h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold">My Appointments</h1>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="text"
                                    placeholder="Search Patient"
                                    className="p-2 border border-gray-300 rounded w-72"
                                    onChange={(e) => setTableSearchTerm(e.target.value)}
                                />
                                <input
                                    type="date"
                                    className="p-2 border border-gray-300 rounded"
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                                <button className="p-2 font-bold text-white rounded bg-[#00bfff]" onClick={handleNavigateToTimeSlot}>Book Appoinment</button>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-1">
                            {filteredAppointments.map((appointment) => (
                                <div
                                    key={appointment.id}
                                    className="bg-white shadow-md rounded-lg p-4 w-80 border hover:shadow-lg transition-shadow"
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-center mb-3 bg-gray-100 p-1">
                                        <h2 className="text-gray-800 font-bold ms-2">{appointment.doctorName}</h2>
                                        <div className="flex space-x-2">
                                            <button >
                                                <BsFillCalendarEventFill className="w-6 h-6 cursor-pointer transition-colors duration-300 text-gray-500 hover:text-[#00bfff] p-1" />
                                            </button>
                                            <button>
                                                <FaEye
                                                    className="w-7 h-7 cursor-pointer transition-colors duration-300 text-gray-500 hover:text-[#00bfff] p-1"
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Appointment Details */}
                                    <div className="text-sm text-gray-600">
                                        <div className="flex justify-between mb-1">
                                            <span className="font-semibold text-gray-400 ">Appointment Type</span>
                                            <span className={`font-bold ${appointment.type === "Online" ? "text-yellow-400" : "text-blue-600"}`}>
                                                {appointment.type}
                                            </span>
                                        </div>
                                        <div className="flex justify-between mb-1 ">
                                            <span className="font-semibold text-gray-400">Hospital Name:</span>
                                            <span className='font-semibold'>{appointment.hospital}</span>
                                        </div>
                                        <div className="flex justify-between mb-1">
                                            <span className="font-semibold text-gray-400">Appointment Date:</span>
                                            <span className='font-semibold'>{appointment.date}</span>
                                        </div>

                                        <div className="flex justify-between mb-1">
                                            <span className="font-semibold text-gray-400">Appointment Time:</span>
                                            <span className='font-semibold'>{appointment.time}</span>
                                        </div>
                                        <div className="flex justify-between mb-1">
                                            <span className="font-semibold text-gray-400">Patient Issue:</span>
                                            <span className='font-semibold'>{appointment.issue}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-4 flex justify-between">
                                        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg flex items-center space-x-2" onClick={() => handleCancelAppointment(appointment.id)} >
                                            <FaCalendarXmark />
                                            <span>Cancel</span>
                                        </button>
                                        <button className="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center space-x-2">
                                            <BiSolidPhoneCall />
                                            <span>Join Call</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchedualAppoinment;
