import React from "react";
import { FaArrowRight, FaUserGraduate, FaUserTie, FaHandshake, FaLightbulb, FaAward, FaGlobe } from "react-icons/fa";
import CTAButton from "../components/common/Button";

const AboutUs = () => {
    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center justify-between px-6 lg:px-16 py-16 lg:py-24 w-full max-w-7xl">
                <div className="w-full lg:w-[65%] space-y-6">
                    <h1 className="text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-emerald-700 via-teal-600 to-green-700 bg-clip-text text-transparent leading-tight">
                        About NEXWORK
                    </h1>
                    <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium">
                        Empowering University students to collaborate, learn and earn through freelancing within their campus community.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        We bridge the gap between academic learning and real-world experience, creating opportunities for students to grow professionally while still in university.
                    </p>
                </div>
                <div className="w-full lg:w-[35%] flex justify-center">
                    <div className="w-64 h-64 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                        <FaGlobe className="w-32 h-32 text-white" />
                    </div>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 py-16 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
                        <FaLightbulb className="w-12 h-12 text-yellow-300 mb-4" />
                        <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
                        <p className="text-white/90 text-lg leading-relaxed">
                            To create a thriving ecosystem where students can showcase their skills, collaborate on meaningful projects, and build their professional portfolio while earning.
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
                        <FaAward className="w-12 h-12 text-amber-300 mb-4" />
                        <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
                        <p className="text-white/90 text-lg leading-relaxed">
                            To become the premier platform connecting talented university students with opportunities that accelerate their professional growth and career readiness.
                        </p>
                    </div>
                </div>
            </div>

            {/* Cards Section */}
            <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 justify-center w-full max-w-7xl px-6 py-20">
                <div className="bg-white flex-1 rounded-2xl text-slate-800 flex flex-col items-center p-8 gap-6 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-emerald-500">
                    <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-6 rounded-full">
                        <FaUserGraduate className="w-16 h-16 text-emerald-600" />
                    </div>
                    <h2 className="font-bold text-3xl text-center text-emerald-700">For Students</h2>
                    <p className="text-lg text-center text-slate-600 leading-relaxed">
                        Gain hands-on experience through real freelancing projects, build your portfolio, and earn while learning from peers and faculty mentors.
                    </p>
                    <ul className="text-left space-y-2 text-slate-700 w-full">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            Real-world project experience
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            Build professional portfolio
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            Earn while learning
                        </li>
                    </ul>
                </div>

                <div className="bg-white flex-1 rounded-2xl text-slate-800 flex flex-col items-center p-8 gap-6 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-teal-500">
                    <div className="bg-gradient-to-br from-teal-100 to-cyan-100 p-6 rounded-full">
                        <FaUserTie className="w-16 h-16 text-teal-600" />
                    </div>
                    <h2 className="font-bold text-3xl text-center text-teal-700">For Professors</h2>
                    <p className="text-lg text-center text-slate-600 leading-relaxed">
                        Get expert assistance on your projects while mentoring talented students, fostering innovation and academic excellence.
                    </p>
                    <ul className="text-left space-y-2 text-slate-700 w-full">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                            Access skilled student talent
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                            Mentor future professionals
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                            Accelerate project completion
                        </li>
                    </ul>
                </div>

                <div className="bg-white flex-1 rounded-2xl text-slate-800 flex flex-col items-center p-8 gap-6 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-green-500">
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-full">
                        <FaHandshake className="w-16 h-16 text-green-600" />
                    </div>
                    <h2 className="font-bold text-3xl text-center text-green-700">For Everyone</h2>
                    <p className="text-lg text-center text-slate-600 leading-relaxed">
                        Join a collaborative community that values growth, learning, and mutual success within the university ecosystem.
                    </p>
                    <ul className="text-left space-y-2 text-slate-700 w-full">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Collaborative environment
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Networking opportunities
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Skill development
                        </li>
                    </ul>
                </div>
            </div>

            {/* Stats Section */}
            <div className="w-full bg-gradient-to-r from-slate-800 to-slate-900 py-16 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <p className="text-5xl font-bold text-emerald-400 mb-2">1000+</p>
                        <p className="text-white/80 text-lg">Active Students</p>
                    </div>
                    <div className="text-center">
                        <p className="text-5xl font-bold text-teal-400 mb-2">500+</p>
                        <p className="text-white/80 text-lg">Projects Completed</p>
                    </div>
                    <div className="text-center">
                        <p className="text-5xl font-bold text-green-400 mb-2">50+</p>
                        <p className="text-white/80 text-lg">Faculty Members</p>
                    </div>
                    <div className="text-center">
                        <p className="text-5xl font-bold text-cyan-400 mb-2">95%</p>
                        <p className="text-white/80 text-lg">Satisfaction Rate</p>
                    </div>
                </div>
            </div>

            {/* CTA Button Section */}
            <div className="py-20 px-6 text-center space-y-6">
                <h2 className="text-4xl font-bold text-slate-800 mb-4">Ready to Get Started?</h2>
                <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                    Join NEXWORK today and become part of a thriving community of learners, creators, and innovators.
                </p>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className="gap-3 flex flex-row items-center px-8 py-2 justify-center">
                        <span className="text-lg font-semibold">Start Your Journey Today</span>
                        <FaArrowRight />
                    </div>
                </CTAButton>
            </div>
        </div>
    );
};

export default AboutUs;
