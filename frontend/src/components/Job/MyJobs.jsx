import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { 
  FiBriefcase, 
  FiMapPin, 
  FiDollarSign, 
  FiEdit3, 
  FiTrash2, 
  FiClock,
  FiGlobe,
  FiHome,
  FiList,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle
} from "react-icons/fi";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  //Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  const categoryOptions = [
    "Graphics & Design",
    "Mobile App Development",
    "Frontend Web Development", 
    "MERN Stack Development",
    "Account & Finance",
    "Artificial Intelligence",
    "Video Animation",
    "MEAN Stack Development",
    "MEVN Stack Development",
    "Data Entry Operator"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Posted Jobs</h1>
          <p className="text-gray-600 mt-2">
            Manage and edit your job postings
          </p>
        </div>

        {myJobs.length > 0 ? (
          <div className="grid gap-6">
            {myJobs.map((element) => (
              <div key={element._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  {/* Header with Job Title and Status */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <FiBriefcase className="w-5 h-5 text-blue-600" />
                        <label className="text-sm font-medium text-gray-500">Job Title</label>
                      </div>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.title}
                        onChange={(e) =>
                          handleInputChange(element._id, "title", e.target.value)
                        }
                        className={`text-xl font-semibold w-full ${
                          editingMode === element._id
                            ? "border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            : "bg-transparent border-none outline-none text-gray-900"
                        }`}
                      />
                    </div>
                    <div className="ml-4">
                      {element.expired ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          <FiXCircle className="w-4 h-4 mr-1" />
                          Expired
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <FiCheckCircle className="w-4 h-4 mr-1" />
                          Active
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Left Column - Basic Info */}
                    <div className="space-y-4">
                      {/* Country */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <FiGlobe className="w-4 h-4 text-blue-600" />
                          <label className="text-sm font-medium text-gray-500">Country</label>
                        </div>
                        <input
                          type="text"
                          disabled={editingMode !== element._id}
                          value={element.country}
                          onChange={(e) =>
                            handleInputChange(element._id, "country", e.target.value)
                          }
                          className={`w-full ${
                            editingMode === element._id
                              ? "border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              : "bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900"
                          }`}
                        />
                      </div>

                      {/* City */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <FiHome className="w-4 h-4 text-blue-600" />
                          <label className="text-sm font-medium text-gray-500">City</label>
                        </div>
                        <input
                          type="text"
                          disabled={editingMode !== element._id}
                          value={element.city}
                          onChange={(e) =>
                            handleInputChange(element._id, "city", e.target.value)
                          }
                          className={`w-full ${
                            editingMode === element._id
                              ? "border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              : "bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900"
                          }`}
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <FiList className="w-4 h-4 text-blue-600" />
                          <label className="text-sm font-medium text-gray-500">Category</label>
                        </div>
                        <select
                          value={element.category}
                          onChange={(e) =>
                            handleInputChange(element._id, "category", e.target.value)
                          }
                          disabled={editingMode !== element._id}
                          className={`w-full ${
                            editingMode === element._id
                              ? "border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              : "bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900"
                          }`}
                        >
                          {categoryOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Status */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <FiClock className="w-4 h-4 text-blue-600" />
                          <label className="text-sm font-medium text-gray-500">Status</label>
                        </div>
                        <select
                          value={element.expired}
                          onChange={(e) =>
                            handleInputChange(element._id, "expired", e.target.value === "true")
                          }
                          disabled={editingMode !== element._id}
                          className={`w-full ${
                            editingMode === element._id
                              ? "border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              : "bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900"
                          }`}
                        >
                          <option value={false}>Active</option>
                          <option value={true}>Expired</option>
                        </select>
                      </div>
                    </div>

                    {/* Right Column - Salary */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <FiDollarSign className="w-4 h-4 text-blue-600" />
                          <label className="text-sm font-medium text-gray-500">Salary</label>
                        </div>
                        {element.fixedSalary ? (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-sm text-green-800 mb-2">Fixed Salary</p>
                            <input
                              type="number"
                              disabled={editingMode !== element._id}
                              value={element.fixedSalary}
                              onChange={(e) =>
                                handleInputChange(element._id, "fixedSalary", e.target.value)
                              }
                              className={`w-full text-lg font-semibold ${
                                editingMode === element._id
                                  ? "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  : "bg-transparent border-none outline-none text-green-900"
                              }`}
                            />
                          </div>
                        ) : (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800 mb-2">Salary Range</p>
                            <div className="space-y-3">
                              <div>
                                <label className="text-xs text-blue-600">From</label>
                                <input
                                  type="number"
                                  disabled={editingMode !== element._id}
                                  value={element.salaryFrom}
                                  onChange={(e) =>
                                    handleInputChange(element._id, "salaryFrom", e.target.value)
                                  }
                                  className={`w-full ${
                                    editingMode === element._id
                                      ? "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      : "bg-transparent border-none outline-none text-blue-900"
                                  }`}
                                />
                              </div>
                              <div>
                                <label className="text-xs text-blue-600">To</label>
                                <input
                                  type="number"
                                  disabled={editingMode !== element._id}
                                  value={element.salaryTo}
                                  onChange={(e) =>
                                    handleInputChange(element._id, "salaryTo", e.target.value)
                                  }
                                  className={`w-full ${
                                    editingMode === element._id
                                      ? "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      : "bg-transparent border-none outline-none text-blue-900"
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description and Location */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <FiEdit3 className="w-4 h-4 text-blue-600" />
                        <label className="text-sm font-medium text-gray-500">Description</label>
                      </div>
                      <textarea
                        rows={5}
                        value={element.description}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(element._id, "description", e.target.value)
                        }
                        className={`w-full resize-none ${
                          editingMode === element._id
                            ? "border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            : "bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900"
                        }`}
                      />
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <FiMapPin className="w-4 h-4 text-blue-600" />
                        <label className="text-sm font-medium text-gray-500">Location</label>
                      </div>
                      <textarea
                        value={element.location}
                        rows={5}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(element._id, "location", e.target.value)
                        }
                        className={`w-full resize-none ${
                          editingMode === element._id
                            ? "border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            : "bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      {editingMode === element._id ? (
                        <>
                          <button
                            onClick={() => handleUpdateJob(element._id)}
                            className="inline-flex items-center px-4 py-2 border border-green-600 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                          >
                            <FaCheck className="w-4 h-4 mr-2" />
                            Save Changes
                          </button>
                          <button
                            onClick={() => handleDisableEdit()}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                          >
                            <RxCross2 className="w-4 h-4 mr-2" />
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEnableEdit(element._id)}
                          className="inline-flex items-center px-4 py-2 border border-blue-600 rounded-lg text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                        >
                          <FiEdit3 className="w-4 h-4 mr-2" />
                          Edit Job
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => handleDeleteJob(element._id)}
                      className="inline-flex items-center px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 transition-colors duration-200"
                    >
                      <FiTrash2 className="w-4 h-4 mr-2" />
                      Delete Job
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <FiAlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Jobs Posted</h3>
              <p className="text-gray-500">
                You haven't posted any jobs yet or may have deleted all of your jobs.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
