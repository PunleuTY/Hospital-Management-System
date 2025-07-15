// React hooks
import { useState, useEffect } from "react";

// Common components
import Button from "./common/Button.jsx";
import Input from "./common/Input.jsx";
import PageBlurWrapper from "./common/Blur-wrapper.jsx";
import ModalWrapper from "./common/Modal-wrapper.jsx";
import StatisticCard from "./common/statisticCard.jsx";
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
import AddMedicalRecord from "./form/addMedicalRecord.jsx";
import ModalColumn from "./form/ModalColumn.jsx";
import MedicalRecordView from "./view/MedicalRecordView.jsx";

// Icons
import { TiDelete } from "react-icons/ti";
import { IoEyeSharp } from "react-icons/io5";

// API services
import {
  getAllMedicalRecords,
  createMedicalRecord,
} from "../service/medicalrecordAPI.js";

export default function MedicalRecord() {
  // ===== STATE MANAGEMENT =====
  const [medicalrecords, setMedicalRecords] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    content: "",
  });

  const itemsPerPage = 10;

  // ===== CONSTANTS =====
  const header = [
    "Id",
    "Patient",
    "Appt ID",
    "Diagnosis",
    "Prescription",
    "Lab Results",
    "Treatment",
    "Actions",
  ];

  const mockMedicalRecords = [
    {
      recordId: "MR1001",
      patient: "John Doe",
      appointmentId: "APT5001",
      diagnosis: "Flu",
      prescription: "Paracetamol 500mg",
      labResult: "Negative",
      treatment: "Rest and hydration",
    },
    {
      recordId: "MR1002",
      patient: "Jane Smith",
      appointmentId: "APT5002",
      diagnosis: "Sprained Ankle",
      prescription: "Ibuprofen 200mg",
      labResult: "X-ray clear",
      treatment: "Physical therapy",
    },
    {
      recordId: "MR1003",
      patient: "Michael Lee",
      appointmentId: "APT5003",
      diagnosis: "Type 2 Diabetes",
      prescription: "Metformin",
      labResult: "Blood sugar: 150 mg/dL",
      treatment: "Diet and exercise",
    },
    {
      recordId: "MR1004",
      patient: "Emily Davis",
      appointmentId: "APT5004",
      diagnosis: "Hypertension",
      prescription: "Lisinopril",
      labResult: "BP: 140/90 mmHg",
      treatment: "Medication adherence",
    },
    {
      recordId: "MR1005",
      patient: "David Brown",
      appointmentId: "APT5005",
      diagnosis: "Allergic Rhinitis",
      prescription: "Cetirizine",
      labResult: "Positive allergy test",
      treatment: "Avoid allergens",
    },
  ];

  // ===== UTILITY FUNCTIONS =====
  // Helper to truncate text
  const truncateText = (text, maxLength = 50) => {
    if (!text) {
      return "";
    }
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  // ===== API FUNCTIONS =====
  const fetchAllMedicalRecord = async (page = 1, limit = 10) => {
    try {
      const response = await getAllMedicalRecords(page, limit);
      setMedicalRecords(response.data.data);
      setMetaData(response.data.meta);
    } catch (err) {
      console.error("Failed to fetch medical records:", err.message);
    }
  };

  // ===== EVENT HANDLERS =====
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openViewModal = (record) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedRecord(null);
    setIsViewModalOpen(false);
  };

  const handleAddMedicalRecord = async (formData) => {
    try {
      console.log("Creating medical record:", formData);
      const response = await createMedicalRecord(formData);
      console.log("Medical record created successfully:", response);

      // Refresh the medical records list
      fetchAllMedicalRecord(currentPage, itemsPerPage);

      // Close the modal
      closeModal();
    } catch (error) {
      console.error("Failed to create medical record:", error);
    }
  };

  const handleDeleteRecord = (recordId) => {
    setMedicalRecords((prev) =>
      prev.filter((record) => record.record_id !== recordId)
    );
  };

  const openModalColumns = (title, content) => {
    setModalData({
      isOpen: true,
      title,
      content,
    });
  };

  const closeModalColumns = () => {
    setModalData({
      isOpen: false,
      title: "",
      content: "",
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAllMedicalRecord(page, itemsPerPage);
  };

  // ===== EFFECTS =====
  useEffect(() => {
    fetchAllMedicalRecord(currentPage, itemsPerPage);
  }, [currentPage]);

  // ===== RENDER =====
  return (
    <div className="h-full overflow-auto p-3">
      {/* Main content with blur effect when modal is open */}
      <PageBlurWrapper
        isBlurred={modalData.isOpen || isModalOpen || isViewModalOpen}
      >
        <div className="w-full flex flex-col gap-3 px-1">
          {/* Header section */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Medical Records</h1>
            <Button content={"Add Medical Record"} onClick={openModal} />
          </div>

          {/* Table section - Scrollable container with hidden scrollbar */}
          <div
            className="overflow-x-auto scrollbar-hide bg-white rounded-lg shadow overflow-hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <Table className="min-w-[1000px] w-full">
              {/* Table header */}
              <TableHeader>
                <TableRow>
                  {header.map((h, idx) => (
                    <TableHead
                      key={idx}
                      className="text-xs whitespace-nowrap px-4 py-3 min-w-[80px]"
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              {/* Table body */}
              <TableBody>
                {medicalrecords.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={header.length}
                      className="text-center py-4 text-gray-500"
                    >
                      No records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  medicalrecords.map((record) => (
                    <TableRow
                      key={record.recordId}
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => openViewModal(record)}
                    >
                      <TableCell className="text-xs px-2 py-2 whitespace-nowrap max-w-[80px] truncate">
                        {record.recordId}
                      </TableCell>
                      <TableCell className="text-xs px-2 py-2 whitespace-nowrap max-w-[80px] truncate">
                        {record.patient.firstName} {record.patient.lastName}
                      </TableCell>
                      <TableCell className="text-xs px-2 py-2 whitespace-nowrap max-w-[80px] truncate">
                        {record.appointmentId}
                      </TableCell>
                      <TableCell className="text-xs px-2 py-2 whitespace-nowrap max-w-[80px] truncate">
                        {record.diagnosis}
                        {record.diagnosis.length > 40 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModalColumns("Diagnosis", record.diagnosis);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                            title="View full diagnosis"
                            aria-label="View full diagnosis"
                          >
                            <IoEyeSharp className="w-5 h-5" />
                          </button>
                        )}
                      </TableCell>
                      <TableCell className="text-xs px-2 py-2 whitespace-nowrap max-w-[80px] truncate">
                        {record.prescription}
                        {record.prescription.length > 40 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModalColumns(
                                "Prescription",
                                record.prescription
                              );
                            }}
                            className="text-blue-600 hover:text-blue-800"
                            title="View full prescription"
                            aria-label="View full prescription"
                          >
                            <IoEyeSharp className="w-5 h-5" />
                          </button>
                        )}
                      </TableCell>
                      <TableCell className="text-xs px-2 py-2 whitespace-nowrap max-w-[80px] truncate">
                        {record.labResult}
                        {record.labResult.length > 30 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModalColumns("Lab Results", record.labResult);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                            title="View full lab results"
                            aria-label="View full lab results"
                          >
                            <IoEyeSharp className="w-5 h-5" />
                          </button>
                        )}
                      </TableCell>
                      <TableCell className="text-xs px-2 py-2 whitespace-nowrap max-w-[80px] truncate">
                        {record.treatment}
                        {record.treatment.length > 30 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModalColumns("Treatment", record.treatment);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                            title="View full treatment"
                            aria-label="View full treatment"
                          >
                            <IoEyeSharp className="w-5 h-5" />
                          </button>
                        )}
                      </TableCell>
                      <TableCell className="text-xs px-2 py-2 whitespace-nowrap max-w-[80px]">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRecord(record.recordId);
                          }}
                          aria-label="Delete medical record"
                        >
                          <TiDelete className="w-6 h-6 cursor-pointer" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
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

      {/* Add Medical Record Modal */}
      <ModalWrapper
        isOpen={isModalOpen}
        onClose={closeModal}
        size="md"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        <AddMedicalRecord
          onClose={closeModal}
          onAddMedicalRecord={handleAddMedicalRecord}
        />
      </ModalWrapper>

      {/* Modal to show full text content */}
      <ModalWrapper
        isOpen={modalData.isOpen}
        onClose={closeModalColumns}
        size="md"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        <ModalColumn
          isOpen={modalData.isOpen}
          onClose={closeModalColumns}
          title={modalData.title}
        >
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">{modalData.title}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {modalData.content}
            </p>
          </div>
        </ModalColumn>
      </ModalWrapper>

      {/* Detailed View Modal */}
      <ModalWrapper
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        {selectedRecord && <MedicalRecordView data={selectedRecord} />}
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
