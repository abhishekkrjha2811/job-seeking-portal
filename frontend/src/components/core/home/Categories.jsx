// import React from "react";
// import { categoriesData } from "../../../data/home/categoriesData";
// import { Link } from "react-router-dom";

// const Categories = () => {
//     return (
//         <div className="flex flex-col w-full items-center mt-16">
//             <h1 className="font-bold text-3xl font-sans text-indigo-800">Browse By Category</h1>
//             <p className="text-gray-700 mt-5">Explore opportunities across various fields and find projects that match your skills.</p>
//             <div className="grid grid-cols-3 gap-3 w-[90%] mt-10">
//                 {categoriesData.map((category, index) => (
//                     <Link
//                         className="rounded-lg flex flex-row items-center gap-5 p-4 transition-all duration-300 group hover:scale-103 hover:shadow-xl hover:shadow-blue-400"
//                         style={{ backgroundColor: category.color }}
//                         key={index}
//                         to={`/category/${encodeURIComponent(category.name)}`}
//                     >
//                         <div className="rounded-lg p-4 bg-cyan-600 w-fit">
//                             <img src={category.icon} className="w-8 invert" />
//                         </div>
//                         <div className="">
//                             <h2 className="text-xl text-white group-hover:text-cyan-200">{category.name}</h2>
//                             <p className="text-sm text-white">Explore Opportunities</p>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Categories;

import React, { useEffect, useRef, useState } from "react";
import { categoriesData } from "../../../data/home/categoriesData";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const Categories = () => {
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
        <div ref={sectionRef} className="flex flex-col w-full items-center mt-20 px-4 sm:px-6 lg:px-8 py-16">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="font-bold text-3xl md:text-4xl font-sans bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent text-center">Browse By Category</h1>
                <p className="text-slate-600 mt-5 text-center max-w-2xl mx-auto text-lg">
                    Explore opportunities across various fields and find projects that match your skills.
                </p>
            </div>
            {/* The main responsiveness is in this grid definition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 w-full max-w-7xl mt-12">
                {categoriesData.map((category, index) => (
                    <Link
                        className={`rounded-2xl flex flex-row items-center gap-5 p-5 transition-all duration-500 group hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-white/30 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ 
                            backgroundColor: category.color,
                            transitionDelay: `${index * 100}ms`
                        }}
                        key={index}
                        to={`/category/${encodeURIComponent(category.name)}`}
                    >
                        <div className="rounded-xl p-3 sm:p-4 bg-white/20 backdrop-blur-sm w-fit shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <img src={category.icon} className="w-6 sm:w-8 invert" alt={`${category.name} icon`} />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg sm:text-xl font-bold text-white group-hover:translate-x-1 transition-transform duration-300">{category.name}</h2>
                            <p className="text-xs sm:text-sm text-white/90 flex items-center gap-1 mt-1">
                                <span>Explore Opportunities</span>
                                <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
