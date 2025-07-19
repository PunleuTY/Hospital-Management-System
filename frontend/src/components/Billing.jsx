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
import EditBilling from "./Form/editBilling.jsx";

// Form components
import AddBilling from "./form/addBilling.jsx";
import BillingView from "./view/BillingView.jsx";

// Icons
import { TiDelete } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";

// API services
import {
  getAllBillings,
  createBill,
  updateBill,
  deleteBill,
  summarizeBilling,
} from "../service/billingAPI.js";

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

=======

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


  const openEditModal = (record) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);

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

  const closeEditModal = () => {
    setSelectedRecord(null);
    setIsEditModalOpen(false);
  };

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
    setIsLoading(true);
    try {
      const response = await createBill(formData);
      // Navigate to first page to show the new bill (newest bills usually appear first)
      setCurrentPage(1);

      // Refresh the billing list from first page
      await fetchAllBilling(1);
      await getStat(); // Refresh stats

      // Close the modal
      closeModal();

      // Show success message
      alert("Billing record created successfully!");
    } catch (error) {
      console.error("Failed to create bill:", error);
      alert(
        "Failed to create billing record. Please check your data and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing bill
  const handleUpdateBill = async (billId, formData) => {
    try {
      console.log("Updating bill:", billId, formData);
      const response = await updateBill(billId, formData);
      console.log("Bill updated successfully:", response);

      // Refresh the billing list
      fetchAllBilling(currentPage);
      getStat(); // Refresh stats

      // Close the modal
      closeEditModal();
    } catch (error) {
      console.error("Failed to update bill:", error);
    }
  };

  const handleStatusChange = async (billId, newStatus) => {
    try {
      // Find the bill to update
      const billToUpdate = bills.find((bill) => bill.billId === billId);
      if (!billToUpdate) return;

      // Call API to update
      await updateBill(billId, {
        receptionistId: billToUpdate.receptionistId,
        patientId: billToUpdate.patientId,
        treatmentFee: billToUpdate.treatmentFee,
        medicationFee: billToUpdate.medicationFee,
        labTestFee: billToUpdate.labTestFee,
        consultationFee: billToUpdate.consultationFee,
        totalAmount: billToUpdate.totalAmount,
        paymentStatus: newStatus,
      });

      // Update local state
      setBills((prev) =>
        prev.map((bill) =>
          bill.billId === billId ? { ...bill, paymentStatus: newStatus } : bill
        )
      );

      // Refresh stats
      getStat();
    } catch (error) {
      console.error("Failed to update bill status:", error);
    }
  };

  const handleDeleteBill = async (billId) => {
    try {
      if (
        window.confirm("Are you sure you want to delete this billing record?")
      ) {
        console.log("Deleting bill:", billId);
        await deleteBill(billId);
        console.log("Bill deleted successfully");

        // Remove from local state
        setBills((prev) => prev.filter((bill) => bill.billId !== billId));

        // Refresh stats
        getStat();
      }
    } catch (error) {
      console.error("Failed to delete bill:", error);
    }
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
      <PageBlurWrapper isBlurred={isModalOpen || isEditModalOpen}>
        <div className="w-full flex flex-col gap-3 px-1">
          {/* Header section */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Billings</h1>
            <Button content="Create Bill" onClick={openModal} />
          </div>

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
                        onClick={() => openViewModal(bill)}
                      >
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap truncate max-w-[80px]">
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
                        <TableCell className="text-xs px-4 py-3 max-w-[140px]">
                          <Dropdown
                            className="w-max"
                            options={["Paid", "Unpaid"]}
                            value={
                              bill.paymentStatus?.charAt(0).toUpperCase() +
                                bill.paymentStatus?.slice(1) || "Unpaid"
                            }
                            defaultLabel={
                              bill.paymentStatus?.charAt(0).toUpperCase() +
                                bill.paymentStatus?.slice(1) || "Unpaid"
                            }
                            onSelect={(value) =>
                              handleStatusChange(bill.billId, value)
                            }
                          />
                        </TableCell>
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap max-w-[120px]">
                          <div className="flex items-center gap-2">
                            <button
                              className="text-blue-500 hover:text-blue-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditModal(bill);
                              }}
                              title="Edit"
                            >
                              <FiEdit className="w-4 h-4 cursor-pointer" />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteBill(bill.billId);
                              }}
                              title="Delete"
                            >
                              <TiDelete className="w-5 h-5 cursor-pointer" />
                            </button>
                          </div>
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
                        <TableCell className="text-xs px-4 py-3 max-w-[140px]">
                          <Dropdown
                            className="w-max"
                            options={["Paid", "Unpaid"]}
                            value={
                              bill.status?.charAt(0).toUpperCase() +
                                bill.status?.slice(1) || "Unpaid"
                            }
                            defaultLabel={
                              bill.status?.charAt(0).toUpperCase() +
                                bill.status?.slice(1) || "Unpaid"
                            }
                            onSelect={(value) =>
                              handleStatusChange(bill.id, value)
                            }
                          />
                        </TableCell>
                        <TableCell className="text-xs px-4 py-3 whitespace-nowrap max-w-[120px]">
                          <div className="flex items-center gap-2">
                            <button
                              className="text-blue-500 hover:text-blue-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditModal(bill);
                              }}
                              title="Edit"
                            >
                              <FiEdit className="w-4 h-4 cursor-pointer" />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteBill(bill.id);
                              }}
                              title="Delete"
                            >
                              <TiDelete className="w-5 h-5 cursor-pointer" />
                            </button>
                          </div>
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
        <AddBilling
          onClose={closeModal}
          onAddBill={handleAddBill}
          isLoading={isLoading}
        />
      </ModalWrapper>

      {/* Edit Billing Modal */}
      <ModalWrapper
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        size="md"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        {selectedRecord && (
          <EditBilling
            onClose={closeEditModal}
            onUpdateBill={handleUpdateBill}
            initialData={selectedRecord}
          />
        )}
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
