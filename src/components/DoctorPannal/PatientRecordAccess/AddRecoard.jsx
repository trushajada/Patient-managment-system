import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Appoinment from '../../../assets/images/Appointment.png';

const AddRecord = () => {
    const [files, setFiles] = useState([]);
    const [description, setDescription] = useState('');
    const [savedRecords, setSavedRecords] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length + files.length > 5) {
            alert('You can only upload a maximum of 5 files.');
            return;
        }

        const newFiles = selectedFiles.slice(0, 5 - files.length); // Limit to 5 files
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);

        // Initialize upload progress for new files
        newFiles.forEach((file) => {
            setUploadProgress((prevProgress) => ({
                ...prevProgress,
                [file.name]: 0,
            }));

            // Simulate upload progress
            let progress = 0;
            const interval = setInterval(() => {
                if (progress >= 100) {
                    clearInterval(interval);
                } else {
                    progress += 10;
                    setUploadProgress((prevProgress) => ({
                        ...prevProgress,
                        [file.name]: progress,
                    }));
                }
            }, 200); // Adjust speed of progress simulation as needed
        });
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSave = () => {
        if (files.length === 0) {
            alert('Please upload at least one file.');
            return;
        }

        const record = {
            files,
            description,
        };
        const updatedRecords = [...savedRecords, record];
        setSavedRecords(updatedRecords);
        setFiles([]);
        setDescription('');
        setUploadProgress({});

        navigate('/all-files', { state: { savedRecords: updatedRecords } });
    };

    const handleCancel = () => {
        setFiles([]);
        setDescription('');
        setUploadProgress({});
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${Appoinment})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-90"></div>

            {/* Content Box */}
            <div className="relative z-10 max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                <div className="p-3 rounded-lg w-100">
                    <h1 className="text-2xl font-bold mb-4 text-center">Add Record</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Upload File</label>
                        <input
                            type="file"
                            accept="image/jpeg, image/png, image/gif"
                            multiple
                            onChange={handleFileChange}
                            className="w-full p-3 border rounded-lg"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            PNG, JPG, GIF up to 10MB, Max 5 files.
                        </p>
                    </div>

                    {/* Uploaded Files */}
                    <div className="mb-4">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center mb-2 p-2 border rounded-lg">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-8 h-8 mr-2"
                                />
                                <div className="flex-grow">
                                    <p className="text-sm">{file.name}</p>
                                    <div className="w-full bg-gray-200 rounded h-1">
                                        <div
                                            className="bg-blue-500 h-1 rounded"
                                            style={{ width: `${uploadProgress[file.name]}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveFile(index)}
                                    className="text-red-500 ml-2"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-3">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Enter Description"
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={handleCancel}
                            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-[#00bfff] text-white py-2 px-4 rounded-lg"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRecord;
