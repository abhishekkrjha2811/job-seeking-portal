import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyJobs, deleteJob, getProfessorApplications, toggleJobStatus } from "../services/operations/jobAPI";
import ViewApplicationsModal from "../components/common/ViewApplicationsModal";
import { IoSearch } from "react-icons/io5";
import {
    FaEye,
    FaTrash,
    FaEdit,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaCalendarAlt,
    FaTags,
    FaToggleOn,
    FaToggleOff,
    FaArrowLeft,
    FaArrowRight,
} from "react-icons/fa";
import useOutsideClick from "../hooks/useOutsideClick";
import { IoIosArrowUp, IoIosArrowDown, IoIosCheckmark } from "react-icons/io";

const MyJobs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loadingApplications, setLoadingApplications] = useState(false);
    const [page, setPage] = useState(1);
    const dropdownRef = useRef(null);

    useOutsideClick(dropdownRef, () => setIsOpen(false));
    const itemsPerPage = 10;
    const startIndex = (page - 1) * itemsPerPage;

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const result = await dispatch(getMyJobs());
            setJobs(result);
            setLoading(false);
        };
        fetchJobs();
    }, [dispatch]);

    const totalPages = Math.ceil(jobs.length / itemsPerPage);
    const goNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const goPrev = () => {
        if (page > 1) setPage(page - 1);
    };

    useEffect(() => {
        setPage(1);
    }, [statusFilter, searchTerm, jobs]);

    const handleSelect = (option) => {
        setStatusFilter(option);
        setIsOpen(false);
    };

    const handleDelete = async (jobId) => {
        if (window.confirm("Are you sure you want to delete this job posting?")) {
            const result = await dispatch(deleteJob(jobId));
            if (result) {
                setJobs(jobs.filter((job) => job._id !== jobId));
            }
        }
    };

    const handleViewApplications = async (job) => {
        setSelectedJob(job);
        setLoadingApplications(true);
        setIsModalOpen(true);

        const result = await dispatch(getProfessorApplications());

        // Filter applications for the selected job
        const jobApplications = result.filter((app) => app.jobId?._id === job._id);
        setApplications(jobApplications);
        setLoadingApplications(false);
    };

    const handleStatusUpdate = async () => {
        // Refresh applications after status update
        if (selectedJob) {
            setLoadingApplications(true);
            const result = await dispatch(getProfessorApplications());
            const jobApplications = result.filter((app) => app.jobId?._id === selectedJob._id);
            setApplications(jobApplications);
            setLoadingApplications(false);
        }
    };

    const handleToggleJobStatus = async (jobId, currentStatus) => {
        const newStatus = !currentStatus;
        const confirmMessage = newStatus
            ? "Are you sure you want to close this job? Students won't be able to apply anymore."
            : "Are you sure you want to reopen this job? Students will be able to apply again.";

        if (window.confirm(confirmMessage)) {
            const result = await dispatch(toggleJobStatus(jobId, newStatus));
            if (result) {
                // Update the job in the local state
                setJobs(jobs.map((job) => (job._id === jobId ? { ...job, expired: newStatus } : job)));
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
        setApplications([]);
    };

    const options = ["All Status", "Active", "Expired"];

    // Filter jobs based on search and status
    const filteredJob = jobs.filter((job) => {
        const jobStatus = job.expired ? "Expired" : "Active";
        const matchesStatus = statusFilter === "All Status" || jobStatus === statusFilter;
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });
    const filteredJobs = filteredJob.slice(startIndex, startIndex + itemsPerPage);

    // Format salary
    const formatSalary = (job) => {
        if (job.fixedSalary && job.fixedSalary > 0) {
            return `₹${job.fixedSalary.toLocaleString()}/month`;
        } else if (job.salaryFrom && job.salaryTo) {
            return `₹${job.salaryFrom.toLocaleString()} - ₹${job.salaryTo.toLocaleString()}/month`;
        }
        return "Not specified";
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center w-full mt-14">
                <div className="text-center bg-white p-12 rounded-3xl shadow-2xl border border-gray-200">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                        <div className="absolute inset-0 border-4 border-emerald-200 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-emerald-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">Loading Jobs</h3>
                    <p className="text-slate-600">Please wait while we fetch your posted jobs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-6 mt-14 w-full">
            {/* Header */}
            <div className="w-full max-w-7xl mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-2">My Posted Jobs</h1>
                        <p className="text-slate-600">Manage and track your job postings</p>
                    </div>
                    <button
                        onClick={() => navigate("/post-job")}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition shadow-lg text-sm md:text-base"
                    >
                        + Post New Job
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-7xl mb-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-gray-500 text-sm">Total Jobs Posted</p>
                    <p className="text-2xl font-bold text-blue-600">{jobs.length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-gray-500 text-sm">Active Jobs</p>
                    <p className="text-2xl font-bold text-green-600">{jobs.filter((job) => !job.expired).length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-gray-500 text-sm">Expired Jobs</p>
                    <p className="text-2xl font-bold text-red-600">{jobs.filter((job) => job.expired).length}</p>
                </div>
            </div>

            {/* Search + Filter */}
            <div className="flex w-full max-w-7xl items-center gap-4 mb-6 relative flex-wrap">
                <div className="relative w-full">
                    <IoSearch className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search jobs by title..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="w-[40%] relative" ref={dropdownRef}>
                    <div
                        className="w-full border border-gray-200 p-2 relative text-center rounded-lg cursor-pointer hover:bg-gray-50 transition"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {statusFilter}
                        {isOpen ? (
                            <IoIosArrowUp className="absolute top-4 right-7" />
                        ) : (
                            <IoIosArrowDown className="absolute top-4 right-7" />
                        )}
                    </div>
                    {isOpen && (
                        <div className="flex flex-col items-center w-full absolute top-14 rounded-lg p-2 border border-gray-400 z-10 bg-white shadow-lg">
                            {options.map((option) => (
                                <div
                                    key={option}
                                    className={`p-2 w-full rounded-lg flex items-center justify-center relative cursor-pointer hover:bg-gray-100 transition ${
                                        statusFilter === option ? "bg-[#89cff0]" : "bg-white"
                                    }`}
                                    onClick={() => handleSelect(option)}
                                >
                                    {statusFilter === option && (
                                        <span className="absolute left-7">
                                            <IoIosCheckmark fontSize={30} />
                                        </span>
                                    )}
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Job Cards */}
            <div className="flex flex-col w-full max-w-7xl gap-5">
                {filteredJobs.map((job) => (
                    <div
                        key={job._id}
                        className="w-full bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-3 w-[85%]">
                                <h2 className="text-2xl font-semibold text-[#0b1957] flex-1 mb-3">{job.title}</h2>

                                <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                    <div className="flex gap-3 items-center text-gray-600">
                                        <FaTags className="text-blue-600" />
                                        <span className="font-medium">Category:</span>
                                        <span>{job.category}</span>
                                    </div>

                                    <div className="flex gap-3 items-center text-gray-600">
                                        <FaMapMarkerAlt className="text-blue-600" />
                                        <span className="font-medium">Location:</span>
                                        <span>
                                            {job.city}, {job.country}
                                        </span>
                                    </div>

                                    <div className="flex gap-3 items-center text-gray-600">
                                        <FaMoneyBillWave className="text-green-600" />
                                        <span className="font-medium">Salary:</span>
                                        <span>{formatSalary(job)}</span>
                                    </div>

                                    <div className="flex gap-3 items-center text-gray-600">
                                        <FaCalendarAlt className="text-purple-600" />
                                        <span className="font-medium">Posted:</span>
                                        <span>{formatDate(job.jobPostedOn)}</span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Full Address:</span> {job.location}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 ml-4 items-end">
                                <span
                                    className={`text-sm mb- font-semibold px-4 py-2 w-fit rounded-full flex justify-center ${
                                        job.expired ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                                    }`}
                                >
                                    {job.expired ? "Expired" : "Active"}
                                </span>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => handleViewApplications(job)}
                                        className="flex items-center gap-2 border border-blue-500 text-blue-600 rounded-lg px-4 py-2 text-sm hover:bg-blue-50 transition whitespace-nowrap w-full"
                                    >
                                        <FaEye /> View Applications
                                    </button>
                                    <button
                                        onClick={() => handleToggleJobStatus(job._id, job.expired)}
                                        className={`flex items-center justify-center gap-2 border rounded-lg px-4 py-2 text-sm hover:bg-opacity-20 transition whitespace-nowrap w-full ${
                                            job.expired
                                                ? "border-green-500 text-green-600 hover:bg-green-50"
                                                : "border-orange-500 text-orange-600 hover:bg-orange-50"
                                        }`}
                                    >
                                        {job.expired ? (
                                            <>
                                                <FaToggleOff /> Reopen Job
                                            </>
                                        ) : (
                                            <>
                                                <FaToggleOn /> Close Job
                                            </>
                                        )}
                                    </button>
                                    <button className="flex items-center justify-center w-full gap-2 border border-green-500 text-green-600 rounded-lg px-4 py-2 text-sm hover:bg-green-50 transition whitespace-nowrap">
                                        <FaEdit /> Edit Job
                                    </button>
                                    <button
                                        onClick={() => handleDelete(job._id)}
                                        className="flex items-center justify-center w-full gap-2 border border-red-500 text-red-600 rounded-lg px-4 py-2 text-sm hover:bg-red-50 transition whitespace-nowrap"
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredJobs.length !== 0 && (
                    <div className="flex justify-center gap-10 mt-10">
                        <div className="p-4 rounded-full bg-blue-25" onClick={goPrev}>
                            <FaArrowLeft className="" />
                        </div>
                        <div className="p-4 rounded-full bg-blue-25" onClick={goNext}>
                            <FaArrowRight className="" />
                        </div>
                    </div>
                )}

                {filteredJobs.length === 0 && (
                    <div className="text-center py-16">
                        <FaTags className="text-6xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No jobs found.</p>
                        <p className="text-gray-400 text-sm mt-2">
                            {jobs.length === 0
                                ? "You haven't posted any jobs yet. Click 'Post New Job' to get started!"
                                : "Try adjusting your filters or search term."}
                        </p>
                    </div>
                )}
            </div>

            {/* Applications Modal */}
            {selectedJob && (
                <ViewApplicationsModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    applications={loadingApplications ? [] : applications}
                    jobTitle={selectedJob.title}
                    onStatusUpdate={handleStatusUpdate}
                />
            )}
        </div>
    );
};

export default MyJobs;
