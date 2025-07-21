import React, { useState, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
import { createPortal } from "react-dom";

const Dropdown = ({
  options = [],
  defaultLabel = "Select",
  onSelect,
  className = "",
  reset,
  selected,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLabel, setCurrentLabel] = useState(defaultLabel);

  // Sync label when `selected` changes
  useEffect(() => {
    if (selected && options.length) {
      const opt = options.find(
        (o) => o.value.toString() === selected.toString()
      );
      if (opt) setCurrentLabel(opt.label);
    }
  }, [selected, options, defaultLabel]);

  useEffect(() => {
    if (reset) {
      setCurrentLabel(defaultLabel);
      setIsOpen(false);
    }
  }, [reset, defaultLabel]);

  const handleSelect = (option) => {
    setCurrentLabel(option.label);
    onSelect(option.value);
    setIsOpen(false);
  };

  // Render the dropdown button + (optionally) the portal’ed menu
  return (
    <>
      <div className={`relative inline-block w-full ${className}`}>
        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className={`w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
            currentLabel !== defaultLabel ? "text-gray-800" : "text-gray-400"
          }`}
        >
          <span className="truncate">{currentLabel}</span>
          <HiChevronDown className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {isOpen &&
        createPortal(
          <ul
            className="absolute top-[0px] left-[0px] z-50 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
            style={{
              // position the portal’d menu right under the button
              position: "absolute",
              // find the button’s DOM node to align with it
              transform: (() => {
                const btn = document.querySelector(`.${className} button`);
                if (!btn) return "";
                const { bottom, left, width } = btn.getBoundingClientRect();
                return `translate(${left}px, ${bottom}px)`;
              })(),
            }}
          >
            {options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {option.label}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </>
  );
};

export default Dropdown;
