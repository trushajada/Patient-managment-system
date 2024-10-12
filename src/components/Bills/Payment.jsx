import React, { useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import Appointment from '../../assets/images/Appointment.png'; 

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('masterCard');  

  const handleOkayClick = () => {
    navigate('/bills'); 
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Appointment})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-90"></div>

      {/* Content Box */}
      <div className="relative flex items-center justify-center min-h-screen">  
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">  
          <div className="flex items-center justify-center mb-4">  
            <div className="bg-green-500 rounded-full p-3">  
              <span className="text-white text-2xl">₹</span>  
            </div>  
          </div>  
          <h2 className="text-xl font-bold text-center mb-2">Payment</h2>  
          <p className="text-gray-600 text-center mb-4">  
            Pay your bill at the cash counter to confirm your bill.  
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

export default Payment;  
