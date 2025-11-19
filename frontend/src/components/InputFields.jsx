// InputBox.js
import React from "react";

const InputBox = ({ label, type, name, value, onChange}) => {
  return (
    <div className=" flex flex-col gap-1">
      <p className="text-white text-lg font-semibold font-Montserrat">
        {label}
      </p>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className="shadow-md rounded-lg px-4 py-2  focus:outline-none border-b border-white text-white font-semibold"
      />
    </div>
  );
};

export default InputBox;