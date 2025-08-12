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
  FiArrowRight
} from "react-icons/fi";
import "../../css/JobDetails.css";

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
    <div className="job-details-page">
      <div className="job-details-container">
        {/* Header Section */}
        <div className="job-header">
          <div className="job-header-content">
            <h1 className="job-title">{job.title}</h1>
            <div className="job-meta">
              <div className="job-meta-item">
                <FiHome className="job-meta-icon" />
                <span>Company Position</span>
              </div>
              <div className="job-meta-item">
                <FiMapPin className="job-meta-icon" />
                <span>{job.city}, {job.country}</span>
              </div>
              <div className="job-meta-item">
                <FiClock className="job-meta-icon" />
                <span>Full Time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="job-content">
          {/* Job Information Cards */}
          <div className="job-info-grid">
            <div className="job-info-card">
              <div className="card-header">
                <FiBriefcase className="card-icon" />
                <h3>Job Category</h3>
              </div>
              <p className="card-content">{job.category}</p>
            </div>

            <div className="job-info-card">
              <div className="card-header">
                <FiMapPin className="card-icon" />
                <h3>Location</h3>
              </div>
              <p className="card-content">{job.location}</p>
            </div>

            <div className="job-info-card">
              <div className="card-header">
                <FiGlobe className="card-icon" />
                <h3>Country</h3>
              </div>
              <p className="card-content">{job.country}</p>
            </div>

            <div className="job-info-card salary-card">
              <div className="card-header">
                <FiDollarSign className="card-icon" />
                <h3>Salary Range</h3>
              </div>
              <p className="card-content salary-amount">
                {job.salaryFrom ? `$${job.salaryFrom} - $${job.salaryTo}` : `$${job.fixedSalary}`}
              </p>
            </div>
          </div>

          {/* Job Description */}
          <div className="job-description-section">
            <div className="section-header">
              <FiFileText className="section-icon" />
              <h2>Job Description</h2>
            </div>
            <div className="description-content">
              <p>{job.description}</p>
            </div>
          </div>

          {/* Apply Button */}
          {user && user.role !== "Employer" && (
            <div className="apply-section">
              <Link to={`/application/${job._id}`} className="apply-btn">
                <FiUser className="btn-icon" />
                Apply for this Position
                <FiArrowRight className="btn-arrow" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;