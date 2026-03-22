import React, { useEffect, useRef, useState } from "react";
import { works } from "../../../data/home/madeOnNexwork";
import { FiAward, FiUser } from "react-icons/fi";

const MadeOnNexwork = () => {
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
        <div ref={sectionRef} className="relative w-full flex flex-col items-center py-16 px-4">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="font-bold text-3xl md:text-4xl font-sans bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mt-16 text-center">Made On NexWork</h1>
                <p className="text-slate-600 mt-5 text-center max-w-2xl mx-auto text-lg">Discover amazing projects created by talented students from our community</p>
            </div>
            <div className="w-full max-w-7xl columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 mt-12 mb-10 px-4">
                {works.map((item, index) => (
                    <div 
                        className={`relative overflow-hidden rounded-2xl group mt-7 break-inside-avoid border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-700 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                        key={index}
                    >
                        <img
                            src={item.image}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            alt={item.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-teal-800/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                            <div className="flex items-center gap-2 mb-2">
                                <FiAward className="text-amber-400" />
                                <h3 className="text-white font-bold text-xl">{item.title}</h3>
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                                <FiUser className="text-teal-300" size={16} />
                                <p className="text-teal-100 text-sm">{item.creator}</p>
                            </div>
                            <div className="inline-block mt-2 px-3 py-1 bg-emerald-500/80 backdrop-blur-sm rounded-full">
                                <p className="text-white text-xs font-semibold">{item.category}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MadeOnNexwork;
