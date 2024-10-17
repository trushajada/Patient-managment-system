import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { RiHome2Line, RiLogoutBoxRFill } from 'react-icons/ri';
import { FaBell, FaChevronDown, FaCalendarAlt, FaBriefcaseMedical, FaCalendarCheck ,FaEye} from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import { MdWifiCalling } from 'react-icons/md';
import logo from '../../../assets/images/logo.png';
import sidebar from '../../../assets/images/sidebar.png';

const ToolsCreate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);
    const [appointments, setAppointments] = useState([]); // Define state for appointments

    // Mock data for testing
    useEffect(() => {
        const mockAppointments = [
            {
                id: 1,
                name: 'John Doe',
                type: 'onsit',
                age: 30,
                gender: 'Male',
                time: '10:00 AM',
                status: 'Scheduled'
            },
            {
                id: 2,
                name: 'Jane Smith',
                type: 'onsite',
                age: 25,
                gender: 'Female',
                time: '11:30 AM',
                status: 'Completed'
            }
        ];
        setAppointments(mockAppointments);
    }, []);

    const menuItems = [
        { path: '/doctorDashboard', name: 'Appointment Management', icon: <FaCalendarAlt /> },
        { path: '/patientRecord', name: 'Patient Record Access', icon: <FaCalendarCheck /> },
        { 
            path:'/create', name: 'Prescription Tool', icon: <FaBriefcaseMedical />, 
            submenu: [
                { path: '/create', name: 'Create' },
                { path: '/manage', name: 'Manage' }
            ]
        },
        { path: '/module', name: 'Teleconsultation Module', icon: <MdWifiCalling /> },
        { path: '/chats', name: 'Chats', icon: <IoIosChatboxes /> },
    ];

    
  const currentMenuItem = menuItems.find(item => item.path === location.pathname);
  const pageTitle = currentMenuItem ? currentMenuItem.name : 'Prescription Tool';

    const toggleDropdown = (itemName) => {
        setOpenDropdown(openDropdown === itemName ? null : itemName);
    };

    const handleLogout = () => {
        localStorage.removeItem('dashlogin');
        navigate('/login');
    };

    const isActive = (path) => location.pathname.startsWith(path);

    const handleCreatePrescription = () => {
        navigate('/patientdocument'); // Navigate to patient document page
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
                            <li key={item.path}>
                                <div
                                    onClick={item.submenu ? () => toggleDropdown(item.name) : null}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${isActive(item.path) ? 'text-[#00bfff] font-bold' : 'text-gray-400'}`}
                                >
                                    {item.icon}
                                    <Link to={item.path} className="flex items-center gap-2">
                                        {item.name}
                                    </Link>
                                    {item.submenu && (
                                        <FaChevronDown className={`ml-auto transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                                    )}
                                </div>
                                {openDropdown === item.name && item.submenu && (
                                    <ul className="pl-4 mt-2">
                                        {item.submenu.map((subItem) => (
                                            <li key={subItem.path} className={`mb-2 text-lg px-2 py-1 rounded-lg ${isActive(subItem.path) ? 'text-[#00bfff] font-bold' : 'text-gray-400'}`}>
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
              {pageTitle}
            </span>
            <span className='text-gray-500 ml-4 font-semibold'>Create</span>
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
                
                {/* Appointments Grid */}
                <div className="flex flex-wrap gap-4 p-4 justify-start">
  {appointments.map((appointment) => (
    <div
      key={appointment.id}
      className="relative bg-white p-4 rounded shadow w-[330px]"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 bg-gray-100 w-full p-2 mb-3">
          <h1 className="font-bold flex-1">{appointment.name}</h1>
          <FaEye
            className="w-5 h-5 cursor-pointer transition-colors duration-300 text-gray-500 hover:text-[#00bfff]"
          />
          {appointment.isNew && (
            <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-sm">
              New
            </span>
          )}
        </div>
      </div>
      <p className="flex justify-between text-gray-400 font-semibold">
        <span>Appointment Type:</span>
        <span className="text-blue-500">{appointment.type}</span>
      </p>
      <p className="flex justify-between text-gray-400 font-semibold">
        <span>Patient Age:</span>
        <span className="font-semibold text-black">{appointment.age} Years</span>
      </p>
      <p className="flex justify-between text-gray-400 font-semibold">
        <span>Patient Gender:</span>
        <span className="font-semibold text-black">{appointment.gender}</span>
      </p>
      <p className="flex justify-between text-gray-400 font-semibold">
        <span>Appointment Time:</span>
        <span className="font-semibold text-black">{appointment.time}</span>
      </p>
      <button
        className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded mt-4 hover:bg-[#00bfff] hover:text-white"
        onClick={handleCreatePrescription}
      >
        Create Prescription
      </button>
    </div>
  ))}
</div>
 
            </div>  
        </div>
    );
};

export default ToolsCreate;
