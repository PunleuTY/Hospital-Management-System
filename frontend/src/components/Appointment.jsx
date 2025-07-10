import { useState, useEffect } from "react";
import Button from "./Common/Button";
import Input from "./Common/Input";
import AddAppointment from "./Form/addAppointment.jsx";
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
import { TiDelete } from "react-icons/ti";

import { getAllAppointments } from "../service/appointmentAPI.js";
import { deleteAppointment as deleteAppointmentAPI } from "../service/appointmentAPI.js";

export default function Appointment() {
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAllAppointment();
  }, []);

  const fetchAllAppointment = async () => {
    try {
      const appointments = await getAllAppointments();
      setAppointments(appointments);
    } catch (err) {
      console.error("Failed to fetch appointments:", err.message);
    }
  };

  // Add appointment handler
  const handleAddAppointment = (newAppointment) => {
    setAppointments((prev) => [...prev, newAppointment]);
  };

  // Change status handler
  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  // Filter logic
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesDate = !filterDate || appointment.date === filterDate;
    const matchesStatus =
      !filterStatus ||
      filterStatus === "All" ||
      appointment.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesDate && matchesStatus;
  });

  const deleteAppointment = async (id) => {
    try {
      await deleteAppointmentAPI(id); // call backend
      setAppointments((prev) => prev.filter((a) => a.id !== id)); // update state
    } catch (err) {
      console.error("Failed to delete appointment:", err.message);
    }
  };

  const header = [
    "Id",
    "Patient",
    "Doctor",
    "Date",
    "Time",
    "Status",
    "Actions",
  ];

  const mockAppointmentData = [
    {
      id: "A001",
      patient: "John Smith",
      doctor: "Dr. Sarah Johnson",
      date: "2025-07-15",
      time: "09:00",
      status: "Confirmed",
    },
    {
      id: "A002",
      patient: "Maria Garcia",
      doctor: "Dr. Emily Davis",
      date: "2025-07-15",
      time: "10:30",
      status: "Pending",
    },
    {
      id: "A003",
      patient: "Wei Chen",
      doctor: "Dr. Lisa Anderson",
      date: "2025-07-16",
      time: "14:00",
      status: "Confirmed",
    },
    {
      id: "A004",
      patient: "David Williams",
      doctor: "Dr. Sarah Johnson",
      date: "2025-07-16",
      time: "11:15",
      status: "Cancelled",
    },
    {
      id: "A005",
      patient: "Emily Jones",
      doctor: "Dr. Emily Davis",
      date: "2025-07-17",
      time: "16:30",
      status: "Pending",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="h-full overflow-auto p-3">
      <PageBlurWrapper isBlurred={isModalOpen}>
        <div className="w-full flex flex-col gap-3 px-1">
          {/*Header*/}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Appointments</h1>
            <Button content={"Book Appointment"} onClick={openModal} />
          </div>

          {/*Filter Date and Status*/}
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

          {/*Tables*/}
          <div className="bg-white rounded-lg shadow overflow-hidden w-full">
            <div className="overflow-x-auto no-scrollbar">
              <Table className="w-full table-fixed">
                <TableHeader>
                  <TableRow>
                    {header.map((h, idx) => {
                      const widthClasses = [
                        "w-20", // Id
                        "w-25", // Patient
                        "w-25", // Doctor
                        "w-20", // Date
                        "w-20", // Time
                        "w-20", // Status
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
                  {mockAppointmentData.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-24">
                        {appointment.id}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-32">
                        {appointment.patient}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-32">
                        {appointment.doctor}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-28">
                        {appointment.date}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-20">
                        {appointment.time}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 w-32">
                        <div className="max-w-28">
                          <Dropdown
                            className={"w-max"}
                            options={["Pending", "Confirmed", "Cancelled"]}
                            value={appointment.status}
                            onSelect={(value) =>
                              handleStatusChange(appointment.id, value)
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 w-24">
                        <button
                          onClick={() => deleteAppointment(appointment.id)}
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
        <AddAppointment
          onClose={closeModal}
          onAddAppointment={handleAddAppointment}
        />
      </ModalWrapper>
    </div>
  );
}
