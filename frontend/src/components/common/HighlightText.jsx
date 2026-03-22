import React from "react";

const HighlightText = ({ text }) => {
    return (
        <span className="font-bold bg-gradient-to-b from-green-800 via-green-600 to-green-300 bg-clip-text text-transparent">
            {" "}
            {`${text}`}{" "}
        </span>
    );
};

export default HighlightText;
