import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaCalendarCheck, FaHospitalUser, FaFileAlt, FaBell, FaChevronDown } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import { RiLogoutBoxRFill, RiHome2Line } from 'react-icons/ri';
import logo from '../../../assets/images/logo.png';
import sidebar from '../../../assets/images/sidebar.png';

const PatientDocument = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [openDropdown, setOpenDropdown] = useState(false);
    const [documents, setDocuments] = useState([]);

    // Toggle dropdown menu
    const toggleDropdown = (itemName) => {
        setOpenDropdown(openDropdown === itemName ? null : itemName);
    };

    // Check if the path is active
    const isActive = (path) => location.pathname === path;

    // Logout handler
    const handleLogout = () => {
        navigate('/login');
    };

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

    const patientInfo = {
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
    };

    useEffect(() => {
        const fetchedDocuments = [
            {
                id: 1,
                createdDate: '2 Jan, 2022',
                imageUrl: 'https://via.placeholder.com/150',
                firstName: 'John',
                surname: 'Doe',
                address: '123 Main St',
                town: 'Sample Town',
                country: 'Sample Country',
                tel: '123456789',
                mobile: '987654321',
                emergencyContactName: 'Jane Doe',
                gpDoctor: 'Dr. Smith',
            },
            {
                id: 2,
                createdDate: '2 Jan, 2022',
                imageUrl: 'https://via.placeholder.com/150',
                firstName: 'Alice',
                surname: 'Johnson',
                address: '456 High St',
                town: 'Example Town',
                country: 'Example Country',
                tel: '987654321',
                mobile: '123456789',
                emergencyContactName: 'Bob Johnson',
                gpDoctor: 'Dr. Jones',
            },
        ];
        setDocuments(fetchedDocuments);
    }, []);

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

                {/* Patient Detail */}
                <div className="p-4">

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
                        <Link to="/patientdocument" className="text-gray-500 py-2 px-4 rounded" style={{ color: "#00bfff", borderBottom: "5px solid #00bfff" }}>All Document</Link>
                        <Link to="/patientprescription" className="text-gray-500 py-2 px-4 rounded">All Prescription</Link>
                        <Link to="/patientdescription" className="text-gray-500 py-2 px-4 rounded">All Description</Link>
                    </div>
                    {/* Patient Documents */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {documents.map((document) => (
                            <div key={document.id} className="border rounded-lg p-2 shadow-md">
                                {/* Created Date */}
                                <div className="flex justify-between mb-2 bg-gray-200 p-3">
                                    <p className="font-bold text-sm">Created Date</p>
                                    <p className="text-sm">{document.createdDate}</p>
                                </div>
                                <h2 className='text-3xl text-center font-semibold mt-6 '>Medical Certificate</h2>
                                <p className='text-bold text-center mb-6'>Of the Sutiability and fiteness for the purpess of practicing compatitive abroad..</p>
                                {/* Document Fields */}
                                <div className="grid grid-cols-1 gap-4  rounded-lg p-4 shadow-md">
                                    {/* Row 1: First Name and Surname */}
                                    <div className="grid grid-cols-2 mb-2">
                                        <p className="font-bold"><strong>First Name:</strong></p>
                                        <p className="text-right border-b border-black">{document.firstName}</p>
                                    </div>
                                    <div className="grid grid-cols-2 mb-2">
                                        <p className="font-bold"><strong>Surname:</strong></p>
                                        <p className="text-right border-b border-black">{document.surname}</p>
                                    </div>

                                    {/* Row 2: Address */}
                                    <div className="mb-2">
                                        <p className="font-bold"><strong>Address:</strong></p>
                                        <p className="text-right border-b border-black"> {document.address}</p>
                                    </div>


                                    {/* Row 3: Town */}
                                    <div className="mb-2 grid grid-cols-2">
                                        <p className="font-bold"><strong>Town:</strong></p>
                                        <p className="text-right border-b border-black"> {document.town}</p>
                                    </div>


                                    {/* Row 4: Country */}
                                    <div className="mb-2 grid grid-cols-2">
                                        <p className="font-bold"><strong>Country:</strong></p>
                                        <p className="text-right border-b border-black"> {document.country}</p>
                                    </div>

                                    {/* Row 5: Telephone and Mobile */}
                                    <div className=" mb-2 grid grid-cols-2">
                                        <p className="font-bold"><strong>Tel:</strong> </p>
                                        <p className="text-right border-b border-black">{document.tel}</p>
                                    </div>
                                    <div className=" mb-2 grid grid-cols-2">
                                        <p className=""><strong>Mobile:</strong></p>
                                        <p className="text-right border-b border-black"> {document.mobile}</p>
                                    </div>

                                    {/* Row 6: Emergency Contact Name */}
                                    <div className="mb-2 grid grid-cols-2">
                                        <p className="font-bold "><strong>Emergency Name:</strong></p>
                                        <p className="text-right border-b border-black"> {document.emergencyName}</p>

                                        <p className="font-bold"><strong>Emergency Contact:</strong> </p>
                                        <p className="text-right border-b border-black">{document.emergencyNumber}</p>
                                    </div>


                                    {/* Signature Section */}
                                    <div className="flex justify-between items-center mt-4">
                                        {/* Stamp Section */}
                                        <div className="flex-1">
                                            <div className="border border-black rounded w-1/1 h-40"></div> {/* Box for Stamp */}
                                            <p className="text-center text-xs italic">Stamp</p>
                                        </div>

                                        {/* Signature Section */}
                                        <div className="flex flex-col items-center mt-4">
                                            {/* First Doctor's Signature Section */}
                                            <div className="flex-1 text-center mb-4">
                                                <p className="text-xs italic">Doctor's Signature:</p>
                                                <p className="border-t border-gray-400 mt-2 w-3/4 mx-auto">__________________</p>
                                            </div>

                                            {/* Second Doctor's Signature Section */}
                                            <div className="flex-1 text-center mb-4">
                                                <p className="text-xs italic"> Date:</p>
                                                <p className="border-t border-gray-400 mt-2 w-3/4 mx-auto">__________________</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDocument;
