import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { RiHome2Line } from 'react-icons/ri';
import { FaBell, FaChevronDown, FaCalendarAlt, FaEye, FaHospitalUser, FaFileAlt } from 'react-icons/fa';
import { FaBriefcaseMedical, FaCalendarCheck } from "react-icons/fa6";
import { IoIosChatboxes } from "react-icons/io";
import { MdWifiCalling } from "react-icons/md";
import { RiLogoutBoxRFill } from "react-icons/ri";
import logo from '../../../assets/images/logo.png';
import sidebar from '../../../assets/images/sidebar.png';

const PatientRecordAccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);
    const [filter, setFilter] = useState('Month');
    const [currentTime, setCurrentTime] = useState(new Date());

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


    const toggleDropdown = (itemName) => {
        setOpenDropdown(openDropdown === itemName ? null : itemName);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatCurrentTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const patients = [
        { name: 'Marcus Philips', disease: 'Viral Infection', issue: 'Feeling Tired', date: '2024-10-12', age: '22 Years', gender: 'Male' },
        { name: 'London Shaffer', disease: 'Diabetes', issue: 'Stomach Ache', date: '2024-10-07', age: '45 Years', gender: 'Male' },
        // Add more patient records here
    ];

    const handleFilterChange = (e) => setFilter(e.target.value);
    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const filterPatientsByDate = () => {
        const currentDate = new Date();
        return patients.filter(patient => {
            const patientDate = new Date(patient.date);
            const timeDifference = currentDate - patientDate;
            const oneDay = 24 * 60 * 60 * 1000;

            if (filter === "Day") {
                return timeDifference <= oneDay;
            } else if (filter === "Week") {
                return timeDifference <= 7 * oneDay;
            } else if (filter === "Month") {
                return timeDifference <= 30 * oneDay;
            }
            return true;
        });
    };

    const filteredPatients = filterPatientsByDate().filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLogout = () => {
        localStorage.removeItem('dashlogin');
        navigate('/login');
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
                                className={`mb-3 text-md px-4 py-2 rounded-lg transition-shadow ${isActive(item.path) ? 'text-[#00bfff] font-bold' : 'text-gray-400'}`}
                                style={{
                                    fontWeight: isActive(item.path) ? 'bold' : 'normal',
                                    color: isActive(item.path) ? '#00bfff' : 'gray',
                                }}
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
                        <span style={{ color: "#00bfff " }} className='font-semibold'>
                            {menuItems.find(item => item.path === location.pathname)?.name || 'Personal Health Record'}
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

                {/* Record Table */}
                <div className="flex-1  flex flex-col p-4">
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-semibold">Patient Record Access</h1>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="border rounded-full px-4 py-3 h-10 w-75"
                                />
                                <select
                                    className="ml-4 h-10 px-2 border rounded text-gray-500"
                                    value={filter}
                                    onChange={handleFilterChange}
                                >
                                    <option value="Day">Today</option>
                                    <option value="Week">This Week</option>
                                    <option value="Month">This Month</option>
                                </select>
                            </div>
                        </div>

                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-200 ">
                                    <th className=" px-4 py-2">Patient Name</th>
                                    <th className=" px-4 py-2">Disease</th>
                                    <th className=" px-4 py-2">Patient Issue</th>
                                    <th className=" px-4 py-2">Last Appoinment Date</th>
                                    <th className=" px-4 py-2">Last Appoinment Time</th>
                                    <th className=" px-4 py-2">Age</th>
                                    <th className=" px-4 py-2">Gender</th>
                                    <th className=" px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPatients.map((patient, index) => (
                                    <tr key={index} className='border-b border-gray-300 mt-4'>
                                        <td className=" px-4 py-2">{patient.name}</td>
                                        <td className=" px-4 py-2">{patient.disease}</td>
                                        <td className=" px-4 py-2">{patient.issue}</td>
                                        <td className=" px-4 py-2">{patient.date}</td>
                                        <div className="text-gray-900 px-4 py-2">{formatCurrentTime(currentTime)}</div>

                                        <td className=" px-4 py-2">{patient.age}</td>
                                        <td className=" px-4 py-2">{patient.gender}</td>
                                        <td className=" px-4 py-2">
                                            <FaEye
                                                className="w-7 h-7 cursor-pointer transition-colors duration-300 text-gray-500 hover:text-[#00bfff] p-1"
                                                onClick={() => navigate('/patientRecordView', { state: { patient } })}
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

export default PatientRecordAccess;
