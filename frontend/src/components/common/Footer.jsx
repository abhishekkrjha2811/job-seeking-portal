import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../../assets/logo2.png";

const Footer = () => {
    return (
        <footer className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <img src={logo} alt="NEXWORK" className="w-40 brightness-0 invert" />
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Connect with talented freelancers and find exciting opportunities. Your gateway to the future of work.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                <FaFacebookF className="text-white text-sm" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                <FaTwitter className="text-white text-sm" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                <FaLinkedinIn className="text-white text-sm" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                <FaInstagram className="text-white text-sm" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/job" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                    Browse Jobs
                                </Link>
                            </li>
                            <li>
                                <Link to="/categories" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link to="/how-it-works" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Freelancers */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4">For Freelancers</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/job" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                                    Find Work
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-applications" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                                    My Applications
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/my-profile" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                                    My Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/post-job" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                                    Post a Job
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-posted-jobs" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                                    My Posted Jobs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4">Get In Touch</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-400 text-sm">
                                <FaMapMarkerAlt className="text-emerald-500 mt-1 flex-shrink-0" />
                                <span>123 Business Street, Tech City, TC 12345</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 text-sm">
                                <FaEnvelope className="text-emerald-500 flex-shrink-0" />
                                <a href="mailto:support@nexwork.com" className="hover:text-emerald-400 transition-colors duration-300">
                                    support@nexwork.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 text-sm">
                                <FaPhone className="text-emerald-500 flex-shrink-0" />
                                <a href="tel:+1234567890" className="hover:text-emerald-400 transition-colors duration-300">
                                    +1 (234) 567-890
                                </a>
                            </li>
                        </ul>
                        <div className="pt-4">
                            <Link 
                                to="/messages" 
                                className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-400 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} NEXWORK. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link to="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300">
                                Privacy Policy
                            </Link>
                            <Link to="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300">
                                Terms of Service
                            </Link>
                            <Link to="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
