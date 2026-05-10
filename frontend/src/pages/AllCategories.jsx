import React from "react";
import { AllCategoriesIcons } from "../data/Categories/AllCategories";
import { Link } from "react-router-dom";

const AllCategories = () => {
    return (
        <div className="flex flex-col w-full items-center mt-16">
            <h1 className="font-bold text-3xl font-sans text-indigo-800">Browse By Category</h1>
            <p className="text-gray-700 mt-5">Explore opportunities across various fields and find projects that match your skills.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mt-10 px-4">
                {AllCategoriesIcons.map((category, index) => (
                    <Link
                        className="rounded-lg flex flex-row items-center gap-5 p-4 transition-all duration-300 group hover:scale-103 hover:shadow-xl hover:shadow-blue-400"
                        style={{ backgroundColor: category.color }}
                        key={index}
                        to={`/category/${encodeURIComponent(category.name)}`}
                    >
                        <div className="rounded-lg p-4 bg-cyan-600 w-fit">
                            <img src={category.icon} className="w-8 invert" />
                        </div>
                        <div className="">
                            <h2 className="text-xl text-white group-hover:text-cyan-200">{category.name}</h2>
                            <p className="text-sm text-white">Explore Opportunities</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllCategories;
