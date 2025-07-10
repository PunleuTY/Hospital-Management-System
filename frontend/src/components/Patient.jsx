import { useState, useMemo, useEffect } from "react";
import Button from "./Common/Button";
import Input from "./Common/Input";
import SearchBar from "./Common/SearchBar";

import PageBlurWrapper from "./Common/Blur-wrapper.jsx";
import ModalWrapper from "./Common/Modal-wrapper.jsx";
import Dropdown from "./Common/Dropdown.jsx";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./Common/Table.jsx";
import AddPatient from "./Form/addPatient.jsx";
import { TiDelete } from "react-icons/ti";

//API
import { getAllPatients } from "../service/patientAPI.js";
import { updatePatient } from "../service/patientAPI";

export default function Patient() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchAllPatient();
  }, []);

  const fetchAllPatient = async () => {
    try {
      const patients = await getAllPatients();
      setPatients(patients);
    } catch (err) {
      console.error("Failed to fetch patients:", err.message);
    }
  };

  const [filterStatus, setFilterStatus] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddPatient = (newPatient) => {
    setPatients((prev) => [...prev, newPatient]);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleDeletePatient = (patientId) => {
    setPatients((prev) =>
      prev.filter((patient) => patient.patient_id !== patientId)
    );
  };

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const fullName =
        `${patient.first_name} ${patient.last_name}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase());
      // If filterStatus is "All status", show all, else match status (case-insensitive)
      const matchesStatus =
        filterStatus === "All status" ||
        filterStatus === "All" ||
        filterStatus === "" ||
        patient.status.toLowerCase() === filterStatus.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [patients, searchTerm, filterStatus]);

  // Header
  const header = [
    "Id",
    "Last Name",
    "First Name",
    "Height (m)",
    "Weight (kg)",
    "Date of Birth",
    "Address",
    "Contact",
    "Email",
    "Doctor",
    "Actions",
  ];

  // Change status handler
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updatePatient(id, { status: newStatus });
      setPatients((prev) =>
        prev.map((a) => (a.patient_id === id ? { ...a, status: newStatus } : a))
      );
    } catch (err) {
      console.error("Failed to update patient status:", err.message);
    }
  };

  const mockPatientData = [
    {
      patient_id: "P001",
      last_name: "Smith",
      first_name: "John",
      height: 1.82,
      weight: 85.5,
      date_of_birth: "1985-04-12",
      address: "123 Maple Street, Springfield, IL 62704",
      contact: "555-0101",
      email: "john.smith@example.com",
      doctor_id: "DOC734",
    },
    {
      patient_id: "P002",
      last_name: "Garcia",
      first_name: "Maria",
      height: 1.65,
      weight: 63.2,
      date_of_birth: "1992-08-23",
      address: "456 Oak Avenue, Shelbyville, TN 37160",
      contact: "555-0102",
      email: "maria.garcia@example.com",
      doctor_id: "DOC219",
    },
    {
      patient_id: "P003",
      last_name: "Chen",
      first_name: "Wei",
      height: 1.75,
      weight: 72.0,
      date_of_birth: "1978-11-30",
      address: "789 Pine Lane, Capital City, CA 95814",
      contact: "555-0103",
      email: "wei.chen@example.com",
      doctor_id: "DOC734",
    },
    {
      patient_id: "P004",
      last_name: "Williams",
      first_name: "David",
      height: 1.9,
      weight: 94.8,
      date_of_birth: "1995-02-18",
      address: "101 Birch Road, North Haverbrook, NH 03765",
      contact: "555-0104",
      email: "david.williams@example.com",
      doctor_id: "DOC558",
    },
    {
      patient_id: "P005",
      last_name: "Jones",
      first_name: "Emily",
      height: 1.7,
      weight: 58.1,
      date_of_birth: "2001-07-07",
      address: "212 Cedar Blvd, Ogdenville, OR 97031",
      contact: "555-0105",
      email: "emily.jones@example.com",
      doctor_id: "DOC219",
    },
  ];

  return (
    <div className="h-full overflow-auto p-3">
      <PageBlurWrapper isBlurred={isModalOpen}>
        <div className="w-full flex flex-col gap-3 px-1">
          {/*Header*/}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Patients</h1>
            <Button content={"Add Patient"} onClick={openModal} />
          </div>

          {/*Search and Filter*/}
          <div>
            <SearchBar
              placeholder="Search patients..."
              value={searchTerm}
              className="w-100"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/*Table*/}
          <div className="bg-white rounded-lg shadow overflow-hidden w-full">
            <div className="overflow-x-auto no-scrollbar">
              <Table className="w-full table-fixed">
                <TableHeader>
                  <TableRow>
                    {header.map((h, idx) => {
                      const widthClasses = [
                        "w-20", // Id
                        "w-28", // Last Name
                        "w-28", // First Name
                        "w-20", // Height (m)
                        "w-20", // Weight (kg)
                        "w-32", // Date of Birth
                        "w-64", // Address
                        "w-28", // Contact
                        "w-48", // Email
                        "w-24", // Doctor
                        "w-20", // Actions
                      ];
                      return (
                        <TableHead
                          key={idx}
                          className={`text-xs whitespace-nowrap px-4 py-3 ${widthClasses[idx]}`}
                        >
                          {h}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPatientData.map((p) => (
                    <TableRow key={p.patient_id}>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-20">
                        {p.patient_id}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-28">
                        {p.last_name}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-28">
                        {p.first_name}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-20">
                        {p.height}m
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-20">
                        {p.weight}kg
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-32">
                        {p.date_of_birth}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-64">
                        {p.address}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-28">
                        {p.contact}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-48">
                        {p.email}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-24">
                        {p.doctor_id}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 w-20">
                        <button
                          onClick={() => handleDeletePatient(p.patient_id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TiDelete className="w-8 h-8 cursor-pointer" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          {/* Table end */}
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
    </div>
  );
}
