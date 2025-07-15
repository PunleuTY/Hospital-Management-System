import { useState, useEffect } from "react";
import { FiUsers } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import Button from "./common/Button.jsx";
import ModalWrapper from "./common/Modal-wrapper.jsx";
import AddAppointment from "./form/addAppointment.jsx";

// API imports
import {
  getUpcomingAppointments,
  getAllAppointments,
} from "../service/appointmentAPI.js";
import { getAllPatients } from "../service/patientAPI.js";
import { getAllBillings } from "../service/billingAPI.js";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    isLoading: true,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // Refresh data when modal closes (in case new appointment was added)
    fetchDashboardData();
  };
  const style = {
    infoCard: "border flex-1 p-3 py-5 rounded-md flex flex-col gap-2",
  };

  // ===== API FUNCTIONS =====
  const fetchDashboardData = async () => {
    try {
      setDashboardStats((prev) => ({ ...prev, isLoading: true }));

      // Fetch all data in parallel
      const [
        patientsResponse,
        appointmentsResponse,
        billingsResponse,
        upcomingResponse,
      ] = await Promise.all([
        getAllPatients(1, 1), // Just get metadata for total count
        getAllAppointments(1, 1), // Just get metadata for total count
        getAllBillings(1, 1000), // Get all billings to calculate total revenue
        getUpcomingAppointments(),
      ]);

      console.log("Dashboard API Responses:", {
        patients: patientsResponse,
        appointments: appointmentsResponse,
        billings: billingsResponse,
        upcoming: upcomingResponse,
      });

      // Calculate total revenue from all billings
      const totalRevenue =
        billingsResponse.data?.data.reduce((sum, bill) => {
          return sum + (bill.totalAmount || 0);
        }, 0) || 0;

      setDashboardStats({
        totalPatients: patientsResponse.data.meta?.total,
        totalAppointments: appointmentsResponse.data.meta?.total,
        totalRevenue: totalRevenue,
        isLoading: false,
      });

      setUpcomingAppointments(upcomingResponse.data || []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setDashboardStats((prev) => ({ ...prev, isLoading: false }));
      setUpcomingAppointments([]);
    }
  };

  const formatTime = (dateTimeString) => {
    if (!dateTimeString) {
      return "N/A";
    }
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // ===== EFFECTS =====
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const cardData = [
    {
      title: "Total Patients",
      value: dashboardStats.isLoading
        ? "Loading..."
        : dashboardStats.totalPatients.toLocaleString(),
      icon: FiUsers,
      color: {
        bg: "bg-(--color-bg-light-blue)",
        border: "border-(--color-blue)",
        text: "text-(--color-blue)",
        textDark: "text-(--color-dark-blue)",
      },
      info: "All registered patients",
    },
    {
      title: "Total Appointments",
      value: dashboardStats.isLoading
        ? "Loading..."
        : dashboardStats.totalAppointments.toLocaleString(),
      icon: MdOutlineDateRange,
      color: {
        bg: "bg-(--color-bg-light-yellow)",
        border: "border-(--color-yellow)",
        text: "text-(--color-yellow)",
        textDark: "text-(--color-dark-yellow)",
      },
      info: "All appointments",
    },
    {
      title: "Total Revenue",
      value: dashboardStats.isLoading
        ? "Loading..."
        : formatCurrency(dashboardStats.totalRevenue),
      icon: FaDollarSign,
      color: {
        bg: "bg-(--color-bg-light-green)",
        border: "border-(--color-green)",
        text: "text-(--color-green)",
        textDark: "text-(--color-dark-green)",
      },
      info: "All time revenue",
    },
  ];

  return (
    <div className="p-5 h-full flex flex-col gap-5 overflow-auto">
      <div className="flex flex-col md:flex-row gap-5 justify-between">
        {cardData.map((card, index) => {
          return (
            <InfoCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
              info={card.info}
              style={style}
            />
          );
        })}
      </div>
      <div className="flex-1 flex gap-3 rounded-md">
        <div className="flex-1 flex flex-col gap-3 p-3 border justify-between border-(--color-light-gray) rounded-md">
          <div className="flex items-center gap-3">
            <FaRegClock className="text-(--color-blue) text-[20px]" />
            <p className="text-[22px] font-bold">Upcoming Appointments</p>
          </div>
          <div
            className="flex-1 flex flex-col overflow-y-auto gap-3"
            style={{ maxHeight: "300px" }} // Set a fixed height for the scrollable area
          >
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment, index) => (
                <AppointmentCard key={index} data={appointment} />
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  No upcoming appointments
                </p>
              </div>
            )}
          </div>
          <Button
            content={"Add Appointment"}
            className={"w-full"}
            onClick={openModal}
          />
          <ModalWrapper
            isOpen={isModalOpen}
            onClose={closeModal}
            size="md" // Options: sm, md, lg, xl, full
            showCloseButton={true}
            closeOnBackdropClick={true}
            closeOnEscape={true}
          >
            <AddAppointment onClose={closeModal} />
          </ModalWrapper>
        </div>
      </div>
    </div>
  );
}

const InfoCard = ({ title, value, icon: Icon, color, info, style }) => {
  return (
    <div className={`${style.infoCard} ${color.bg} ${color.border}`}>
      <div className={`flex justify-between items-center ${color.text}`}>
        <p>{title}</p>
        <Icon />
      </div>
      <div>
        <p className={`text-[22px] font-bold ${color.textDark}`}>{value}</p>
        <p className={`${color.text} text-[14px]`}>{info}</p>
      </div>
    </div>
  );
};

const AppointmentCard = ({ data }) => {
  const formatTime = (dateTimeString) => {
    if (!dateTimeString) {
      return "N/A";
    }
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const patientName = data.patient
    ? `${data.patient.firstName} ${data.patient.lastName}`
    : "Unknown Patient";

  const doctorName = data.doctor
    ? `Dr. ${data.doctor.firstName} ${data.doctor.lastName}`
    : "Unknown Doctor";

  return (
    <div className="flex flex-col gap-2 p-2 rounded-md bg-gray-100">
      <div className="flex justify-between">
        <p className="text-[18px]">{patientName}</p>
        <p className="text-(--color-blue)">{formatTime(data.dateTime)}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-(--color-gray)">{doctorName}</p>
        <div className="border border-(--color-light-gray) rounded-lg text-[12px] font-bold px-2 flex items-center justify-center">
          {data.purpose || "General Consultation"}
        </div>
      </div>
    </div>
  );
};
