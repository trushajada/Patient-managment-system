import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdCall } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import Appointment from '../../assets/images/Appointment.png'



const Reportdownload = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { doctor, onDelete } = location.state || {};

    // Mock data for the report
    const reportData = {
        patient: {
            name: "Yash M. Patel",
            age: 21,
            sex: "Male",
            pid: 555,
            sampleCollectedAt: "125, Shivam Bungalow, S G Road, Mumbai",
            refBy: "Dr. Hiren Shah",
            registeredOn: "02:31 PM 02 Dec, 2X",
            collectedOn: "03:11 PM 02 Dec, 2X",
            reportedOn: "04:35 PM 02 Dec, 2X"
        },
        testDetails: {
            testName: "Complete Blood Count (CBC) with Absolute Count",
            primarySampleType: "Blood"
        },
        results: [
            { investigation: "Hemoglobin (Hb)", result: "12.5", reference: "13.0 - 17.0", unit: "g/dL", remark: "Low" },
            { investigation: "RBC Count", result: "5.2", reference: "4.5 - 5.5", unit: "mill/cumm" },
            { investigation: "Packed Cell Volume (PCV)", result: "57.5", reference: "40 - 50", unit: "%", remark: "High" },
            { investigation: "Mean Corpuscular Volume (MCV)", result: "87.75", reference: "83 - 101", unit: "fL" },
            { investigation: "WBC Count", result: "9000", reference: "4000 - 11000", unit: "cumm" }
        ]
    };

    const { patient, testDetails, results } = reportData;

    const handleClose = () => {
        if (onDelete && doctor) {
            onDelete(doctor.id);
        }
        navigate('/prescriptions');
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${Appointment})` }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-90"></div>

            {/* Modal Box */}
            <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-center mb-6">Test Report</h1>
                    <span className="text-red-500 cursor-pointer rounded-full" onClick={handleClose}>
                        ✖
                    </span>
                </div>

                <div className='border p-3'>
                    <div className="grid grid-cols-2 gap-1 border-bottom">
                        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700 col-span-1">
                            <span className='text-black'>DROLOGY</span> PATHOLOGY LAB
                            <p className='text-black text-lg'>Accurate | Caring | Instant</p>
                        </h2>
                        <div className="text-right col-span-1">
                            <p className='text-lg font-bold flex items-center justify-end'>
                                <IoMdCall className="mr-2 text-2xl text-green-500" />
                                78479244 | 8937980
                            </p>
                            <p className='text-lg font-bold flex items-center justify-end'>
                                <IoMailOutline className="mr-2 text-2xl text-yellow-500" />
                                dologypathlab@gmail.com
                            </p>
                        </div>
                    </div>
                    <div className="border-b border-blue-500 h-[30px] bg-blue-900"></div>

                    <div className="mb-6 mt-4">
                        <div className="grid grid-cols-3 gap-4 border-r border-gray-300 pr-4">
                            {/* First Column */}
                            <div className="pr-4 border-r border-gray-300">
                                <p><strong>Patient Name:</strong> {patient.name}</p>
                                <p><strong>Age:</strong> {patient.age} Years</p>
                                <p><strong>Sex:</strong> {patient.sex}</p>
                                <p><strong>PID:</strong> {patient.pid}</p>
                            </div>
                            {/* Second Column */}
                            <div className="border-r border-gray-300 pr-4">
                                <p><strong>Sample Collected At:</strong> {patient.sampleCollectedAt}</p>
                                <p><strong>Referred By:</strong> {patient.refBy}</p>
                            </div>
                            {/* Third Column */}
                            <div>
                                <p><strong>Registered On:</strong> {patient.registeredOn}</p>
                                <p><strong>Collected On:</strong> {patient.collectedOn}</p>
                                <p><strong>Reported On:</strong> {patient.reportedOn}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        {/* Report Image */}
                        <img src="/path/to/your/image.png" alt="Report" />
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 text-left">Investigation</th>
                                    <th className="px-4 py-2 text-left">Result</th>
                                    <th className="px-4 py-2 text-left">Reference Value</th>
                                    <th className="px-4 py-2 text-left">Unit</th>
                                    <th className="px-4 py-2 text-left">Remark</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((result, index) => (
                                    <tr key={index} className="border-t border-gray-300">
                                        <td className="px-4 py-2">{result.investigation}</td>
                                        <td className="px-4 py-2">{result.result}</td>
                                        <td className="px-4 py-2">{result.reference}</td>
                                        <td className="px-4 py-2">{result.unit}</td>
                                        <td className="px-4 py-2">{result.remark || ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Test Details */}
                    <div className="mt-6">
                        <p><strong>Test Name:</strong> {testDetails.testName}</p>
                        <p><strong>Primary Sample Type:</strong> {testDetails.primarySampleType}</p>
                    </div>

                    {/* Signature Section */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="col-span-1 text-center">
                            <p className="font-bold">DROLOGY PATHOLOGY LAB</p>
                            <div className="border-t border-gray-300 mt-2 mb-2" />
                            <p>(Signature)</p>
                        </div>
                        <div className="col-span-1 text-center">
                            <p className="font-bold">Dr. Payal</p>
                            <div className="border-t border-gray-300 mt-2 mb-2" />
                            <p>(Signature)</p>
                        </div>
                        <div className="col-span-1 text-center">
                            <p className="font-bold">Dr. Vimal Shah</p>
                            <div className="border-t border-gray-300 mt-2 mb-2" />
                            <p>(Signature)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Reportdownload;


