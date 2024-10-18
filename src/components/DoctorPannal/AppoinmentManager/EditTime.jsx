import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Appoinment from '../../../assets/images/Appointment.png';

const EditTime = () => {
    const navigate = useNavigate();

   

    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${Appoinment})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-90"></div>

            {/* Content Box */}
            <div className="relative z-10 max-w-4xl bg-white p-6 rounded-lg shadow-lg">
               
            </div>
        </div>
    );
};

export default EditTime;
