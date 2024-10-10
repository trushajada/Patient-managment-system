import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import Appoinment from '../../assets/images/Appointment.png'
const DownloadPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor, onDelete } = location.state || {};

  const handleDownload = () => {
    const fileData = new Blob([/* data to download */], { type: 'application/pdf' });
    const url = URL.createObjectURL(fileData);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doctor.name}-details.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleClose = () => {
    if (onDelete) {
      onDelete(doctor.id);
    }
    navigate('/records');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${Appoinment})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-90"></div>   
      
      {/* Content Box */}
      <div className="relative z-10 max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Prescription</h2>
          <span className='text-red-500 cursor-pointer rounded-full' onClick={handleClose}>
            ✖
          </span>
        </div>

        {/* Hospital Logo and Doctor Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src={logo} alt="Hospital Logo" className="h-20" />
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">{doctor?.name || 'Doctor Name'}</h2>
            <p className="text-gray-500">{doctor?.specialty || 'Obstetrics and Gynecology'}</p>
          </div>
        </div>

        {/* Patient & Doctor Details Section */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p><strong>Hospital Name:</strong> {doctor?.hospital || 'Hospital Name'}</p>
            <p><strong>Patient Name:</strong> {doctor?.patientName || 'Patient Name'}</p>
            <p><strong>Gender:</strong> {doctor?.gender || 'Gender'}</p>
            <p><strong>Address:</strong> {doctor?.address || 'Address'}</p>
          </div>
          <div className="text-right">
            <p><strong>Prescription Date:</strong> {doctor?.prescriptionDate || 'Date'}</p>
            <p><strong>Age:</strong> {doctor?.age || 'Age'} Years</p>
          </div>
        </div>

        {/* Medicines Table */}
        <div className="mt-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2">Medicine Name</th>
                <th className="border-b py-2">Strength</th>
                <th className="border-b py-2">Dose</th>
                <th className="border-b py-2">Duration</th>
                <th className="border-b py-2">When to take</th>
              </tr>
            </thead>
            <tbody>
              {doctor?.medicines && Array.isArray(doctor.medicines) ? (
                doctor.medicines.map((medicine, index) => (
                  <tr key={index}>
                    <td className="py-2 border-b">{medicine.name}</td>
                    <td className="py-2 border-b">{medicine.strength}</td>
                    <td className="py-2 border-b">{medicine.dose}</td>
                    <td className="py-2 border-b">{medicine.duration}</td>
                    <td className="py-2 border-b">
                      <span className={`px-2 py-1 rounded-full text-white ${medicine.whenToTake === 'Before Food' ? 'bg-blue-500' : 'bg-green-500'}`}>
                        {medicine.whenToTake}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">No medicines available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Additional Notes Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Additional Note</h3>
          <p className="text-gray-600 mt-2">{doctor?.note || 'No additional notes'}</p>
        </div>

        {/* Signature & Download Section */}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-gray-600">
            <p>Doctor Signature</p>
            <div className="mt-4">
              <img src={doctor?.signature || '/path-to-placeholder-signature.jpg'} alt="Signature" className="h-16" />
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
