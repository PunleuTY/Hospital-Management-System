import { useState, useEffect, useRef } from "react";
import Hospital from "@/assets/hospital.png";
import { FiHome } from "react-icons/fi"; // Home
import { FiUsers } from "react-icons/fi"; // Patient
import { MdOutlineDateRange } from "react-icons/md"; // Appointment
import { FiCreditCard } from "react-icons/fi"; // Billing
import { FiUserCheck } from "react-icons/fi";
import { FiFileText } from "react-icons/fi"; // Medical Record
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const navigateContent = [
  {
    icon: FiHome,
    label: "Dashboard",
    selected: true,
    navigateTo: "/dashboard",
  },
  {
    icon: FiUsers,
    label: "Patients",
    selected: false,
    navigateTo: "/dashboard/patient",
  },
  {
    icon: MdOutlineDateRange,
    label: "Appointments",
    selected: false,
    navigateTo: "/dashboard/appointments",
  },
  {
    icon: FiCreditCard,
    label: "Billing",
    selected: false,
    navigateTo: "/dashboard/billing",
  },
  {
    icon: FiUserCheck,
    label: "Staff",
    selected: false,
    navigateTo: "/dashboard/staff",
  },
  {
    icon: FiFileText,
    label: "Medical Record",
    selected: false,
    navigateTo: "/dashboard/records",
  },
  {
    icon: IoMdPersonAdd,
    label: "Add User",
    selected: false,
    navigateTo: "/dashboard/staff/add",
  },
];

export default function Navigations({ sideBarOpen, setSideBarOpen }) {
  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState(navigateContent);
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const handleSelect = (index) => {
    if (width <= 768) {
      setSideBarOpen(false);
    }
    const updatedContent = content.map((item, idx) => ({
      ...item,
      selected: idx === index,
    }));
    setContent(updatedContent);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        width <= 768 &&
        sideBarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSideBarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sideBarOpen, width]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth); // Update width state on resize
    };

    window.addEventListener("resize", handleResize); // Add resize event listener

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener
    };
  }, []);

  useEffect(() => {
    if (width <= 768) {
      setSideBarOpen(false); // Close sidebar on small screens
    } else {
      setSideBarOpen(true); // Open sidebar on larger screens
    }
  }, [width]);

  return (
    <>
      {sideBarOpen && (
        <div
          className={`w-[300px] border border-(--color-light-gray) overflow-hidden ${
            width <= 768
              ? "fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50"
              : ""
          }`}
          ref={sidebarRef}
        >
          <div className="flex gap-3 items-center py-4 pl-3 border border-b-(--color-light-gray) w-full">
            <img
              src={Hospital}
              alt="Hospital Logo"
              className="rounded-md w-[40px] h-[40px]"
            />
            <div className="flex flex-col">
              <p className="font-semibold text-[18px]">HMS</p>
              <p className="text-gray-600 text-[14px]">Hospital Management</p>
            </div>
          </div>
          <div className="h-full pt-10 pl-6 pr-5 text-[15px] text-(--color-gray)">
            <div className="mb-3">NAVIGATION</div>
            <ul className="h-full flex flex-col gap-2">
              {content.map((content, idx) => {
                const Icon = content.icon;
                return (
                  <li
                    key={idx}
                    className={`${
                      content.selected
                        ? "bg-(--color-active-blue) text-(--color-blue)"
                        : ""
                    } flex gap-3 items-center cursor-pointer hover:bg-(--color-hover-blue) hover:text-(--color-blue) py-1 px-2 rounded-sm`}
                    onClick={() => {
                      handleSelect(idx);
                      navigate(content.navigateTo);
                    }}
                  >
                    <Icon className="text-[18px]" />
                    <span className="text-[16px]">{content.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
