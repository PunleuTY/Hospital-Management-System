import React from "react";

export default function Input({
  className = "",
  type = "text",
  placeholder,
  ...props
}) {
  return (
    <input
      type={type}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black placeholder-gray-400 ${className}`}
      placeholder={placeholder}
      {...props}
    />
  );
}
