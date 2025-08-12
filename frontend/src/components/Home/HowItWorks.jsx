import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className="howitworks bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        {/* Title */}
        <h3 className=" font-bold text-center text-gray-800 mb-12">
          How CareerUp Works
        </h3>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="card bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
            <FaUserPlus className="text-blue-500 text-5xl mb-4" />
            <p className="text-xl font-semibold text-gray-800 mb-2">
              Create Account
            </p>
            <p className="text-gray-600">
              Sign up to get started. Create your profile and showcase your
              skills to employers.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
            <MdFindInPage className="text-green-500 text-5xl mb-4" />
            <p className="text-xl font-semibold text-gray-800 mb-2">
              Find a Job/Post a Job
            </p>
            <p className="text-gray-600">
              Explore thousands of job listings or post a job to find the right
              candidate.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
            <IoMdSend className="text-red-500 text-5xl mb-4" />
            <p className="text-xl font-semibold text-gray-800 mb-2">
              Apply For Job/Recruit
            </p>
            <p className="text-gray-600">
              Apply for your dream job or recruit the best talent for your
              company.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;