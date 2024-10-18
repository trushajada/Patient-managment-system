import React, { useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import Todaypage from '../../../assets/images/TodayPage.png';
import { FaCalendarCheck } from 'react-icons/fa';


const AppoinmentSucc = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('masterCard');  

  const handleOkayClick = () => {
    navigate('/doctorDashboard'); 
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Todaypage})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-90"></div>

      {/* Content Box */}
      <div className="relative flex items-center justify-center min-h-screen">  
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">  
          <div className="flex items-center justify-center mb-4">  
            <div className="bg-green-500 rounded-full p-3">  
            <div className="flex justify-center">
                    <FaCalendarCheck className='text-2xl text-white w-10 h-10 p-2 rounded-full'/>
                </div>            </div>  
          </div>  
          <h2 className="text-xl font-bold text-center mb-2">Appoinment Cancle Successfully</h2>  
          <p className="text-gray-600 text-center mb-4">  
            The Appoinmnet Successfully canclles .  
          </p>  
          <button 
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200" 
            onClick={handleOkayClick} 
          >  
            Okay  
          </button>  
        </div>  
      </div>   
    </div>  
  );
};

export default AppoinmentSucc;  
