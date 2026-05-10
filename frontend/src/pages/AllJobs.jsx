import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllJobs } from "../services/operations/jobAPI";
import ApplicationModal from "../components/common/ApplicationModal";
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, FaBuilding, FaSearch, FaFilter, FaInfoCircle, FaClock, FaCheckCircle, FaUser, FaUserTie } from "react-icons/fa";
import "../App.css";

const AllJobs = () => {
    const dispatch = useDispatch();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedCity, setSelectedCity] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                setShowSkeleton(false);
            }, 2000);

            return () => clearTimeout(timer);
        } else {
            setShowSkeleton(true);
        }
    }, [loading]);
    
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const result = await dispatch(getAllJobs());

            console.log("result from dispatch getAllJobs is ", result);
            
            // Sort jobs by newest first
            const sortedJobs = result.sort((a, b) => new Date(b.jobPostedOn) - new Date(a.jobPostedOn));
            setJobs(sortedJobs);

            setLoading(false);
        };
        fetchJobs();
    }, [dispatch]);

    console.log("jobs is ", jobs);

    // Get unique categories and cities
    const categories = ["All", ...new Set(jobs.map((job) => job.category))];
    const cities = ["All", ...new Set(jobs.map((job) => job.city))];

    // Filter jobs based on search and filters
    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
        const matchesCity = selectedCity === "All" || job.city === selectedCity;
        return matchesSearch && matchesCategory && matchesCity;
    });

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Format salary
    const formatSalary = (job) => {
        if (job.fixedSalary && job.fixedSalary > 0) {
            return `₹${job.fixedSalary.toLocaleString()}/month`;
        } else if (job.salaryFrom && job.salaryTo) {
            return `₹${job.salaryFrom.toLocaleString()} - ₹${job.salaryTo.toLocaleString()}/month`;
        }
        return "Not specified";
    };

    // Handle Apply Now
    const handleApplyNow = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    // if (loading) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center mt-14 w-full">
    //             <div className="text-center">
    //                 <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
    //                 <p className="mt-4 text-gray-600 text-lg">Loading jobs...</p>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-14 w-full">
            <div className="max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Explore <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Freelancing Opportunities</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                        Discover your next freelancing opportunity from {jobs.length} available positions
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search Bar */}
                        <div className="md:col-span-1">
                            <div className="relative">
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500" />
                                <input
                                    type="text"
                                    placeholder="Search jobs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="md:col-span-1">
                            <div className="relative">
                                <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all duration-300 appearance-none cursor-pointer bg-white"
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* City Filter */}
                        <div className="md:col-span-1">
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                                <select
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all duration-300 appearance-none cursor-pointer bg-white"
                                >
                                    {cities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="mt-4 text-center">
                        <p className="text-slate-600">
                            Showing <span className="font-semibold text-emerald-600">{filteredJobs.length}</span> of{" "}
                            <span className="font-semibold">{jobs.length}</span> jobs
                        </p>
                    </div>
                </div>

                {/* Jobs Grid */}
                {showSkeleton ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="skeleton-box h-[400px] rounded-2xl"></div>
                        <div className="skeleton-box h-[400px] rounded-2xl"></div>
                        <div className="skeleton-box h-[400px] rounded-2xl"></div>
                        <div className="skeleton-box h-[400px] rounded-2xl"></div>
                        <div className="skeleton-box h-[400px] rounded-2xl"></div>
                        <div className="skeleton-box h-[400px] rounded-2xl"></div>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-16 bg-white/50 rounded-2xl">
                        <FaBriefcase className="text-6xl text-slate-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-slate-700 mb-2">No jobs found</h3>
                        <p className="text-slate-500">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 border-transparent hover:border-emerald-200 flex flex-col"
                            >
                                {/* Card Header */}
                                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <span
                                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                                                !job.expired 
                                                    ? "bg-green-100 text-green-700 border border-green-300" 
                                                    : "bg-red-100 text-red-700 border border-red-300"
                                            }`}
                                        >
                                            {!job.expired ? (
                                                <>
                                                    <FaCheckCircle className="text-green-600" />
                                                    Active
                                                </>
                                            ) : (
                                                <>
                                                    <FaClock className="text-red-600" />
                                                    Closed
                                                </>
                                            )}
                                        </span>
                                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                            <FaMoneyBillWave className="text-yellow-300" />
                                            <p className="font-bold text-sm text-white">{formatSalary(job)}</p>
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">{job.title}</h2>
                                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold py-1.5 px-4 rounded-full border border-white/30">
                                        {job.category}
                                    </span>
                                </div>

                                {/* Card Body */}
                                <div className="p-5 flex-1 flex flex-col">
                                    {/* Posted By and Role */}
                                    <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-200">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 text-emerald-600 mb-1">
                                                <FaUser className="text-sm" />
                                                <span className="text-xs font-semibold text-slate-700">Posted By</span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-800 line-clamp-1">{job.postedBy?.firstName} {job.postedBy?.lastName}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 text-teal-600 mb-1">
                                                <FaUserTie className="text-sm" />
                                                <span className="text-xs font-semibold text-slate-700">Role</span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-800 capitalize">{job.postedBy?.role || 'N/A'}</p>
                                        </div>
                                    </div>

                                    {/* Location and Date */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 text-emerald-600 mb-1">
                                                <FaMapMarkerAlt className="text-sm" />
                                                <span className="text-xs font-semibold text-slate-700">Location</span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-800">{job.city}</p>
                                            <p className="text-xs text-slate-500 line-clamp-1">{job.location}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 text-teal-600 mb-1">
                                                <FaCalendarAlt className="text-sm" />
                                                <span className="text-xs font-semibold text-slate-700">Posted</span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-800">{formatDate(job.jobPostedOn)}</p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-4 flex-1">
                                        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">{job.description}</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 mt-auto">
                                        <a
                                            href={job.jobDocument?.url ?? undefined}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center py-2.5 px-4 rounded-xl border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <FaInfoCircle />
                                            Details
                                        </a>
                                        <button
                                            className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                                                job.expired
                                                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                                                    : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-md hover:shadow-lg"
                                            }`}
                                            onClick={() => handleApplyNow(job)}
                                            disabled={job.expired}
                                        >
                                            <FaBriefcase />
                                            {job.expired ? "Closed" : "Apply"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Application Modal */}
            {selectedJob && <ApplicationModal isOpen={isModalOpen} onClose={handleCloseModal} job={selectedJob} />}
        </div>
    );
};

export default AllJobs;
