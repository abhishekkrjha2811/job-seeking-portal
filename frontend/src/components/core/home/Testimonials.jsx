// import React, { useEffect, useState } from "react";
// import { testimonials } from "../../../data/home/testimonials";
// import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";
// import "../../../App.css";
// import { Autoplay, Pagination } from "swiper/modules";

// const Testimonials = () => {
//     const nextSlide = () => {
//         setIndex((prev) => (prev + 1) % testimonials.length);
//     };
//     const prevSlide = () => {
//         setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
//     };
//     return (
//         <div className="relative w-full flex flex-col mt-16 items-center bg-blue-5">
//             <h1 className="font-bold text-3xl font-sans text-indigo-800 mt-16">What Our Users Say</h1>
//             <p className="text-gray-700 mt-5">Hear from students, professors, and alumni who've found success on NexWork</p>
//             <Swiper
//                 slidesPerView={3}
//                 spaceBetween={25}
//                 loop={true}
//                 autoHeight={true}
//                 autoplay={{
//                     delay: 2500,
//                     disableOnInteraction: false,
//                 }}
//                 modules={[Pagination, Autoplay]}
//                 pagination={{ clickable: true }}
//                 className="w-[90%] gap-10 mt-10 mb-10"
//             >
//                 {testimonials.map((testimony, index) => (
//                     <SwiperSlide
//                         className="rounded-lg p-4 flex flex-col bg-white ring-1 ring-gray-300 gap-y-6 transition-all duration-500 ease-out hover:scale-106 hover:shadow-lg"
//                         key={index}
//                     >
//                         <div className="flex flex-row gap-4">
//                             <div className="rounded-full overflow-hidden w-16">
//                                 <img src={testimony.pfp} className="w-fit" />
//                             </div>
//                             <div className="flex flex-col justify-center">
//                                 <h3 className="font-bold text-black">{testimony.name}</h3>
//                                 <p className="">{testimony.job}</p>
//                             </div>
//                         </div>
//                         <div className="flex flex-row">
//                             {[...Array(5)].map((_, key) => (
//                                 <FaStar key={key} className={key < testimony.rating ? "text-blue-400" : "text-gray-300"} />
//                             ))}
//                         </div>
//                         <p className="w-[90%] font-inter text-gray-700">{testimony.testimonial}</p>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>

//         </div>
//     );
// };

// export default Testimonials;
import React, { useEffect, useRef, useState } from "react";
import { testimonials } from "../../../data/home/testimonials";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../../App.css";
import { Autoplay, Pagination } from "swiper/modules";

const Testimonials = () => {
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
        <div ref={sectionRef} className="relative w-full flex flex-col mt-20 items-center px-4 py-16 bg-gradient-to-br from-emerald-100 via-teal-50 to-green-100">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="font-bold text-3xl sm:text-4xl font-sans bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent text-center">What Our Users Say</h1>

                <p className="text-slate-600 mt-4 text-center max-w-[700px] text-lg">
                    Hear from students, professors, and alumni who've found success on NexWork
                </p>
            </div>

            {/* Fixed-height wrapper to keep cards stable */}
            <div className="w-full max-w-7xl mt-10 mb-20 px-4">
                <Swiper
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 20 },
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 25 },
                        1024: { slidesPerView: 3, spaceBetween: 25 },
                    }}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="pb-32"
                    // this pushes pagination DOWN, outside the cards
                >
                    {testimonials.map((testimony, index) => (
                        <SwiperSlide key={index} className="h-full">
                            <div
                                className="rounded-2xl p-6 flex flex-col bg-white border-2 border-emerald-100 gap-y-6 
                                transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-2xl hover:border-emerald-300
                                h-full relative overflow-hidden"
                            >
                                {/* Quote icon background */}
                                <FaQuoteLeft className="absolute top-4 right-4 text-6xl text-emerald-100" />
                                
                                {/* Profile */}
                                <div className="flex flex-row items-center gap-4 relative z-10">
                                    <div className="rounded-full overflow-hidden w-16 h-16 flex-shrink-0 ring-4 ring-emerald-200">
                                        <img src={testimony.pfp} className="w-full h-full object-cover" alt={testimony.name} />
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        <h3 className="font-bold text-slate-800 text-lg">{testimony.name}</h3>
                                        <p className="text-slate-600 text-sm">{testimony.job}</p>
                                    </div>
                                </div>

                                {/* Stars */}
                                <div className="flex flex-row gap-1">
                                    {[...Array(5)].map((_, key) => (
                                        <FaStar key={key} className={key < testimony.rating ? "text-amber-400" : "text-gray-300"} />
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="font-inter text-slate-700 leading-relaxed relative z-10">{testimony.testimonial}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;
