import React from 'react';
import { useLocation } from 'react-router-dom';
import TodayPage from '../../../assets/images/TodayPage.png';

const ReminderPage = () => {
    const location = useLocation();
    const { date, time } = location.state || { date: '', time: '' }; // Default values if no state is passed
    const patientDetails = [
        { title: "Patient Name", value: "John Doe" },
        { title: "Patient Issue", value: "Headache" },
        { title: "Disease Name", value: "Migraine" },
    ];

    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${TodayPage})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-90"></div>

            {/* Content Box */}
            <div className="relative z-10 max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                <div className="p-3 rounded-lg w-[350px]">
                    <h1 className="text-2xl font-bold mb-4 text-left">Reminder</h1>
                    <p className='text-yellow-500 font-semibold'>That patient wants to meets you</p>

                    {/* Mapping over patient details */}
                    {patientDetails.map((detail, index) => (
                        <div key={index} className="mt-2 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-400">
                                <span className='text-black-600 font-semibold'>{detail.title}:</span>
                            </h2>
                            <p className="text-black-700 font-semibold">{detail.value}</p>
                        </div>
                    ))}
                    <div className="mt-2 flex justify-between items-center">
                        <p className='text-gray-400 font-semibold text-lg'>Appointment Time:</p>
                        <p className="text-black-700 font-semibold">{time || 'Not set'}</p>
                    </div>
                    <div className="mt-4 flex">
                        <button className="w-1/2 text-black border bg-gray-100 font-semibold py-2 me-4 rounded transition">
                            Cancel
                        </button>
                        <button className="w-1/2 bg-[#00bfff] text-white font-semibold py-2 rounded-r  transition">
                            Join
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReminderPage;
