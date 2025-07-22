import { useState, useEffect } from "react";

// Common components
import Button from "./common/Button.jsx";
import PageBlurWrapper from "./common/Blur-wrapper.jsx";
import ModalWrapper from "./common/Modal-wrapper.jsx";
import Confirm from "./common/Confirm.jsx";
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
import EditBilling from "./form/editBilling.jsx";
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
} from "../service/billingAPI.js";

export default function Billing() {
  // State Management
  // ---------------------------------------------------------------------------

  // Stores the list of billing records
  const [bills, setBills] = useState([]);
  // Stores pagination metadata
  const [metaData, setMetaData] = useState({});
  // Current page for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Controls visibility of Add Billing modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Controls visibility of Edit Billing modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // Stores the selected record for edit/view
  const [selectedRecord, setSelectedRecord] = useState(null);
  // Controls visibility of Billing View modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  // Indicates loading state for API operations
  const [isLoading, setIsLoading] = useState(false);
  // Controls visibility of confirmation dialog for deletion
  const [showConfirm, setShowConfirm] = useState(false);
  // Stores the ID of the item to be deleted
  const [deleteId, setDeleteId] = useState(null);

  // Number of items to display per page
  const itemsPerPage = 10;

  // Constants
  // ---------------------------------------------------------------------------

  // Table header columns
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

  // API Functions
  // ---------------------------------------------------------------------------

  // Fetches all billing records from the API
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

  // Event Handlers
  // ---------------------------------------------------------------------------

  // Opens the Add Billing modal
  const openModal = () => setIsModalOpen(true);
  // Closes the Add Billing modal
  const closeModal = () => setIsModalOpen(false);

  // Opens the Edit Billing modal with selected record data
  const openEditModal = (record) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  // Opens the Billing View modal with selected record data
  const openViewModal = (record) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  // Closes the Billing View modal
  const closeViewModal = () => {
    setSelectedRecord(null);
    setIsViewModalOpen(false);
  };

  // Handles adding a new bill
  const handleAddBill = async (formData) => {
    setIsLoading(true);
    try {
      await createBill(formData);
      setCurrentPage(1); // Navigate to first page to show the new bill
      await fetchAllBilling(1); // Refresh the billing list
      closeModal(); // Close the modal
      success("Billing record created successfully"); // Show success message
    } catch (error) {
      console.error("Failed to create bill:", error);
      error(
        "Failed to create billing record. Please check your data and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Closes the Edit Billing modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRecord(null);
  };

  // Determines status badge color based on status string
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "unpaid":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handles updating an existing bill
  const handleUpdateBill = async (billId, formData) => {
    try {
      console.log("Updating bill:", billId, formData);
      await updateBill(billId, formData);
      console.log("Bill updated successfully");
      fetchAllBilling(currentPage); // Refresh the billing list
      closeEditModal(); // Close the modal
      success("Billing record updated successfully");
    } catch (error) {
      console.error("Failed to update bill:", error);
      error("Failed to update billing record.");
    }
  };

  // Handles changing the payment status of a bill
  const handleStatusChange = async (billId, newStatus) => {
    try {
      const billToUpdate = bills.find((bill) => bill.billId === billId);
      if (!billToUpdate) {
        return;
      }

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

      // Update local state to reflect status change
      setBills((prev) =>
        prev.map((bill) =>
          bill.billId === billId ? { ...bill, paymentStatus: newStatus } : bill
        )
      );
      success("Bill status updated successfully");
    } catch (error) {
      console.error("Failed to update bill status:", error);
      error("Failed to update bill status.");
    }
  };

  // Handles deleting a bill
  const handleDeleteBill = async (billId) => {
    try {
      await deleteBill(billId);
      console.log("Bill deleted successfully");
      fetchAllBilling(currentPage); // Refresh the billing list
      success("Bill deleted successfully");
      setShowConfirm(false); // Close confirmation dialog
    } catch (err) {
      console.error("Failed to delete bill:", err.message);
      error("Failed to delete bill");
    }
  };

  // Handles page change for pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAllBilling(page);
  };

  // Effects
  // ---------------------------------------------------------------------------

  // Fetches billing data on initial render and when currentPage changes
  useEffect(() => {
    fetchAllBilling(currentPage);
  }, [currentPage]); // Dependency on currentPage to refetch data

  // Render Logic
  // ---------------------------------------------------------------------------

  return (
    <div className="h-full overflow-auto p-3">
      {/* Main content with blur effect when modal is open */}
      <PageBlurWrapper
        isBlurred={isModalOpen || isEditModalOpen || isViewModalOpen}
      >
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
                        ${Number(bill.treatmentFee)?.toFixed(2) || "0.00"}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap max-w-[100px]">
                        ${Number(bill.medicationFee)?.toFixed(2) || "0.00"}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap max-w-[100px]">
                        ${Number(bill.labTestFee)?.toFixed(2) || "0.00"}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap max-w-[100px]">
                        ${Number(bill.consultationFee)?.toFixed(2) || "0.00"}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 whitespace-nowrap font-bold max-w-[100px]">
                        ${Number(bill.totalAmount)?.toFixed(2) || "0.00"}
                      </TableCell>
                      <TableCell className="text-xs px-4 py-3 max-w-[140px]">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            bill.paymentStatus
                          )}`}
                        >
                          {bill.paymentStatus}
                        </span>
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
                  <TableRow>
                    <TableCell
                      colSpan={header.length}
                      className="text-center py-4 text-gray-500"
                    >
                      No bills found
                    </TableCell>
                  </TableRow>
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
        <div
          style={{ maxHeight: "80vh", overflowY: "auto" }}
          className="scrollbar-hide"
        >
          <AddBilling
            onClose={closeModal}
            onAddBill={handleAddBill}
            isLoading={isLoading}
          />
        </div>
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
          <div
            style={{ maxHeight: "80vh", overflowY: "auto" }}
            className="scrollbar-hide"
          >
            <EditBilling
              onClose={closeEditModal}
              onUpdateBill={handleUpdateBill}
              initialData={selectedRecord}
            />
          </div>
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
