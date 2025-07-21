import { useState, useEffect } from "react";
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
import Pagination from "./Common/Pagination.jsx";
import AddMedicalRecord from "./form/addMedicalRecord.jsx";
import ModalColumn from "./form/ModalColumn.jsx";
import MedicalRecordView from "./view/MedicalRecordView.jsx";
import { TiDelete } from "react-icons/ti";
import { IoEyeSharp } from "react-icons/io5";
import {
  getAllMedicalRecords,
  createMedicalRecord,
  deleteMedicalRecord,
} from "../service/medicalrecordAPI.js";

export default function MedicalRecord() {
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

  // fetch page N of records
  const fetchAllMedicalRecord = async (page = 1, limit = 10) => {
    try {
      const response = await getAllMedicalRecords(page, limit);
      setMedicalRecords(response.data.data);
      setMetaData(response.data.meta);
    } catch (err) {
      console.error("Failed to fetch medical records:", err.message);
    }
  };

  // Open / close modals
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
      const { data } = await getAllMedicalRecords(1, itemsPerPage);
      const totalPages = data.meta.totalPages;

      setCurrentPage(totalPages);
      await fetchAllMedicalRecord(totalPages, itemsPerPage);

      closeModal();
    } catch (error) {
      console.error("Failed to create medical record:", error);
    }
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      await deleteMedicalRecord(recordId);
      fetchAllMedicalRecord(currentPage, itemsPerPage);
    } catch (err) {
      console.error("Failed to delete record:", err);
      alert("Error deleting medical record.");
    }
  };

  const openModalColumns = (title, content) =>
    setModalData({ isOpen: true, title, content });
  const closeModalColumns = () =>
    setModalData({ isOpen: false, title: "", content: "" });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchAllMedicalRecord(currentPage, itemsPerPage);
  }, [currentPage]);

  return (
    <div className="h-full overflow-auto p-3">
      <PageBlurWrapper isBlurred={modalData.isOpen || isModalOpen || isViewModalOpen}>
        <div className="w-full flex flex-col gap-3 px-1">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Medical Records</h1>
            <Button content="Add Medical Record" onClick={openModal} />
          </div>

          {/* Table */}
          <div className="overflow-x-auto scrollbar-hide bg-white rounded-lg shadow">
            <Table className="min-w-[1000px] w-full">
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
              <TableBody>
                {medicalrecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={header.length} className="text-center py-4 text-gray-500">
                      No records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  medicalrecords.map((record) => (
                    <TableRow
                      key={record.recordId}
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <TableCell
                        onClick={() => openViewModal(record)}
                        className="text-xs px-2 py-2 whitespace-nowrap max-w-[80px] truncate"
                      >
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
                              openModalColumns("Prescription", record.prescription);
                            }}
                            className="text-blue-600 hover:text-blue-800"
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
                        >
                          <TiDelete className="w-6 h-6" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
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

      {/* Add Record Modal */}
      <ModalWrapper isOpen={isModalOpen} onClose={closeModal} size="md">
        <AddMedicalRecord
          onClose={closeModal}
          onAddMedicalRecord={handleAddMedicalRecord}
        />
      </ModalWrapper>

      {/* Column View Modal */}
      <ModalWrapper isOpen={modalData.isOpen} onClose={closeModalColumns} size="md">
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

      {/* View Record Modal */}
      <ModalWrapper isOpen={isViewModalOpen} onClose={closeViewModal}>
        {selectedRecord && <MedicalRecordView data={selectedRecord} />}
      </ModalWrapper>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
