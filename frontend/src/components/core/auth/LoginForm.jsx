// import React from "react";
// import { useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import { login } from "../../../services/operations/authAPI";

// const LoginForm = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [showPassword, setShowPassword] = useState(false);
//     const [accountType, setAccountType] = useState("Student");
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });
//     const { email, password } = formData;
//     function changeHandler(event) {
//         setFormData((prevData) => ({
//             ...prevData,
//             [event.target.name]: event.target.value,
//         }));
//     }
//     function submitHandler(event) {
//         event.preventDefault();
//         console.log(formData);
//         dispatch(login(email, password, accountType, navigate));
//     }
//     return (
//         <form onSubmit={submitHandler} className=" w-full mb-7">
//             <div className="bg-[#87CEEB] rounded-2xl w-full flex flex-row justify-between p-1 mb-7">
//                 <button
//                     className={`py-2 px-10 rounded-2xl ${accountType === "Student" ? "bg-[#00BFFF]" : "bg-[#87CEEB]"}`}
//                     onClick={() => setAccountType("Student")}
//                     type="button"
//                 >
//                     Student
//                 </button>
//                 <button
//                     className={`py-2 px-10 rounded-2xl ${accountType === "Professor" ? "bg-[#00BFFF]" : "bg-[#87CEEB]"}`}
//                     onClick={() => setAccountType("Professor")}
//                     type="button"
//                 >
//                     Professor
//                 </button>
//                 <button
//                     className={`py-2 px-10 rounded-2xl ${accountType === "Admin" ? "bg-[#00BFFF]" : "bg-[#87CEEB]"}`}
//                     onClick={() => setAccountType("Admin")}
//                     type="button"
//                 >
//                     Admin
//                 </button>
//             </div>
//             <label className="flex flex-col gap-3 mb-3">
//                 <div className="flex flex-row gap-1">
//                     <p>Email Address</p>
//                     <div className="text-red-500">*</div>
//                 </div>
//                 <input
//                     required
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     id="email"
//                     placeholder="Enter Email ID"
//                     onChange={changeHandler}
//                     className="p-3 rounded-[7px] shadow-[0_1px_0_0_#ffffff] border-2 border-richblack-900"
//                 />
//             </label>

//             <label className="flex flex-col gap-3 mb-3">
//                 <div className="flex flex-row gap-1">
//                     <p>Password</p>
//                     <div className="text-red-500">*</div>
//                 </div>
//                 <div className="relative flex items-center">
//                     <input
//                         required
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         value={formData.password}
//                         id="password"
//                         placeholder="Enter Password"
//                         onChange={changeHandler}
//                         className="p-3 rounded-[7px] shadow-[0_1px_0_0_#ffffff] w-full border-2 border-richblack-900"
//                     ></input>
//                     <span
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute left-[330px] top-[10px] transform translate-y-1/2"
//                     >
//                         {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//                     </span>
//                 </div>
//             </label>

//             <button type="submit" className="w-full bg-[#1E90FF] rounded-[7px] p-3 text-black">
//                 Sign In
//             </button>
//         </form>
//     );
// };

// export default LoginForm;

import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../services/operations/authAPI";

const accountOptions = ["Student", "Professor", "Admin"];

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [accountType, setAccountType] = useState("Student");
    const [formData, setFormData] = useState({ email: "", password: "" });

    const changeHandler = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(formData.email, formData.password, accountType, navigate));
    };

    return (
        <form onSubmit={submitHandler} className="w-full max-w-md mx-auto px-2">
            {/* Account Type Toggle */}
            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl flex flex-wrap justify-center gap-2 p-2 mb-6">
                {accountOptions.map((option) => (
                    <button
                        key={option}
                        type="button"
                        onClick={() => setAccountType(option)}
                        className={`py-2 px-4 sm:px-6 md:px-8 rounded-xl transition-all duration-300 font-semibold text-sm sm:text-base ${
                            accountType === option 
                                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105" 
                                : "bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {/* Email Field */}
            <label className="flex flex-col gap-2 mb-5 w-full">
                <span className="flex items-center gap-1 text-slate-800 font-semibold text-sm sm:text-base">
                    Email Address <span className="text-red-500">*</span>
                </span>
                <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder="Enter your email"
                    className="p-3 rounded-xl border-2 border-slate-300 focus:border-emerald-500 shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all duration-300 text-sm sm:text-base"
                />
            </label>

            {/* Password Field */}
            <label className="flex flex-col gap-2 mb-6 w-full">
                <span className="flex items-center gap-1 text-slate-800 font-semibold text-sm sm:text-base">
                    Password <span className="text-red-500">*</span>
                </span>
                <div className="relative w-full">
                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                        placeholder="Enter your password"
                        className="p-3 pr-12 rounded-xl border-2 border-slate-300 focus:border-emerald-500 shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all duration-300 text-sm sm:text-base"
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-slate-600 hover:text-emerald-600 transition-colors"
                    >
                        {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </span>
                </div>
            </label>

            {/* Submit Button */}
            <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl p-3 sm:p-4 text-white font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
                Sign In
            </button>
        </form>
    );
};

export default LoginForm;
