import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { RiHome2Line, RiLogoutBoxRFill } from 'react-icons/ri';
import { FaBell, FaChevronDown, FaCalendarAlt, FaEye } from 'react-icons/fa';
import logo from '../../../assets/images/logo.png';
import sidebar from '../../../assets/images/sidebar.png';
import { FaBriefcaseMedical, FaCalendarCheck } from "react-icons/fa6";
import { IoIosChatboxes } from "react-icons/io";
import { MdWifiCalling } from "react-icons/md";

const PatientRecordView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);
    const { patient } = location.state || {}; // Assuming patient data is passed through state
    const [currentTime, setCurrentTime] = useState(new Date());

    const menuItems = [
        {
            path: '/doctorDashboard', name: 'Appointment Management', icon: <FaCalendarAlt />,
        },
        {
            path: '/patientRecord', name: 'Patient Record Access', icon: <FaCalendarCheck />
        },
        {
            path: '/tools', name: 'Prescription Tool', icon: <FaBriefcaseMedical />
        },
        {
            path: '/module', name: 'Teleconsultation Module', icon: <MdWifiCalling />
        },
        { path: '/chats', name: 'Chats', icon: <IoIosChatboxes /> },
    ];
    const patientInfo = {
        name: "Marcus Philips",
        number: "99130 44537",
        issue: "Feeling tired",
        gender: "Male",
        age: "20 Years",
        doctor: "Dr. Marcus Philips",
        appointmentType: "Online",
        address: "B-408 Swastik society, mota varacha rajkot.",
        lastAppointmentDate: "2 Jan, 2022",
        lastAppointmentTime: "4:30 PM"
    };

    // Sample appointment data
    const appointments = [
        { name: "Marcus Philips", issue: "Feeling Tired", date: "2 Jan, 2022", time: "4:30 PM", type: "Online" },
        { name: "London Shaffer", issue: "Stomach Ache", date: "2 Jan, 2022", time: "5:00 PM", type: "Onsite" },
        { name: "Marcus Philips", issue: "Feeling Tired", date: "2 Jan, 2022", time: "1:30 PM", type: "Online" },
        { name: "London Shaffer", issue: "Stomach Ache", date: "2 Jan, 2022", time: "8:00 AM", type: "Onsite" },
        { name: "Marcus Philips", issue: "Feeling Tired", date: "2 Jan, 2022", time: "4:30 PM", type: "Online" },
    ];
    const isActive = (path) => location.pathname === path;

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    const handleAddRecordClick = () => {
        navigate('/add-record');
    };
    // Move the useEffect outside any condition
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatCurrentTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (!patient) {
        return <div>No patient data available.</div>;
    }

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
                                <div
                                    onClick={item.subItems ? () => toggleDropdown(item.name) : undefined}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    {item.icon}
                                    {item.subItems ? (
                                        <>
                                            <span>{item.name}</span>
                                            <FaChevronDown
                                                className={`ml-auto transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`}
                                            />
                                        </>
                                    ) : (
                                        <Link to={item.path} className="flex items-center gap-2">
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                                {openDropdown === item.name && item.subItems && (
                                    <ul className="pl-4 mt-2">
                                        {item.subItems.map((subItem) => (
                                            <li
                                                key={subItem.path}
                                                className={`mb-2 text-lg px-2 py-1 rounded-lg transition-shadow ${isActive(subItem.path) ? 'text-[#00bfff] font-bold' : 'text-gray-400'}`}
                                            >
                                                <Link to={subItem.path}>{subItem.name}</Link>
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

                <div className="p-8">
            {/* Patient Details Section */}
            <div className="bg-white shadow-lg p-6 rounded-lg mb-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Patient Detail</h1>
                <button
                    className="bg-[#00bfff] text-white py-2 px-4 rounded-lg"
                    onClick={handleAddRecordClick}
                >
                    + Add Record
                </button>            </div>
                <div className="flex items-center mb-4">
                    <img
                        src="https://via.placeholder.com/80"
                        alt="Patient"
                        className="w-40 h-40 rounded-full mr-6"
                    />
                    <div className="grid grid-cols-5 gap-4">
                        

                        <div>
                            <p className="text-sm font-semibold text-gray-500">Patient Name</p>
                            <p className="text-lg font-bold">{patientInfo.name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Patient Number</p>
                            <p className="text-lg font-bold">{patientInfo.number}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Patient Issue</p>
                            <p className="text-lg font-bold">{patientInfo.issue}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Patient Gender</p>
                            <p className="text-lg font-bold">{patientInfo.gender}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Last Appointment Date</p>
                            <p className="text-lg font-bold">{patientInfo.lastAppointmentDate}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Doctor Name</p>
                            <p className="text-lg font-bold">{patientInfo.doctor}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Patient Age</p>
                            <p className="text-lg font-bold">{patientInfo.age}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Appointment Type</p>
                            <p className="text-lg font-bold">{patientInfo.appointmentType}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Patient Address</p>
                            <p className="text-lg font-bold">{patientInfo.address}</p>
                        </div>
                       
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Last Appointment Time</p>
                            <p className="text-lg font-bold">{patientInfo.lastAppointmentTime}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* All Appointments Table */}
            <div className="bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">All Appointments</h2>
                <table className="min-w-full bg-white border-collapse">
                    <thead className='bg-gray-200'>
                        <tr>
                            <th className="py-2 px-4 border-b-2 text-left text-gray-600">Disease Name</th>
                            <th className="py-2 px-4 border-b-2 text-left text-gray-600">Patient Issue</th>
                            <th className="py-2 px-4 border-b-2 text-left text-gray-600">Appointment Date</th>
                            <th className="py-2 px-4 border-b-2 text-left text-gray-600">Appointment Time</th>
                            <th className="py-2 px-4 border-b-2 text-left text-gray-600">Appointment Type</th>
                            <th className="py-2 px-4 border-b-2 text-left text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{appointment.name}</td>
                                <td className="py-2 px-4 border-b">{appointment.issue}</td>
                                <td className="py-2 px-4 border-b">{appointment.date}</td>
                                <td className="py-2 px-4 border-b text-blue-500">{appointment.time}</td>
                                <td className="py-2 px-4 border-b">
                                    <span className={`py-1 px-3 rounded-full text-white ${appointment.type === "Online" ? "bg-yellow-400" : "bg-blue-400"}`}>
                                        {appointment.type}
                                    </span>
                                </td>
                                <td className=" px-4 py-2">
                                <FaEye
                                            className="w-7 h-7 cursor-pointer transition-colors duration-300 text-gray-500 hover:text-[#00bfff] p-1"
                                        />
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
            </div>
        </div>
    );
};

export default PatientRecordView;
