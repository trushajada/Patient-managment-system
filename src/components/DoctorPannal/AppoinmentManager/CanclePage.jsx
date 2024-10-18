import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Todaypage from '../../../assets/images/TodayPage.png'
import { FaCalendarCheck } from 'react-icons/fa';

const CanclePage = () => {
    const navigate = useNavigate();
    const handleNoClick = () => {
        // Navigate to Time Slot page
        navigate('/appointment-time-slot'); // Update this path to match your routing setup
    };

    const handlePaymentReturnClick = () => {
        // Navigate to Payment Method page
        navigate('/paymentmethod'); // Update this path to match your routing setup
    };
   

    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${Todaypage})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-90"></div>

            {/* Content Box */}
            <div className="relative z-10 max-w-4xl bg-white p-6 rounded-lg shadow-lg">
            <div className='w-[350px] mx-auto'>
                <div className="flex justify-center">
                    <FaCalendarCheck className='text-2xl text-white bg-red-700 w-10 h-10 p-2 rounded-full'/>
                </div>
                <h1 className='text-center text-2xl font-bold mt-3'>Cancel Online Appointment</h1>
                <p className='text-center mt-3'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, deserunt!
                </p>
                <div className="flex justify-center gap-4 mt-4">
            <button 
                className='border w-20 px-4 py-2' 
                onClick={handleNoClick}
            >
                No
            </button>
            <button 
                className='border bg-[#00bfff] text-white px-4 py-2' 
                onClick={handlePaymentReturnClick}
            >
                Payment Return
            </button>
        </div>

            </div>
        </div>
        </div>
    );
};

export default CanclePage;
