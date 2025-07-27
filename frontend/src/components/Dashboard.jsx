import { useState, useEffect } from "react";

// Common components
import Button from "./common/Button.jsx";
import ModalWrapper from "./common/Modal-wrapper.jsx";
import AddAppointment from "./form/addAppointment.jsx";

// Icons
import { FiUsers } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";

// API imports
import {
  getUpcomingAppointments,
  getAllAppointments,
} from "../service/appointmentAPI.js";
import { getAllPatients } from "../service/patientAPI.js";
import { summarizeBilling } from "../service/billingAPI.js";

export default function Dashboard() {
  // State Management
  // ---------------------------------------------------------------------------

  // Controls visibility of Add Appointment modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Stores upcoming appointments data
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  // Stores dashboard statistics
  const [dashboardStats, setDashboardStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    isLoading: true,
  });

  // Constants
  // ---------------------------------------------------------------------------

  // Styles for info cards
  const style = {
    infoCard: "border flex-1 p-3 py-5 rounded-md flex flex-col gap-2",
  };

  // Helper Functions
  // ---------------------------------------------------------------------------

  // Formats a date-time string to a local time string (HH:MM)
  const formatTime = (dateTimeString) => {
    if (!dateTimeString) {
      return "N/A";
    }
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Formats a number as a USD currency string
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Data for dashboard info cards
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

  // API Functions
  // ---------------------------------------------------------------------------

  // Fetches all dashboard data (patients, appointments, billing summary, upcoming appointments)
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
        getAllPatients(1, 1), // Get metadata for total count
        getAllAppointments(1, 1), // Get metadata for total count
        summarizeBilling(), // Get all billings to calculate total revenue
        getUpcomingAppointments(),
      ]);

      console.log("Dashboard API Responses:", {
        patients: patientsResponse,
        appointments: appointmentsResponse,
        billings: billingsResponse,
        upcoming: upcomingResponse,
      });

      // Update dashboard statistics
      setDashboardStats({
        totalPatients: patientsResponse.data.meta?.total,
        totalAppointments: appointmentsResponse.data.meta?.total,
        totalRevenue: billingsResponse.data.totalPaid,
        isLoading: false,
      });
      // Update upcoming appointments
      console.log("Upcoming:", upcomingResponse.data.data);
      setUpcomingAppointments(upcomingResponse.data.data || []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setDashboardStats((prev) => ({ ...prev, isLoading: false }));
      setUpcomingAppointments([]);
    }
  };

  // Event Handlers
  // ---------------------------------------------------------------------------

  // Opens the Add Appointment modal
  const openModal = () => setIsModalOpen(true);
  // Closes the Add Appointment modal and refetches dashboard data
  const closeModal = () => {
    setIsModalOpen(false);
    fetchDashboardData();
  };

  // Effects
  // ---------------------------------------------------------------------------

  // Fetches dashboard data on initial render
  useEffect(() => {
    fetchDashboardData();
  }, []); // Empty dependency array means this runs once on mount

  // Logs upcoming appointments when they change (for debugging)
  useEffect(() => {
    console.log(upcomingAppointments);
  }, [upcomingAppointments]);

  // Render Logic
  // ---------------------------------------------------------------------------

  return (
    <div className="p-5 h-full flex flex-col gap-5 overflow-auto">
      {/* Info Cards Section */}
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

      {/* Upcoming Appointments Section */}
      <div className="flex-1 flex gap-3 rounded-md">
        <div className="flex-1 flex flex-col gap-3 p-3 border justify-between border-(--color-light-gray) rounded-md">
          <div className="flex items-center gap-3">
            <FaRegClock className="text-(--color-blue) text-[20px]" />
            <p className="text-[22px] font-bold">Upcoming Appointments</p>
          </div>
          <div
            className="flex-1 flex flex-col overflow-y-auto gap-3"
            style={{ maxHeight: "300px" }} // Fixed height for scrollable area
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
          {/* Add Appointment Button */}
          <Button
            content={"Add Appointment"}
            className={"w-full"}
            onClick={openModal}
          />
          {/* Add Appointment Modal */}
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

// InfoCard Component: Displays a single dashboard statistic
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

// AppointmentCard Component: Displays details of an upcoming appointment
const AppointmentCard = ({ data }) => {
  // Formats a date-time string to a local time string (HH:MM)
  const formatTime = (dateTimeString) => {
    if (!dateTimeString) {
      return "N/A";
    }
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Get patient name or default
  const patientName = data.patient
    ? `${data.patient.firstName} ${data.patient.lastName}`
    : "Unknown Patient";

  // Get doctor name or default
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
