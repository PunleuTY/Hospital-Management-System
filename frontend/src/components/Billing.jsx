// React hooks
import { React } from "react";
import { useState, useEffect } from "react";

// Common components
import Button from "./common/Button.jsx";
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
import AddBilling from "./form/addBilling.jsx";
import BillingView from "./view/BillingView.jsx";

// Icons
import { TiDelete } from "react-icons/ti";

// API services
import {
  getAllBillings,
  createBill,
  summarizeBilling,
} from "../service/billingAPI.js";

export default function Billing() {
  // ===== STATE MANAGEMENT =====
  const [bills, setBills] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [stat, setStat] = useState({
    totalPaid: 0,
    totalUnpaid: 0,
    totalBills: 0,
    totalUnpaidCount: 0,
  });

  const itemsPerPage = 10;

  // ===== CONSTANTS =====
  const header = [
    "Id",
    "Receptionist",
    "Patient",
    "Treatment ($)",
    "Medication ($)",
    "Lab Test ($)",
    "Consultant ($)",
    "Total ($)",
    "Status",
    "Actions",
  ];

  const mockBillsData = [
    {
      id: "B001",
      receptionist: "R001",
      patient: "P001",
      treatmentFee: 150.0,
      medicationFee: 75.5,
      labTestFee: 120.0,
      consultationFee: 200.0,
      total: 545.5,
      status: "paid",
    },
  ];

  // ===== COMPUTED VALUES =====

  // ===== API FUNCTIONS =====
  const fetchAllBilling = async (page = 1) => {
    try {
      const response = await getAllBillings(page, itemsPerPage);
      console.log("Billing API Response:", response);
      setBills(response.data.data);
      setMetaData(response.data.meta || {});
    } catch (err) {
      console.error("Failed to fetch billing:", err.message);
      setBills([]);
      setMetaData({});
    }
  };

  const getStat = async () => {
    try {
      const summary = await summarizeBilling();
      console.log("Summary", summary);
      setStat({
        totalPaid: summary.data.totalPaid || 0,
        totalUnpaid: summary.data.totalUnpaid || 0,
        totalBills: summary.data.totalBills || 0,
        totalUnpaidCount: summary.data.totalUnpaidCount || 0,
      });
    } catch (err) {
      console.error("Failed to fetch billing statistics:", err);
      setStat({
        totalPaid: 0,
        totalUnpaid: 0,
        totalBills: 0,
        totalUnpaidCount: 0,
      });
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

  // Add a new bill
  const handleAddBill = async (formData) => {
    try {
      console.log("Creating bill:", formData);
      const response = await createBill(formData);
      console.log("Bill created successfully:", response);

      // Refresh the billing list
      fetchAllBilling(currentPage);

      // Close the modal
      closeModal();
    } catch (error) {
      console.error("Failed to create bill:", error);
    }
  };

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAllBilling(page);
  };

  // ===== EFFECTS =====
  useEffect(() => {
    fetchAllBilling(currentPage);
    getStat();
  }, []);

  // ===== RENDER =====
  return (
    <div className="h-full overflow-auto p-3">
      {/* Main content with blur effect when modal is open */}
      <PageBlurWrapper isBlurred={isModalOpen}>
        <div className="w-full flex flex-col gap-3 px-1">
          {/* Header section */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Billings</h1>
            <Button content="Create Bill" onClick={openModal} />
          </div>

          {/* Summary Cards section */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatisticCard
              title="Total Income"
              value={`$${stat.totalPaid.toFixed(2)}`}
              subtitle="This month"
              valueColor="text-green-600"
            />
            <StatisticCard
              title="Pending Bills"
              value={`$${stat.totalUnpaid.toFixed(2)}`}
              subtitle={`${stat.totalUnpaidCount} unpaid bills`}
              valueColor="text-orange-600"
            />
            <StatisticCard
              title="Total Bills"
              value={stat.totalBills}
              subtitle="All time"
              valueColor="text-blue-600"
            />
          </div> */}

          {/* Billing Table section - Scrollable container with hidden scrollbar */}
          <div
            className="overflow-x-auto scrollbar-hide bg-white rounded-lg shadow overflow-hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <Table className="min-w-[1000px] w-full">
              {/* Table header */}
              <TableHeader>
                {" "}
                <TableRow>
                  {header.map((h, idx) => (
                    <TableHead
                      key={idx}
                      className="text-xs whitespace-nowrap px-4 py-3 min-w-[100px]"
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              {/* Table body */}
              <TableBody>
                {bills.length > 0
                  ? bills.map((bill) => (
                      <TableRow
                        key={bill.billId}
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <TableCell
                          onClick={() => openViewModal(bill)}
                          className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[80px]"
                        >
                          {bill.billId}
                        </TableCell>
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[120px]">
                          {bill.receptionist?.firstName}{" "}
                          {bill.receptionist?.lastName}
                        </TableCell>
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[120px]">
                          {bill.patient?.firstName} {bill.patient?.lastName}
                        </TableCell>
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap max-w-[100px]">
                          ${bill.treatmentFee?.toFixed(2) || "0.00"}
                        </TableCell>
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap max-w-[100px]">
                          ${bill.medicationFee?.toFixed(2) || "0.00"}
                        </TableCell>
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap max-w-[100px]">
                          ${bill.labTestFee?.toFixed(2) || "0.00"}
                        </TableCell>
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap max-w-[100px]">
                          ${bill.consultationFee?.toFixed(2) || "0.00"}
                        </TableCell>
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap font-bold max-w-[100px]">
                          ${bill.totalAmount?.toFixed(2) || "0.00"}
                        </TableCell>
                        <TableCell
                          className="text-xs px-4 py-3 max-w-[140px]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Dropdown
                            className="w-max"
                            options={["Paid", "Unpaid"]}
                            value={bill.paymentStatus}
                            defaultLabel={bill.paymentStatus}
                            onSelect={(value) =>
                              handleStatusChange(bill.billId, value)
                            }
                          />
                        </TableCell>
                        <TableCell
                          className="text-xs px-4 py-3 whitespace-nowrap max-w-[80px]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteBill(bill.billId)}
                          >
                            <TiDelete className="w-6 h-6 cursor-pointer" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  : mockBillsData.map((bill) => (
                      <TableRow
                        key={bill.id}
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => openViewModal(bill)}
                      >
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[80px]">
                          {bill.id}
                        </TableCell>
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[120px]">
                          {bill.receptionist}
                        </TableCell>
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[120px]">
                          {bill.patient}
                        </TableCell>
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap max-w-[100px]">
                          ${bill.treatmentFee.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap max-w-[100px]">
                          ${bill.medicationFee.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap max-w-[100px]">
                          ${bill.labTestFee.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap max-w-[100px]">
                          ${bill.consultationFee.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap font-bold max-w-[100px]">
                          ${bill.total.toFixed(2)}
                        </TableCell>
                        <TableCell
                          className="text-xs px-4 py-3 max-w-[140px]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Dropdown
                            className="w-max"
                            options={["Paid", "Unpaid"]}
                            value={bill.status}
                            defaultLabel={bill.status}
                            onSelect={(value) =>
                              handleStatusChange(bill.id, value)
                            }
                          />
                        </TableCell>
                        <TableCell
                          className="text-xs px-4 py-3 whitespace-nowrap max-w-[80px]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteBill(bill.id)}
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
            totalItems={metaData.totalItems || 0}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </PageBlurWrapper>

      {/* Add Billing Modal */}
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

      {/* View Billing Details Modal */}
      <ModalWrapper
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        size="lg"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        {selectedRecord && <BillingView data={selectedRecord} />}
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
