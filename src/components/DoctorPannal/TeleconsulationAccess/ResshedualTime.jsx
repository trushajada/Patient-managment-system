import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { RiHome2Line, RiLogoutBoxRFill } from 'react-icons/ri';
import { FaBell, FaChevronDown, FaCalendarCheck, FaHospitalUser, FaFileAlt } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import logo from '../../../assets/images/logo.png';
import sidebar from '../../../assets/images/sidebar.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import dayjs from 'dayjs';

const ResshedualTime = ({ isModalOpen, closeModal, currentAppointment, handleReschedule }) => {
    const [headerSearchTerm, setHeaderSearchTerm] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(dayjs('2022-06-18'));
    const [endDate, setEndDate] = useState(dayjs('2022-06-23'));
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState("18 June, 2022");
    const [selectedTimes, setSelectedTimes] = useState("03:00 PM - 04:00 PM");
    const [editDate, setEditDate] = useState('');
    const [editTime, setEditTime] = useState('');

    const onReschedule = () => {
        console.log('Rescheduling to:', editDate, editTime);
        navigate('/reminder', {
            state: { date: editDate, time: editTime },
        });

    };
    const toggleBox = (timeSlot) => {
        setSelectedTime(timeSlot);
        setModalOpen(true);
    };
    const handleTimeSlotClick = (slot) => {
        toggleBox(slot);
    };

    const handlePrevious = () => {
        setStartDate(prev => prev.subtract(7, 'day'));
        setEndDate(prev => prev.subtract(7, 'day'));
    };

    const handleNext = () => {
        setStartDate(prev => prev.add(7, 'day'));
        setEndDate(prev => prev.add(7, 'day'));
    };

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

    const handleLogout = () => {
        navigate('/login');
    };

    const timeSlots = [
        '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
    ];

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
                        <span style={{ color: "#00bfff" }} className='font-semibold'>
                            {menuItems.find(item => item.path === location.pathname)?.name || 'Teleconsultation Module'}
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

                <div className="flex-1 flex flex-col p-4">
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <h1 className='text-xl font-semibold'>Appointment Time Slot</h1>
                        <div className="flex items-center justify-center mt-6 bg-gray-100 ">
                            <h1 className="p-3 text-center mx-4 text-[#00bfff] flex items-center">
                                <FaArrowLeft className="mr-2 cursor-pointer" onClick={handlePrevious} />
                                {startDate.format('DD MMM, YYYY')} - {endDate.format('DD MMM, YYYY')}
                                <FaArrowRight className="ml-2 cursor-pointer" onClick={handleNext} />
                            </h1>
                        </div>
                        <div>
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">Time</th>
                                        <th className="py-2 px-4 border-b">Sun 17</th>
                                        <th className="py-2 px-4 border-b">Mon 18</th>
                                        <th className="py-2 px-4 border-b">Tue 19</th>
                                        <th className="py-2 px-4 border-b">Wed 20</th>
                                        <th className="py-2 px-4 border-b">Thu 21</th>
                                        <th className="py-2 px-4 border-b">Fri 22</th>
                                        <th className="py-2 px-4 border-b">Sat 23</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: 14 }, (_, index) => {
                                        const hour = 8 + index; // Start from 8 AM
                                        const timeLabel = hour < 12 ? `${hour}:00 AM` : hour === 12 ? `12:00 PM` : `${hour - 12}:00 PM`;
                                        const isLunchTime = timeLabel === '1:00 PM' || timeLabel === '2:00 PM';
                                        const isHighlightTime = timeLabel === '9:00 AM' || timeLabel === '10:00 AM';
                                        const isHighlightTime1 = timeLabel === '3:00 PM' || timeLabel === '4:00 PM';
                                        const isHighlightTime2 = timeLabel === '6:00 PM' || timeLabel === '7:00 PM';
                                        const isHighlightTime3 = timeLabel === '7:00 PM' || timeLabel === '8:00 PM';

                                        return (
                                            <tr key={index}>
                                                <td className="py-2 px-4 border-b text-center text-[#00bfff] font-semibold">{timeLabel}</td>
                                                <td
                                                    className={`py-2 px-4 text-center ${isHighlightTime1 ? 'bg-[#00bfff] text-white text-black font-bold shadow-sm' : 'text-gray-200'}`}
                                                    onClick={() => handleTimeSlotClick(timeLabel)}
                                                >
                                                    {timeLabel === '3:00 PM' ? (
                                                        <div>3:00 PM - 4:00 PM</div>
                                                    ) : timeLabel === '4:00 PM' ? (
                                                        <div>Skin Tratment</div>
                                                    ) : (
                                                        <div>No Schedule</div>
                                                    )}
                                                </td>
                                                <td
                                                    className={`py-2 px-4 text-center ${isHighlightTime ? ' font-bold bg-gray-100 text-black font-bold shadow-sm' : 'text-gray-200'}`}
                                                    onClick={() => handleTimeSlotClick(timeLabel)}
                                                >
                                                    {timeLabel === '9:00 AM' ? 'no schedule' : timeLabel === '10:00 AM' ? '' : 'No Schedule'}
                                                </td>
                                                <td
                                                    className={`py-2 px-4 text-center ${isHighlightTime3 ? 'bg-gray-100 text-black font-bold shadow-sm' : 'text-gray-200'}`}
                                                    onClick={() => handleTimeSlotClick(timeLabel)}
                                                >
                                                    {timeLabel === '7:00 PM' ? (
                                                        <div>7:00 PM - 8:00 PM</div>
                                                    ) : timeLabel === '8:00 PM' ? (
                                                        <div>Hair Tratment</div>
                                                    ) : (
                                                        <div>No Schedule</div>
                                                    )}
                                                </td>

                                                <td className="py-2 px-4 border-b text-center text-gray-200">No Schedule</td>
                                                <td
                                                    className={`py-2 px-4 text-center ${isHighlightTime2 ? 'bg-gray-100 text-black font-bold shadow-sm' : 'text-gray-200'}`}
                                                    onClick={() => handleTimeSlotClick(timeLabel)}
                                                >
                                                    {timeLabel === '6:00 PM' ? (
                                                        <div>6:00 PM - 7:00 PM</div>
                                                    ) : timeLabel === '7:00 PM' ? (
                                                        <div>Brain tumor</div>
                                                    ) : (
                                                        <div>No Schedule</div>
                                                    )}
                                                </td>


                                                <td className="py-2 px-4 border-b text-center text-gray-200">No Schedule</td>
                                                <td className="py-2 px-4 border-b text-center text-gray-200">No Schedule</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-xl font-bold mb-4">Reschedule Appointment</h2>
                        <div>
                            <label className="block mb-2">New Date</label>
                            <input
                                type="date"
                                value={editDate}
                                onChange={(e) => setEditDate(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 w-full mb-4"
                            />
                            <label className="block mb-2">New Time</label>
                            <select
                                value={editTime}
                                onChange={(e) => setEditTime(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 w-full mb-4"
                            >
                                <option value="">Select Time</option>
                                {timeSlots.map((time) => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={onReschedule} className="bg-blue-500 text-white py-2 px-4 rounded-md">Reschedule</button>
                            <button onClick={() => setModalOpen(false)} className="bg-gray-200 text-black py-2 px-4 rounded-md ml-2">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResshedualTime;
