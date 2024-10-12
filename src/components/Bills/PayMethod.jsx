import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Appoinment from '../../assets/images/Appointment.png';

const PayMethod = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define paymentType state here
  const [paymentType, setPaymentType] = useState('mastercard'); // Default value can be adjusted

  const handlePaymentChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handlePayNow = () => {
    console.log(`Payment type selected: ${paymentType}`);
    navigate('/payment-detail', { state: { paymentType } });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${Appoinment})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-90"></div>

      {/* Content Box */}
      <div className="relative z-10 p-6 rounded-lg shadow-lg bg-white w-80">
                <h3 className="text-lg font-semibold mb-4 text-center"> Payment Method</h3>

                <div className="mb-3 shadow-lg p-3">
                    <label className="flex items-center justify-between">
                        <span className="ml-2 flex items-center">
                            <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" width="24" height="24">
                                <g fill="none" stroke-width="2">
                                    <circle cx="12" cy="12" r="10" fill="#FF5F00" />
                                    <circle cx="24" cy="12" r="10" fill="#C51B22" />
                                    <path d="M8 12c0-2.2 2.8-4 6-4s6 1.8 6 4-2.8 4-6 4-6-1.8-6-4z" fill="#F0F0F0" />
                                </g>
                            </svg></span> Master Card
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
                            <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                                <path fill="#1565C0" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"></path><path fill="#FFF" d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z"></path><path fill="#FFC107" d="M12.212,24.945l-0.966-4.748c0,0-0.437-1.029-1.573-1.029c-1.136,0-4.44,0-4.44,0S10.894,20.84,12.212,24.945z"></path>
                            </svg></span> Visa Card
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

export default PayMethod;
