import { useState, useEffect } from "react";
import Button from "./Common/Button";
import Input from "./Common/Input";

import PageBlurWrapper from "./Common/Blur-wrapper.jsx";
import ModalWrapper from "./Common/Modal-wrapper.jsx";
import StatisticCard from "./Common/statisticCard.jsx";
import Dropdown from "./Common/Dropdown.jsx";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./Common/Table.jsx";
import AddBilling from "./Form/addBilling.jsx";
import ModalColumn from "./Form/ModalColumn.jsx";
import AddMedicalRecord from "./Form/addMedicalRecord.jsx";

//API
import { getAllMedicalRecords } from "../service/medicalrecordAPI.js";

//Icons
import { TiDelete } from "react-icons/ti";
import { IoEyeSharp } from "react-icons/io5";

export default function MedicalRecord() {
  const [medicalrecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    fetchAllMedicalRecord();
  }, []);

  const fetchAllMedicalRecord = async () => {
    try {
      const medicalrecords = await getAllMedicalRecords();
      setMedicalRecords(medicalrecords);
    } catch (err) {
      console.error("Failed to fetch medical records:", err.message);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddMedicalRecord = (newMedicalRecord) => {
    setMedicalRecords((prev) => [...prev, newMedicalRecord]);
  };

  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    content: "",
  });

  const handleDeleteRecord = (recordId) => {
    setMedicalRecords((prev) =>
      prev.filter((record) => record.record_id !== recordId)
    );
  };

  const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
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

  const mockMedicalRecordData = [
    {
      record_id: "MR001",
      patient_id: "P001",
      appointment_id: "A001",
      diagnosis: "Hypertension with mild cardiac complications",
      prescription: "Lisinopril 10mg daily, Hydrochlorothiazide 25mg daily",
      lab_result: "Blood pressure elevated, cholesterol normal",
      treatment: "Lifestyle modification, medication management",
    },
    {
      record_id: "MR002",
      patient_id: "P002",
      appointment_id: "A002",
      diagnosis: "Acute upper respiratory infection",
      prescription: "Amoxicillin 500mg three times daily for 7 days",
      lab_result: "CBC normal, throat culture positive for strep",
      treatment: "Antibiotic therapy, rest, increased fluid intake",
    },
    {
      record_id: "MR003",
      patient_id: "P003",
      appointment_id: "A003",
      diagnosis: "Migraine headaches with aura",
      prescription: "Sumatriptan 50mg as needed, Propranolol 40mg daily",
      lab_result: "MRI brain normal, no structural abnormalities",
      treatment: "Trigger avoidance, prophylactic medication",
    },
    {
      record_id: "MR004",
      patient_id: "P004",
      appointment_id: "A004",
      diagnosis: "Type 2 diabetes mellitus, well controlled",
      prescription: "Metformin 1000mg twice daily, Glipizide 5mg daily",
      lab_result: "HbA1c 6.8%, fasting glucose 145 mg/dl",
      treatment: "Dietary counseling, medication adjustment",
    },
    {
      record_id: "MR005",
      patient_id: "P005",
      appointment_id: "A005",
      diagnosis: "Anxiety disorder with panic attacks",
      prescription: "Sertraline 50mg daily, Lorazepam 0.5mg as needed",
      lab_result: "TSH normal, vitamin D deficient",
      treatment: "Cognitive behavioral therapy, medication management",
    },
  ];

  const header = [
    "Id",
    "Patient ID",
    "Appt ID",
    "Diagnosis",
    "Prescription",
    "Lab Results",
    "Treatment",
    "Actions",
  ];

  return (
    <div className="h-full overflow-auto p-3">
      <PageBlurWrapper isBlurred={modalData.isOpen}>
        <div className="w-full flex flex-col gap-3 px-1">
          {/*Header*/}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Medical Records</h1>
            <Button content={"Add Medical Record"} onClick={openModal} />
          </div>

          {/* Medical Records Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
              <Table className="w-full table-fixed">
                <TableHeader>
                  <TableRow>
                    {header.map((h, idx) => {
                      const widthClasses = [
                        "w-20", // Id
                        "w-20", // patient id
                        "w-20", // appt id
                        "w-24", // diagnosis
                        "w-24", // prescription
                        "w-24", // lab result
                        "w-24", // treatment
                        "w-20", // actions
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
                  {mockMedicalRecordData.map((record) => (
                    <TableRow key={record.record_id}>
                      <TableCell className="w-24 text-xs px-2 py-2 truncate">
                        {record.record_id}
                      </TableCell>
                      <TableCell className="w-24 text-xs px-2 py-2 truncate">
                        {record.patient_id}
                      </TableCell>
                      <TableCell className="w-24 text-xs px-2 py-2 truncate">
                        {record.appointment_id}
                      </TableCell>
                      <TableCell className="w-40 text-xs px-2 py-2 truncate">
                        {record.diagnosis}
                      </TableCell>
                      <TableCell className="w-40 text-xs px-2 py-2 truncate">
                        {record.prescription}
                      </TableCell>
                      <TableCell className="w-32 text-xs px-2 py-2 truncate">
                        {record.lab_result}
                      </TableCell>
                      <TableCell className="w-32 text-xs px-2 py-2 truncate">
                        {record.treatment}
                      </TableCell>
                      <TableCell className="w-20 text-xs px-2 py-2">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteRecord(record.record_id)}
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
        <AddMedicalRecord
          onClose={closeModal}
          onAddAppointment={handleAddMedicalRecord}
        />
      </ModalWrapper>

      {/* Modal for viewing full text */}
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
    </div>
  );
}
