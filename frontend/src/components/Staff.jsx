import { React } from 'react';
import Button from './Common/Button'; 
import { useState } from 'react';
import Input from './Common/Input';
import PageBlurWrapper from './Common/Blur-wrapper.jsx'
import ModalWrapper from './Common/Modal-wrapper.jsx';
import StatisticCard from './Common/statisticCard.jsx';
import Dropdown from './Common/Dropdown.jsx';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Common/Table.jsx';
import AddStaff from './Form/addStaff.jsx';

//Icons
import { TiDelete } from "react-icons/ti";

export default function Staff() {
  const [staff, setStaff] = useState([
    {
      "staff_id": "STF001",
      "last_name": "Chan",
      "first_name": "Ratha",
      "gender": "Male",
      "role": "Doctor",
      "contact": "012345678",
      "specialization": "Cardiology",
      "department_id": "DPT01",
      "doctor_id": "DOC1001"
    },
    {
      "staff_id": "STF002",
      "last_name": "Sok",
      "first_name": "Sreyneang",
      "gender": "Female",
      "role": "Nurse",
      "contact": "098765432",
      "specialization": null,
      "department_id": "DPT02",
      "doctor_id": null
    },
    {
      "staff_id": "STF003",
      "last_name": "Kim",
      "first_name": "Piseth",
      "gender": "Male",
      "role": "Surgeon",
      "contact": "092112233",
      "specialization": "Neurosurgery",
      "department_id": "DPT03",
      "doctor_id": "DOC1002"
    },
    {
      "staff_id": "STF004",
      "last_name": "Lim",
      "first_name": "Dara",
      "gender": "Male",
      "role": "Receptionist",
      "contact": "087654321",
      "specialization": null,
      "department_id": "DPT01",
      "doctor_id": null
    },
    {
      "staff_id": "STF005",
      "last_name": "Men",
      "first_name": "Kalyan",
      "gender": "Female",
      "role": "Doctor",
      "contact": "093223344",
      "specialization": "Pediatrics",
      "department_id": "DPT04",
      "doctor_id": "DOC1003"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const isOpenModal = () => {setIsModalOpen(true);}
  const closeModal = () => {setIsModalOpen(false);} 

  const deleteStaff = (id) => {
    setStaff((prev) => prev.filter((s) => s.staff_id !== id))
  }

  const handleAddStaff = (newStaff) => {
    setStaff((prev) => [...prev, newStaff]);
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <PageBlurWrapper isBlurred={isModalOpen}>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-2xl font-bold text-gray-800'>Staff List</h1>
            <Button content="Add Staff" onClick={isOpenModal} />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='bg-gray-200 sticky z-5'>Staff ID</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>First Name</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>Last Name</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>Gender</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>Role</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>Contact</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>Specialization</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>Department_ID</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>Doctor_ID</TableHead>
              <TableHead className='bg-gray-200 sticky z-5'>Actions</TableHead>
            </TableRow>
          </TableHeader>  
          <TableBody>
            {staff.map((s) => (
              <TableRow key={s.staff_id}>
                <TableCell>{s.staff_id}</TableCell>
                <TableCell>{s.first_name}</TableCell>
                <TableCell>{s.last_name}</TableCell>
                <TableCell>{s.gender}</TableCell>
                <TableCell>{s.role}</TableCell>
                <TableCell>{s.contact}</TableCell>
                <TableCell>{s.specialization}</TableCell>
                <TableCell>{s.department_id}</TableCell>
                <TableCell>{s.doctor_id}</TableCell>
                <TableCell>
                  <button className='text-red-500 hover:text-red-700' onClick={() => deleteStaff(s.staff_id)}>
                    <TiDelete className='w-8 h-8' />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageBlurWrapper>

      <ModalWrapper
        isOpen={isModalOpen}
        onClose={closeModal}
        size='md'
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        <AddStaff onClose={closeModal} onAddStaff={handleAddStaff} />
      </ModalWrapper>
    </div>

  );
};
