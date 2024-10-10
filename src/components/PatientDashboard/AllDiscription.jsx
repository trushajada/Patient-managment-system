import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaCamera, FaCalendarCheck, FaHospitalUser, FaFileAlt, FaBell } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import { RiBillFill, RiLogoutBoxRFill, RiHome2Line } from 'react-icons/ri';
import logo from '../../assets/images/logo.png';
import sidebar from '../../assets/images/sidebar.png';
import { GoDotFill } from "react-icons/go";


// Define your menu items
const menuItems = [
  { path: '/dashboard', name: 'Personal Health Record', icon: <FaHospitalUser /> },
  { path: '/booking', name: 'Appointment Booking', icon: <FaCalendarCheck /> },
  { path: '/records', name: 'Prescription Access', icon: <FaFileAlt /> },
  { path: '/teleconsultation', name: 'Teleconsultation Access', icon: <IoIosChatboxes /> },
  { path: '/chats', name: 'Chats', icon: <IoIosChatboxes /> },
  { path: '/bills', name: 'Bills', icon: <RiBillFill /> },
];

const AllDiscription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [clickedDoctors, setClickedDoctors] = useState(new Set());

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    navigate('/login');
  };

  const currentMenuItem = menuItems.find(item => item.path === location.pathname);
  const pageTitle = currentMenuItem ? currentMenuItem.name : 'PersonalHealthRecord';

  // Sample data for description boxes
  const descriptions = [
    {
      date: '2024-10-09',
      text1: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sunt quos unde, molestiae libero eius perferendis quisquam mollitia ratione dolores.',
      text2: 'Additional information about the first description.Corrupti natus deleniti cum architecto hic nam tenetur sapiente quos voluptatum quam impedit iste autem, obcaecati optio odio eius dignissimos ab vero.',
    },
    {
      date: '2024-10-10',
      text1: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sunt quos unde, molestiae libero eius perferendis quisquam mollitia ratione dolores.',
      text2: 'Additional information about the first description.Corrupti natus deleniti cum architecto hic nam tenetur sapiente quos voluptatum quam impedit iste autem, obcaecati optio odio eius dignissimos ab vero.',
    },
    // Add more descriptions as needed
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <div className="bg-white w-[280px] rounded-lg shadow-md p-4">
        <header className="flex items-center justify-center p-4">
          <img src={logo} alt="Logo" className="mb-4 w-60 h-30" />
        </header>
        <nav className="mt-4">
          <ul>
            {menuItems.map(item => (
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
              {pageTitle}
            </span>
            <span className='text-gray-500 ml-4 font-semibold'>AllAppointments</span>
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
          {/* Options above the appointments */}
          <div className="flex mb-4">
            <Link to="/all-Appoinment" className="text-gray-500 py-2 px-4 rounded text-lg">All Appointment</Link>
            <Link to="/documnet" className="text-gray-500 py-2 px-4 rounded">All Document</Link>
            <Link to="/allprescription" className="text-gray-500 py-2 px-4 rounded">All Prescription</Link>
            <Link to="/description" style={{ color: "#00bfff", borderBottom: "5px solid #00bfff" }} className="text-gray-500 py-2 px-4 rounded">All Description</Link>
          </div>

          {/* Description Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mt-5">
            {descriptions.map((desc, index) => (
              <div key={index} className="border rounded-lg p-4 bg-white shadow-md">
                <div className="flex justify-between items-center mb-6 flex-grow bg-gray-200 p-2">
                <p className="text-lg font-bold ">Discription Date:</p>
                <p className="text-lg">{desc.date}</p>
            </div>
            <p className="mt-2 text-gray-700 mb-1">
                  <GoDotFill /> {desc.text1}
                </p>
                <p className="mt-1 text-gray-600">
                  <GoDotFill /> {desc.text2}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDiscription;
