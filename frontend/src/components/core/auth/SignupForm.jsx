import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import OtpInput from "react-otp-input";
import { FaTimes } from "react-icons/fa";
import { signUp, verifyEmail } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../slices/authSlice";
import { toast } from "react-hot-toast";

const SignUpForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showCreatePassword, setShowCreatePassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState("Student");
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        branch: "cse",
        year: "",
        createPassword: "",
        confirmPassword: "",
    });
    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    async function submitHandler(event) {
        event.preventDefault();
        console.log("formdata is ", formData);
        console.log(accountType);
        if (formData.createPassword !== formData.confirmPassword) {
            toast.error("Passwords Do Not Match");
            return;
        }
        const signupData = {
            ...formData,
            accountType,
        };

        console.log("signupData", signupData);

        // Setting signup data to state
        dispatch(setSignupData(signupData));

        // Call signup API
        const result = await dispatch(signUp(signupData, navigate));

        // If OTP sent successfully, show OTP modal
        if (result) {
            setShowOtpModal(true);
        }
    }

    function handleVerifyOtp() {
        if (!otp || otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }

        const signupData = {
            ...formData,
            accountType,
        };

        dispatch(verifyEmail(otp, signupData, navigate));
        setShowOtpModal(false);
    }
    return (
        // <div></div>
        <form onSubmit={submitHandler} className=" w-full mb-4">
            <div className="flex flex-row gap-3">
                <label className="flex flex-col gap-3 mb-3 w-[50%]">
                    <div className="flex flex-row gap-1">
                        <p>First Name</p>
                        <div className="text-red-500">*</div>
                    </div>
                    <input
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        id="firstName"
                        placeholder="Enter First Name"
                        onChange={changeHandler}
                        className="border-2 border-richblack-900 p-3 rounded-[7px] shadow-[0_1px_0_0_#ffffff]"
                    />
                </label>

                <label className="flex flex-col gap-3 mb-3 w-[50%]">
                    <div className="flex flex-row gap-1">
                        <p>Last Name</p>
                        <div className="text-red-500">*</div>
                    </div>
                    <input
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        id="lastName"
                        placeholder="Enter Last Name"
                        onChange={changeHandler}
                        className="border-2 border-richblack-900 p-3 rounded-[7px] shadow-[0_1px_0_0_#ffffff]"
                    />
                </label>
            </div>
            <label className="flex flex-col gap-3 mb-3">
                <div className="flex flex-row gap-1">
                    <p>Email Address</p>
                    <div className="text-red-500">*</div>
                </div>
                <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    id="email"
                    placeholder="Enter Email ID"
                    onChange={changeHandler}
                    className="border-2 border-richblack-900 p-3 rounded-[7px] shadow-[0_1px_0_0_#ffffff]"
                />
            </label>

            <div className="flex flex-row gap-3">
                <label className="flex flex-col gap-3 mb-3 w-[50%]">
                    <div className="flex flex-row gap-1">
                        <p>Phone Number</p>
                        <div className="text-red-500">*</div>
                    </div>
                    <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        id="phone"
                        placeholder="Enter Phone Number"
                        onChange={changeHandler}
                        className="border-2 border-richblack-900 p-3 rounded-[7px] shadow-[0_1px_0_0_#ffffff]"
                    />
                </label>

                <label className="flex flex-col gap-3 mb-3 w-[50%]">
                    <div className="flex flex-row gap-1">
                        <p> Passout Year</p>
                        <div className="text-red-500">*</div>
                    </div>
                    <input
                        required
                        type="number"
                        name="year"
                        value={formData.year}
                        id="year"
                        placeholder="Enter Year (e.g., 2023)"
                        onChange={changeHandler}
                        className="border-2 border-richblack-900 p-3 rounded-[7px] shadow-[0_1px_0_0_#ffffff]"
                    />
                </label>
            </div>
            <div className="flex flex-row gap-3 ">
                <label className="flex flex-col gap-3 mb-3 w-[50%]">
                    <div className="flex flex-row gap-1">
                        <p>Branch</p>
                        <div className="text-red-500">*</div>
                    </div>
                    <select
                        required
                        name="branch"
                        value={formData.branch}
                        id="branch"
                        onChange={changeHandler}
                        className="border-2 border-richblack-900 p-3 rounded-[7px] shadow-[0_1px_0_0_#ffffff]"
                    >
                        <option value="cse">Computer Science Engineering (CSE)</option>
                        <option value="me">Mechanical Engineering (ME)</option>
                        <option value="ece">Electronics & Communication Engineering (ECE)</option>
                    </select>
                </label>
                <label className="flex flex-col gap-3 mb-3 w-[50%]">
                    <div className="flex flex-row gap-1">
                        <p>Role</p>
                        <div className="text-red-500">*</div>
                    </div>
                    <div className="bg-[#87CEEB] rounded-2xl w-full flex flex-row justify-between p-1 mb-7">
                        <button
                            className={`py-2 px-6  rounded-2xl ${accountType === "Student" ? "bg-[#00BFFF]" : "bg-[#87CEEB]"}`}
                            onClick={() => setAccountType("Student")}
                            type="button"
                        >
                            Student
                        </button>
                        <button
                            className={`py-2 px-6  rounded-2xl ${accountType === "Professor" ? "bg-[#00BFFF]" : "bg-[#87CEEB]"}`}
                            onClick={() => setAccountType("Professor")}
                            type="button"
                        >
                            Professor
                        </button>
                        <button
                            className={`py-2 px-6  rounded-2xl ${accountType === "Admin" ? "bg-[#00BFFF]" : "bg-[#87CEEB]"}`}
                            onClick={() => setAccountType("Admin")}
                            type="button"
                        >
                            Admin
                        </button>
                    </div>
                </label>
            </div>

            <div className="flex flex-row gap-3">
                <label className="flex flex-col gap-3 mb-3 w-[50%]">
                    <div className="flex flex-row gap-1">
                        <p>Create Password</p>
                        <div className="text-red-500">*</div>
                    </div>
                    <div className="relative flex flex-row items-center">
                        <input
                            required
                            type={showCreatePassword ? "text" : "password"}
                            name="createPassword"
                            value={formData.createPassword}
                            id="createPassword"
                            placeholder="Enter Password"
                            onChange={changeHandler}
                            className="border-2 border-richblack-900 p-3 rounded-[7px] shadow-[0_1px_0_0_#ffffff] w-full"
                        />
                        <span
                            onClick={() => setShowCreatePassword(!showCreatePassword)}
                            className="absolute transform translate-y-1/2 top-[10px] left-[220px]"
                        >
                            {showCreatePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </div>
                </label>

                <label className="flex flex-col gap-2 mb-4 w-full sm:w-1/2">
                    <span className="flex items-center gap-1 text-slate-800 font-semibold text-sm sm:text-base">
                        Confirm Password <span className="text-red-500">*</span>
                    </span>
                    <div className="relative w-full">
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            placeholder="Confirm Password"
                            onChange={changeHandler}
                            className="border-2 border-slate-300 focus:border-emerald-500 p-3 pr-12 rounded-xl shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all duration-300 text-sm sm:text-base"
                        />
                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-slate-600 hover:text-emerald-600 transition-colors"
                        >
                            {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                        </span>
                    </div>
                </label>
            </div>
            
            {/* Submit Button */}
            <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl p-3 sm:p-4 text-white font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] mt-2"
            >
                Create Account
            </button>

            {/* OTP Modal */}
            {showOtpModal && (
                <div className="fixed inset-0  flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-sm"></div>
                    <div className="relative bg-white rounded-lg shadow-xl max-w-lg max-h-[90vh] w-full p-6 z-50 animate-fadeIn overflow-y-auto">
                        <button onClick={handleCloseModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                            <FaTimes size={20} />
                        </button>

                        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Verify Your Email</h2>
                        <p className="text-gray-600 mb-6 text-center">
                            We've sent a 6-digit OTP to <strong>{formData.email}</strong>
                        </p>
                        <label className="flex flex-col gap-3 mb-6">
                            <div className="flex flex-row gap-1">
                                <p className="font-semibold">Enter OTP</p>
                                <div className="text-red-500">*</div>
                            </div>

                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        placeholder="-"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-2xl lg:w-[60px] border-0 bg-richblack-400 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                    />
                                )}
                                containerStyle={{
                                    justifyContent: "space-between",
                                    gap: "0 6px",
                                }}
                            />
                        </label>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowOtpModal(false);
                                    setOtp("");
                                }}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleVerifyOtp}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors"
                            >
                                Verify OTP
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
};

export default SignUpForm;
