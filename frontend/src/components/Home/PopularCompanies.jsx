import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Bangalore, India",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 5 Mumbai, India",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 15 Hyderabad, India",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];

  return (
    <div className="companies bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        {/* Title */}
        <h3 className=" font-bold text-center text-gray-800 mb-12">
          Top Companies
        </h3>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {companies.map((element) => (
            <div
              className="card bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300"
              key={element.id}
            >
              <div className="icon text-5xl text-blue-500 mb-4">
                {element.icon}
              </div>
              <div className="text mb-4">
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  {element.title}
                </p>
                <p className="text-gray-600">{element.location}</p>
              </div>
              <p className="bg-blue-100 text-blue-600 border border-blue-500 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-200 transition duration-300">
  Open Positions: {element.openPositions}
</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;