// ===== React Hooks =====
import { useState, useEffect } from "react";

// ===== Common Components =====
import Button from "./common/Button.jsx";
import PageBlurWrapper from "./common/Blur-wrapper.jsx";
import ModalWrapper from "./common/Modal-wrapper.jsx";
import EditAppointment from "./form/editAppointment.jsx";
import AddAppointment from "./form/addAppointment.jsx";
import AppointmentView from "./view/AppointmentView.jsx";
import Confirm from "./common/Confirm.jsx";
import Pagination from "./common/Pagination.jsx";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./common/Table.jsx";

// ===== Toast Utils =====
import { success, error } from "./utils/toast.js";

// ===== Icons =====
import { FiEdit } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";

// ===== API Services =====
import {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../service/appointmentAPI.js";

// ===== Main Component =====
export default function Appointment() {
  // ===== States =====
  const [appointments, setAppointments] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const itemsPerPage = 10;

  // ===== Table Header =====
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

  // ===== Utility =====
  const extractDateTime = (dateTimeStr) => {
    const dateObj = new Date(dateTimeStr);
    const date = dateObj.toISOString().split("T")[0];
    const time = dateObj.toISOString().split("T")[1].split("Z")[0];
    return { date, time };
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // ===== Modal Handlers =====
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (record) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedRecord(null);
    setIsEditModalOpen(false);
  };

  const openViewModal = (record) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedRecord(null);
    setIsViewModalOpen(false);
  };

  // ===== API Calls =====
  const fetchAllAppointment = async (page = 1, limit = 10) => {
    try {
      const response = await getAllAppointments(page, limit);
      setAppointments(response.data.data);
      setMetaData(response.data.meta);
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  };

  const handleAddAppointment = async (formData) => {
    try {
      //TODO: 1. call API to create appointment. Example: const response = await .....

      //TODO: 2. fetch all appointments again
      fetchAllAppointment(currentPage, itemsPerPage);
      success("Appointment created successfully!");
      closeModal();
    } catch (err) {
      console.error("Create error:", err);
      error("Failed to create appointment.");
    }
  };

  const handleUpdateAppointment = async (aptId, formData) => {
    try {
      //TODO: 1. call API to update appointment. Example: await .....

      //TODO: 2. fetch all appointments again, you can use the fetchAllAppointment function above, watch example at handleAddAppointment

      success("Appointment updated successfully");
      closeEditModal();
    } catch (err) {
      console.error("Update error:", err);
      error("Failed to update appointment");
    }
  };

  const handleDeleteAppointment = async (aptId) => {
    try {
      //TODO: 1. call API to delete appointment. Example: await .....

      //TODO: 2. fetch all appointments again, you can use the fetchAllAppointment function above

      success("Appointment deleted successfully");
      setShowConfirm(false);
    } catch (err) {
      console.error("Delete error:", err.message);
      error("Failed to delete appointment");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAllAppointment(page, itemsPerPage);
  };

  // ===== Effects =====
  useEffect(() => {
    fetchAllAppointment(currentPage, itemsPerPage);
  }, [currentPage]);

  // ===== UI Render =====
  return (
    <div className="h-full overflow-auto p-3">
      <PageBlurWrapper isBlurred={isModalOpen || isViewModalOpen}>
        <div className="w-full flex flex-col gap-3 px-1">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Appointments</h1>
            <Button content={"Add Appointment"} onClick={openModal} />
          </div>

          {/* Table */}
          <div className="overflow-x-auto scrollbar-hide rounded-lg">
            <Table className="min-w-[900px] w-full">
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

              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow
                    key={appointment.appointmentId}
                    onClick={() => openViewModal(appointment)}
                    className="cursor-pointer hover:bg-gray-50 transition-colors border border-solid"
                  >
                    <TableCell className="text-xs px-4 py-3 truncate max-w-[80px]">
                      {appointment.appointmentId}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 truncate max-w-[150px]">
                      {appointment.patientId}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 truncate max-w-[150px]">
                      {appointment.doctorId}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 max-w-[120px]">
                      {extractDateTime(appointment.dateTime).date}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 max-w-[80px]">
                      {extractDateTime(appointment.dateTime).time}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 max-w-[80px]">
                      {appointment.purpose}
                    </TableCell>
                    <TableCell
                      className="text-xs px-4 py-3 max-w-[140px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </TableCell>
                    <TableCell
                      className="text-xs px-4 py-3 flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(appointment);
                        }}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowConfirm(true);
                          setDeleteId(appointment.appointmentId);
                        }}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <TiDelete className="w-6 h-6" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={metaData.totalPages || 1}
            totalItems={metaData.total || 0}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </PageBlurWrapper>

      {/* Add Modal */}
      <ModalWrapper
        isOpen={isModalOpen}
        onClose={closeModal}
        size="md"
        showCloseButton
        closeOnBackdropClick
        closeOnEscape
      >
        <AddAppointment
          onClose={closeModal}
          onAddAppointment={handleAddAppointment}
        />
      </ModalWrapper>

      {/* Edit Modal */}
      <ModalWrapper
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        size="md"
        showCloseButton
        closeOnBackdropClick
        closeOnEscape
      >
        {selectedRecord && (
          <div
            className="scrollbar-hide"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <EditAppointment
              onClose={closeEditModal}
              onUpdateAppointment={handleUpdateAppointment}
              initialData={selectedRecord}
            />
          </div>
        )}
      </ModalWrapper>

      {/* View Modal */}
      <ModalWrapper
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        size="lg"
        showCloseButton
        closeOnBackdropClick
        closeOnEscape
      >
        {selectedRecord && <AppointmentView data={selectedRecord} />}
      </ModalWrapper>

      {/* Delete Confirm */}
      <Confirm
        open={showConfirm}
        title="Delete Item"
        message="Are you sure?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDeleteAppointment}
        id={deleteId}
      />

      {/* Hide scrollbar globally */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
          height: 0;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
