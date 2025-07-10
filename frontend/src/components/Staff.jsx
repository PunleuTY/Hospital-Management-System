import { React } from "react";
import Button from "./Common/Button";
import { useState, useEffect } from "react";
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
import AddStaff from "./Form/addStaff.jsx";

//API
import { getAllStaffs } from "../service/staffAPI.js";
import { deleteStaff as deleteStaffAPI } from "../service/staffAPI.js";

//Icons
import { TiDelete } from "react-icons/ti";

export default function Staff() {
  const [staff, setStaffs] = useState([]);

  useEffect(() => {
    fetchAllStaff();
  }, []);

  const fetchAllStaff = async () => {
    try {
      const staffs = await getAllStaffs();
      setStaffs(staffs);
    } catch (err) {
      console.error("Failed to fetch staff:", err.message);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const isOpenModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteStaff = async (id) => {
    try {
      await deleteStaffAPI(id);
      setStaffs((prev) => prev.filter((s) => s.staff_id !== id));
    } catch (err) {
      console.error("Failed to delete staff:", err.message);
    }
  };

  const handleAddStaff = (newStaff) => {
    setStaffs((prev) => [...prev, newStaff]);
  };

  const mockStaffData = [
    {
      staff_id: "S001",
      first_name: "Dr. Sarah",
      last_name: "Johnson",
      gender: "Female",
      role: "Doctor",
      contact: "555-0201",
      specialization: "Cardiology",
      department_id: "D001",
      doctor_id: "DOC001",
    },
    {
      staff_id: "S002",
      first_name: "Michael",
      last_name: "Brown",
      gender: "Male",
      role: "Nurse",
      contact: "555-0202",
      specialization: "Emergency Care",
      department_id: "D002",
      doctor_id: null,
    },
    {
      staff_id: "S003",
      first_name: "Dr. Emily",
      last_name: "Davis",
      gender: "Female",
      role: "Doctor",
      contact: "555-0203",
      specialization: "Pediatrics",
      department_id: "D003",
      doctor_id: "DOC003",
    },
    {
      staff_id: "S004",
      first_name: "James",
      last_name: "Wilson",
      gender: "Male",
      role: "Technician",
      contact: "555-0204",
      specialization: "Radiology",
      department_id: "D004",
      doctor_id: null,
    },
    {
      staff_id: "S005",
      first_name: "Dr. Lisa",
      last_name: "Anderson",
      gender: "Female",
      role: "Doctor",
      contact: "555-0205",
      specialization: "Neurology",
      department_id: "D001",
      doctor_id: "DOC005",
    },
  ];

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

  return (
    <div className="h-full overflow-auto p-3">
      <PageBlurWrapper isBlurred={isModalOpen}>
        <div className="w-full flex flex-col gap-3 px-1">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Staff</h1>
            <Button content="Add Staff" onClick={isOpenModal} />
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden w-full">
            <div className="overflow-x-auto no-scrollbar w-full">
              <Table className="w-full table-fixed">
                <TableHeader>
                  <TableRow>
                    {header.map((h, idx) => {
                      const widthClasses = [
                        "w-24", // Id
                        "w-32", // firstname
                        "w-32", // lastname
                        "w-28", // gender
                        "w-20", // role
                        "w-32", // contact
                        "w-32", // specialization
                        "w-24", // dept id
                        "w-24", // doc id
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
                  {mockStaffData.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-24">
                        {staff.staff_id}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-24">
                        {staff.first_name}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-24">
                        {staff.last_name}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-24">
                        {staff.gender}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-24">
                        {staff.role}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-24">
                        {staff.contact}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-24">
                        {staff.specialization}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-24">
                        {staff.department_id}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-24">
                        {staff.doctor_id}
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
        <AddStaff onClose={closeModal} onAddStaff={handleAddStaff} />
      </ModalWrapper>
    </div>
  );
}
