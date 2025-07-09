import { FaPlus } from "react-icons/fa6";

export default function Button({
  content, // For content to display in the button
  className, // more styling such as w-full for 100% width
  isAddIcon = true, // If this is true, it will auto include + icon as prefix
  onClick, // Onclick function to handle click events
}) {
  return (
    <button
      onClick={(e) => onClick && onClick(e)} // Pass the event object to the onClick function
      className={`${className} cursor-pointer text-[16px] flex items-center justify-center gap-5 rounded-md bg-(--color-blue) hover:bg-blue-600 text-white px-3 py-2 `}
    >
      {isAddIcon && <FaPlus className="text-[14px]" />}
      <p>{content}</p>
    </button>
  );
}