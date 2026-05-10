import React from "react";
import HeroSection from "../components/core/home/HeroSection";
import Categories from "../components/core/home/Categories";
import Testimonials from "../components/core/home/Testimonials";
import MadeOnNexwork from "../components/core/home/MadeOnNexwork";

const Home = () => {
    return (
        <div className="flex flex-col bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 w-full">
            <HeroSection />
            <Categories />
            <Testimonials />
            <MadeOnNexwork />
        </div>
    );
};

export default Home;
