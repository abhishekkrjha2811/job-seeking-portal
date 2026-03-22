import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyForJob } from "../../services/operations/jobAPI";
import { FaTimes, FaFileUpload, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { use } from "react";

const ApplicationModal = ({ isOpen, onClose, job }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const [formData, setFormData] = useState({
        name: user.firstName + " " + user.lastName,
        email: user.email,
        phone: user.phone,
        address: "",
        coverLetter: "",
        resume: null,
    });
    const [resumePreview, setResumePreview] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                resume: file,
            }));
            setResumePreview(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData for file upload
        const applicationData = new FormData();
        applicationData.append("name", formData.name);
        applicationData.append("email", formData.email);
        applicationData.append("phone", formData.phone);
        applicationData.append("address", formData.address);
        applicationData.append("coverLetter", formData.coverLetter);
        applicationData.append("jobId", job._id);
        applicationData.append("resume", formData.resume);

        const result = await dispatch(applyForJob(applicationData));

        if (result) {
            // Reset form
            setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                coverLetter: "",
                resume: null,
            });
            setResumePreview("");
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Background Overlay */}
            <div onClick={onClose} className="absolute inset-0 bg-blue-900/20 backdrop-blur-sm"></div>

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl max-w-lg max-h-[90vh] w-full p-6 z-50 animate-fadeIn overflow-y-auto">
                {/* Close Button (X) */}
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                    <FaTimes size={20} />
                </button>

                {/* Header */}
                <h2 className="text-xl font-semibold text-blue-700">Apply for Job</h2>
                <p className="text-gray-700 mt-1 mb-4 font-medium">{job?.title}</p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <FaUser className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email Address</label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <FaEnvelope className="text-gray-400 mr-2" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <FaPhone className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <FaMapMarkerAlt className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Cover Letter */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Cover Letter (Tell us why you're a great fit)</label>
                        <textarea
                            name="coverLetter"
                            rows="4"
                            value={formData.coverLetter}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        ></textarea>
                    </div>

                    {/* Resume Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Upload Resume</label>

                        <label className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50">
                            <FaFileUpload className="text-gray-500" />
                            <span className="text-gray-600">{resumePreview || "Choose file"}</span>
                            <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-2 w-full">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 w-[50%] py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button type="submit" className="px-4 w-[50%] py-2 bg-[#1E90FF] text-white rounded-md hover:bg-[#0000FF]">
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplicationModal;
