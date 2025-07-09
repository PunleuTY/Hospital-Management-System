import { React } from 'react';
import Button from './Common/Button'; 
import { useState } from 'react';
//import Input from './Common/Input';
import PageBlurWrapper from './Common/Blur-wrapper.jsx'
import ModalWrapper from './Common/Modal-wrapper.jsx';
import StatisticCard from './Common/statisticCard.jsx';
import Dropdown from './Common/Dropdown.jsx';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Common/Table.jsx';
import AddBilling from './Form/addBilling.jsx';


//Icons
import { TiDelete } from "react-icons/ti";

export default function Billing() {
    const [bills, setBills] = useState([
        {
        id: "B001",
        receptionist_id: "REC001",
        patient_id: "PAT001",
        treatment_fee: 150.0,
        medication_fee: 50.0,
        lab_test_fee: 75.0,
        consultant_fee: 100.0,
        total_amount: 375.0,
        status: "paid",
        },
        {
        id: "B002",
        receptionist_id: "REC002",
        patient_id: "PAT002",
        treatment_fee: 200.0,
        medication_fee: 30.0,
        lab_test_fee: 0.0,
        consultant_fee: 120.0,
        total_amount: 350.0,
        status: "unpaid",
        },
        {
        id: "B003",
        receptionist_id: "REC001",
        patient_id: "PAT003",
        treatment_fee: 300.0,
        medication_fee: 80.0,
        lab_test_fee: 150.0,
        consultant_fee: 150.0,
        total_amount: 680.0,
        status: "paid",
        },
        {
        id: "B004",
        receptionist_id: "REC003",
        patient_id: "PAT004",
        treatment_fee: 100.0,
        medication_fee: 25.0,
        lab_test_fee: 50.0,
        consultant_fee: 80.0,
        total_amount: 255.0,
        status: "pending",
        },
        {
        id: "B005",
        receptionist_id: "REC002",
        patient_id: "PAT005",
        treatment_fee: 180.0,
        medication_fee: 40.0,
        lab_test_fee: 100.0,
        consultant_fee: 110.0,
        total_amount: 430.0,
        status: "unpaid",
        },
    ])

    // Add a new bill
    const handleAddBill = (newBill) => {
        setBills((prev) => [...prev, newBill]);
    };

    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)


    const handleStatusChange = (billId, newStatus) => {
        setBills((prev) => prev.map((bill) => (bill.id === billId ? { ...bill, status: newStatus } : bill)))
    }

    const handleDeleteBill = (billId) => {
        setBills((prev) => prev.filter((bill) => bill.id !== billId))
    }

    // Calculate summary statistics
    const totalIncome = bills.filter((bill) => bill.status === "paid").reduce((sum, bill) => sum + bill.total_amount, 0)
    const pendingAmount = bills
        .filter((bill) => bill.status === "unpaid")
        .reduce((sum, bill) => sum + bill.total_amount, 0)
    const unpaidCount = bills.filter((bill) => bill.status === "unpaid").length
    const totalBills = bills.length





    return (
        <div className='min-h-screen bg-gray-50 p-6'>
            <PageBlurWrapper isBlurred={isModalOpen}>
                <div className='max-w-7xl mx-auto'>
                    {/*Header*/}
                    <div className='flex items-center justify-between mb-4'>
                        <h1 className='text-3xl font-bold'>Billings</h1>
                        <Button
                            content="Create Bill"
                            onClick={openModal}
                        /> 
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatisticCard
                            title="Total Income"
                            value={`$${totalIncome.toFixed(2)}`}
                            subtitle="This month"
                            valueColor="text-green-600"
                        />
                        <StatisticCard
                            title="Pending Bills"
                            value={`$${pendingAmount.toFixed(2)}`}
                            subtitle={`${unpaidCount} unpaid bills`}
                            valueColor="text-orange-600"
                        />
                        <StatisticCard title="Total Bills" value={totalBills} subtitle="All time" valueColor="text-blue-600" />
                    </div>


                    {/* Billing Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead className="min-w-[100px]">Bill ID</TableHead>
                                    <TableHead className="min-w-[120px]">Receptionist ID</TableHead>
                                    <TableHead className="min-w-[100px]">Patient ID</TableHead>
                                    <TableHead className="min-w-[120px]">Treatment Fee</TableHead>
                                    <TableHead className="min-w-[130px]">Medication Fee</TableHead>
                                    <TableHead className="min-w-[120px]">Lab Test Fee</TableHead>
                                    <TableHead className="min-w-[130px]">Consultant Fee</TableHead>
                                    <TableHead className="min-w-[120px]">Total Amount</TableHead>
                                    <TableHead className="min-w-[100px]">Status</TableHead>
                                    <TableHead className="min-w-[80px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bills.map((bill) => (
                                        <TableRow key={bill.id}>
                                            <TableCell className="font-medium">{bill.id}</TableCell>
                                            <TableCell>{bill.receptionist_id}</TableCell>
                                            <TableCell>{bill.patient_id}</TableCell>
                                            <TableCell className="font-medium">${bill.treatment_fee.toFixed(2)}</TableCell>
                                            <TableCell className="font-medium">${bill.medication_fee.toFixed(2)}</TableCell>
                                            <TableCell className="font-medium">${bill.lab_test_fee.toFixed(2)}</TableCell>
                                            <TableCell className="font-medium">${bill.consultant_fee.toFixed(2)}</TableCell>
                                            <TableCell className="font-bold text-lg">${bill.total_amount.toFixed(2)}</TableCell>
                                            <TableCell>
                                            <Dropdown
                                                options={["pending","paid","unpaid"]}
                                                defaultLabel='Select Status'
                                                value={bill.status}
                                                onSelect={(value) => handleStatusChange(bill.id, value)}
                                                
                                            />
                                                
                                            </TableCell>
                                            <TableCell>
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleDeleteBill(bill.id)}
                                                >
                                                    <TiDelete className='w-8 h-8'/>;
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
                <AddBilling onClose={closeModal} onAddBill={handleAddBill}/>
            </ModalWrapper>
        </div>
    );
}