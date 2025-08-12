import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa";
import '../../css/Footer.css';

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-copyright">
          © 2025 CareerUp Professional Platform. All Rights Reserved.
        </div>
        
        <div className="footer-socials">
          <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="footer-icon" />
            <span>Facebook</span>
          </Link>
          <Link to="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="footer-icon" />
            <span>YouTube</span>
          </Link>
          <Link to="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="footer-icon" />
            <span>LinkedIn</span>
          </Link>
          <Link to="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="footer-icon" />
            <span>Instagram</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
