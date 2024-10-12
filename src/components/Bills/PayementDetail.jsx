import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Appointment from '../../assets/images/Appointment.png';

const PaymentDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Define the payment state here
    const [paymentMethod, setPaymentMethod] = useState('masterCard');
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [paymentType, setPaymentType] = useState('masterCard');

    const handleSubmit = (e) => {
        e.preventDefault();
        const paymentData = {
            paymentMethod,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
        };

        navigate('/payment', { state: paymentData });
    };

    const handlePaymentChange = (event) => {
        setPaymentType(event.target.value);
        setPaymentMethod(event.target.value);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${Appointment})` }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-90"></div>

            {/* Content Box */}
            <div className="relative z-10 p-6 rounded-lg shadow-lg bg-white w-80">
                <h3 className="text-lg font-semibold mb-4 text-center">Payment Method</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="flex items-center justify-between">
                            <span className="ml-2 flex items-center">
                                <span className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" width="24" height="24">
                                        <g fill="none" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" fill="#FF5F00" />
                                            <circle cx="24" cy="12" r="10" fill="#C51B22" />
                                            <path d="M8 12c0-2.2 2.8-4 6-4s6 1.8 6 4-2.8 4-6 4-6-1.8-6-4z" fill="#F0F0F0" />
                                        </g>
                                    </svg>
                                </span> Master Card
                            </span>
                            <input
                                type="radio"
                                name="payment"
                                value="masterCard"
                                checked={paymentType === 'masterCard'}
                                onChange={handlePaymentChange}
                                className="form-radio text-blue-500"
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <div className="relative">
                            <label className="absolute left-2 top-[-10px] bg-white px-1 text-sm text-gray-600">Card Holder Name*</label>
                            <input
                                type="text"
                                value={cardHolderName}
                                onChange={(e) => setCardHolderName(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="relative">
                            <label className="absolute left-2 top-[-10px] bg-white px-1 text-sm text-gray-600">Card Number*</label>
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mb-4 flex justify-between">
                        <div className="w-1/2 mr-2">
                            <div className="relative">
                                <label className="absolute left-2 top-[-10px] bg-white px-1 text-sm text-gray-600">Expiry Date*</label>
                                <input
                                    type="date"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="w-1/2 ml-2">
                            <div className="relative">
                                <label className="absolute left-2 top-[-10px] bg-white px-1 text-sm text-gray-600">CVV*</label>
                                <input
                                    type="text"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="flex items-center justify-between">
                            <span className="ml-2 flex items-center">
                                <span className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                                        <path fill="#1565C0" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"></path>
                                        <path fill="#FFF" d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z"></path>
                                        <path fill="#FFC107" d="M12.212,24.945l-0.966-4.748c0,0-0.437-1.029-1.573-1.029c-1.136,0-4.44,0-4.44,0S10.894,20.84,12.212,24.945z"></path>
                                    </svg>
                                </span> Visa Card
                            </span>
                            <input
                                type="radio"
                                name="payment"
                                value="visa"
                                checked={paymentType === 'visa'}
                                onChange={handlePaymentChange}
                                className="form-radio text-blue-500"
                            />
                        </label>
                    </div>

                    <div className="flex justify-between">
                        <button type="button" className="bg-gray-300 text-white px-4 py-2 rounded" onClick={() => navigate(-1)}>
                            Back
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentDetail;
