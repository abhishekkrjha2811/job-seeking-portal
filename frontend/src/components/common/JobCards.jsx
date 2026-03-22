import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import JobModal from "../core/Categories/JobModal";

const JobCards = ({ jobs }) => {
    const [page, setPage] = useState(0);
    const [selectedJob, setSelectedJob] = useState(null);
    const jobsPerPage = 10;
    const startIndex = page * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const currentJobs = jobs.slice(startIndex, endIndex);
    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    const handleNext = () => {
        if (page < totalPages - 1) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (page > 0) {
            setPage((prev) => prev - 1);
        }
    };
    return (
        <div className="w-[60%] flex flex-col gap-7 items-center overflow-y-hidden px-7">
            {currentJobs.map((job, key) => (
                <div
                    className="w-full flex flex-col gap-3 p-5 shadow-lg rounded-lg shadow-gray-500 transition-all duration-300 hover:scale-104"
                    key={key}
                >
                    <h1 className="font-bold text-3xl">{job.title}</h1>
                    <div className="flex gap-3 w-fit">
                        {job.tags.map((tag) => (
                            <div className="bg-[#89cff0] rounded-lg py-1 px-2 text-blue-400 text-center">{tag}</div>
                        ))}
                    </div>
                    <p className="w-[90%]">{job.description.length > 100 ? job.description.slice(0, 100) + "..." : job.description}</p>
                    <div className="w-[100%] flex justify-between p-2">
                        <div className="text-[#0000ff] font-inter text-xl font-bold">{`₹${job.price} / project`}</div>
                        <div className="text-center p-2 rounded-lg ring-1" onClick={() => setSelectedJob(job)}>
                            View Details
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex gap-10">
                <div onClick={handlePrev} disabled={page === 0} className="rounded-full p-4 bg-[#87CEEB]">
                    <FaChevronLeft />
                </div>
                <div onClick={handleNext} disabled={page === totalPages - 1} className="rounded-full p-4 bg-[#87CEEB]">
                    <FaChevronRight />
                </div>
            </div>
            {/* Modal */}
            {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
        </div>
    );
};

export default JobCards;
