import { useContext, useEffect, useState } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import ResumeModal from "./components/Application/ResumeModal";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  // Modal state for ResumeModal
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  // Example: function to open modal (pass to child components as needed)
  const openResumeModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setShowResumeModal(true);
  };
  const closeResumeModal = () => {
    setShowResumeModal(false);
    setResumeImageUrl("");
  };

  return (
    <BrowserRouter>
      <div className="app-container formal-bg">
        <Navbar />
        <main className="main-content formal-main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/job/getall" element={<Jobs />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/application/:id" element={<Application />} />
            <Route path="/applications/me" element={<MyApplications />} />
            <Route path="/job/post" element={<PostJob />} />
            <Route path="/job/me" element={<MyJobs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Only show ResumeModal when needed */}
          {showResumeModal && (
            <ResumeModal imageUrl={resumeImageUrl} onClose={closeResumeModal} />
          )}
        </main>
        <Footer />
        {/* Decorative background shapes for formal look */}
        <div className="formal-bg-shapes">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="formal-bg-svg">
            <ellipse cx="80" cy="10" rx="30" ry="10" fill="#e3eafc" opacity="0.25" />
            <ellipse cx="20" cy="90" rx="40" ry="12" fill="#b6c6e3" opacity="0.18" />
          </svg>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
