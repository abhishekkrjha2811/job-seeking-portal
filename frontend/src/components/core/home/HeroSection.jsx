// import React from "react";
// import { CiSearch } from "react-icons/ci";
// import { FiBriefcase } from "react-icons/fi";

// const HeroSection = () => {
//     return (
//         <div className="h-screen w-screen py-4 px-10 flex justify-center items-center bg-cover bg-center bg-[url('/assets/home/hero-bg.jpg')] text-white">
//             <div className="w-[90%] flex flex-row justify-evenly items-center">
//                 {/* hero section left */}
//                 <div className="flex flex-col w-[55%] gap-7">
//                     <div className="w-[85%] ">
//                         <h1 className="font-inter font-extrabold text-5xl leading-tight">
//                             FIND TALENT YOU CAN TRUST, WITHIN YOUR OWN NETWORK
//                         </h1>
//                     </div>
//                     <div className="w-[75%]">
//                         <p className="font-inter font-medium text-lg">
//                             Connect with talented students, professors, and alumni from your university for freelance projects and
//                             internships.
//                         </p>
//                     </div>
//                     <div className="w-[90%] flex flex-row gap-x-3">
//                         <div className="w-[75%] relative">
//                             <div className="absolute text-black top-2 left-5">
//                                 <CiSearch fontSize={20} />
//                             </div>
//                             <input
//                                 placeholder="Search for jobs, skills or categories..."
//                                 className="bg-white rounded-lg px-12 py-2 text-left text-gray-500 w-full"
//                             />
//                         </div>
//                         <div className="w-[25%] relative">
//                             <div className="text-white absolute top-2 left-7">
//                                 <CiSearch fontSize={20} />
//                             </div>
//                             <p className="rounded-lg w-full bg-cyan-500 py-2 px-14 hover:bg-blue-600">Search</p>
//                         </div>
//                     </div>
//                     <div className="w-[75%] flex flex-row gap-4 items-center">
//                         <div className="rounded-lg bg-blue-400 text-richblack-800 py-2 pl-16 relative w-[35%] hover:bg-blue-500">
//                             <div className="text-richblack-900 absolute left-[30px]">
//                                 <FiBriefcase fontSize={20} />
//                             </div>
//                             <p className="">Post a job</p>
//                         </div>
//                         <p className="">Looking for hire? Post your project...</p>
//                     </div>
//                 </div>

//                 {/* hero section right */}
//                 <div className="w-[45%] bg-cyan-500 flex items-center justify-center rounded-lg">
//                     <div className="flex flex-col gap-4 items-center mt-20 mb-20">
//                         <div className="rounded-full flex text-center p-5 bg-cyan-400 w-fit">
//                             <FiBriefcase fontSize={50} />
//                         </div>
//                         <h3 className="text-3xl font-inter font-bold">Connect. Collaborate. Create</h3>
//                         <p className="font-normal text-lg">Your University Network is your greatest asset</p>
//                         <div className="flex w-fit flex-row gap-5">
//                             <div className="rounded-lg flex flex-col p-3 bg-cyan-400">
//                                 <p className="text-3xl font-bold font-inter">500+</p>
//                                 <p className="">Active jobs</p>
//                             </div>
//                             <div className="rounded-lg flex flex-col p-3 bg-cyan-400">
//                                 <p className="text-3xl font-bold font-inter">1000+</p>
//                                 <p className="">Students</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HeroSection;

import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiBriefcase, FiUsers, FiTrendingUp, FiAward } from "react-icons/fi";

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div ref={sectionRef} className="h-screen w-full py-4 px-4 md:px-10 flex justify-center items-center bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 text-white relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            <div className="w-full md:w-[90%] flex flex-col md:flex-row justify-evenly items-center relative z-10">
                {/* LEFT */}
                <div className={`flex flex-col w-full md:w-[55%] gap-7 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                    <div className="w-full md:w-[85%]">
                        <h1 className="font-inter font-extrabold text-5xl md:text-4xl sm:text-2xl leading-tight drop-shadow-lg">
                            FIND TALENT YOU CAN TRUST, WITHIN YOUR OWN NETWORK
                        </h1>
                    </div>

                    <div className="w-full md:w-[75%]">
                        <p className="font-inter font-medium text-base sm:text-lg text-white/95 leading-relaxed">
                            Connect with talented students, professors, and alumni from your university for freelance projects and
                            internships.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="w-full md:w-[90%] flex flex-col sm:flex-row gap-3">
                        <div className="w-full sm:w-[70%] relative">
                            <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CiSearch className="text-emerald-600 mr-3" fontSize={24} />
                                <input
                                    className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                                    placeholder="Search for jobs, skills or categories..."
                                />
                            </div>
                        </div>

                        <button className="w-full sm:w-[28%] rounded-xl text-center bg-gradient-to-r from-yellow-500 to-amber-500 py-3 px-6 hover:from-yellow-600 hover:to-amber-600 cursor-pointer font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                            <CiSearch fontSize={20} />
                            <span>Search</span>
                        </button>
                    </div>

                    {/* Post Job */}
                    <div className="w-full md:w-[75%] flex flex-col sm:flex-row gap-4 items-center">
                        <button className="rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center gap-3 px-6 py-3 hover:bg-white/30 transition-all duration-300 shadow-lg hover:scale-105">
                            <FiBriefcase fontSize={22} className="text-white" />
                            <p className="text-white font-semibold">Post a Job</p>
                        </button>

                        <p className="text-center sm:text-left text-white/90">Looking to hire? Post your project now...</p>
                    </div>
                </div>

                {/* RIGHT (HIDDEN IN SMALL SCREENS) */}
                <div className={`hidden md:flex w-[45%] bg-white/10 backdrop-blur-lg border border-white/20 items-center justify-center rounded-2xl mt-10 md:mt-0 shadow-2xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
                    <div className="flex flex-col gap-6 items-center py-16 px-8">
                        <div className="rounded-full flex text-center p-6 bg-gradient-to-br from-yellow-400 to-amber-500 w-fit shadow-xl animate-bounce" style={{animationDuration: '3s'}}>
                            <FiAward fontSize={50} className="text-white" />
                        </div>
                        <h3 className="lg:text-3xl md:text-2xl text-center font-inter font-bold">Connect. Collaborate. Create</h3>
                        <p className="font-normal text-lg text-center text-white/90">Your University Network is your greatest asset</p>

                        <div className="grid grid-cols-2 gap-4 w-full mt-4">
                            <div className="rounded-xl flex flex-col p-4 bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg hover:scale-105 transition-transform duration-300">
                                <FiTrendingUp className="text-white mb-2" fontSize={24} />
                                <p className="text-3xl font-bold font-inter">500+</p>
                                <p className="text-sm">Active Jobs</p>
                            </div>
                            <div className="rounded-xl flex flex-col p-4 bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg hover:scale-105 transition-transform duration-300">
                                <FiUsers className="text-white mb-2" fontSize={24} />
                                <p className="text-3xl font-bold font-inter">1000+</p>
                                <p className="text-sm">Students</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
