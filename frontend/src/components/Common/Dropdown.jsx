import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

const Dropdown = ({
  options = [],
  defaultLabel = "Select",
  onSelect,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-60">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black tween ${
          selected ? "text-gray-800" : "text-gray-400"
        }`}
      >
        <span>{selected || defaultLabel}</span>
        <HiChevronDown className="w-5 h-5 text-gray-600" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
