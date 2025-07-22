// React hooks
import { React } from "react";
import { useState, useEffect } from "react";

// Common components
import Button from "./common/Button.jsx";
import PageBlurWrapper from "./common/Blur-wrapper.jsx";
import ModalWrapper from "./common/Modal-wrapper.jsx";
import Confirm from "./common/Confirm.jsx";
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
import { success, error } from "./utils/toast.js";

// Form components
import AddBilling from "./form/addBilling.jsx";
import EditBilling from "./Form/editBilling.jsx";
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
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  // ===== EVENT HANDLERS =====
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (record) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
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

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRecord(null);
  };

  // Update an existing bill
  const handleUpdateBill = async (billId, formData) => {
    try {
      console.log("Updating bill:", billId, formData);
      const response = await updateBill(billId, formData);
      console.log("Bill updated successfully:", response);

      // Refresh the billing list
      fetchAllBilling(currentPage);

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
      if (!billToUpdate) {
        return;
      }

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
    } catch (error) {
      console.error("Failed to update bill status:", error);
    }
  };

  const handleDeleteBill = async (billId) => {
    try {
      const response = await deleteBill(billId);
      console.log("Bill deleted successfully:", response);
      fetchAllBilling(currentPage);
      success("Bill deleted successfully");
      setShowConfirm(false);
    } catch (err) {
      console.error("Failed to delete bill:", err.message);
      error("Failed to delete bill");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAllBilling(page);
  };

  // ===== EFFECTS =====
  useEffect(() => {
    fetchAllBilling(currentPage);
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
                {bills.length > 0 ? (
                  bills.map((bill) => (
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
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
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
                              setDeleteId(bill.billId);
                              setShowConfirm(true);
                            }}
                            title="Delete"
                          >
                            <TiDelete className="w-5 h-5 cursor-pointer" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <div>No bills found</div>
                )}
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

      <Confirm
        open={showConfirm}
        title="Delete Item"
        message="Are you sure?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDeleteBill}
        id={deleteId}
      />

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
