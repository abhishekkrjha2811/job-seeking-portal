import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { jobs, categories } from "../data/Categories/Categories";
import SearchAndFilter from "../components/core/Categories/SearchAndFilter";
import JobCards from "../components/common/JobCards";

const Category = () => {
    const { categoryName } = useParams();
    const decodedCategoryName = decodeURIComponent(categoryName);
    const category = categories.find((cat) => cat.name === decodedCategoryName);

    return (
        <div className="w-full min-h-screen flex flex-col items-center pt-14 ">
            {/*Hero Section*/}
            <div className="bg-blue-5 flex w-full h-fit px-10 py-7 items-center justify-between">
                <div className="w-fit flex flex-col gap-5">
                    <h1 className="text-5xl text-indigo-900 font-bold font-inter">{category.name}</h1>
                    <p className="text-xl">{category.description}</p>
                </div>
                <div className="h-80 w-[50%] rounded-lg overflow-hidden shadow-xl shadow-gray-600">
                    <img src={category.image} alt="" className="w-full" />
                </div>
            </div>
            {/*Search and Filter*/}
            <SearchAndFilter />
            {/*Job Cards*/}
            <div className="w-full flex flex-col items-center gap-7 mt-10">
                <JobCards jobs={jobs} />
            </div>
        </div>
    );
};

export default Category;
