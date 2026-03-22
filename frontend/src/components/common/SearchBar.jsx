import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
    return (
        <div className="relative">
            <input
                placeholder="Search"
                className="bg-white border-1 border-richblack-400 rounded-[7px] w-[200px] h-[30px] p-3 text-black"
            ></input>
            <IoSearch className="absolute top-[6px] left-[170px] text-black" />
        </div>
    );
};

export default SearchBar;
