import { React } from "react";
import Button from "./Common/Button";
import { useState, useEffect } from "react";
//import Input from './Common/Input';
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

//API
import { getAllBillings } from "../service/billingAPI.js";

//Icons
import { TiDelete } from "react-icons/ti";

export default function Billing() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchAllBilling();
  }, []);

  const fetchAllBilling = async () => {
    try {
      const billings = await getAllBillings();
      setBills(billings);
    } catch (err) {
      console.error("Failed to fetch billing data:", err.message);
    }
  };

  // Add a new bill
  const handleAddBill = (newBill) => {
    setBills((prev) => [...prev, newBill]);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleStatusChange = (billId, newStatus) => {
    setBills((prev) =>
      prev.map((bill) =>
        bill.id === billId ? { ...bill, status: newStatus } : bill
      )
    );
  };

  const handleDeleteBill = (billId) => {
    setBills((prev) => prev.filter((bill) => bill.id !== billId));
  };

  const header = [
    "Id",
    "Receptionist Id",
    "Patient Id",
    "Treatment",
    "Medication",
    "Lab Test",
    "Consultant",
    "Total",
    "Status",
    "Actions",
  ];

  const mockBillsData = [
    {
      id: "B001",
      receptionist_id: "R001",
      patient_id: "P001",
      treatment_fee: 150.0,
      medication_fee: 75.5,
      lab_test_fee: 120.0,
      consultant_fee: 200.0,
      total_amount: 545.5,
      status: "paid",
    },
    {
      id: "B002",
      receptionist_id: "R002",
      patient_id: "P002",
      treatment_fee: 89.0,
      medication_fee: 45.25,
      lab_test_fee: 95.0,
      consultant_fee: 180.0,
      total_amount: 409.25,
      status: "unpaid",
    },
    {
      id: "B003",
      receptionist_id: "R001",
      patient_id: "P003",
      treatment_fee: 220.0,
      medication_fee: 120.75,
      lab_test_fee: 85.0,
      consultant_fee: 250.0,
      total_amount: 675.75,
      status: "pending",
    },
    {
      id: "B004",
      receptionist_id: "R003",
      patient_id: "P004",
      treatment_fee: 320.0,
      medication_fee: 89.5,
      lab_test_fee: 150.0,
      consultant_fee: 300.0,
      total_amount: 859.5,
      status: "paid",
    },
    {
      id: "B005",
      receptionist_id: "R002",
      patient_id: "P005",
      treatment_fee: 75.0,
      medication_fee: 35.25,
      lab_test_fee: 65.0,
      consultant_fee: 150.0,
      total_amount: 325.25,
      status: "unpaid",
    },
  ];

  // Calculate summary statistics
  const totalIncome = bills
    .filter((bill) => bill.status === "paid")
    .reduce((sum, bill) => sum + bill.total_amount, 0);
  const pendingAmount = bills
    .filter((bill) => bill.status === "unpaid")
    .reduce((sum, bill) => sum + bill.total_amount, 0);
  const unpaidCount = bills.filter((bill) => bill.status === "unpaid").length;
  const totalBills = bills.length;

  return (
    <div className="h-full overflow-auto p-3">
      <PageBlurWrapper isBlurred={isModalOpen}>
        <div className="w-full flex flex-col gap-3 px-1">
          {/*Header*/}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Billings</h1>
            <Button content="Create Bill" onClick={openModal} />
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <StatisticCard
              title="Total Bills"
              value={totalBills}
              subtitle="All time"
              valueColor="text-blue-600"
            />
          </div>

          {/* Billing Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    {header.map((h, idx) => {
                      const widthClasses = [
                        "w-20", // Id
                        "w-28", // Receptionist id
                        "w-24", // Patient id
                        "w-24", // Treatment
                        "w-24", // Medication
                        "w-24", // Lab fee
                        "w-24", // Consultant
                        "w-24", // Total
                        "w-32", // Status
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
                  {mockBillsData.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-20">
                        {bill.id}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-28">
                        {bill.receptionist_id}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-24">
                        {bill.patient_id}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-24">
                        ${bill.treatment_fee.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-24">
                        ${bill.medication_fee.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-24">
                        ${bill.lab_test_fee.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-24">
                        ${bill.consultant_fee.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap w-24 font-bold">
                        ${bill.total_amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 w-32">
                        <div className="max-w-28">
                          <Dropdown
                            className={"w-max"}
                            options={["pending", "paid", "unpaid"]}
                            value={bill.status}
                            onSelect={(value) =>
                              handleStatusChange(bill.id, value)
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 w-24">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteBill(bill.id)}
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
        <AddBilling onClose={closeModal} onAddBill={handleAddBill} />
      </ModalWrapper>
    </div>
  );
}
