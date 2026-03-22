import React from "react";
import { IoIosClose } from "react-icons/io";
import { IoRadioButtonOff } from "react-icons/io5";

const JobModal = ({ job, onClose }) => {
    if (!job) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-10 flex justify-center items-center z-50"
            onClick={onClose} // close on backdrop click
        >
            <div
                className="bg-white w-[90%] md:w-[60%] lg:w-[50%] rounded-lg p-6 relative shadow-xl"
                onClick={(e) => e.stopPropagation()} // prevent modal close when clicking inside
            >
                {/* Close button */}
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
                    <IoIosClose size={28} />
                </button>

                {/* Title */}
                <h2 className="text-3xl font-bold mb-3 text-blue-600">{job.title}</h2>

                {/* Tags */}
                <h3 className="font-bold text-gray-600 text-lg mb-3">Skills Required</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag, i) => (
                        <span key={i} className="bg-[#89cff0] text-blue-700 text-sm px-3 py-1 rounded-lg">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <h3 className="font-bold text-gray-600 text-lg mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{job.description}</p>

                {/* Price & Applicants */}
                <div className="flex justify-between items-center border-t border-gray-300 pt-4">
                    <div className="text-lg font-semibold text-[#0000ff]">₹{job.price} / project</div>
                    <div className="text-gray-500">{job.applicants} applicants</div>
                </div>

                {/* Poster Info */}
                <div className="flex items-center gap-4 mt-6 border-t border-gray-200 pt-4 bg-blue-25 rounded-lg p-4">
                    <img src={job.poster.image} alt={job.poster.name} className="w-14 h-14 rounded-full object-cover border" />
                    <div>
                        <div className="font-semibold text-gray-800">{job.poster.name}</div>
                        <div className="text-sm text-gray-500">{job.poster.role}</div>
                        <div className="text-sm text-gray-500">{job.poster.department}</div>
                    </div>
                </div>

                {/*APPLY now and VIEW profile*/}
                <div className="flex w-full gap-2 justify-between mt-7">
                    <button className="bg-[#0096ff] rounded-lg p-3 text-center text-white w-[50%]">Apply Now</button>
                    <button className="bg-white rounded-lg p-3 text-center text-black ring-1 w-[50%]">View Profile</button>
                </div>
            </div>
        </div>
    );
};

export default JobModal;
