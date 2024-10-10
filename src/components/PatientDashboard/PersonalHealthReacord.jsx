import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { RiHome2Line } from 'react-icons/ri';
import { FaBell, FaChevronDown } from 'react-icons/fa';
import logo from '../../assets/images/logo.png';
import { FaCalendarCheck } from "react-icons/fa6";
import { FaHospitalUser } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";
import { RiBillFill } from "react-icons/ri";
import { FaHotTubPerson } from "react-icons/fa6";
import sidebar from '../../assets/images/sidebar.png'
import { RiLogoutBoxRFill } from "react-icons/ri";
import Group1 from '../../assets/images/Group1.png'
import Group2 from '../../assets/images/Group2.png'
import Group3 from '../../assets/images/Group3.png'
import Group4 from '../../assets/images/Group4.png'
import Group6 from '../../assets/images/Group6.png'
import Avatar from '../../assets/images/Avatar.png'



const PersonalHealthRecord = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [visibleRows, setVisibleRows] = useState({});
    const [openDropdown, setOpenDropdown] = useState(null);

    // Sidebar menu items
    const menuItems = [
        {
            path: '/dashboard', name: 'Personal Health Record', icon: <FaHospitalUser />,
            subItems: [
                { path: '/all-Appoinment', name: 'All Appoinment' }
            ]
        },
        { path: '/booking', name: 'Appointment Booking', icon: <FaCalendarCheck /> 
        },
        { path: '/records', name: 'Prescription Access', icon: <FaFileAlt /> },
        { path: '/telecounsulation', name: 'Teleconsultation Access', icon: <FaHotTubPerson /> },
        { path: '/chats', name: 'Chats', icon: <IoIosChatboxes /> },
        { path: '/bills', name: 'Bills', icon: <RiBillFill /> },
    ];
    // Mock data for prescription details
    const data = [
        { id: 1, hospital: 'City Hospital', date: '02 Jan 2022', disease: 'Flu' },
        { id: 2, hospital: 'Health Center', date: '03 Jan 2022', disease: 'Allergy' },
        { id: 3, hospital: 'General Hospital', date: '04 Jan 2022', disease: 'Cold' },
        { id: 4, hospital: 'Urgent Care', date: '05 Jan 2022', disease: 'COVID-19' },
    ];
    const patientStatusData = [
        { id: 1, icon: Group1, label: "Shamuba Hospital", alt: "Hospital Icon" },
        { id: 2, icon: Group2, label: "Dr. Mathew Best", alt: "Doctor Icon" },
        { id: 3, icon: Group3, label: "2 Jan, 2022", alt: "Date Icon" },
        { id: 4, icon: Group4, label: "Chance Carder", alt: "Patient Icon" },
        { id: 5, icon: Group6, label: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", alt: "Note Icon", colSpan: true }
    ];
    const report = [
        { id: 1, name: 'Dr. Marcus Philips', date: '02 Jan, 2022', disease: 'Viral Infection', },
        { id: 2, name: 'Dr. Zaire Saris', date: '02 Jan, 2022', disease: 'Viral Infection', },
        { id: 3, name: 'Dr. Ryan Carder', date: '02 Jan, 2022', disease: 'Allergies', },
        { id: 4, name: 'Dr. Jaxson Herwitz', date: '02 Jan, 2022', disease: 'Allergies', },
    ];
    const patientData = [
        { label: "Name", value: "Marcus Philips" },
        { label: "Number", value: "99130 44537" },
        { label: "Email", value: "john@gmail.com" },
        { label: "Gender", value: "Male" },
        { label: "DOB", value: "2 Jan, 2022" },
        { label: "Age", value: "20 Years" },
        { label: "Blood Group", value: "B+" },
        { label: "Height", value: "6'2\"" },
        { label: "Weight", value: "85 kg" },
        { label: "Country", value: "India" },
        { label: "State", value: "Gujarat" },
        { label: "City", value: "Rajkot" },
        { label: "Address", value: "B-408 Swastik society, mota varacha rajkot" },
    ];

    // Toggle function for dropdowns
    const toggleDropdown = (itemName) => {
        setOpenDropdown(openDropdown === itemName ? null : itemName);
    };

    const toggleVisibility = (index) => {
        setVisibleRows((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };
    const filteredMenuItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleLogout = () => {
        localStorage.removeItem('dashlogin');

        navigate('/login');
    };


    const isActive = (path) => location.pathname === path;

    return (
        <div className="bg-gray-100 min-h-screen flex">
            {/* Sidebar */}

            <div className="bg-white  max-w-[314px] rounded-lg shadow-md p-4">
                <header className="flex items-center justify-center p-4">
                    <img src={logo} alt="Logo" className="mb-4 w-60 h-30" />
                </header>
                <nav className="mt-4">
                    {/* <ul>
                        {menuItems.map((item) => (
                            <li
                                key={item.path}
                                className={`mb-3 text-lg px-4 py-2 rounded-lg transition-shadow text[#00bfff] ${isActive(item.path) ? 'text[#00bfff] font-bold' : 'text-gray-400'}`}
                                style={{
                                    fontWeight: isActive(item.path) ? 'bold' : 'normal',
                                    color: isActive(item.path) ? '#00bfff' : 'gray',
                                }}
                            >
                                <div
                                    onClick={item.subItems ? () => toggleDropdown(item.name) : undefined}
                                    className="flex items-center gap-2 cursor-pointer text[#00bfff]"
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
                                        <Link to={item.path} className="flex items-center gap-2 text[#00bfff]">
                                            {item.name}
                                        </Link>
                                    )}
                                </div>

                                {openDropdown === item.name && item.subItems && (
                                    <ul className="pl-4 mt-2">
                                        {item.subItems.map((subItem) => (
                                            <li
                                                key={subItem.path}
                                                className={`mb-2 text-lg px-2 py-1 rounded-lg transition-shadow ${isActive(subItem.path) ? 'text[#00bfff] font-bold' : 'text-gray-400'}`}
                                            >
                                                <Link to={subItem.path}>{subItem.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul> */}
                    <ul>
    {menuItems.map((item) => (
        <li
            key={item.path}
            className={`mb-3 text-lg px-4 py-2 rounded-lg transition-shadow ${isActive(item.path) ? 'text-[#00bfff] font-bold' : 'text-gray-400'}`}
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

            {/* Show subItems only if the dropdown is open */}
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
                {/* Header */}
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

                {/* Patient Details */}
                <div className="min-h-screen p-5">
                    <div className="max-w-[1540px] mb-6 mx-auto bg-white rounded-lg shadow-md ">
                        <section className="h-[260px] p-4 ">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold">Patient Details</h2>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    style={{ background: "#00bfff" }}
                                    onClick={() => navigate('/edit-profile')}
                                >
                                    Edit Profile
                                </button>
                            </div>

                            <div className="flex space-x-6">
                                <img
                                    src="{user_profile_picture_url}"
                                    alt="Profile"
                                    className="w-[150px] h-[150px] rounded-full bg-blue-200 text-center"
                                />

                                <div className="flex-1 mt-3">
                                    <div className="grid grid-cols-7 gap-4">
                                        {patientData.map((data, index) => (
                                            <div className="flex flex-col" key={index}>
                                                <span className="text-gray-400"><strong>{data.label}:</strong></span>
                                                <span>{data.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>


                    {/* second row  */}
                    <div className=" mx-auto flex gap-6 mb-6 max-w-[1540px]">
                        {/* Medical History Section */}
                        <div className="w-[1000px] flex flex-col bg-white rounded-lg shadow-md">
                            <section className="h-[311px] p-4">
                                <div className="flex items-left justify-between mb-6">
                                    <h2 className="text-xl font-semibold">Medical History</h2>
                                    <h6 className="font-semibold" style={{ color: "#00bfff" }}><Link to={"/history"}> View All History</Link></h6>
                                </div>
                                <div className="flex gap-4">
                                    <div className="box w-[280px] p-3">
                                        <h2 className='bg-gray-100 p-2 font-semibold'>Dulce Schleifer</h2>
                                        <h6 className='mt-2 ms-2'>Patient Issues</h6>
                                        <p className='mt-4 ms-2 text-gray-400'>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum aliquid commodi quos id, tenetur tempore excepturi! Enim, dolore.
                                        </p>
                                    </div>

                                    <div className="box w-[280px] h-[311px] p-3">
                                        <h2 className='bg-gray-100 p-2 font-semibold'>Dulce Schleifer</h2>
                                        <h6 className='mt-2 ms-2'>Patient Issues</h6>
                                        <p className='mt-4 ms-2 text-gray-400'>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum aliquid commodi quos id, tenetur tempore excepturi! Enim, dolore.
                                        </p>
                                    </div>

                                    <div className="box w-[280px] p-3">
                                        <h2 className='bg-gray-100 p-2 font-semibold'>Dulce Schleifer</h2>
                                        <h6 className='mt-2 ms-2'>Patient Issues</h6>
                                        <p className='mt-4 ms-2 text-gray-400'>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum aliquid commodi quos id, tenetur tempore excepturi! Enim, dolore.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Prescription Detail Section */}

                        <div className="max-w-[560px] flex flex-col bg-white rounded-lg shadow-md h-[311px] text-sm">
                            <section className="h-full p-4 overflow-auto">
                                <div className="flex items-left justify-between mb-4">
                                    <h2 className="text-xl font-semibold">Prescription Detail</h2>

                                    <h6 className="font-semibold" style={{ color: "#00bfff" }}><Link to="/prescriptions">View All Prescription</Link>
                                    </h6>

                                </div>

                                <div className="grid grid-cols-4 gap-4 p-2 border-b font-semibold text-gray-600">
                                    <span className="flex justify-center">Hospital Name</span>
                                    <span className="flex justify-center">Date</span>
                                    <span className="flex justify-center">Disease Name</span>
                                    <span className="flex justify-center">Action</span>
                                </div>

                                {/* Data Rows */}
                                {data.map((item, index) => (
                                    <div key={item.id} className="grid grid-cols-4 gap-4 p-2 border-b">
                                        {/* Ensure data is visible initially */}
                                        <span className="flex justify-center">{visibleRows[index] ? item.hospital : item.hospital}</span>
                                        <span className="flex justify-center">{visibleRows[index] ? item.date : item.date}</span>
                                        <span className="flex justify-center">{visibleRows[index] ? item.disease : item.disease}</span>

                                        {/* Toggle visibility on button click */}
                                        <button
                                            type="button"
                                            onClick={() => toggleVisibility(index)}
                                            className="flex justify-center"
                                        >
                                            <img
                                                src={visibleRows[index]
                                                    ? "https://img.icons8.com/ios-filled/50/000000/visible.png"
                                                    : "https://img.icons8.com/ios-filled/50/000000/invisible.png"
                                                }
                                                alt={visibleRows[index] ? "Hide" : "View"}
                                                className="w-6 h-6"
                                                style={{ filter: visibleRows[index] ? "none" : "grayscale(100%)" }}
                                            />
                                        </button>
                                    </div>
                                ))}

                            </section>
                        </div>
                    </div>

                    {/* therd row  */}

                    <div className=" mx-auto flex gap-6 mb-6 max-w-[1540px]">
                        {/* Medical History Section */}
                        <div className="w-[1000px] flex flex-col bg-white rounded-lg shadow-md">
                            <section className="h-[311px] p-4">
                                <div className="flex items-left justify-between mb-6">
                                    <h2 className="text-2xl font-bold mb-4">Test Reports</h2>
                                    <a href="#" className="text-blue-600 mt-4 inline-block flex font-semibold" style={{ color: "#00bfff" }}> <Link to={"/report"}>View All Reports</Link></a>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {report.map((report, index) => (
                                        <div key={report.id} className="flex justify-between items-center rounded-lg p-4">
                                            <img src={Avatar} alt={Avatar} className="w-16 h-16 rounded-full mr-4" />
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{report.name}</h3>
                                                <p className="text-gray-500">{report.date}</p>

                                            </div>

                                        </div>
                                    ))}
                                </div>

                            </section>
                        </div>

                        {/* Prescription Detail Section */}

                        <div className="max-w-[560px] flex flex-col bg-white rounded-lg shadow-md h-[311px] text-sm">
                            <section className="h-full p-4 overflow-auto">
                                <div className="flex items-left justify-between mb-4">
                                    <h2 className="text-xl font-semibold">Patients Status</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {patientStatusData.map(({ id, icon, label, alt, colSpan }) => (
                                        <div key={id} className={`flex items-center ${colSpan ? 'col-span-2' : ''}`}>
                                            <img src={icon} alt={alt} className="mr-4 rounded" />
                                            <p className="text-sm">{label}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalHealthRecord;

