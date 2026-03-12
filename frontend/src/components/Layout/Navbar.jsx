import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogOut, FiUser, FiHome, FiBriefcase, FiFileText, FiPlus } from "react-icons/fi";
import "../../css/Navbar.css";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      setIsAuthorized(false);
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        {/* Logo Section */}
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="CareerHub Logo" />
          <span className="navbar-brand">CareerHub</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-nav">
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/job/getall" className="navbar-link">
              Jobs
            </Link>
          </li>
          <li>
            <Link to="/applications/me" className="navbar-link">
              {user && user.role === "Employer" ? "Applications" : "My Applications"}
            </Link>
          </li>
          {user && user.role === "Employer" && (
            <>
              <li>
                <Link to="/job/post" className="navbar-link">
                  Post Job
                </Link>
              </li>
              <li>
                <Link to="/job/me" className="navbar-link">
                  My Jobs
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Desktop Actions */}
        <div className="navbar-actions">
          {user && (
            <div className="navbar-user">
              <div className="navbar-user-avatar">
                <FiUser />
              </div>
              <div className="navbar-user-info">
                <span className="navbar-user-name">{user.name}</span>
                <span className="navbar-user-role">{user.role}</span>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="navbar-btn navbar-btn-logout">
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="navbar-mobile-toggle"
          onClick={() => setShow(!show)}
          aria-label="Toggle mobile menu"
        >
          <GiHamburgerMenu />
        </button>

        {/* Mobile Menu */}
        <div className={`navbar-mobile-menu ${show ? "show" : ""}`}>
          <ul className="navbar-mobile-nav">
            <li>
              <Link to="/" className="navbar-link" onClick={() => setShow(false)}>
                <FiHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/job/getall" className="navbar-link" onClick={() => setShow(false)}>
                <FiBriefcase /> Jobs
              </Link>
            </li>
            <li>
              <Link to="/applications/me" className="navbar-link" onClick={() => setShow(false)}>
                <FiFileText />
                {user && user.role === "Employer" ? "Applications" : "My Applications"}
              </Link>
            </li>
            {user && user.role === "Employer" && (
              <>
                <li>
                  <Link to="/job/post" className="navbar-link" onClick={() => setShow(false)}>
                    <FiPlus /> Post Job
                  </Link>
                </li>
                <li>
                  <Link to="/job/me" className="navbar-link" onClick={() => setShow(false)}>
                    <FiBriefcase /> My Jobs
                  </Link>
                </li>
              </>
            )}
          </ul>
          
          <div className="navbar-mobile-actions">
            {user && (
              <div className="navbar-mobile-user">
                <div className="navbar-user">
                  <div className="navbar-user-avatar">
                    <FiUser />
                  </div>
                  <div className="navbar-user-info">
                    <span className="navbar-user-name">{user.name}</span>
                    <span className="navbar-user-role">{user.role}</span>
                  </div>
                </div>
              </div>
            )}
            <button onClick={handleLogout} className="navbar-btn navbar-btn-logout">
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

