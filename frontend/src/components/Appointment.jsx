// React hooks
import { useState, useEffect } from "react";

// Common components
import Button from "./common/Button.jsx";
import Input from "./common/Input.jsx";
import PageBlurWrapper from "./common/Blur-wrapper.jsx";
import ModalWrapper from "./common/Modal-wrapper.jsx";
import Dropdown from "./common/Dropdown.jsx";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./common/Table.jsx";
import Pagination from "./common/Pagination.jsx";

// Form components
import AddAppointment from "./form/addAppointment.jsx";
import AppointmentView from "./view/AppointmentView.jsx";

// Icons
import { TiDelete } from "react-icons/ti";

// API services
import {
  getAllAppointments,
  createAppointment,
} from "../service/appointmentAPI.js";
import { deleteAppointment as deleteAppointmentAPI } from "../service/appointmentAPI.js";
import patient from "../../../Backend/db/models/patient.js";

export default function Appointment() {
  // ===== STATE MANAGEMENT =====
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [appointments, setAppointments] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const itemsPerPage = 10;

  // ===== CONSTANTS =====
  const header = [
    "Id",
    "Patient",
    "Doctor",
    "Date",
    "Time",
    "Purpose",
    "Status",
    "Actions",
  ];

  const mockData = [
    {
      appointmentId: 1,
      purpose: "Annual Physical Examination",
      dateTime: "2025-07-15T09:00:00Z",
      status: "Scheduled",
      doctorId: 3,
      patientId: 1,
      lastModified: "2025-07-12T10:30:00Z",
    },
    {
      appointmentId: 2,
      purpose: "Follow-up Consultation",
      dateTime: "2025-07-15T10:30:00Z",
      status: "Completed",
      doctorId: 5,
      patientId: 2,
      lastModified: "2025-07-11T14:20:00Z",
    },
    {
      appointmentId: 3,
      purpose: "Blood Pressure Check",
      dateTime: "2025-07-15T11:15:00Z",
      status: "Scheduled",
      doctorId: 7,
      patientId: 3,
      lastModified: "2025-07-12T08:45:00Z",
    },
    {
      appointmentId: 4,
      purpose: "Diabetes Management",
      dateTime: "2025-07-15T14:00:00Z",
      status: "Completed",
      doctorId: 3,
      patientId: 4,
      lastModified: "2025-07-12T13:30:00Z",
    },
    {
      appointmentId: 5,
      purpose: "Skin Rash Examination",
      dateTime: "2025-07-16T09:30:00Z",
      status: "Scheduled",
      doctorId: 9,
      patientId: 5,
      lastModified: "2025-07-12T16:10:00Z",
    },
    {
      appointmentId: 6,
      purpose: "Chest Pain Consultation",
      dateTime: "2025-07-16T10:45:00Z",
      status: "Cancelled",
      doctorId: 5,
      patientId: 6,
      lastModified: "2025-07-11T09:15:00Z",
    },
    {
      appointmentId: 7,
      purpose: "Vaccination",
      dateTime: "2025-07-16T11:30:00Z",
      status: "Completed",
      doctorId: 7,
      patientId: 7,
      lastModified: "2025-07-11T11:45:00Z",
    },
    {
      appointmentId: 8,
      purpose: "Pregnancy Check-up",
      dateTime: "2025-07-16T14:15:00Z",
      status: "Scheduled",
      doctorId: 11,
      patientId: 8,
      lastModified: "2025-07-12T12:20:00Z",
    },
  ];

  // ===== UTILITY FUNCTIONS =====
  const extractDateTime = (dateTimeStr) => {
    const dateObj = new Date(dateTimeStr);

    const date = dateObj.toISOString().split("T")[0]; // "2025-07-16"
    const time = dateObj.toISOString().split("T")[1].split("Z")[0]; // "14:15:00"

    return { date, time };
  };

  // ===== API FUNCTIONS =====
  const fetchAllAppointment = async (page = 1, limit = 10) => {
    try {
      const response = await getAllAppointments(page, limit);
      setAppointments(response.data.data);
      setMetaData(response.data.meta);
    } catch (err) {
      console.error("Failed to fetch appointments:", err.message);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await deleteAppointmentAPI(id);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Failed to delete appointment:", err.message);
    }
  };

  // ===== EVENT HANDLERS =====
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openViewModal = (record) => {
    console.log("Opening view modal with record:", record);
    setSelectedRecord(record);
    setIsViewModalOpen(true);
    console.log("Modal state set to:", true);
  };

  const closeViewModal = () => {
    setSelectedRecord(null);
    setIsViewModalOpen(false);
  };

  const handleAddAppointment = async (formData) => {
    try {
      console.log("Creating appointment:", formData);
      const response = await createAppointment(formData);
      console.log("Appointment created successfully:", response);

      // Refresh the appointment list
      fetchAllAppointment(currentPage, itemsPerPage);

      // Close the modal
      closeModal();
    } catch (error) {
      console.error("Failed to create appointment:", error);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAllAppointment(page, itemsPerPage);
  };

  // ===== EFFECTS =====
  useEffect(() => {
    fetchAllAppointment(currentPage, itemsPerPage);
  }, [currentPage]);

  // ===== RENDER =====
  return (
    <div className="h-full overflow-auto p-3">
      {/* Main content with blur effect when modal is open */}
      <PageBlurWrapper isBlurred={isModalOpen || isViewModalOpen}>
        <div className="w-full flex flex-col gap-3 px-1">
          {/* Header section */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Appointments</h1>
            <Button content={"Book Appointment"} onClick={openModal} />
          </div>

          {/* Filters section */}
          <div className="flex gap-4">
            <div className="relative w-40 cursor-pointer">
              <Input
                className="cursor-pointer"
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
            <div className="relative z-11">
              <Dropdown
                options={["All", "Pending", "Confirmed", "Cancelled"]}
                defaultLabel="Filter by Status"
                value={filterStatus}
                onSelect={(option) => setFilterStatus(option)}
              />
            </div>
          </div>

          {/* Table section - Scrollable container with hidden scrollbar */}
          <div
            className="overflow-x-auto scrollbar-hide rounded-lg"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <Table className="min-w-[900px] w-full">
              {/* Table header */}
              <TableHeader>
                <TableRow>
                  {header.map((h, idx) => (
                    <TableHead
                      key={idx}
                      className="text-xs whitespace-nowrap px-4 py-3 min-w-[100px]"
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              {/* Table body */}
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow
                    key={appointment.appointmentId}
                    className="cursor-pointer hover:bg-gray-50 transition-colors border border-solid"
                    onClick={() => openViewModal(appointment)}
                  >
                    <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[80px]">
                      {appointment.appointmentId}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[150px]">
                      {appointment.patientId}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[150px]">
                      {appointment.doctorId}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[120px]">
                      {extractDateTime(appointment.dateTime).date}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[80px]">
                      {extractDateTime(appointment.dateTime).time}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[80px]">
                      {appointment.purpose}
                    </TableCell>
                    <TableCell
                      className="text-xs px-4 py-3 max-w-[140px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Dropdown
                        className="w-max z-10"
                        options={["Pending", "Confirmed", "Cancelled"]}
                        value={appointment.status}
                        defaultLabel={appointment.status}
                        onClick={(e) => e.stopPropagation()}
                        onSelect={(value) =>
                          handleStatusChange(appointment.appointmentId, value)
                        }
                      />
                    </TableCell>
                    <TableCell
                      className="text-xs px-4 py-3 whitespace-nowrap max-w-[80px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() =>
                          deleteAppointment(appointment.appointmentId)
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <TiDelete className="w-6 h-6 cursor-pointer" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={metaData.totalPages || 1}
            totalItems={metaData.total || 0}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </PageBlurWrapper>

      {/* Add Appointment Modal */}
      <ModalWrapper
        isOpen={isModalOpen}
        onClose={closeModal}
        size="md"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        <AddAppointment
          onClose={closeModal}
          onAddAppointment={handleAddAppointment}
        />
      </ModalWrapper>

      {/* View Appointment Details Modal */}
      <ModalWrapper
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        size="lg"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        {selectedRecord && <AppointmentView data={selectedRecord} />}
      </ModalWrapper>

      {/* Global CSS to hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
          height: 0;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}
