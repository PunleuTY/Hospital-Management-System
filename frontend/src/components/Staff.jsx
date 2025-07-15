// React hooks
import { useState, useEffect } from "react";

// Common components
import Button from "./common/Button.jsx";
import PageBlurWrapper from "./common/Blur-wrapper.jsx";
import ModalWrapper from "./common/Modal-wrapper.jsx";
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
import AddStaff from "./form/addStaff.jsx";
import StaffView from "./view/StaffView.jsx";

// Icons
import { TiDelete } from "react-icons/ti";

// API services
import { getAllStaffs, createStaff } from "../service/staffAPI.js";
import { deleteStaff as deleteStaffAPI } from "../service/staffAPI.js";

export default function Staff() {
  // ===== STATE MANAGEMENT =====
  const [staff, setStaffs] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const itemsPerPage = 10;

  // ===== CONSTANTS =====
  const header = [
    "Staff ID",
    "First Name",
    "Last Name",
    "Gender",
    "Role",
    "Contact",
    "Specialization",
    "Dept Id",
    "Doc Id",
    "Actions",
  ];

  const mockStaffData = [
    {
      staffId: "S001",
      firstName: "Dr. Sarah",
      lastName: "Johnson",
      gender: "Female",
      role: "Doctor",
      contact: "555-0201",
      specialization: "Cardiology",
      departmentId: "D001",
      doctor: "DOC001",
    },
    {
      staffId: "S002",
      firstName: "Michael",
      lastName: "Brown",
      gender: "Male",
      role: "Nurse",
      contact: "555-0202",
      specialization: "Emergency Care",
      departmentId: "D002",
      doctor: null,
    },
    // ...rest omitted for brevity
  ];

  // ===== COMPUTED VALUES =====
  const dataToDisplay = staff.length > 0 ? staff : mockStaffData;

  // ===== API FUNCTIONS =====
  const fetchAllStaff = async (page = 1, limit = 10) => {
    try {
      const response = await getAllStaffs(page, limit);
      setStaffs(response.data.data);
      setMetaData(response.data.meta);
    } catch (err) {
      console.error("Failed to fetch staff:", err.message);
    }
  };

  const deleteStaff = async (id) => {
    try {
      await deleteStaffAPI(id);
      setStaffs((prev) => prev.filter((s) => s.staff_id !== id));
    } catch (err) {
      console.error("Failed to delete staff:", err.message);
    }
  };

  // ===== EVENT HANDLERS =====
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openViewModal = (record) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedRecord(null);
    setIsViewModalOpen(false);
  };

  const handleAddStaff = async (formData) => {
    try {
      console.log("Creating staff:", formData);
      const response = await createStaff(formData);
      console.log("Staff created successfully:", response);

      // Refresh the staff list
      fetchAllStaff(currentPage, itemsPerPage);

      // Close the modal
      closeModal();
    } catch (error) {
      console.error("Failed to create staff:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAllStaff(page, itemsPerPage);
  };

  // ===== EFFECTS =====
  useEffect(() => {
    fetchAllStaff(currentPage, itemsPerPage);
  }, [currentPage]);

  // ===== RENDER =====
  return (
    <div className="h-full overflow-auto p-3">
      {/* Main content with blur effect when modal is open */}
      <PageBlurWrapper isBlurred={isModalOpen || isViewModalOpen}>
        <div className="w-full flex flex-col gap-3 px-1">
          {/* Header section */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Staff</h1>
            <Button content="Add Staff" onClick={openModal} />
          </div>

          {/* Table section - Scrollable container with hidden scrollbar */}
          <div
            className="overflow-x-auto scrollbar-hide bg-white rounded-lg shadow overflow-hidden w-full"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <Table className="min-w-[1000px] w-full">
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
                {staff.map((staffMember) => (
                  <TableRow
                    key={staffMember.staffId}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => openViewModal(staffMember)}
                  >
                    <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[80px]">
                      {staffMember.staff_id}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[120px]">
                      {staffMember.first_name}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[120px]">
                      {staffMember.last_name}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[80px]">
                      {staffMember.gender}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[80px]">
                      {staffMember.role}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[120px]">
                      {staffMember.contact}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[120px]">
                      {staffMember.specialization ?? "----"}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[80px]">
                      {staffMember.department_id}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[80px]">
                      {staffMember.doctor_id ?? "----"}
                    </TableCell>
                    <TableCell
                      className="text-xs px-4 py-3 whitespace-nowrap max-w-[80px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => deleteStaff(staffMember.staff_id)}
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

      {/* Add Staff Modal */}
      <ModalWrapper
        isOpen={isModalOpen}
        onClose={closeModal}
        size="md"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        <AddStaff onClose={closeModal} onAddStaff={handleAddStaff} />
      </ModalWrapper>

      {/* View Staff Details Modal */}
      <ModalWrapper
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        size="lg"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        {selectedRecord && <StaffView data={selectedRecord} />}
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
