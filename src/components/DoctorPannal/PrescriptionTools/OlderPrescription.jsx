import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { RiHome2Line, RiLogoutBoxRFill } from 'react-icons/ri';
import { FaBell, FaChevronDown, FaHospitalUser, FaFileAlt, FaEye } from 'react-icons/fa';
import { FaCalendarCheck } from "react-icons/fa6";
import { IoIosChatboxes } from "react-icons/io";
import logo from '../../../assets/images/logo.png';
import sidebar from '../../../assets/images/sidebar.png';

const OlderPrescription = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);

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

    const patientsolder = [
        { name: 'Marcus Philips', number: '89564 25462', type: 'Online', time: '4:30 PM', age: '22 Years', gender: 'Male' },
        { name: 'London Shaffer', number: '89564 25462', type: 'Onsite', time: '5:00 PM', age: '74 Years', gender: 'Female' },
        { name: 'Julianna Warren', number: '89564 25462', type: 'Onsite', time: '4:30 PM', age: '44 Years', gender: 'Female' },
        // ...other patients
    ];

    const handleLogout = () => {
        localStorage.removeItem('dashlogin');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;
    const currentMenuItem = menuItems.find(item => item.path === location.pathname);
    const pageTitle = currentMenuItem ? currentMenuItem.name : 'Prescription Tool';

    // Filter patients based on the search term
    const filteredpatientsolder= patientsolder.filter(patientsolder =>
        patientsolder.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            <li key={item.path} className={`mb-3 text-md px-4 py-2 rounded-lg transition-shadow ${isActive(item.path) ? 'text-[#00bfff] font-bold' : 'text-gray-400'}`}>
                                <div onClick={item.submenu ? () => toggleDropdown(item.name) : undefined} className="flex items-center gap-2 cursor-pointer">
                                    {item.icon}
                                    {item.submenu ? (
                                        <>
                                            <span>{item.name}</span>
                                            <FaChevronDown className={`ml-auto transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                                        </>
                                    ) : (
                                        <Link to={item.path} className="flex items-center gap-2">
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                                {openDropdown === item.name && item.submenu && (
                                    <ul className="pl-4 mt-2">
                                        {item.submenu.map((subItem) => (
                                            <li key={subItem.path} className={`mb-2 text-lg px-2 py-1 rounded-lg transition-shadow ${isActive(subItem.path) ? 'text-[#00bfff] font-bold' : 'text-gray-400'}`}>
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
                <button className="flex items-center text-lg font-semibold bg-red-100 text-red-600 rounded-md py-2 px-6 w-full hover:bg-red-200" onClick={handleLogout}>
                    <RiLogoutBoxRFill className="mr-3" /> Log Out
                </button>
            </div>

            {/* Content */}
            <div className="flex-1  flex flex-col">
                <div className="flex items-center justify-between p-4 h-24 mb-6 bg-white">
                    <div className="flex items-center">
                        <RiHome2Line className="text-gray-500 h-6 w-6 mr-2" />
                        <span style={{ color: "#00bfff" }} className='font-semibold'>{pageTitle}</span>
                        <span class="text-gray-500 ml-4 font-semibold">Manage</span>
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
                        <img src={"skm"} alt="Profile" className="h-12 w-12 rounded-full ml-4 bg-blue-200" />
                        <span className="ml-2">Admin Name</span>
                    </div>
                </div>
                <div className="flex mb-4 p-4">
                        <Link to="/manage" className="text-gray-500 py-2 px-4 rounded">Today Prescription</Link>
                        <Link to="/older" className="text-gray-500 py-2 px-4 rounded"  style={{ color: "#00bfff", borderBottom: "5px solid #00bfff" }} >Older Prescription</Link>
                    </div>
                <div className="flex-1  flex flex-col p-4">
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-semibold">Patient Detail</h1>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search by patient name..."
                                    className="p-2 border border-gray-300 rounded w-72"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <table className="min-w-full bg-white border-collapse">
                            <thead className='bg-gray-200'>
                                <tr>
                                    <th className="py-3 px-6 text-left">Patient Name</th>
                                    <th className="py-3 px-6 text-left">Patient Number</th>
                                    <th className="py-3 px-6 text-left">Appointment Type</th>
                                    <th className="py-3 px-6 text-left">Appointment Time</th>
                                    <th className="py-3 px-6 text-left">Age</th>
                                    <th className="py-3 px-6 text-left">Gender</th>
                                    <th className="py-3 px-6 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
    {filteredpatientsolder.map((patientsolder, index) => (
        <tr key={index} className='border-b border-gray-300 mt-4'>
            <td className="py-3 px-6 text-left">{patientsolder.name}</td> {/* Changed patient to patientstoday */}
            <td className="py-3 px-6 text-left">{patientsolder.number}</td> {/* Changed patient to patientstoday */}
            <td className="py-3 px-6 text-left">{patientsolder.type}</td> {/* Changed patient to patientstoday */}
            <td className="py-3 px-6 text-left">{patientsolder.time}</td> {/* Changed patient to patientstoday */}
            <td className="py-3 px-6 text-left">{patientsolder.age}</td> {/* Changed patient to patientstoday */}
            <td className="py-3 px-6 text-left">{patientsolder.gender}</td> {/* Changed patient to patientstoday */}
            <td className="py-3 px-6 text-left">
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

export default OlderPrescription;
