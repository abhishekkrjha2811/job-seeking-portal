import React, { useState } from "react";
import CTAButton from "../components/common/Button";
import { FaArrowRight } from "react-icons/fa";
import { postJobSteps, applyJobSteps } from "../data/HowItWorks";

const HowItWorks = () => {
    const [state, setState] = useState("Posting");

    return (
        <div className="flex flex-col w-full items-center">
            {/* <--------------------Hero Section-----------------------> */}
            <div className="w-full flex flex-row gap-7 justify-evenly">
                <div className="w-full bg-cover bg-center flex flex-col justify-center items-start px-5 bg-[url('/assets/hero-bg2.jpg')] h-100 gap-10">
                    <h1 className="text-5xl font-extrabold text-white">How Nexwork Workslll ?</h1>
                    <h2 className="text-2xl text-white w-200">
                        Whether you're here to post or apply, NexWork connects talent within your university community.
                    </h2>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className="gap-4 flex flex-row items-center w-[150px] justify-center">
                            <span>Join Nowllllllll</span>
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                </div>
                {/* <img src="/assets/Freelancer-bro.png" alt="" className="w-[30%]" /> */}
            </div>

            {/* <--------------------Toggle Button----------------------> */}
            <div className="bg-blue-300 rounded-2xl w-fit flex flex-row justify-between p-1 mt-10 text-white">
                <button
                    className={`py-2 px-6  rounded-2xl ${state === "Posting" ? "bg-blue-400" : "bg-blue-300"}`}
                    onClick={() => setState("Posting")}
                    type="button"
                >
                    Posting a Job
                </button>
                <button
                    className={`py-2 px-6  rounded-2xl ${state === "Applying" ? "bg-blue-400" : "bg-blue-300"}`}
                    onClick={() => setState("Applying")}
                    type="button"
                >
                    Applying for a Job
                </button>
            </div>

            {/* <--------------------Steps for posting a job------------> */}
            {state === "Posting" && (
                <div className=" flex flex-row w-300 mt-20 justify-evenly relative">
                    {postJobSteps.map((step, index) => (
                        <div
                            key={index}
                            className="h-80 w-60  transition-all duration-300 hover:scale-110 rounded-lg p-3 flex flex-col items-center justify-start text-black relative border-2 border-gray-500"
                        >
                            <h3 className="font-inter font-bold text-2xl mt-4 text-center h-30 w-28">{step.title}</h3>
                            <p className="font-inter text-lg font-medium text-center">{step.description}</p>
                            <span className="absolute left-[20px] top-[10px] rounded-full px-2 font-extrabold ring-2 ">{index + 1}</span>
                            <div className="w-full h-full absolute blur-md bg-blue-200 opacity-40 top-[-5px]"></div>
                        </div>
                    ))}
                </div>
            )}

            {/* <--------------------Steps for applying to a job--------> */}
            {state === "Applying" && (
                <div className="flex flex-row w-300 mt-20 justify-evenly relativ">
                    {applyJobSteps.map((step, index) => (
                        <div
                            key={index}
                            className="h-80 w-60  transition-all duration-300 hover:scale-110 rounded-lg p-3 flex flex-col items-center justify-start text-black relative border-2 border-pure-greys-600"
                        >
                            <h3 className="font-inter font-bold text-2xl mt-4 text-center h-30 w-28">{step.title}</h3>
                            <p className="font-inter text-lg font-medium text-center">{step.description}</p>
                            <span className="absolute left-[20px] top-[10px] rounded-full px-2 font-extrabold ring-2 ">{index + 1}</span>
                            <div className="w-full h-full absolute blur-md bg-blue-400 opacity-40 top-[-5px]"></div>
                        </div>
                    ))}
                </div>
            )}

            {/* <--------------------CTA Buttons------------------------> */}
            <div className="flex flex-row gap-4 text-white mt-14 mb-10">
                <CTAButton active={true} linkto={"/"}>
                    Post a Job
                </CTAButton>
                <CTAButton active={false} linkto={"/"}>
                    Browse Jobs
                </CTAButton>
            </div>
        </div>
    );
};

export default HowItWorks;
