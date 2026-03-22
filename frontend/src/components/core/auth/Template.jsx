// import React from "react";
// import frame from "../../../assets/frame.png";
// import SignUpForm from "./SignupForm";
// import LoginForm from "./LoginForm";
// const Template = (props) => {
//     const desc1 = "Build skills for today, tomorrows, and beyond.";
//     const desc2 = "Turn your college skills into real-world experience.";
//     return (
//         <div className="text-black flex flex-row justify-between items-center mt-12 mb-5 w-fit bg-white/30 rounded-4xl p-5 backdrop-blur-md shadow-lg">
//             <div className=" w-full flex flex-col justify-center items-center">
//                 <h1 className="text-2xl font-bold text-black">{props.title}</h1>
//                 <p className="text-lg text-black mt-3">{desc1}</p>
//                 <p className="font-edu-sa text-lg text-white mb-7">{desc2}</p>
//                 {props.type === "SignUp" ? <SignUpForm /> : <LoginForm />}
//             </div>
//         </div>
//     );
// };

// export default Template;

import React, { useEffect, useState } from "react";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

const Template = ({ title, type }) => {
    const [isVisible, setIsVisible] = useState(false);
    const desc1 = "Build skills for today, tomorrow, and beyond.";
    const desc2 = "Turn your college skills into real-world experience.";

    useEffect(() => {
        // Trigger animation on mount
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    return (
        <div
            className={`
        flex flex-col items-center justify-center
        bg-white/95 backdrop-blur-md shadow-2xl
        rounded-3xl p-6 sm:p-8 md:p-12 mx-auto my-6
        w-full transition-all duration-1000
        ${type === "SignUp" ? "max-w-[95%] sm:max-w-3xl lg:max-w-5xl" : "max-w-[95%] sm:max-w-2xl lg:max-w-3xl"}
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        relative z-10
      `}
        >
            <div className="flex flex-col items-center text-center w-full">
                <h1 className={`font-extrabold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent transition-all duration-700 delay-200 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                } ${type === "SignUp" ? "text-2xl sm:text-3xl md:text-4xl" : "text-3xl sm:text-4xl md:text-5xl"}`}>
                    {title}
                </h1>

                <p className={`text-base sm:text-lg text-slate-700 mt-4 max-w-md font-medium transition-all duration-700 delay-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}>{desc1}</p>

                <p className={`font-edu-sa text-base sm:text-lg text-slate-600 mb-8 max-w-md transition-all duration-700 delay-400 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}>{desc2}</p>

                <div className={`w-full transition-all duration-700 delay-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                    {type === "SignUp" ? <SignUpForm /> : <LoginForm />}
                </div>
            </div>
        </div>
    );
};

export default Template;
