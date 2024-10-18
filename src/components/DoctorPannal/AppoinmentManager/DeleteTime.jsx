import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Todaypage from '../../../assets/images/TodayPage.png'

const DeleteTime = () => {
    const navigate = useNavigate();

    const handleNoClick = () => {
        navigate('/appointment-time-slot'); 
    };

    const handleYesClick = () => {
        navigate('/doctorDashboard'); 
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
            <div className='w-[300px]'>
                <h1 className='text-center text-2xl font-bold'>Delete Time Slot?</h1>
                <p className='text-center'>This slot is to be deleted?</p>
                <div className="flex justify-center gap-4 mt-4">
                    <button 
                        onClick={handleNoClick} 
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        No
                    </button>
                    <button 
                        onClick={handleYesClick} 
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default DeleteTime;
