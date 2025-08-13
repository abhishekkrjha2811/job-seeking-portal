import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";
import { 
  FiBriefcase, 
  FiMapPin, 
  FiDollarSign, 
  FiFileText, 
  FiHome, 
  FiGlobe,
  FiClock,
  FiUser,
  FiArrowRight,
  FiCalendar,
  FiUsers,
  FiTrendingUp
} from "react-icons/fi";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
      .then((res) => setJob(res.data.job))
      .catch(() => navigateTo("/notfound"));
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12 text-white">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-blue-100">
                <div className="flex items-center">
                  <FiBriefcase className="w-5 h-5 mr-2" />
                  <span className="font-medium">Full Time Position</span>
                </div>
                <div className="flex items-center">
                  <FiMapPin className="w-5 h-5 mr-2" />
                  <span>{job.city}, {job.country}</span>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="w-5 h-5 mr-2" />
                  <span>Posted recently</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FiBriefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-4">Job Category</h3>
                </div>
                <p className="text-gray-700 font-medium">{job.category}</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FiMapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-4">Location</h3>
                </div>
                <p className="text-gray-700 font-medium line-clamp-2">{job.location}</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FiGlobe className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-4">Country</h3>
                </div>
                <p className="text-gray-700 font-medium">{job.country}</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <FiDollarSign className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-4">Salary Range</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {job.salaryFrom ? `$${job.salaryFrom} - $${job.salaryTo}` : `$${job.fixedSalary}`}
                </p>
                <p className="text-sm text-gray-500 mt-1">Annual compensation</p>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <FiFileText className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 ml-4">Job Description</h2>
              </div>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                <p className="text-base whitespace-pre-line">{job.description}</p>
              </div>
            </div>

            {/* Additional Benefits Section (Mock) */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-lg">
                  <FiTrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 ml-4">What We Offer</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Competitive salary package</span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Health insurance coverage</span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Flexible working hours</span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Professional development opportunities</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Information</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiClock className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Job Type</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Full Time</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiUsers className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Experience</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">2-5 years</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiHome className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Remote Work</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Available</span>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            {user && user.role !== "Employer" && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to Apply?</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Take the next step in your career journey and join our team.
                </p>
                <Link 
                  to={`/application/${job._id}`} 
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 shadow-lg hover:shadow-xl"
                >
                  <FiUser className="w-5 h-5 mr-2" />
                  Apply for this Position
                  <FiArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            )}

            {/* Company Info Card (Mock) */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Company</h3>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <h4 className="font-semibold text-gray-900">Company Name</h4>
                <p className="text-sm text-gray-500">Technology Solutions</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Founded</span>
                  <span className="font-medium">2020</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employees</span>
                  <span className="font-medium">50-100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry</span>
                  <span className="font-medium">Technology</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;