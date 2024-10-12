import { useEffect } from 'react';
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaCamera, FaCalendarCheck, FaHospitalUser, FaFileAlt, FaBell, FaEye } from 'react-icons/fa';
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
];

const UnpaidBill = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatCurrentTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        navigate('/login');
    };

    const currentMenuItem = menuItems.find(item => item.path === location.pathname);
    const pageTitle = currentMenuItem ? currentMenuItem.name : 'Personal Health Record';

    // Sample bills data with doctor names
    const bills = [
        {
            id: 1,
            hospitalName: "Shamuba Hospital",
            billCreatedDate: "1 Oct, 2023",
            totalAmount: "$100",
            doctorName: "Dr. John Smith",
        },
        {
            id: 2,
            hospitalName: "City Hospital",
            billCreatedDate: "2 Oct, 2023",
            totalAmount: "$150",
            doctorName: "Dr. Emily Johnson",
        },
    ];

    const handlePayNow = (bill) => {
        // Navigate to BillReceipt page and pass bill data
        navigate('/billrecipt', { state: { bill } });
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

            <div className='flex-1 bg-gray-100 flex flex-col'>
                {/* Header Section */}
                <div className="flex items-center justify-between p-4 h-24 mb-6 bg-white">
                    <div className="flex items-center">
                        <RiHome2Line className="text-gray-500 h-6 w-6 mr-2" />
                        <span style={{ color: "#00bfff" }} className='font-semibold'>
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
                            src={"skm"} // Ensure this is a valid image source
                            alt="Profile"
                            className="h-12 w-12 rounded-full ml-4 bg-blue-200"
                        />
                        <span className="ml-2">Admin Name</span>
                    </div>
                </div>

                <div className="container mx-auto p-2">
                    {/* Options above the appointments */}
                    <div className="flex mb-4 p-4">
                        <Link to="/bills" className="text-gray-500 py-2 px-4 rounded text-lg" style={{ color: "#00bfff", borderBottom: "5px solid #00bfff" }}>Unpaid Bill</Link>
                        <Link to="/paidbill" className="text-gray-500 py-2 px-4 rounded">Paid Bills</Link>
                    </div>

                    <div className="container mx-auto p-4">
                        <h2 className="text-xl font-bold mb-4">Unpaid Bills</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {bills.map(bill => (
                                <div key={bill.id} className="border p-4 rounded-lg shadow-md bg-white">
                                    <div className="flex justify-between items-center mb-4 bg-gray-200 p-2">
                                        <h3 className="text-lg font-semibold">{bill.doctorName}</h3>
                                        <div className="flex space-x-2">
                                            <FaEye
                                                className="w-7 h-7 cursor-pointer transition-colors duration-300 text-gray-500 hover:text-[#00bfff] p-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <strong className="text-gray-400">Hospital name:</strong>
                                        <div className="text-gray-900 font-bold">{bill.hospitalName}</div>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <strong className="text-gray-400">Bill Created Date:</strong>
                                        <div className="text-gray-900 font-bold">{bill.billCreatedDate}</div>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <strong className="text-gray-400">Bill Credit Time:</strong>
                                        <div className="text-gray-900">{formatCurrentTime(currentTime)}</div>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <strong className="text-gray-400">Total Amount:</strong>
                                        <div className="text-gray-900 font-bold text-red-600">{bill.totalAmount}</div>
                                    </div>
                                    <button
                                        onClick={() => handlePayNow(bill)} // Pass the entire bill object
                                        className="text-white  mt-4 w-full rounded-md px-4 py-2 bg-[#00bfff] transition duration-300"
                                    >
                                        Pay Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnpaidBill;
