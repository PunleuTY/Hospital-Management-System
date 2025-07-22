import { useState, useEffect } from "react";

// Common components
import Button from "./common/Button.jsx";
import PageBlurWrapper from "./common/Blur-wrapper.jsx";
import ModalWrapper from "./common/Modal-wrapper.jsx";
import Confirm from "./common/Confirm.jsx";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./common/Table.jsx";
import Pagination from "./common/Pagination.jsx";
import { success, error } from "./utils/toast.js";

// Form components
import AddPatient from "./form/addPatient.jsx";
import EditPatient from "./form/editPatient.jsx";
import PatientView from "./view/PatientView.jsx";

// Icons
import { TiDelete } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";

// API services
import {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../service/patientAPI.js";

export default function Patient() {
  // State Management
  // ---------------------------------------------------------------------------

  // Stores the list of patient records
  const [patients, setPatients] = useState([]);
  // Stores pagination metadata
  const [metaData, setMetaData] = useState({});
  // Controls visibility of Add Patient modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Controls visibility of Edit Patient modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // Current page for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Stores the selected record for edit/view
  const [selectedRecord, setSelectedRecord] = useState(null);
  // Controls visibility of Patient View modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  // Controls visibility of confirmation dialog for deletion
  const [showConfirm, setShowConfirm] = useState(false);
  // Stores the ID of the item to be deleted
  const [deleteId, setDeleteId] = useState(null);

  // Number of items to display per page
  const itemsPerPage = 10;

  // API Functions
  // ---------------------------------------------------------------------------

  // Fetches all patient records from the API
  const fetchAllPatient = async (page = 1, limit = 10) => {
    try {
      const patients = await getAllPatients(page, limit);
      setPatients(patients.data.data);
      setMetaData(patients.data.meta);
    } catch (err) {
      console.error("Failed to fetch patients:", err.message);
    }
  };

  // Event Handlers
  // ---------------------------------------------------------------------------

  // Opens the Add Patient modal
  const openModal = () => {
    console.log("Opening patient modal");
    setIsModalOpen(true);
  };
  // Closes the Add Patient modal
  const closeModal = () => {
    console.log("Closing patient modal");
    setIsModalOpen(false);
  };

  // Opens the Edit Patient modal with selected record data
  const openEditModal = (record) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };
  // Closes the Edit Patient modal
  const closeEditModal = () => {
    setSelectedRecord(null);
    setIsEditModalOpen(false);
  };

  // Opens the Patient View modal with selected record data
  const openViewModal = (record) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };
  // Closes the Patient View modal
  const closeViewModal = () => {
    setSelectedRecord(null);
    setIsViewModalOpen(false);
  };

  // Handles adding a new patient
  const handleAddPatient = async (formData) => {
    try {
      console.log("Creating patient:", formData);
      await createPatient(formData);
      console.log("Patient created successfully");
      success("Patient added successfully.");

      fetchAllPatient(currentPage, itemsPerPage); // Refresh the patient list
      closeModal(); // Close the modal
    } catch (error) {
      console.error("Failed to create patient:", error);
      error("Error adding patient");
    }
  };

  // Handles updating an existing patient
  const handleUpdatePatient = async (patientId, formData) => {
    try {
      await updatePatient(patientId, formData);
      console.log("Patient updated successfully");
      fetchAllPatient(currentPage, itemsPerPage); // Refresh the patient list
      success("Patient updated successfully");
      closeEditModal(); // Close the modal
    } catch (error) {
      console.error("Failed to update patient:", error);
      error("Failed to update patient");
    }
  };

  // Handles deleting a patient
  const handleDeletePatient = async (patientId) => {
    try {
      await deletePatient(patientId);
      console.log("Patient deleted successfully");
      fetchAllPatient(currentPage, itemsPerPage); // Refresh the patient list
      success("Patient deleted successfully");
      setShowConfirm(false); // Close confirmation dialog
    } catch (err) {
      console.error("Failed to delete patient:", err.message);
      error("Failed to delete patient");
    }
  };

  // Handles page change for pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAllPatient(page, itemsPerPage);
  };

  // Effects
  // ---------------------------------------------------------------------------

  // Fetches patient data on initial render and when currentPage changes
  useEffect(() => {
    fetchAllPatient(currentPage, itemsPerPage);
  }, [currentPage]); // Dependency on currentPage to refetch data

  // Render Logic
  // ---------------------------------------------------------------------------

  return (
    <div className="h-full overflow-auto p-3">
      {/* Main content with blur effect when modal is open */}
      <PageBlurWrapper
        isBlurred={isModalOpen || isEditModalOpen || isViewModalOpen}
      >
        <div className="w-full flex flex-col gap-3 px-1">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Patients</h1>
            <Button content={"Add Patient"} onClick={openModal} />
          </div>
          <div
            className="overflow-x-auto scrollbar-hide rounded-lg overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <Table className="min-w-[900px] w-full">
              <TableHeader>
                <TableRow>
                  {[
                    "ID",
                    "First Name",
                    "Last Name",
                    "Hieght (m)",
                    "Weight (kg)",
                    "Date of Birth",
                    "Address",
                    "Contact",
                    "Email",
                    "Action",
                  ].map((h) => (
                    <TableHead
                      key={h}
                      className="text-xs whitespace-nowrap px-4 py-3 min-w-[100px]"
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.length > 0 ? (
                  patients.map((p) => (
                    <TableRow
                      key={p.patientId}
                      onClick={() => openViewModal(p)}
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[80px]">
                        {p.patientId}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[120px]">
                        {p.lastName}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[120px]">
                        {p.firstName}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[120px]">
                        {p.height}m
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[120px]">
                        {p.weight}kg
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[120px]">
                        {p.dateOfBirth}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[120px]">
                        {p.address}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[140px]">
                        {p.contact}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[200px]">
                        {p.email}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap max-w-[80px] flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(p);
                          }}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          <FiEdit className="w-4 h-4 cursor-pointer" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowConfirm(true);
                            setDeleteId(p.patientId);
                          }}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <TiDelete className="w-6 h-6 cursor-pointer" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      className="text-center py-4 text-gray-500"
                    >
                      No patients found
                    </TableCell>
                  </TableRow>
                )}
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

      {/* Add Patient Modal */}
      <ModalWrapper
        isOpen={isModalOpen}
        onClose={closeModal}
        size="md"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        <div
          style={{ maxHeight: "80vh", overflowY: "auto" }}
          className="scrollbar-hide"
        >
          <AddPatient onClose={closeModal} onAddPatient={handleAddPatient} />
        </div>
      </ModalWrapper>

      {/* Edit Patient Modal */}
      <ModalWrapper
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        size="md"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        {selectedRecord && (
          <div
            style={{ maxHeight: "80vh", overflowY: "auto" }}
            className="scrollbar-hide"
          >
            <EditPatient
              onClose={closeEditModal}
              onUpdatePatient={handleUpdatePatient}
              initialData={selectedRecord}
            />
          </div>
        )}
      </ModalWrapper>

      {/* View Patient Details Modal */}
      <ModalWrapper
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        size="lg"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        {selectedRecord && (
          <PatientView data={selectedRecord} onClose={closeViewModal} />
        )}
      </ModalWrapper>

      {/* Confirmation Dialog for Delete */}
      <Confirm
        open={showConfirm}
        title="Delete Item"
        message="Are you sure?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDeletePatient}
        id={deleteId}
      />

      {/* Global CSS to hide scrollbar */}
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
