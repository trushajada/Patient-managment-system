import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaCalendarCheck, FaHospitalUser, FaFileAlt, FaBell, FaChevronDown } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import { RiLogoutBoxRFill, RiHome2Line } from 'react-icons/ri';
import logo from '../../../assets/images/logo.png';
import sidebar from '../../../assets/images/sidebar.png';

const PatientPrescription = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);
    const [filterTerm, setFilterTerm] = useState("");

    const patientInfo =
        {
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
        }
     
        const prescriptions = [
            {
                date: '2 Jan, 2022',
                doctorName: 'Professor Dr. Doctor Name Here',
                hospitalLogo: 'H',
                patientName: 'Patient Name Here',
                patientAddress: ' Address Here',
                patientAge: '30 years',
                diagnosis: 'Flu',
                createdDate: '4 Jan 2024',
            },
            {
                date: '3 Feb, 2022',
                doctorName: 'Doctor Jane Doe',
                hospitalLogo: 'H2',
                patientName: 'John Smith',
                patientAddress: '123 Main St',
                patientAge: '28 years',
                diagnosis: 'Cold',
                createdDate: '5 Feb 2024',
            },
            {
                date: '4 Mar, 2022',
                doctorName: 'Doctor Mike',
                hospitalLogo: 'H3',
                patientName: 'Linda Johnson',
                patientAddress: '456 Oak Ave',
                patientAge: '45 years',
                diagnosis: 'Headache',
                createdDate: '6 Mar 2024',
            },
            {
                date: '5 Apr, 2022',
                doctorName: 'Doctor Emily',
                hospitalLogo: 'H4',
                patientName: 'Michael Brown',
                patientAddress: '789 Pine Rd',
                patientAge: '50 years',
                diagnosis: 'Migraine',
                createdDate: '7 Apr 2024',
            },
        ];
        
        const PrescriptionInfo = ({ prescription }) => (
            <div className="border rounded-lg p-5 m-2 shadow-lg h-[600px]">
                <div className="flex justify-between items-center mb-6 flex-grow">
                    <p className="text-lg font-bold">Created Date:</p>
                    <p className="text-lg">{prescription.date}</p>
                </div>
        
                <div className="flex justify-between items-center">
                    <div className="relative">
                        <div className="relative">
                            <h2 className="text-lg font-bold text-blue-400">{prescription.doctorName}</h2>
                        </div>
                    </div>
                    <img src={logo} alt="Logo" className="mb-4 w-[100px] h-30 bg-blue-200" />
                </div>
                <div className="mt-4">
                    <div>
                        <p className='mb-2'>
                            <strong className='me-3'>Certification:</strong> 00 00 00
                        </p>
                        <div className="flex items-center">
                            <p className="text-lg font-bold me-3">Patient Name:</p>
                            <p className="text-md border-b border-blue-300 ms-3 w-full">{prescription.patientName}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="text-lg font-bold me-3">Address:</p>
                            <p className="text-md border-b border-blue-300 ms-3 w-full">{prescription.patientAddress}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="text-lg font-bold me-3">Age:</p>
                            <p className="text-md border-b border-blue-300 ms-3 w-full">{prescription.patientAge}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="text-lg font-bold me-3">Date:</p>
                            <p className="text-md border-b border-blue-300 ms-3 w-full">{prescription.createdDate}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="text-lg font-bold me-3">Diagnosis:</p>
                            <p className="text-md border-b border-blue-300 ms-3 w-full">{prescription.diagnosis}</p>
                        </div>
                    </div>
                    <h1 className='text-6xl mt-5 text-blue-500 h-32'> Rx</h1>
                    <p className='text-right'>_______________</p>
                    <p className='text-right font-semibold'>SIGNATURE</p>
                </div>
            </div>
        );
        
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

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        navigate('/login');
    };
    const handleCreatePrescription = () => {
        navigate('/create-prescription');
    };
    const currentMenuItem = menuItems.find(item => item.path === location.pathname);
    const pageTitle = currentMenuItem ? currentMenuItem.name : 'Prescription Tool';

    return (
        <div className="bg-gray-100 min-h-screen flex">
            {/* Sidebar */}
            <div className="bg-white max-w-[314px] rounded-lg shadow-md p-4">
                <header className="flex items-center justify-center p-4">
                    <img src={logo} alt="Logo" className="mb-4 w-60 h-30" />
                </header>
                <nav className="mt-4">
                    <ul>
                        {menuItems.map(menuItem => (
                            <li key={menuItem.path}>
                                <div
                                    onClick={menuItem.submenu ? () => toggleDropdown(menuItem.name) : null}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${isActive(menuItem.path) ? 'text-[#00bfff] font-bold' : 'text-gray-400'}`}
                                >
                                    {menuItem.icon}
                                    <Link to={menuItem.path} className="flex items-center gap-2">
                                        {menuItem.name}
                                    </Link>
                                    {menuItem.submenu && (
                                        <FaChevronDown className={`ml-auto transition-transform ${openDropdown === menuItem.name ? 'rotate-180' : ''}`} />
                                    )}
                                </div>
                                {openDropdown === menuItem.name && menuItem.submenu && (
                                    <ul className="pl-4 mt-2">
                                        {menuItem.submenu.map(subMenuItem => (
                                            <li key={subMenuItem.path} className={`mb-2 text-lg px-2 py-1 rounded-lg ${isActive(subMenuItem.path) ? 'text-[#00bfff] font-bold' : 'text-gray-400'}`}>
                                                <Link to={subMenuItem.path}>{subMenuItem.name}</Link>
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
                {/* Patient Details */}
                <div className='p-4'>
               <div className="bg-white shadow-lg p-6 rounded-lg mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold">Patient Detail</h1>
                        </div>
                        <div className="flex items-center mb-4">
                            <img
                                src="https://via.placeholder.com/80"
                                alt="Patient"
                                className="w-40 h-40 rounded-full mr-6"
                            />
                            <div className="grid grid-cols-5 gap-4">
                                {/* Patient Info */}
                                <div><p className="text-sm font-semibold text-gray-500">Patient Name</p><p className="text-lg font-bold">{patientInfo.name}</p></div>
                                <div><p className="text-sm font-semibold text-gray-500">Patient Number</p><p className="text-lg font-bold">{patientInfo.number}</p></div>
                                <div><p className="text-sm font-semibold text-gray-500">Patient Issue</p><p className="text-lg font-bold">{patientInfo.issue}</p></div>
                                <div><p className="text-sm font-semibold text-gray-500">Patient Gender</p><p className="text-lg font-bold">{patientInfo.gender}</p></div>
                                <div><p className="text-sm font-semibold text-gray-500">Patient Age</p><p className="text-lg font-bold">{patientInfo.age}</p></div>
                                <div><p className="text-sm font-semibold text-gray-500">Patient Doctor</p><p className="text-lg font-bold">{patientInfo.doctor}</p></div>
                                <div><p className="text-sm font-semibold text-gray-500">Appointment Type</p><p className="text-lg font-bold">{patientInfo.appointmentType}</p></div>
                                <div><p className="text-sm font-semibold text-gray-500">Patient Address</p><p className="text-lg font-bold">{patientInfo.address}</p></div>
                                <div><p className="text-sm font-semibold text-gray-500">Last Appointment Date</p><p className="text-lg font-bold">{patientInfo.lastAppointmentDate}</p></div>
                                <div><p className="text-sm font-semibold text-gray-500">Last Appointment Time</p><p className="text-lg font-bold">{patientInfo.lastAppointmentTime}</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex mb-4 p-4">
                        <div className="flex">
                            <Link to="/patientdocument" className="text-gray-500 py-2 px-4 rounded">All Document</Link>
                            <Link to="/patientprescription" className="text-gray-500 py-2 px-4 rounded" style={{ color: "#00bfff", borderBottom: "5px solid #00bfff" }}>All Prescription</Link>
                            <Link to="/patientdescription" className="text-gray-500 py-2 px-4 rounded">All Description</Link>
                        </div>
                        <button 
            className="bg-[#00bfff] p-3 text-white rounded-lg ml-auto" 
            onClick={handleCreatePrescription}
        >
            Create Prescription
        </button>
                    </div>
                {/* Prescriptions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xxl:grid-cols-4 gap-0">
    {prescriptions.filter(prescription =>
        prescription.patientName.toLowerCase().includes(filterTerm.toLowerCase())
    ).length > 0 ? (
        prescriptions.filter(prescription =>
            prescription.patientName.toLowerCase().includes(filterTerm.toLowerCase())
        ).map((prescription, index) => (
            <PrescriptionInfo key={index} prescription={prescription} />
        ))
    ) : (
        <p>No prescriptions found</p>
    )}
</div>
            </div>
        </div>
        </div>
    );
};

export default PatientPrescription;
