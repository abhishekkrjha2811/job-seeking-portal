import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import '../../css/HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works-section">
      <h2 className="how-title">How CareerUp Works</h2>
      <div className="how-cards">
        <div className="how-card">
          <FaUserPlus className="how-icon" />
          <p className="how-card-title">Create Account</p>
          <p className="how-card-desc">
            Sign up to get started. Create your profile and showcase your skills
            to employers.
          </p>
        </div>
        <div className="how-card">
          <MdFindInPage className="how-icon" />
          <p className="how-card-title">Find a Job/Post a Job</p>
          <p className="how-card-desc">
            Explore thousands of job listings or post a job to find the right
            candidate.
          </p>
        </div>
        <div className="how-card">
          <IoMdSend className="how-icon" />
          <p className="how-card-title">Apply & Get Hired</p>
          <p className="how-card-desc">
            Apply for jobs, get noticed, and start your career journey with top
            companies.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;