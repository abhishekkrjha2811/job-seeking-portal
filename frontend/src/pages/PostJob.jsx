import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postJob } from "../services/operations/jobAPI";
import { FaBriefcase, FaFileAlt, FaMapMarkerAlt, FaGlobe, FaCity, FaMoneyBillWave, FaTags, FaFileUpload } from "react-icons/fa";

const PostJob = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        country: "",
        city: "",
        location: "",
        salaryFrom: "",
        salaryTo: "",
        fixedSalary: "",
        jobDocument: null,
    });

    const [salaryType, setSalaryType] = useState("range"); // "range" or "fixed"
    const [documentPreview, setDocumentPreview] = useState("");

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
            // Check if file is PDF
            if (file.type !== "application/pdf") {
                alert("Please upload a PDF file only");
                return;
            }
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert("File size should not exceed 5MB");
                return;
            }
            setFormData((prev) => ({
                ...prev,
                jobDocument: file,
            }));
            setDocumentPreview(file.name);
        }
    };

    const removeDocument = () => {
        setFormData((prev) => ({
            ...prev,
            jobDocument: null,
        }));
        setDocumentPreview("");
    };

    const handleSalaryTypeChange = (type) => {
        setSalaryType(type);
        if (type === "range") {
            setFormData((prev) => ({ ...prev, fixedSalary: "" }));
        } else {
            setFormData((prev) => ({ ...prev, salaryFrom: "", salaryTo: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare job data as FormData for file upload
        const jobData = new FormData();
        jobData.append("title", formData.title);
        jobData.append("description", formData.description);
        jobData.append("category", formData.category);
        jobData.append("country", formData.country);
        jobData.append("city", formData.city);
        jobData.append("location", formData.location);

        // Add salary based on type
        if (salaryType === "range") {
            jobData.append("salaryFrom", formData.salaryFrom);
            jobData.append("salaryTo", formData.salaryTo);
        } else {
            jobData.append("fixedSalary", formData.fixedSalary);
        }

        // Add job document if provided
        if (formData.jobDocument) {
            jobData.append("jobDocument", formData.jobDocument);
        }

        const result = await dispatch(postJob(jobData, navigate));

        if (result) {
            // Reset form
            setFormData({
                title: "",
                description: "",
                category: "",
                country: "",
                city: "",
                location: "",
                salaryFrom: "",
                salaryTo: "",
                fixedSalary: "",
                jobDocument: null,
            });
            setSalaryType("range");
            setDocumentPreview("");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-14 w-full flex justify-center">
            <div className="w-full mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Post a <span className="text-blue-600">New Job</span>
                    </h1>
                    <p className="text-lg text-gray-600">Fill in the details below to create a new job posting</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-[#2D68C4] to-[#87CEEB] px-8 py-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <FaBriefcase className="text-3xl" />
                            Job Information
                        </h2>
                    </div>

                    {/* Form Body */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6 grid grid-cols-2 gap-5">
                        {/* Form left section */}

                        <div className="">
                            {/* Job Title */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    <FaBriefcase className="inline mr-2 text-blue-600" />
                                    Job Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    placeholder="e.g., Full Stack Developer"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    <FaTags className="inline mr-2 text-blue-600" />
                                    Category *
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    placeholder="e.g., Technology, Research, Design"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    <FaFileAlt className="inline mr-2 text-blue-600" />
                                    Job Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                                    placeholder="Provide a detailed description of the job role, responsibilities, and requirements..."
                                />
                                <p className="text-sm text-gray-500 mt-1">{formData.description.length} characters</p>
                            </div>

                            {/* Location Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Country */}
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        <FaGlobe className="inline mr-2 text-blue-600" />
                                        Country *
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                        placeholder="e.g., India, USA"
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        <FaCity className="inline mr-2 text-blue-600" />
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                        placeholder="e.g., Delhi, New York"
                                    />
                                </div>
                            </div>

                            {/* Full Location */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    <FaMapMarkerAlt className="inline mr-2 text-blue-600" />
                                    Full Location/Address *
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    placeholder="e.g., Building name, street, area, postal code"
                                />
                            </div>
                        </div>

                        {/* Form Right Section */}
                        <div className="flex flex-col gap-10">
                            {/* Salary Section */}
                            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                                <label className="block text-gray-700 font-semibold mb-4">
                                    <FaMoneyBillWave className="inline mr-2 text-green-600" />
                                    Salary Information *
                                </label>

                                {/* Salary Type Toggle */}
                                <div className="flex gap-4 mb-8">
                                    <button
                                        type="button"
                                        onClick={() => handleSalaryTypeChange("range")}
                                        className={`flex-1 px-4 py-3 rounded-lg font-semibold transition ${
                                            salaryType === "range"
                                                ? "bg-blue-600 text-white shadow-lg"
                                                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
                                        }`}
                                    >
                                        Salary Range
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSalaryTypeChange("fixed")}
                                        className={`flex-1 px-4 py-3 rounded-lg font-semibold transition ${
                                            salaryType === "fixed"
                                                ? "bg-blue-600 text-white shadow-lg"
                                                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
                                        }`}
                                    >
                                        Fixed Salary
                                    </button>
                                </div>

                                {/* Salary Inputs */}
                                {salaryType === "range" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-2">Minimum Salary (₹)</label>
                                            <input
                                                type="number"
                                                name="salaryFrom"
                                                value={formData.salaryFrom}
                                                onChange={handleChange}
                                                required={salaryType === "range"}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                                placeholder="e.g., 50000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-2">Maximum Salary (₹)</label>
                                            <input
                                                type="number"
                                                name="salaryTo"
                                                value={formData.salaryTo}
                                                onChange={handleChange}
                                                required={salaryType === "range"}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                                placeholder="e.g., 80000"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Fixed Salary (₹)</label>
                                        <input
                                            type="number"
                                            name="fixedSalary"
                                            value={formData.fixedSalary}
                                            onChange={handleChange}
                                            required={salaryType === "fixed"}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                            placeholder="e.g., 60000"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Job Document Upload (Optional) */}
                            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                                <label className="block text-gray-700 font-semibold mb-2">
                                    <FaFileUpload className="inline mr-2 text-purple-600" />
                                    Job Document (Optional)
                                </label>
                                <p className="text-sm text-gray-600 mb-4">Upload relevant job-related documents (PDF only, max 5MB)</p>

                                {!documentPreview ? (
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="job-document-upload"
                                        />
                                        <label
                                            htmlFor="job-document-upload"
                                            className="flex flex-col items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition"
                                        >
                                            <FaFileUpload className="text-4xl text-gray-400 mb-3" />
                                            <p className="text-sm text-gray-600 font-medium">Click to upload job document (PDF)</p>
                                            <p className="text-xs text-gray-400 mt-1">Optional - Max size: 5MB</p>
                                        </label>
                                    </div>
                                ) : (
                                    <div className="bg-white border border-purple-200 rounded-lg p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-purple-100 p-3 rounded-lg">
                                                <FaFileAlt className="text-2xl text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-700">{documentPreview}</p>
                                                <p className="text-sm text-gray-500">PDF Document</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeDocument}
                                            className="text-red-600 hover:text-red-700 font-semibold px-4 py-2 rounded-lg hover:bg-red-50 transition"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="">
                            <button
                                type="button"
                                onClick={() => navigate("/my-posted-jobs")}
                                className="flex-1 w-full px-6 py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-lg"
                            >
                                Cancel
                            </button>
                        </div>
                        <div className="">
                            <button
                                type="submit"
                                className="flex-1 w-full px-6 py-4 bg-gradient-to-r from-[#2D68C4] to-[#87CEEB] text-white font-semibold rounded-lg hover:from-[#2a52be] hover:to-[#4B9CD3] transition shadow-lg text-lg"
                            >
                                Post Job
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Box */}
                <div className="mt-8 bg-cyan-600 border border-blue-200 rounded-lg p-6 flex flex-col items-center gap-4">
                    <h3 className="font-semibold text-white mb-2 text-lg">Tips for Creating a Great Job Post</h3>
                    <ul className="text-md text-white grid grid-cols-2 w-full text-center gap-3">
                        <li className="border-1 border-white rounded-lg p-2">• Be clear and specific about job responsibilities</li>
                        <li className="border-1 border-white rounded-lg p-2">• Include required skills and qualifications</li>
                        <li className="border-1 border-white rounded-lg p-2">• Provide accurate location and salary information</li>
                        <li className="border-1 border-white rounded-lg p-2">• Write in a professional and engaging tone</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PostJob;
