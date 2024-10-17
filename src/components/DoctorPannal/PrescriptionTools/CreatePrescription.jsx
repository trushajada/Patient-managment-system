import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaCalendarCheck, FaHospitalUser, FaFileAlt, FaBell, FaChevronDown } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import { RiLogoutBoxRFill, RiHome2Line } from 'react-icons/ri';
import logo from '../../../assets/images/logo.png';
import sidebar from '../../../assets/images/sidebar.png';


const CreatePrescription = () => {
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

    const [showPrescription, setShowPrescription] = useState(false);
    const [medicines, setMedicines] = useState([
        { name: "Calcium carbonate", strength: "100 Mg", dose: "1-0-1", duration: "2 Day", when: "Before Food" },
        { name: "Cyclobenzaprine", strength: "200 Mg", dose: "1-1-1", duration: "4 Day", when: "With Food" },
        { name: "Fluticasone Almeterol", strength: "150 Mg", dose: "0-1-0", duration: "5 Day", when: "Before Food" },
        { name: "Hydrochlorothiazide", strength: "250 Mg", dose: "0-0-1", duration: "2 Day", when: "After Food" },
        { name: "Flonase Allergy Relief", strength: "100 Mg", dose: "1-0-0", duration: "1 Day", when: "Before Food" }
    ]);

    const [newMedicine, setNewMedicine] = useState({ name: '', strength: '', dose: '', duration: '', when: '' });

    const handleAddMedicine = () => {
        setMedicines([...medicines, newMedicine]);
        setNewMedicine({ name: '', strength: '', dose: '', duration: '', when: '' });
    };

    const handleRemoveMedicine = (index) => {
        const updatedMedicines = medicines.filter((_, i) => i !== index);
        setMedicines(updatedMedicines);
    };

    const handleChange = (e) => {
        setNewMedicine({ ...newMedicine, [e.target.name]: e.target.value });
    };

    const toggleViewPrescription = () => {
        setShowPrescription(!showPrescription);
    };

    const prescriptions = [
        {
            id: 1,
            hospitalName: "City Hospital",
            prescriptionDate: "2 Jan, 2022",
            patientName: "Alabtrao Bhajirao",
            age: 36,
            gender: "Male",
            address: "B-105 Virat Bungalows, Punagam Motavaracha, Jamnagar"
        },
        // Add more objects for more fake data
    ];


    const toggleDropdown = (itemName) => {
        setOpenDropdown(openDropdown === itemName ? null : itemName);
    };

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        navigate('/login');
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
                
                <div className="flex p-8 bg-gray-50">
                    {/* Form Section - 50% Width */}
                    <div className="w-1/2 pr-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Prescription</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <input
                                type="text"
                                placeholder="Patient Name"
                                value="Alabtrao Bhajirao"
                                readOnly
                                className="p-2 border rounded bg-gray-100"
                            />
                            <input
                                type="text"
                                placeholder="Age"
                                value="36 Year"
                                readOnly
                                className="p-2 border rounded bg-gray-100"
                            />
                            <input
                                type="text"
                                placeholder="Gender"
                                value="Male"
                                readOnly
                                className="p-2 border rounded bg-gray-100"
                            />
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-2">Drug Prescription</h3>
                        <table className="w-full bg-white rounded shadow mb-4">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700">
                                    <th className="p-2 text-left">Medicine Name</th>
                                    <th className="p-2 text-left">Strength</th>
                                    <th className="p-2 text-left">Dose</th>
                                    <th className="p-2 text-left">Duration</th>
                                    <th className="p-2 text-left">When to take</th>
                                    <th className="p-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicines.map((medicine, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-2">{medicine.name}</td>
                                        <td className="p-2">{medicine.strength}</td>
                                        <td className="p-2">{medicine.dose}</td>
                                        <td className="p-2">{medicine.duration}</td>
                                        <td className="p-2">{medicine.when}</td>
                                        <td className="p-2">
                                            <button onClick={() => handleRemoveMedicine(index)} className="text-red-500">
                                                🗑
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="p-2">
                                        <input type="text" name="name" placeholder="Enter Medicine" value={newMedicine.name} onChange={handleChange} className="border p-1 w-full" />
                                    </td>
                                    <td className="p-2">
                                        <input type="text" name="strength" placeholder="Strength" value={newMedicine.strength} onChange={handleChange} className="border p-1 w-full" />
                                    </td>
                                    <td className="p-2">
                                        <input type="text" name="dose" placeholder="Dose" value={newMedicine.dose} onChange={handleChange} className="border p-1 w-full" />
                                    </td>
                                    <td className="p-2">
                                        <input type="text" name="duration" placeholder="Duration" value={newMedicine.duration} onChange={handleChange} className="border p-1 w-full" />
                                    </td>
                                    <td className="p-2">
                                        <select name="when" value={newMedicine.when} onChange={handleChange} className="border p-1 w-full">
                                            <option value="">When to take</option>
                                            <option value="Before Food">Before Food</option>
                                            <option value="With Food">With Food</option>
                                            <option value="After Food">After Food</option>
                                        </select>
                                    </td>
                                    <td className="p-2">
                                        <button onClick={handleAddMedicine} className="bg-green-500 text-white px-2 py-1 rounded">
                                            Add
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <button onClick={toggleViewPrescription} className="bg-[#00bfff] font-bold text-white px-4 py-2 mt-2 rounded">
                            View Prescription
                        </button>
                        <div className="bg-gray-100 p-4 rounded mt-2">
                            <h4 className="text-lg font-bold mb-2">Additional Note</h4>
                            <p className="text-gray-600">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                            </p>
                        </div>
                    </div>

                    {/* Prescription Preview Section - 50% Width */}
                    {showPrescription && (
                        <div className="w-1/2 pl-5 mt-6 p-6">
                            <div className="p-4 bg-white shadow rounded-lg">
                                <div className="flex justify-between mb-4">
                                    <div>
                                        <img src={logo} alt="logo" className='w-48' />
                                    </div>
                                    <div>
                                        <h1 className='text-[#00bfff] font-bold text-xl'>Dr. Bharat Patel</h1>
                                        <p className='text-gray-600 '>Obstetrics and Gynecology</p>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    {prescriptions.map((prescription) => (
                                        <div key={prescription.id} className="mb-3 bg-gray-100 p-4 rounded-lg shadow-sm">
                                            <div className="flex justify-between mb-2">
                                                <p className="font-semibold"><span className="font-bold">Hospital:</span> {prescription.hospitalName}</p>
                                                <p className="font-semibold"><span className="font-bold">Patient:</span> {prescription.patientName}</p>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                                <p className="font-semibold"><span className="font-bold">Prescription Date:</span> {prescription.prescriptionDate}</p>
                                                <p className="font-semibold"><span className="font-bold">Age:</span> {prescription.age} Years</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold"><span className="font-bold">Gender:</span> {prescription.gender}</p>
                                                <p className="font-semibold"><span className="font-bold">Address:</span> {prescription.address}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <table className="w-full">
                                    <thead className='bg-gray-100'>
                                        <tr className=''>
                                            <th className="text-left p-2 mb-4">Medicine Name</th>
                                            <th className="text-left">Strength</th>
                                            <th className="text-left">Dose</th>
                                            <th className="text-left">Duration</th>
                                            <th className="text-left">When to take</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {medicines.map((medicine, index) => (
                                            <tr key={index}>
                                                <td className='border-b border-gray-200 p-2'>{medicine.name}</td>
                                                <td className='border-b border-gray-200'>{medicine.strength}</td>
                                                <td className='border-b border-gray-200'>{medicine.dose}</td>
                                                <td className='border-b border-gray-200'>{medicine.duration}</td>
                                                <td className='border-b border-gray-200'>{medicine.when}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="mt-4">Additional Note: Lorem Ipsum text</p>
                                <div className="flex justify-between items-center mt-8">
                                    {/* Doctor Signature with Gray Line */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-full h-px bg-gray-400 mb-1"></div> {/* Gray line above */}
                                        <h1 className="text-gray-600 font-semibold">Doctor-sign</h1>
                                    </div>

                                    {/* Send Button */}
                                    <button className="bg-[#00bfff] font-bold text-white px-4 py-2 rounded">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreatePrescription;
