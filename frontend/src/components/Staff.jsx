// ===== Imports =====

// Hooks
import { useState, useEffect } from "react";

// Common UI
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
import Confirm from "./common/Confirm.jsx";
import { success, error } from "./utils/toast.js";

// Forms and Views
import AddStaff from "./form/addStaff.jsx";
import EditStaff from "./form/editStaff.jsx";
import StaffView from "./view/StaffView.jsx";

// Icons
import { TiDelete } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";

// API services
import {
  getAllStaffs,
  createStaff,
  deleteStaff,
  updateStaff,
} from "../service/staffAPI.js";

// ===== Component =====

export default function Staff() {
  // ===== States =====
  const [staff, setStaffs] = useState([]);
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

  // ===== Handlers =====

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAllStaff(page, itemsPerPage);
  };

  // ===== API Calls =====

  const fetchAllStaff = async (page = 1, limit = 10) => {
    try {
      const response = await getAllStaffs(page, limit);
      setStaffs(response.data.data);
      setMetaData(response.data.meta);
    } catch (err) {
      console.error("Failed to fetch staff:", err.message);
    }
  };

  const handleAddStaff = async (formData) => {
    try {
      for (const key in formData) {
        if (formData[key] === "") formData[key] = null;
      }
      const response = await createStaff(formData);
      success("Staff created successfully");
      fetchAllStaff(currentPage, itemsPerPage);
      closeModal();
    } catch (err) {
      console.error("Failed to create staff:", err);
      error("Failed to create staff");
    }
  };

  const handleUpdateStaff = async (staffId, formData) => {
    try {
      const response = await updateStaff(staffId, formData);
      success("Staff updated successfully");
      fetchAllStaff(currentPage, itemsPerPage);
      closeEditModal();
    } catch (err) {
      console.error("Failed to update staff:", err);
      error("Failed to update staff");
    }
  };

  const handleDeleteStaff = async (staffId) => {
    try {
      const response = await deleteStaff(staffId);
      success("Staff deleted successfully");
      fetchAllStaff(currentPage, itemsPerPage);
      setShowConfirm(false);
    } catch (err) {
      console.error("Failed to delete staff:", err.message);
      error("Failed to delete staff");
    }
  };

  // ===== Effects =====

  useEffect(() => {
    fetchAllStaff(currentPage, itemsPerPage);
  }, [currentPage]);

  // ===== Render =====

  return (
    <div className="h-full overflow-auto p-3">
      {/* Content with optional blur */}
      <PageBlurWrapper isBlurred={isModalOpen || isViewModalOpen}>
        <div className="w-full flex flex-col gap-3 px-1">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Staff</h1>
            <Button content="Add Staff" onClick={openModal} />
          </div>

          {/* Table */}
          <div className="overflow-x-auto scrollbar-hide bg-white rounded-lg shadow overflow-hidden w-full">
            <Table className="min-w-[1000px] w-full">
              <TableHeader>
                <TableRow>
                  {header.map((h, idx) => (
                    <TableHead
                      key={idx}
                      className="text-xs px-4 py-3 min-w-[100px]"
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {staff.map((staffMember) => (
                  <TableRow
                    key={staffMember.staffId}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => openViewModal(staffMember)}
                  >
                    <TableCell className="text-xs px-4 py-3 truncate max-w-[80px]">
                      {staffMember.staff_id}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 truncate max-w-[120px]">
                      {staffMember.first_name}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 truncate max-w-[120px]">
                      {staffMember.last_name}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 truncate max-w-[80px]">
                      {staffMember.gender}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 truncate max-w-[80px]">
                      {staffMember.role}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 truncate max-w-[120px]">
                      {staffMember.contact}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 truncate max-w-[120px]">
                      {staffMember.specialization ?? "No Specialization"}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 truncate max-w-[80px]">
                      {staffMember.department_id}
                    </TableCell>
                    <TableCell className="text-xs px-4 py-3 truncate max-w-[80px]">
                      {staffMember.doctor_id ?? "No Doctor"}
                    </TableCell>
                    <TableCell
                      className="text-xs px-4 py-3 max-w-[80px] flex gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(staffMember);
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
                          setDeleteId(staffMember.staff_id);
                        }}
                        className="text-red-500 hover:text-red-700"
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
        <div
          className="scrollbar-hide"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          <AddStaff onClose={closeModal} onAddStaff={handleAddStaff} />
        </div>
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
            <EditStaff
              onClose={closeEditModal}
              onUpdateStaff={handleUpdateStaff}
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
        {selectedRecord && <StaffView data={selectedRecord} />}
      </ModalWrapper>

      {/* Confirm Dialog */}
      <Confirm
        open={showConfirm}
        title="Delete Item"
        message="Are you sure?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDeleteStaff}
        id={deleteId}
      />

      {/* Hide scrollbars */}
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
