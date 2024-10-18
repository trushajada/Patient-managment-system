import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { RiHome2Line, RiLogoutBoxRFill } from 'react-icons/ri';
import { FaBell, FaChevronDown, FaCalendarCheck, FaHospitalUser, FaFileAlt } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import logo from '../../../assets/images/logo.png';
import sidebar from '../../../assets/images/sidebar.png';

const appointmentsData = [
  {
    patientName: 'Marcus Philips',
    diseaseName: 'Viral Infection',
    patientIssue: 'Stomach Ache',
    appointmentDate: '2022-01-02',
    appointmentTime: '4:30 PM',
    appointmentType: 'Online',
  },
  {
    patientName: 'Julianna Warren',
    diseaseName: 'Diabetes',
    patientIssue: 'Stomach Ache',
    appointmentDate: '2022-01-03',
    appointmentTime: '2:40 PM',
    appointmentType: 'Onsite',
  },
];

const UpcomingAppoinment = () => {
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
    const matchesName = appointment.patientName.toLowerCase().includes(tableSearchTerm.toLowerCase());
    const matchesDate = selectedDate ? appointment.appointmentDate === selectedDate : true;
    return matchesName && matchesDate;
  });

  const handleDelete = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  const handleEdit = (index) => {
    // Logic for editing (can include opening a modal to edit details)
    console.log("Editing appointment at index:", index);
  };

  const handleLogout = () => {
    navigate('/login');
  };
  const handleNavigateToTimeSlot = () => {
    navigate('/appointment-time-slot'); // Change this to the actual path for your appointment time slot page
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
              {menuItems.find(item => item.path === location.pathname)?.name || 'Appoinment Management'}
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
                        <Link to="/doctorDashboard" className="text-gray-500 py-2 px-4 rounded" >Today Appointments</Link>
                        <Link to="/upcoming" className="text-gray-500 py-2 px-4 rounded"  style={{ color: "#00bfff", borderBottom: "5px solid #00bfff" }} >Upcoming Appointments</Link>
                        <Link to="/Previous" className="text-gray-500 py-2 px-4 rounded"   >Previous Appointments</Link>
                        <Link to="/Cancle" className="text-gray-500 py-2 px-4 rounded"   >Cancle Appointments</Link>
                    </div>
                    <div className="flex-1  flex flex-col p-4">
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Upcoming Appointments</h1>
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
              <button className="p-2 font-bold text-white rounded bg-[#00bfff]" onClick={handleNavigateToTimeSlot}>Appointment Time Slot</button>
            </div>
          </div>

          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4  border-b text-center">Patient Name</th>
                <th className="py-2 px-4 text-center border-b">Disease Name</th>
                <th className="py-2 px-4 text-center border-b">Patient Issue</th>
                <th className="py-2 px-4 text-center border-b">Appointment Date</th>
                <th className="py-2 px-4 text-center border-b">Appointment Time</th>
                <th className="py-2 px-4 text-center border-b">Appointment Type</th>
                <th className="py-2 px-4 text-center border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-center">{appointment.patientName}</td>
                  <td className="py-2 px-4 border-b text-center">{appointment.diseaseName}</td>
                  <td className="py-2 px-4 border-b text-center">{appointment.patientIssue}</td>
                  <td className="py-2 px-4 border-b text-center">{appointment.appointmentDate}</td>
                  <td className="py-2 px-4 border-b text-center">{appointment.appointmentTime}</td>
                  <td className="py-2 px-4 border-b text-center">{appointment.appointmentType}</td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <button onClick={() => handleEdit(index)} className="p-2 text-green-500 text-white rounded">✏️</button>
                    <button onClick={() => handleDelete(index)} className="p-2 text-red rounded">🗑️</button>
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

export default UpcomingAppoinment;
