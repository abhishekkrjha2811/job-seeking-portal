import React, { useRef, useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { FaCaretDown, FaRegUserCircle } from "react-icons/fa";
import { VscDashboard, VscSignOut, VscMail } from "react-icons/vsc";
import { FiFileText } from "react-icons/fi";
import { BsBriefcase } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/operations/authAPI";

const ProfileDropDown = () => {
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    useOutsideClick(menuRef, () => setIsOpen(false));
    
    // Get user initials
    const getInitials = () => {
        if (!user) return "";
        const firstInitial = user.firstName?.charAt(0)?.toUpperCase() || "";
        const lastInitial = user.lastName?.charAt(0)?.toUpperCase() || "";
        return `${firstInitial}${lastInitial}`;
    };
    
    // if (!user) return null;
    return (
        <button className="relative" onClick={() => setIsOpen(true)}>
            <div className="h-[40px] w-[40px] bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex justify-center items-center shadow-md shadow-emerald-300">
                {user?.image ? (
                    <img src={user?.image} alt={`profile-${user?.firstName}`} className="aspect-square w-full h-full rounded-full object-cover" />
                ) : (
                    <span className="text-white font-bold text-sm">{getInitials()}</span>
                )}
            </div>
            {isOpen && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-[60px] w-[200px] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-white"
                    ref={menuRef}
                >
                    <Link to="/dashboard/my-profile" onClick={() => setIsOpen(false)}>
                        <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-900 hover:bg-richblack-700 hover:text-richblack-25">
                            <VscDashboard className="text-lg" />
                            Profile
                        </div>
                    </Link>
                    <Link to="/my-applications" onClick={() => setIsOpen(false)}>
                        <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-900 hover:bg-richblack-700 hover:text-richblack-25">
                            <FiFileText className="text-lg" />
                            My Applications
                        </div>
                    </Link>
                    <Link to="my-posted-jobs" onClick={() => setIsOpen(false)}>
                        <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-900 hover:bg-richblack-700 hover:text-richblack-25">
                            <BsBriefcase className="text-lg" />
                            My Jobs
                        </div>
                    </Link>
                    <Link to="/messages" onClick={() => setIsOpen(false)}>
                        <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-900 hover:bg-richblack-700 hover:text-richblack-25">
                            <VscMail className="text-lg" />
                            Inbox
                        </div>
                    </Link>
                    <div
                        onClick={() => {
                            dispatch(logout(navigate));
                            setIsOpen(false);
                        }}
                        className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-900 hover:bg-richblack-700 hover:text-richblack-25"
                    >
                        <VscSignOut className="text-lg" />
                        Logout
                    </div>
                </div>
            )}
        </button>
    );
};

export default ProfileDropDown;
