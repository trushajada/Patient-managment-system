import React, { useState } from "react";
import logoBanner from "../../assets/images/loginBanner.png";
import logo from "../../assets/images/logo.png";
import vector1 from "../../assets/images/Vector1.png";
import vector2 from "../../assets/images/Vector2.png";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [gender, setGender] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [errors, setErrors] = useState({});
    const [address, setAddress] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};

        // Validation checks
        if (!firstName) validationErrors.firstName = "First Name is required.";
        if (!lastName) validationErrors.lastName = "Last Name is required.";
        if (!email) validationErrors.email = "Email is required.";
        if (!number) validationErrors.number = "Phone Number is required.";
        if (!country) validationErrors.country = "Country is required.";
        if (!state) validationErrors.state = "State is required.";
        if (!city) validationErrors.city = "City is required.";
        if (!address) validationErrors.address = "Address is required.";
        if (!password) validationErrors.password = "Password is required.";
        if (password !== confirmPassword) validationErrors.confirmPassword = "Passwords do not match.";
        if (!age) validationErrors.age = "Age is required.";
        if (!height) validationErrors.height = "Height is required.";
        if (!weight) validationErrors.weight = "Weight is required.";
        if (!gender) validationErrors.gender = "Gender is required.";
        if (!bloodGroup) validationErrors.bloodGroup = "Blood Group is required.";
        if (!dateOfBirth) validationErrors.dateOfBirth = "Date of Birth is required.";

        // If there are validation errors, set them in state and return
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Prepare user data
        const userData = {
            firstName,
            lastName,
            email,
            number,
            country,
            state,
            city,
            password,
            age,
            height,
            weight,
            gender,
            bloodGroup,
            dateOfBirth,
            address,
        };

        // Store user data in localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log("Form submitted successfully:", userData);

        // Reset form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setNumber("");
        setCountry("");
        setState("");
        setCity("");
        setPassword("");
        setConfirmPassword("");
        setAge("");
        setHeight("");
        setWeight("");
        setGender("");
        setBloodGroup("");
        setDateOfBirth("");
        setAddress("");

        // Navigate to login page after resetting fields
        navigate('/login');
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Toggle confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Handle password change
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setErrors((prev) => ({
            ...prev,
            password: newPassword.length < 6 ? "Password must be at least 6 characters." : ""
        }));
    };

    // Handle confirm password change
    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setErrors((prev) => ({
            ...prev,
            confirmPassword: newConfirmPassword !== password ? "Passwords do not match." : ""
        }));
    };



    return (
        <div className="min-h-screen flex">
            {/* Form Section */}
            <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-10">
                <div className="max-w-[704px] w-full bg-white p-11 rounded-lg shadow-lg mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-center">Registration</h2>
                    <form onSubmit={handleSubmit}>
                        {/* First Name & Last Name */}
                        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mb-4">
                            <div className="w-full md:w-1/2 relative mb-4 md:mb-0">
                                <label className="absolute text-sm -top-2 left-3 px-1 bg-white text-gray-600">First Name*</label>
                                <input
                                    type="text"
                                    className={`w-full px-4 py-3 border rounded-md focus:outline-none ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="Enter First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                            </div>
                            <div className="w-full md:w-1/2 relative">
                                <label className="absolute text-sm -top-2 left-3 px-1 bg-white text-gray-600">Last Name*</label>
                                <input
                                    type="text"
                                    className={`w-full px-4 py-3 border rounded-md focus:outline-none ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="Enter Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                            </div>
                        </div>

                        {/* Email & Phone Number */}
                        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mb-4">
                            <div className="w-full md:w-1/2 relative mb-4 md:mb-0">
                                <label className="absolute text-sm -top-2 left-3 px-1 bg-white text-gray-600">Email*</label>
                                <input
                                    type="email"
                                    className={`w-full px-4 py-3 border rounded-md focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div className="w-full md:w-1/2 relative">
                                <label className="absolute text-sm -top-2 left-3 px-1 bg-white text-gray-600">Phone Number*</label>
                                <input
                                    type="tel"
                                    className={`w-full px-4 py-3 border rounded-md focus:outline-none ${errors.number ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="Enter Phone Number"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                                {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
                            </div>
                        </div>

                        {/* Age, Height & Weight */}
                        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mb-4">
                            <div className="w-full md:w-1/3 relative mb-4 md:mb-0">
                                <label className="absolute text-sm -top-2 left-3 px-1 bg-white text-gray-600">Age*</label>
                                <input
                                    type="number"
                                    className={`w-full px-4 py-3 border rounded-md focus:outline-none ${errors.age ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="Enter Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                            </div>
                            <div className="w-full md:w-1/3 relative mb-4 md:mb-0">
                                <label className="absolute text-sm -top-2 left-3 px-1 bg-white text-gray-600">Height (cm)*</label>
                                <input
                                    type="number"
                                    className={`w-full px-4 py-3 border rounded-md focus:outline-none ${errors.height ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="Enter Height"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                                {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height}</p>}
                            </div>
                            <div className="w-full md:w-1/3 relative">
                                <label className="absolute text-sm -top-2 left-3 px-1 bg-white text-gray-600">Weight (kg)*</label>
                                <input
                                    type="number"
                                    className={`w-full px-4 py-3 border rounded-md focus:outline-none ${errors.weight ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="Enter Weight"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                                {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
                            </div>
                        </div>

                        {/* Gender, Blood Group & Date of Birth */}
                        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mb-4">
                            <div className="w-full md:w-1/3 relative mb-4 md:mb-0">
                                <label className="absolute text-sm -top-2 left-3 px-1 bg-white text-gray-600">Gender*</label>
                                <select
                                    className={`w-full px-4 py-3 border rounded-md focus:outline-none ${errors.gender ? "border-red-500" : "border-gray-300"}`}
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                            </div>
                            <div className="w-full md:w-1/3 relative mb-4 md:mb-0">
                                <label className="absolute text-sm -top-2 left-3 px-1 bg-white text-gray-600">Blood Group*</label>
                                <select
                                    className={`w-full px-4 py-3 border rounded-md focus:outline-none ${errors.bloodGroup ? "border-red-500" : "border-gray-300"}`}
                                    value={bloodGroup}
                                    onChange={(e) => setBloodGroup(e.target.value)}
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                                {errors.bloodGroup && <p className="text-red-500 text-xs mt-1">{errors.bloodGroup}</p>}
                            </div>
                            <div className="w-full md:w-1/3 relative">
                                <label className="absolute text-sm -top-2 left-3 px-1 bg-white text-gray-600">Date of Birth*</label>
                                <input
                                    type="date"
                                    className={`w-full px-4 py-3 border rounded-md focus:outline-none ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"}`}
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                />
                                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                            </div>
                        </div>

                        {/* country,city,state  */}
                        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mb-4">
                            {/* Country */}
                            <div className="w-full md:w-1/3 relative mb-4 md:mb-0">
                                <label className="absolute text-sm -top-2 left-3 px-1 bg-white text-gray-600">Country*</label>
                                <select
                                    className={`w-full px-4 py-3 border rounded-md focus:outline-none ${errors.country ? "border-red-500" : "border-gray-300"}`}
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                >
                                    <option value="">Select Country</option>
                                    <option value="IN">India</option>
                                    <option value="AE">Dubai</option>
                                    <option value="GB">London</option>
                                    <option value="CA">Canada</option>
                                    <option value="ZA">South Africa</option>
                                    <option value="US">United States</option>
                                </select>
                                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                            </div>

                            {/* State */}
                            <div className="w-full md:w-1/3 relative mb-4 md:mb-0">
                                <label className="absolute text-sm -top-2 left-3 px-1 bg-white text-gray-600">State*</label>
                                <select
                                    className={`w-full px-4 py-3 border rounded-md focus:outline-none ${errors.state ? "border-red-500" : "border-gray-300"}`}
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">Select State</option>
                                    <option value="CA">Gujrat</option>
                                    <option value="CA">California</option>
                                    <option value="NY">New York</option>
                                    <option value="TX">Texas</option>
                                    <option value="FL">Florida</option>
                                    <option value="WA">Washington</option>
                                </select>
                                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                            </div>

                            {/* City */}
                            <div className="w-full md:w-1/3 relative">
                                <label className="absolute text-sm -top-2 left-3 px-1 bg-white text-gray-600">City*</label>
                                <select
                                    className={`w-full px-4 py-3 border rounded-md focus:outline-none ${errors.city ? "border-red-500" : "border-gray-300"}`}
                                    value={state}
                                    onChange={(e) => setCity(e.target.value)}
                                >
                                    <option value="">Select City</option>
                                    <option value="SU">Surat</option>
                                    <option value="AH">Ahmdabad</option>
                                    <option value="RA">Rajkot</option>
                                    <option value="TX">Texas</option>
                                    <option value="FL">Florida</option>
                                    <option value="WA">Washington</option>
                                </select>
                                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                            </div>
                        </div>


                        {/* Address */}
                        <div className="relative mb-4">
                            <label className="absolute text-sm -top-2 left-3 px-1 bg-white text-gray-600">Address*</label>
                            <textarea
                                className={`w-full px-4 py-3 border rounded-md focus:outline-none ${errors.address ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></textarea>
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>

                        {/* password */}
                        <div className="relative mb-4">
                            <label className="absolute text-sm -top-2 left-3 px-1 bg-white text-gray-600">Password*</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`w-full px-4 py-3 border rounded-md focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-3">
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c0 3.4 5 9 9 9s9-5.6 9-9-5-9-9-9-9 5.6-9 9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12c0 1.4-1.6 2-3 2s-3-.6-3-2" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c0-3.4 5-9 9-9s9 5.6 9 9-5 9-9 9-9-5.6-9-9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12c0-1.4-1.6-2-3-2s-3 .6-3 2" />
                                    </svg>
                                )}
                            </button>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div className="relative mb-4">
                            <label className="absolute text-sm -top-2 left-3 px-1 bg-white text-gray-600">Confirm Password*</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className={`w-full px-4 py-3 border rounded-md focus:outline-none ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter confirm password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-3">
                                {showConfirmPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c0 3.4 5 9 9 9s9-5.6 9-9-5-9-9-9-9 5.6-9 9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12c0 1.4-1.6 2-3 2s-3-.6-3-2" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12c0-3.4 5-9 9-9s9 5.6 9 9-5 9-9 9-9-5.6-9-9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12c0-1.4-1.6-2-3-2s-3 .6-3 2" />
                                    </svg>
                                )}
                            </button>
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>

                        <p className="text-sm mb-2 mt-4">
                            I agree to all The{" "}<Link to="/T&C" className="text-blue-500 hover:text-blue-700">T & C</Link> and
                            <Link to="/Privacy polices" className="text-blue-500 hover:text-blue-700">
                                Privacy polices
                            </Link>
                        </p>
                        {/* Submit Button */}
                        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none">
                            Register

                        </button>

                    </form>
                    <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:text-blue-700">
                            Login
                        </Link>
                    </p>
                </div>
            </div>

            {/* Image Section */}
            <div className="w-1/2 bg-gray-100 relative flex justify-center items-center ">
                <img
                    src={vector1}
                    alt="Vector Top Left"
                    className="absolute top-0 left-0 w-50 h-60"
                />
                <img
                    src={vector2}
                    alt="Vector Bottom Right"
                    className="absolute bottom-0 right-0 w-50 h-60"
                />

                <div className="text-center">
                    <img src={logo} alt="Logo" className="mb-4 mx-auto w-60 h-30" />
                    <img
                        src={logoBanner}
                        alt="Banner"
                        className="w-full max-w-lg mx-auto"
                    />
                    <h2 className="text-4xl font-bold mt-4">Hospital</h2>
                    <p className="text-gray-600 mt-2 font-semibold">
                        You Can stay your Hospital and Contact<br /> With Your Facility.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
