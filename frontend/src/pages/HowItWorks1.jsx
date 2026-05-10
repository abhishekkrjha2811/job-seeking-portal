import React, { useState } from "react";
import CTAButton from "../components/common/Button";
import { FaArrowRight } from "react-icons/fa";
import { postJobSteps, applyJobSteps } from "../data/HowItWorks";
import StepCards from "../components/core/HowItWorks/StepCards";

const HowItWorks1 = () => {
    const [state, setState] = useState("Posting");

    return (
        <div className="flex flex-col w-full items-center bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 min-h-screen">
            {/* Hero Section */}
            <div className="flex w-full flex-col md:flex-row justify-center gap-7">
                <div className="flex w-full h-[450px] md:h-[550px] bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 flex-col justify-center items-center px-6 md:px-16 gap-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">How NexWork Works?</h1>

                    <p className="text-xl md:text-2xl text-white/95 max-w-[700px] leading-relaxed">
                        Whether you're here to post or apply, NexWork connects talent within your university community.
                    </p>

                    <CTAButton active={true} linkto="/signup">
                        <div className="flex flex-row items-center gap-3 px-8 py-2 justify-center">
                            <span className="text-lg font-semibold">Join Now</span>
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                </div>
            </div>

            {/* Toggle Button */}
            <div className="bg-white shadow-lg rounded-2xl flex flex-wrap items-center p-1.5 mt-14 w-fit border border-emerald-200">
                {[
                    { label: "Posting a Job", value: "Posting" },
                    { label: "Applying for a Job", value: "Applying" },
                ].map((tab) => (
                    <button
                        key={tab.value}
                        type="button"
                        onClick={() => setState(tab.value)}
                        className={`py-3 px-8 rounded-xl transition-all duration-300 font-semibold ${
                            state === tab.value 
                                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md" 
                                : "bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Steps for posting and applying to a job */}
            {state === "Posting" && <StepCards steps={postJobSteps} bgColor="bg-emerald-400" borderColor="border-emerald-300" />}

            {state === "Applying" && <StepCards steps={applyJobSteps} bgColor="bg-teal-400" borderColor="border-teal-300" />}

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-6 text-white mt-20 mb-16 items-center">
                <CTAButton active={true} linkto={"/post-job"}>
                    <span className="px-6 py-2 text-lg font-semibold">Post a Job</span>
                </CTAButton>
                <CTAButton active={false} linkto={"/all-jobs"}>
                    <span className="px-6 py-2 text-lg font-semibold">Browse Jobs</span>
                </CTAButton>
            </div>
        </div>
    );
};

export default HowItWorks1;
