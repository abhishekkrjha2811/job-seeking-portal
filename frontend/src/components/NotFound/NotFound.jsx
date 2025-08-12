import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4 text-white">
      <div className="max-w-md text-center">
        {/* Not Found Image */}
        <img
          src="/notfound.png"
          alt="Page Not Found"
          className="w-60 h-60 mx-auto mb-6 animate-bounce"
        />

        {/* Message */}
        <h1 className=" font-extrabold tracking-tight mb-4 drop-shadow-md">
          404
        </h1>
        <h2 className=" font-semibold mb-2">
          Oops! Page Not Found
        </h2>
        <p className="text-sm md:text-base text-gray-100 mb-8">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        {/* Return to Home Button */}
        <Link
          to="/"
          className="inline-block bg-white text-purple-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          ⬅ Return to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
