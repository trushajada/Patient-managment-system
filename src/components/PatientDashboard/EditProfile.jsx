import React, { useState } from 'react';
import user1 from '../../assets/images/userimg1.png'; 
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaCamera, FaCalendarCheck, FaHospitalUser, FaFileAlt, FaBell } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
import { RiBillFill, RiLogoutBoxRFill, RiHome2Line } from 'react-icons/ri';
import logo from '../../assets/images/logo.png';
import sidebar from '../../assets/images/sidebar.png';

const EditProfile = () => {
    const [profileImage, setProfileImage] = useState(user1);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Initialize patient data as a state variable
    const [patientData, setPatientData] = useState([
        { label: 'Name', value: 'John Doe' },
        { label: 'Number', value: '1234567890' },
        { label: 'Email', value: 'john@example.com' },
        { label: 'Gender', value: 'Male' },
        { label: 'DOB', value: '1990-01-01' },
        { label: 'Age', value: '34' },
        { label: 'Blood Group', value: 'O+' },
        { label: 'Height', value: '180 cm' },
        { label: 'Weight', value: '75 kg' },
        { label: 'Country', value: 'Country' },
        { label: 'State', value: 'State' },
        { label: 'City', value: 'City' },
        { label: 'Address', value: 'Address' },
    ]);

    const menuItems = [
        { path: '/dashboard', name: 'Personal Health Record', icon: <FaHospitalUser /> },
        { path: '/booking', name: 'Appointment Booking', icon: <FaCalendarCheck /> },
        { path: '/records', name: 'Prescription Access', icon: <FaFileAlt /> },
        { path: '/teleconsultation', name: 'Teleconsultation Access', icon: <IoIosChatboxes /> },
        { path: '/chats', name: 'Chats', icon: <IoIosChatboxes /> },
        { path: '/bills', name: 'Bills', icon: <RiBillFill /> },
        { path: '/edit-profile', name: 'Edit Profile', icon: null }
    ];

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: patientData.find(data => data.label === 'Name')?.value || '',
        number: patientData.find(data => data.label === 'Number')?.value || '',
        email: patientData.find(data => data.label === 'Email')?.value || '',
        gender: patientData.find(data => data.label === 'Gender')?.value || '',
        dob: patientData.find(data => data.label === 'DOB')?.value || '',
        age: patientData.find(data => data.label === 'Age')?.value || '',
        bloodGroup: patientData.find(data => data.label === 'Blood Group')?.value || '',
        height: patientData.find(data => data.label === 'Height')?.value || '',
        weight: patientData.find(data => data.label === 'Weight')?.value || '',
        country: patientData.find(data => data.label === 'Country')?.value || '',
        state: patientData.find(data => data.label === 'State')?.value || '',
        city: patientData.find(data => data.label === 'City')?.value || '',
        address: patientData.find(data => data.label === 'Address')?.value || '',
        // Add other fields if necessary
    });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            // Populate form data with current patient data for editing
            const initialFormData = {};
            patientData.forEach(data => {
                initialFormData[data.label.toLowerCase()] = data.value;
            });
            setFormData(initialFormData);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update patient data with the new values from the form
        const updatedPatientData = patientData.map((data) => ({
            ...data,
            value: formData[data.label.toLowerCase()] || data.value,
        }));
        setPatientData(updatedPatientData);
        setIsEditing(false); // Stop editing mode after saving
        navigate('/dashboard');
    };

    const handleCancel = () => {
        // Reset form data to initial patient data
        const initialData = {};
        patientData.forEach(data => {
            initialData[data.label.toLowerCase()] = data.value;
        });
        setFormData(initialData);
        // Navigate to dashboard on cancel
        navigate('/dashboard');
    };

    const handleLogout = () => {
        localStorage.removeItem('dashlogin');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const filteredMenuItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-100 min-h-screen flex">
            {/* Sidebar */}
            <div className="bg-white w-72 rounded-lg shadow-md p-4">
                <header className="flex items-center justify-center p-4">
                    <img src={logo} alt="Logo" className="mb-4 w-60 h-30" />
                </header>
                <nav className="mt-4">
                    <ul>
                        {filteredMenuItems.map(item => (
                            <li
                                key={item.path}
                                className={`mb-3 text-lg px-4 py-2 rounded-lg transition-shadow ${isActive(item.path) ? 'text-blue-400 font-bold' : 'text-gray-400'
                                    }`}
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
                            src={profileImage}
                            alt="Profile"
                            className="h-12 w-12 rounded-full ml-4 bg-blue-200"
                        />
                        <span className="ml-2">Admin Name</span>
                    </div>
                </div>

                {/* Profile Settings Section */}
                <div className="relative p-16 w-full">
                    <div className="absolute top-0 left-0 right-0 h-48" style={{ background: 'linear-gradient(107.38deg, #4C49ED 2.61%, #020067 101.2%)' }} />
                    <div className="relative z-10 mb-8">
                        <h1 className="text-3xl font-semibold text-white">Profile Setting</h1>
                    </div>

                    {/* Left Side: Profile Picture */}
                    <div className="relative z-10 bg-white shadow-lg rounded-lg p-8 flex" style={{ marginTop: '1rem' }}>
                        <div className="flex flex-col items-center w-1/4 border-r pr-8">
                            <div className="relative w-32 h-32 mb-4">
                                <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                            </div>

                            {/* Change Profile Button */}
                            <div className="flex flex-col items-center mt-2 p-2 rounded-lg bg-gray-100">
                                <label htmlFor="profileImage" className="flex items-center text-blue-500 cursor-pointer">
                                    <FaCamera className="mr-2" />
                                    Change Profile
                                </label>
                                <input
                                    id="profileImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfileChange}
                                    className="hidden" // Hiding the file input
                                />
                            </div>
                        </div>

                        {/* Right Side: Profile Information */}
                        <div className="w-2/3 pl-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold">Edit Profile</h3>
                                <button
                                    onClick={handleEditToggle}
                                    className="text-blue-500 hover:underline"
                                >
                                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-3 gap-6">
                                    {/* Name */}
                                    <div className="relative mb-4">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter Name"
                                            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                                            disabled={!isEditing}
                                            required
                                        />
                                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-4 peer-focus:left-3">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                    </div>

                                    {/* Number */}
                                    <div className="relative mb-4">
                                        <input
                                            type="text"
                                            name="number"
                                            value={formData.number}
                                            onChange={handleChange}
                                            placeholder="Enter Phone Number"
                                            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                                            disabled={!isEditing}
                                            required
                                        />
                                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-4 peer-focus:left-3">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                    </div>

                                    {/* Email */}
                                    <div className="relative mb-4">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter Email"
                                            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                                            disabled={!isEditing}
                                            required
                                        />
                                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-4 peer-focus:left-3">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                    </div>

                                    {/* Gender */}
                                    <div className="relative mb-4">
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 disabled:bg-gray-100"
                                            disabled={!isEditing}
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-4 peer-focus:left-3">
                                            Gender <span className="text-red-500">*</span>
                                        </label>
                                    </div>

                                    {/* DOB */}
                                    <div className="relative mb-4">
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                                            disabled={!isEditing}
                                            required
                                        />
                                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-4 peer-focus:left-3">
                                            Date of Birth <span className="text-red-500">*</span>
                                        </label>
                                    </div>

                                    {/* Age */}
                                    <div className="relative mb-4">
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            placeholder="Enter Age"
                                            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                                            disabled={!isEditing}
                                            required
                                            min="0"
                                        />
                                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-4 peer-focus:left-3">
                                            Age <span className="text-red-500">*</span>
                                        </label>
                                    </div>

                                    {/* Blood Group */}
                                    <div className="relative mb-4">
                                        <input
                                            type="text"
                                            name="bloodGroup"
                                            value={formData.bloodGroup}
                                            onChange={handleChange}
                                            placeholder="Enter Blood Group"
                                            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                                            disabled={!isEditing}
                                            required
                                        />
                                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-4 peer-focus:left-3">
                                            Blood Group <span className="text-red-500">*</span>
                                        </label>
                                    </div>

                                    {/* Height */}
                                    <div className="relative mb-4">
                                        <input
                                            type="text"
                                            name="height"
                                            value={formData.height}
                                            onChange={handleChange}
                                            placeholder="Enter Height"
                                            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                                            disabled={!isEditing}
                                            required
                                        />
                                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-4 peer-focus:left-3">
                                            Height <span className="text-red-500">*</span>
                                        </label>
                                    </div>

                                    {/* Weight */}
                                    <div className="relative mb-4">
                                        <input
                                            type="text"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            placeholder="Enter Weight"
                                            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                                            disabled={!isEditing}
                                            required
                                        />
                                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-4 peer-focus:left-3">
                                            Weight <span className="text-red-500">*</span>
                                        </label>
                                    </div>

                                    {/* Country */}
                                    <div className="relative mb-4">
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            placeholder="Enter Country"
                                            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                                            disabled={!isEditing}
                                            required
                                        />
                                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-4 peer-focus:left-3">
                                            Country <span className="text-red-500">*</span>
                                        </label>
                                    </div>

                                    {/* State */}
                                    <div className="relative mb-4">
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="Enter State"
                                            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                                            disabled={!isEditing}
                                            required
                                        />
                                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-4 peer-focus:left-3">
                                            State <span className="text-red-500">*</span>
                                        </label>
                                    </div>

                                    {/* City */}
                                    <div className="relative mb-4">
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Enter City"
                                            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                                            disabled={!isEditing}
                                            required
                                        />
                                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-4 peer-focus:left-3">
                                            City <span className="text-red-500">*</span>
                                        </label>
                                    </div>

                                    {/* Address */}
                                    <div className="relative mb-4 col-span-2">
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Enter Address"
                                            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 h-24"
                                            disabled={!isEditing}
                                            required
                                        />
                                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-4 peer-focus:left-3">
                                            Address <span className="text-red-500">*</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {isEditing && (
                                    <div className="flex justify-end gap-4 mt-6">
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="px-6 py-2 rounded bg-gray-200 text-gray-700"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-2 rounded bg-blue-500 text-white hover:bg-blue-600" style={{ background: "#00bfff" }} >
                                            Save
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
