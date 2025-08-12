import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";

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
    <section className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-10">
        {/* Title */}
        <h1 className=" font-bold text-blue-700 mb-8 text-center border-b-4 border-blue-500 pb-4">
          Job Details
        </h1>

        {/* Job Details */}
        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <div>
            <span className="font-semibold text-gray-800">Title:</span> {job.title}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Category:</span> {job.category}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Country:</span> {job.country}
          </div>
          <div>
            <span className="font-semibold text-gray-800">City:</span> {job.city}
          </div>
          <div className="overflow-x-auto">
            <span className="font-semibold text-gray-800">Location:</span>{" "}
            <span className="inline-block break-words">{job.location}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-800">Description:</span>{" "}
            <p className="mt-2 text-gray-600">{job.description}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-800">Posted On:</span>{" "}
            {new Date(job.jobPostedOn).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Salary:</span>{" "}
            {job.fixedSalary ? job.fixedSalary : `${job.salaryFrom} - ${job.salaryTo}`}
          </div>
        </div>

        {/* Apply Button */}
        {user && user.role !== "Employer" && (
          <div className="mt-10 text-center">
            <Link
              to={`/application/${job._id}`}
              className="inline-block bg-blue-600 text-white px-10 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-blue-700 hover:shadow-xl transition-transform transform hover:scale-105"
            >
              Apply Now
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobDetails;