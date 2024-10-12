import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Appoinment from '../../assets/images/Appointment.png';

const Paytype = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState('online');

  const handlePaymentChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handlePayNow = () => {
    navigate('/payment-method', { state: { paymentType } });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${Appoinment})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-90"></div>   

      {/* Content Box */}
      <div className="relative z-10 p-6 rounded-lg shadow-lg bg-white w-80">
        <h3 className="text-lg font-semibold mb-4 text-center">Select Payment Type</h3>

        <div className="mb-3 shadow-lg p-3">
          <label className="flex items-center justify-between">
            <span className="ml-2 flex items-center">
              <span className="mr-2">💳</span> Online
            </span>
            <input
              type="radio"
              name="payment"
              value="online"
              checked={paymentType === 'online'}
              onChange={handlePaymentChange}
              className="form-radio text-blue-500"
            />
          </label>
        </div>

        <div className="mb-3 shadow-lg p-3">
          <label className="flex items-center justify-between">
            <span className="ml-2 flex items-center">
              <span className="mr-2">💵</span> Cash
            </span>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentType === 'cash'}
              onChange={handlePaymentChange}
              className="form-radio text-blue-500"
            />
          </label>
        </div>

        <div className="flex justify-between mt-6">
          <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300">Cancel</button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            style={{ background: "#00bfff" }}
            onClick={handlePayNow} // Handle the Pay Now button click
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Paytype;
