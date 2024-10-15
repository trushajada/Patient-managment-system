import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaCamera, FaCalendarCheck, FaHospitalUser, FaFileAlt, FaBell, FaEye, FaDownload, FaImage } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import { RiBillFill, RiLogoutBoxRFill, RiHome2Line } from 'react-icons/ri';
import logo from '../../assets/images/logo.png';
import sidebar from '../../assets/images/sidebar.png';

const menuItems = [
    { path: '/dashboard', name: 'Personal Health Record', icon: <FaHospitalUser /> },
    { path: '/booking', name: 'Appointment Booking', icon: <FaCalendarCheck /> },
    { path: '/records', name: 'Prescription Access', icon: <FaFileAlt /> },
    { path: '/teleconsultation', name: 'Teleconsultation Access', icon: <IoIosChatboxes /> },
    { path: '/chats', name: 'Chats', icon: <IoIosChatboxes /> },
    { path: '/bills', name: 'Bills', icon: <RiBillFill /> },
];

const BillRecipt = () => {
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

    const { bill } = location.state || {};
    if (!bill) {
        return <div>No bill data available.</div>;
    }

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        navigate('/login');
    };

    const currentMenuItem = menuItems.find(item => item.path === location.pathname);
    const pageTitle = currentMenuItem ? currentMenuItem.name : 'Personal Health Record';

    const patientInfo = {
        name: "Miracle Kenter",
        gender: "Male",
        age: "36 Years",
        phoneNumber: "9957 96557",
        address: "B-105 Virat Bungalows Punam Motavaracha Jamnagar.",
        diseaseName: "Stomach Ache",
        paymentType: "Insurance",
    };

    const items = [
        { description: "Neuromuscular blockers", amount: 12000, qty: 2 },
        { description: "Leucovorin with high dose methotrexate (HDMTX)", amount: 1000, qty: 2 },
        { description: "Hydroxyurea for sickle cell disease", amount: 20, qty: 2 },
    ];
    const handlePayNow = () => {
        navigate('/paytype'); 
    };
    const insuranceInfo = {
        company: "HDFC Life Insurance",
        plan: "Health insurance",
        claimAmount: 2000,
        claimedAmount: 2500,
    };

    const totalAmount = items.reduce((acc, item) => acc + (item.amount * item.qty), 0);
    const discount = 100; 
    const tax = 50; 
    const finalAmount = totalAmount - discount + tax;

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
                        <span style={{ color: "#00bfff" }} className='font-semibold'>Bills</span>
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

                <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <div className="max-w-4xl mx-auto rounded-lg">
                        <div className='flex items-center justify-between mb-4'>
                            <img src={logo} alt="logo" className='w-[200px]' />
                            <h1 className="text-2xl font-bold text-blue-600 text-right" style={{ color: "#00bfff" }}>Invoice</h1>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                                <p className='text-2xl font-semibold'>{bill.doctorName}</p>
                                <p className='w-[350px]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.alias obcaecati nesciunt </p>
                            </div>
                            <div className="flex flex-col items-end">
                                <p><strong>Bill Date: </strong> {bill.billCreatedDate}</p>
                                <div className="text-gray-900 "><strong>Bill-Time: </strong>{formatCurrentTime(currentTime)}</div>
                            </div>
                        </div>

                        <div className="flex justify-between mt-5">
                            <div className="flex-1 pr-4 w-50">
                                <p><strong>Name:</strong> <span className="ml-2">{patientInfo.name}</span></p>
                                <p><strong>Gender:</strong> <span className="ml-2">{patientInfo.gender}</span></p>
                                <p><strong>Age:</strong> <span className="ml-2">{patientInfo.age}</span></p>
                            </div>

                            <div className="flex-1 pl-4 w-50">
                                <p><strong>Phone Number:</strong> <span className="ml-2">{patientInfo.phoneNumber}</span></p>
                                <p><strong>Disease:</strong> <span className="ml-2">{patientInfo.diseaseName}</span></p>
                                <p><strong>Payment Type:</strong> <span className="ml-2">{patientInfo.paymentType}</span></p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <table className="w-full border-collapse">
                                <thead style={{ background: "#00bfff" }}>
                                    <tr className=" text-white">
                                        <th className="py-2 px-4 border">#</th>
                                        <th className="py-2 px-4 border">Description</th>
                                        <th className="py-2 px-4 border">Qty</th>
                                        <th className="py-2 px-4 border">Amount</th>
                                        <th className="py-2 px-4 border">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="py-2 px-4 border text-center">{index + 1}</td>
                                            <td className="py-2 px-4 border text-center">{item.description}</td>
                                            <td className="py-2 px-4 border text-center">{item.qty}</td>
                                            <td className="py-2 px-4 border text-center">{item.amount}</td>
                                            <td className="py-2 px-4 border text-center">{item.amount * item.qty}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end space-x-8 mt-6">
                            <div className="w-1/2">
                                <p><strong>Company:</strong> <span className="ml-2">{insuranceInfo.company}</span></p>
                                <p><strong>Plan:</strong> <span className="ml-2">{insuranceInfo.plan}</span></p>
                                <p style={{ color: "#00bfff" }} className="font-bold">
                                    <strong>Claim Amount:</strong> <span className="ml-2">${insuranceInfo.claimAmount.toFixed(2)}</span>
                                </p>
                                <p style={{ color: "#00bfff" }} className="font-bold">
                                    <strong>Claimed Amount:</strong> <span className="ml-2">${insuranceInfo.claimedAmount.toFixed(2)}</span>
                                </p>
                            </div>

                            <div className="w-1/2 text-right">
                                <p><strong>Total Amount:</strong> <span className="ml-2">${totalAmount.toFixed(2)}</span></p>
                                <p><strong>Discount:</strong> <span className="ml-2">-${discount.toFixed(2)}</span></p>
                                <p><strong>Tax:</strong> <span className="ml-2">${tax.toFixed(2)}</span></p>
                                <p style={{ color: "#00bfff" }} className="font-bold">
                                    <strong>Final Amount:</strong> <span className="ml-2">${bill.totalAmount}</span>
                                </p>
                            </div>
                        </div>
                        <div className='flex justify-between text-white p-2 rounded mt-4' style={{ background: "#00bfff" }}>
                            <p>Call: 484970945</p>
                            <p>Email: Hello@gmail.com</p>
                        </div>

                        <div className="mt-6 flex justify-center">
                        <button
            className="text-white py-3 px-4 rounded"
            style={{ background: "#00bfff" }}
            onClick={handlePayNow} // Handle the button click
        >
            Pay Now
        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillRecipt;
