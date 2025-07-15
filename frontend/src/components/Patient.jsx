// React hooks
import { useState, useMemo, useEffect } from "react";

// Common components
import Button from "./common/Button.jsx";
import SearchBar from "./common/SearchBar.jsx";
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
import { success, error } from "./utils/toast.js";

// Form components
import AddPatient from "./form/addPatient.jsx";
import PatientView from "./view/PatientView.jsx";

// Icons
import { TiDelete } from "react-icons/ti";

// API services
import {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../service/patientAPI.js";

export default function Patient() {
  const [patients, setPatients] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const itemsPerPage = 10;

  const mockData = [
    {
      patientId: 1,
      lastName: "Johnson",
      firstName: "Emma",
      height: 1.65,
      weight: 58.3,
      dateOfBirth: "1990-04-12",
      address: "245 Riverside Drive, Phnom Penh, Cambodia",
      contact: "+855 12 456 789",
      email: "emma.johnson@email.com",
    },
    {
      patientId: 2,
      lastName: "Chen",
      firstName: "David",
      height: 1.78,
      weight: 72.8,
      dateOfBirth: "1985-08-23",
      address: "157 Golden Street, Siem Reap, Cambodia",
      contact: "+855 17 892 345",
      email: "david.chen@email.com",
    },
    {
      patientId: 3,
      lastName: "Rodriguez",
      firstName: "Sofia",
      height: 1.62,
      weight: 54.7,
      dateOfBirth: "1993-11-07",
      address: "89 Mekong Avenue, Battambang, Cambodia",
      contact: "+855 98 234 567",
      email: "sofia.rodriguez@email.com",
    },
    {
      patientId: 4,
      lastName: "Thompson",
      firstName: "Marcus",
      height: 1.82,
      weight: 85.2,
      dateOfBirth: "1988-02-15",
      address: "312 Temple Road, Kampot, Cambodia",
      contact: "+855 77 678 912",
      email: "marcus.thompson@email.com",
    },
    {
      patientId: 5,
      lastName: "Patel",
      firstName: "Aria",
      height: 1.58,
      weight: 51.9,
      dateOfBirth: "1995-06-30",
      address: "76 Lotus Lane, Kep, Cambodia",
      contact: "+855 16 345 678",
      email: "aria.patel@email.com",
    },
  ];

  const fetchAllPatient = async (page = 1, limit = 10) => {
    try {
      const patients = await getAllPatients(page, limit);
      setPatients(patients.data.data);
      setMetaData(patients.data.meta);
    } catch (err) {
      console.error("Failed to fetch patients:", err.message);
    }
  };

  const openModal = () => {
    console.log("Opening patient modal");
    setIsModalOpen(true);
  };
  const closeModal = () => {
    console.log("Closing patient modal");
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

  const handleAddPatient = async (formData) => {
    try {
      console.log("Creating patient:", formData);
      const response = await createPatient(formData);
      console.log("Patient created successfully:", response);

      // Refresh the patient list
      fetchAllPatient(currentPage, itemsPerPage);

      // Close the modal
      closeModal();
    } catch (error) {
      console.error("Failed to create patient:", error);
      // You can add toast notification here
    }
  };

  const handleDeletePatient = async (patientId) => {
    try {
      const response = await deletePatient(patientId);
      console.log("Patient deleted successfully:", response);
      fetchAllPatient(currentPage, itemsPerPage);
    } catch (err) {
      console.error("Failed to delete patient:", err.message);
      error("Failed to delete patient");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAllPatient(page, itemsPerPage);
  };

  useEffect(() => {
    fetchAllPatient(currentPage, itemsPerPage);
  }, [currentPage]);

  return (
    <div className="h-full overflow-auto p-3">
      <PageBlurWrapper isBlurred={isModalOpen}>
        <div className="w-full flex flex-col gap-3 px-1">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Patients</h1>
            <Button content={"Add Patient"} onClick={openModal} />
          </div>

          <div>
            <SearchBar
              placeholder="Search patients..."
              value={searchTerm}
              className="w-full"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                {patients.map((p) => (
                  <TableRow
                    key={p.patientId}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <TableCell
                      onClick={() => openViewModal(p)}
                      className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[80px]"
                    >
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
                    <TableCell
                      className="text-xs px-4 py-3 whitespace-nowrap max-w-[80px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleDeletePatient(p.patientId)}
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

      <ModalWrapper
        isOpen={isModalOpen}
        onClose={closeModal}
        size="md"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        <AddPatient onClose={closeModal} onAddPatient={handleAddPatient} />
      </ModalWrapper>

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
