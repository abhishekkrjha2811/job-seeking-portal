import React from "react";
import { useDispatch } from "react-redux";
import { updateApplicationStatus } from "../../services/operations/jobAPI";
import { FaTimes, FaFileDownload, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap, FaCalendar } from "react-icons/fa";

const ViewApplicationsModal = ({ isOpen, onClose, applications, jobTitle, onStatusUpdate }) => {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  // Get branch full name
  const getBranchFullName = (branch) => {
    const branchMap = {
      cse: "Computer Science Engineering",
      me: "Mechanical Engineering",
      ece: "Electronics & Communication Engineering",
    };
    return branchMap[branch] || branch;
  };

  // Handle status update
  const handleStatusUpdate = async (applicationId, newStatus) => {
    const result = await dispatch(updateApplicationStatus(applicationId, newStatus));
    if (result) {
      // Notify parent to refresh applications
      if (onStatusUpdate) {
        onStatusUpdate();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Applications Received</h2>
              <p className="text-blue-100">{jobTitle}</p>
              <p className="text-sm text-blue-200 mt-1">
                Total Applications: {applications.length}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="p-6">
          {applications.length === 0 ? (
            <div className="text-center py-16">
              <FaUser className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No applications received yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Applications will appear here once students apply
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application._id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-white"
                >
                  <div className="flex justify-between items-start">
                    {/* Left Section - Student Info */}
                    <div className="flex-1">
                      {/* Header with Status */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {application.applicantID?.user?.firstName || application.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {application.applicantID?.role}
                          </p>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            application.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : application.status === "Accepted"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {application.status}
                        </span>
                      </div>

                      {/* Student Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-3 text-gray-700">
                          <FaEnvelope className="text-blue-600" />
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="font-medium">
                              {application.applicantID?.user?.email || application.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-700">
                          <FaPhone className="text-green-600" />
                          <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="font-medium">
                              {application.applicantID?.user?.phone || application.phone}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-700">
                          <FaGraduationCap className="text-purple-600" />
                          <div>
                            <p className="text-xs text-gray-500">Branch & Year</p>
                            <p className="font-medium">
                              {getBranchFullName(application.applicantID?.user?.branch)} - Year{" "}
                              {application.applicantID?.user?.year}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-700">
                          <FaMapMarkerAlt className="text-red-600" />
                          <div>
                            <p className="text-xs text-gray-500">Address</p>
                            <p className="font-medium line-clamp-1">{application.address}</p>
                          </div>
                        </div>
                      </div>

                      {/* Cover Letter */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Cover Letter:
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {application.coverLetter}
                        </p>
                      </div>

                      {/* Job Details */}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <FaCalendar className="text-gray-400" />
                          <span>Applied for: {application.jobId?.title}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span>{application.jobId?.category}</span>
                      </div>
                    </div>

                    {/* Right Section - Resume */}
                    <div className="ml-6 flex flex-col gap-3">
                      {application.resume?.url ? (
                        <a
                          href={application.resume.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition shadow-md whitespace-nowrap"
                        >
                          <FaFileDownload />
                          View Resume
                        </a>
                      ) : (
                        <button
                          disabled
                          className="flex items-center gap-2 bg-gray-400 text-white px-5 py-3 rounded-lg cursor-not-allowed whitespace-nowrap"
                        >
                          <FaFileDownload />
                          No Resume
                        </button>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2">
                        {application.status === "Pending" ? (
                          <>
                            <button 
                              onClick={() => handleStatusUpdate(application._id, "Accepted")}
                              className="px-5 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition font-semibold"
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(application._id, "Rejected")}
                              className="px-5 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-semibold"
                            >
                              Reject
                            </button>
                          </>
                        ) : application.status === "Accepted" ? (
                          <button 
                            onClick={() => handleStatusUpdate(application._id, "Rejected")}
                            className="px-5 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-semibold"
                          >
                            Reject
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleStatusUpdate(application._id, "Accepted")}
                            className="px-5 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition font-semibold"
                          >
                            Accept
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicationsModal;
