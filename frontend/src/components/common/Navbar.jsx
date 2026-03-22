import React from "react";
import { useSelector } from "react-redux";
import { navLinks } from "../../data/navLinks";
import logo from "../../assets/logo2.png";
import { Link, matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProfileDropDown from "../core/auth/ProfileDropDown";

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };
    return (
        <div className="flex items-center justify center bg-white h-14 w-full p-2 fixed z-50">
            <div className="flex flex-row justify-between w-full h-10 items-center">
                {/* div 1 -> logo */}
                <Link className="flex h-8  items-center" to="/">
                    <img src={logo} alt="NEXWORK" className="w-48" />
                </Link>
                {/* div 2 -> navbar links */}
                <div className="flex flex-row gap-x-6 font-inter text-bold">
                    {navLinks
                        .filter((link) => (user ? link.status === "loggedIn" : link.status === "loggedOut"))
                        .map((link, index) => (
                            <Link to={link.linkTo} key={index}>
                                <button className={`${matchRoute(link.linkTo) ? "text-cyan-600" : "text-richblack-900"}`}>
                                    {link.title}
                                </button>
                            </Link>
                        ))}
                </div>
                {/* div 3 -> login and signup buttons if logged out / welcome message and profile dropdown is logged in */}
                <div className="text-white flex flex-row gap-3 items-center">
                    {token === null && (
                        <Link to="/Login">
                            <button
                                className={`py-2 px-3 rounded-xl text-black hover:bg-blue-5 ${
                                    matchRoute("/login") ? "border-1 border-white" : ""
                                }`}
                            >
                                Login
                            </button>
                        </Link>
                    )}
                    {token === null && (
                        <Link to="/Signup">
                            <button className={`bg-cyan-600 py-2 px-3 rounded-xl ${matchRoute("/signup") ? "border-1 border-white" : ""}`}>
                                Signup
                            </button>
                        </Link>
                    )}
                    {token !== null && user && (
                        <div className="flex items-center gap-2 mr-2">
                            <span className="text-slate-600 font-medium text-base">Welcome,</span>
                            <span className="text-slate-900 font-bold text-lg">
                                {user.firstName} {user.lastName}
                            </span>
                        </div>
                    )}
                    {token !== null && <ProfileDropDown />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
