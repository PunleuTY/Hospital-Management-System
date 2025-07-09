import { FaRegUser } from "react-icons/fa6";
import { FiSidebar } from "react-icons/fi";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

//TODO: Get username and role

const Header = ({ setSideBar }) => {
  const [dropOpen, setDropOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full border border-(--color-light-gray) h-[60px] px-7 justify-between flex items-center border-l-0">
      <FiSidebar
        className="text-(--color-gray) cursor-pointer"
        onClick={() => setSideBar((prev) => !prev)}
      />
      <div className=" flex gap-5 items-center">
        <div className="flex gap-3 items-center cursor-pointer hover:bg-gray-100 hover:rounded-md px-2 py-1">
          <FaRegUser className="text-(--color-gray)" />
          <div>
            <p className="text-1xl">John Doe</p>
            <p className="text-[14px]">Adminstrator</p>
          </div>
        </div>
        <FiLogOut
          onClick={() => navigate("/")}
          className=" text-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
