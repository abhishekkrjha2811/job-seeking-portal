import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import "../../css/Jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
      return;
    }

    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/job/getall",
          { withCredentials: true }
        );
        setJobs(response.data.jobs || []);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      }
    };

    fetchJobs();
  }, [isAuthorized, navigateTo]);

  return (
    <section className="jobs-container">
      <h2 className="jobs-title">Browse Available Jobs</h2>
      <ul className="job-list">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <li className="job-list-item" key={job._id}>
              <span>{job.title}</span>
              <span>{job.category}</span>
              <Link to={`/job/${job._id}`}>Details</Link>
            </li>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600 text-lg">
            No jobs found. Please check back later!
          </div>
        )}
      </ul>
    </section>
  );
};

export default Jobs;