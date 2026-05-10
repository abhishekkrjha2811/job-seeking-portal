import React from "react";
import Template from "../components/core/auth/Template.jsx";
import image from "../assets/signup.webp";

const Signup = () => {
    const title = "Start Your Freelance Journey";
    return (
        <div className="w-full flex justify-center items-center bg-gradient-to-br from-emerald-600 via-teal-600 to-green-600 min-h-screen px-4 py-12 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-96 h-96 bg-teal-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-emerald-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
            </div>
            
            <Template title={title} type={"SignUp"} image={image} />
        </div>
    );
};

export default Signup;
