import React, { useRef, useState } from "react";
import { IoIosSearch, IoIosArrowUp, IoIosArrowDown, IoIosCheckmark } from "react-icons/io";
import useOutsideClick from "../../../hooks/useOutsideClick";

const SearchAndFilter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Newest");
    const dropdownRef = useRef(null);

    useOutsideClick(dropdownRef, () => setIsOpen(false));
    const options = ["Newest", "Oldest", "Highest Pay"];
    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };
    return (
        <div className="flex w-full justify-evenly px-5 border-b-1 border-blue-300 py-5 relative">
            <div className="w-[73%] relative">
                <input
                    type="text"
                    placeholder="Search By Job title or Skill"
                    className="px-10 py-2 text-gray-500 w-full border border-gray-400 rounded-lg"
                />
                <IoIosSearch className="absolute top-4 left-3 " />
            </div>
            <div className="w-[13%] flex flex-col relative  rounded-lg z-20" ref={dropdownRef}>
                <div className="w-full border border-gray-400 p-2 relative text-center rounded-lg" onClick={() => setIsOpen(!isOpen)}>
                    {selected}
                    {isOpen ? <IoIosArrowUp className="absolute top-4 right-7" /> : <IoIosArrowDown className="absolute top-4 right-7" />}
                </div>
                {isOpen && (
                    <div className="flex flex-col items-center w-full absolute top-14 rounded-lg p-2 border border-gray-400 z-10">
                        {options.map((option) => (
                            <div
                                key={option}
                                className={`p-1 w-full rounded-lg flex items-center justify-center relative ${
                                    selected === option ? "bg-[#89cff0]" : "bg-white"
                                }`}
                                onClick={() => handleSelect(option)}
                            >
                                {selected === option && (
                                    <span className="absolute left-7">
                                        <IoIosCheckmark fontSize={30} />
                                    </span>
                                )}
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="w-[8%] h-fit text-center p-3 bg-[#0096ff] hover:bg-blue-100 text-white rounded-lg text-sm">Search</div>
        </div>
    );
};

export default SearchAndFilter;
