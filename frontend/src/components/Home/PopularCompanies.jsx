import React from "react";
import { FaMicrosoft, FaApple, FaMapMarkerAlt } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import '../../css/PopularCompanies.css';

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Bangalore, India",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Mumbai, India",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Hyderabad, India",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];

  return (
    <section className="popular-companies-section">
      <h2 className="companies-title">Top Companies</h2>
      <div className="companies-cards">
        {companies.map((company) => (
          <div className="company-card" key={company.id}>
            <div className="company-icon">{company.icon}</div>
            <div className="company-content">
              <h3 className="company-title">{company.title}</h3>
              <p className="company-location">
                <FaMapMarkerAlt />
                {company.location}
              </p>
              <span className="company-positions">
                {company.openPositions} Open Positions
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCompanies;