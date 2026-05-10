import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdminJob, getAdminJobs } from "../services/operations/adminAPI";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, FaTrash, FaUserTie } from "react-icons/fa";

const AdminJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadJobs = async () => {
            setLoading(true);
            const result = await dispatch(getAdminJobs());
            if (result) {
                setJobs(result.jobs || []);
            }
            setLoading(false);
        };

        if (user?.role === "Admin") {
            loadJobs();
        }
    }, [dispatch, user]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const formatSalary = (job) => {
        if (job.fixedSalary && job.fixedSalary > 0) {
            return `₹${job.fixedSalary.toLocaleString()}/month`;
        }
        if (job.salaryFrom && job.salaryTo) {
            return `₹${job.salaryFrom.toLocaleString()} - ₹${job.salaryTo.toLocaleString()}/month`;
        }
        return "Not specified";
    };

    const formatPostedBy = (job) => {
        const postedBy = job.postedBy;
        if (!postedBy) return "Unknown";
        const fullName = `${postedBy.firstName || ""} ${postedBy.lastName || ""}`.trim();
        return fullName || postedBy.email || "Unknown";
    };

    const handleDeleteJob = async (jobId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job post?");
        if (!confirmDelete) return;

        const result = await dispatch(deleteAdminJob(jobId));
        if (result) {
            setJobs((prev) => prev.filter((job) => job._id !== jobId));
        }
    };

    if (user?.role !== "Admin") {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-14 w-full flex items-center justify-center">
                <div className="max-w-xl rounded-2xl bg-white px-8 py-10 shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Admin access only</h2>
                    <p className="text-gray-600">This area is reserved for admin users.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-14 w-full">
            <div className="max-w-7xl mx-auto w-full">
                <div className="mb-8 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-2">Browse Jobs</h1>
                        <p className="text-slate-600">View every posted job without application controls.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-2xl shadow p-5">
                        <p className="text-sm text-slate-500">Total Jobs Posted</p>
                        <p className="text-3xl font-bold text-violet-600">{jobs.length}</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow p-5">
                        <p className="text-sm text-slate-500">Active Jobs</p>
                        <p className="text-3xl font-bold text-emerald-600">{jobs.filter((job) => !job.expired).length}</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow p-5">
                        <p className="text-sm text-slate-500">Closed Jobs</p>
                        <p className="text-3xl font-bold text-rose-600">{jobs.filter((job) => job.expired).length}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {loading ? (
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-8 text-slate-500">Loading jobs...</div>
                    ) : jobs.length === 0 ? (
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-8 text-center text-slate-500">No jobs found.</div>
                    ) : (
                        jobs.map((job) => (
                            <div key={job._id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 flex flex-col">
                                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-5">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-1 line-clamp-2">{job.title}</h2>
                                            <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white border border-white/30">
                                                {job.category}
                                            </span>
                                        </div>
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${job.expired ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                                            {job.expired ? "Closed" : "Active"}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 text-emerald-600 mb-1">
                                                <FaUserTie className="text-sm" />
                                                <span className="text-xs font-semibold text-slate-700">Posted By</span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-800">{formatPostedBy(job)}</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-teal-600 mb-1">
                                                <FaMoneyBillWave className="text-sm" />
                                                <span className="text-xs font-semibold text-slate-700">Salary</span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-800">{formatSalary(job)}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 text-emerald-600 mb-1">
                                                <FaMapMarkerAlt className="text-sm" />
                                                <span className="text-xs font-semibold text-slate-700">Location</span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-800">{job.city}</p>
                                            <p className="text-xs text-slate-500 line-clamp-1">{job.location}</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-teal-600 mb-1">
                                                <FaCalendarAlt className="text-sm" />
                                                <span className="text-xs font-semibold text-slate-700">Posted</span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-800">{formatDate(job.jobPostedOn)}</p>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-slate-100">
                                        <div className="flex items-center gap-2 text-slate-700 mb-2">
                                            <FaBriefcase className="text-sm text-emerald-600" />
                                            <span className="text-xs font-semibold uppercase tracking-wide">Description</span>
                                        </div>
                                        <p className="text-sm text-slate-600 line-clamp-4">{job.description}</p>
                                    </div>

                                    <div className="mt-auto flex flex-wrap gap-2 pt-3 border-t border-slate-100 text-xs text-slate-500">
                                        <span className="rounded-full bg-slate-100 px-3 py-1">Applicants: {job.applicants || 0}</span>
                                        <button
                                            onClick={() => handleDeleteJob(job._id)}
                                            className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-rose-700 hover:bg-rose-100 transition"
                                        >
                                            <FaTrash className="text-xs" />
                                            Delete Job
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminJobs;