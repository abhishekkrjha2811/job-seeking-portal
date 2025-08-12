import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

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
    <section className="bg-gray-50 py-12 min-h-screen">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className=" font-extrabold text-center text-blue-700 mb-12">
          Browse Available Jobs
        </h1>

        {/* Jobs Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
  key={job._id}
  className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between min-h-[250px] w-full max-w-xs"
>
  <div>
    <h2 className="text-xl font-bold text-gray-800 mb-2 break-words">
      {job.title}
    </h2>
    <p className="text-gray-600 text-sm">
      <span className="font-medium">Category:</span> {job.category}
    </p>
    <p className="text-gray-600 text-sm mb-4">
      <span className="font-medium">Location:</span> {job.country}
    </p>
  </div>

  <Link
    to={`/job/${job._id}`}
    className="block bg-blue-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-blue-700 transition mt-auto"
  >
    View Details
  </Link>
</div>

            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 text-lg">
              No jobs found. Please check back later!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;