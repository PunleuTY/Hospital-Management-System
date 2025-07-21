import React, { useState, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";

const Dropdown = ({
  options = [],
  defaultLabel = "Select",
  onSelect,
  className,
  reset,
  onClick,
  value, // Add value prop to control the dropdown
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || null);

  // Update selected when value prop changes
  useEffect(() => {
    setSelected(value || null);
  }, [value]);

  // Reset the dropdown when reset value changes
  useEffect(() => {
    if (reset) {
      setSelected(null);
      setIsOpen(false);
    }
  }, [reset]);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsOpen(!isOpen);
    if (onClick) onClick(e); // Call the passed onClick handler if it exists
  };

  return (
    <div
      className={`relative inline-block w-60 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={handleDropdownClick}
        className={`w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-black tween ${
          selected ? "text-gray-800" : "text-gray-400"
        }`}
      >
        <span>{selected || value || defaultLabel}</span>
        <HiChevronDown className="w-5 h-5 text-gray-600" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling when selecting an option
                handleSelect(option);
              }}
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
