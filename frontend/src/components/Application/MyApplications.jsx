import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiFileText, 
  FiEye, 
  FiTrash2, 
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle
} from "react-icons/fi";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {user && user.role === "Job Seeker" ? "My Applications" : "Applications From Job Seekers"}
          </h1>
          <p className="text-gray-600 mt-2">
            {user && user.role === "Job Seeker" 
              ? "Track the status of your job applications" 
              : "Review and manage applications from candidates"
            }
          </p>
        </div>

        {/* Applications List */}
        {applications.length <= 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <FiAlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Applications Found</h3>
              <p className="text-gray-500">
                {user && user.role === "Job Seeker" 
                  ? "You haven't submitted any applications yet." 
                  : "No applications have been received for your job postings."
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((element) => {
              return user && user.role === "Job Seeker" ? (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              ) : (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })}
          </div>
        )}

        {modalOpen && (
          <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  const getStatusBadge = () => {
    // Mock status - you can extend this based on your API
    const statuses = ['pending', 'reviewed', 'accepted', 'rejected'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: FiClock, text: 'Pending' },
      reviewed: { color: 'bg-blue-100 text-blue-800', icon: FiEye, text: 'Under Review' },
      accepted: { color: 'bg-green-100 text-green-800', icon: FiCheckCircle, text: 'Accepted' },
      rejected: { color: 'bg-red-100 text-red-800', icon: FiXCircle, text: 'Rejected' }
    };
    
    const config = statusConfig[randomStatus];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="w-4 h-4 mr-1" />
        {config.text}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header with status */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Details</h3>
            <div className="flex items-center text-gray-500 text-sm">
              <FiCalendar className="w-4 h-4 mr-1" />
              Applied on {new Date().toLocaleDateString()}
            </div>
          </div>
          {getStatusBadge()}
        </div>

        {/* Personal Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="flex items-start space-x-3">
            <FiUser className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-gray-900 font-medium">{element.name}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FiMail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-gray-900 font-medium truncate">{element.email}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FiPhone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-gray-900 font-medium">{element.phone}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FiMapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="text-gray-900 font-medium line-clamp-2">{element.address}</p>
            </div>
          </div>
        </div>

        {/* Cover Letter */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <FiFileText className="w-5 h-5 text-blue-600" />
            <h4 className="text-sm font-medium text-gray-500">Cover Letter</h4>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 text-sm line-clamp-3">{element.coverLetter}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <img
              src={element.resume.url}
              alt="Resume thumbnail"
              className="w-12 h-16 object-cover rounded border cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => openModal(element.resume.url)}
            />
            <button
              onClick={() => openModal(element.resume.url)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <FiEye className="w-4 h-4 mr-2" />
              View Resume
            </button>
          </div>

          <button
            onClick={() => deleteApplication(element._id)}
            className="inline-flex items-center px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 transition-colors duration-200"
          >
            <FiTrash2 className="w-4 h-4 mr-2" />
            Delete Application
          </button>
        </div>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Candidate Application</h3>
            <div className="flex items-center text-gray-500 text-sm">
              <FiCalendar className="w-4 h-4 mr-1" />
              Received on {new Date().toLocaleDateString()}
            </div>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <FiUser className="w-4 h-4 mr-1" />
            New Candidate
          </span>
        </div>

        {/* Personal Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="flex items-start space-x-3">
            <FiUser className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-gray-900 font-medium">{element.name}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FiMail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-gray-900 font-medium truncate">{element.email}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FiPhone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-gray-900 font-medium">{element.phone}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FiMapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="text-gray-900 font-medium line-clamp-2">{element.address}</p>
            </div>
          </div>
        </div>

        {/* Cover Letter */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <FiFileText className="w-5 h-5 text-blue-600" />
            <h4 className="text-sm font-medium text-gray-500">Cover Letter</h4>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 text-sm line-clamp-3">{element.coverLetter}</p>
          </div>
        </div>

        {/* Resume Section */}
        <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
          <img
            src={element.resume.url}
            alt="Resume thumbnail"
            className="w-12 h-16 object-cover rounded border cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => openModal(element.resume.url)}
          />
          <button
            onClick={() => openModal(element.resume.url)}
            className="inline-flex items-center px-6 py-2 border border-blue-600 rounded-lg text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
          >
            <FiEye className="w-4 h-4 mr-2" />
            Review Resume
          </button>
        </div>
      </div>
    </div>
  );
};
