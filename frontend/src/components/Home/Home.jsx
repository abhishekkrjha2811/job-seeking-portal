import React, { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
import "../../css/Home.css";

const Home = () => {
  const { isAuthorized } = useContext(Context);
  
  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }
  
  return (
    <main className="home-page">
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      <PopularCompanies />
    </main>
  );
};

export default Home;
