import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Jobs",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <div className="heroSection bg-gradient-to-r from-blue-500 to-green-500 text-white py-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        {/* Title Section */}
        <div className="title md:w-1/2 text-center md:text-left">
          <h1 className=" font-bold mb-6">
            Find a job that suits
          </h1>
          <h1 className=" font-bold mb-6 ">
            your interests and skills
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Discover career opportunities tailored to your unique strengths.
            Whether you're starting out or seeking a new path, find jobs that
            align with your passions, expertise, and goals. Explore thousands
            of listings, connect with top employers, and take control of your
            future by choosing a role that truly fits you.
          </p>
        </div>

        {/* Image Section */}
        <div className="image md:w-1/2 mt-8 md:mt-0">
          <img
            src="/heroS.jpg"
            alt="hero"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>

      {/* Details Section */}
      <div className="details grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12 px-6">
        {details.map((element) => (
          <div
            className="card bg-white text-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition duration-300"
            key={element.id}
          >
            <div className="icon text-4xl text-blue-500 mb-4">{element.icon}</div>
            <div className="content">
              <p className="text-2xl font-bold">{element.title}</p>
              <p className="text-gray-600">{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;