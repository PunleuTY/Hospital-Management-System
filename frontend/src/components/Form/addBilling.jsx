import { useState, useEffect } from "react";
import Button from "../common/Button";
import Dropdown from "../common/Dropdown";
import Label from "../common/Label";
import Input from "../common/Input";
import { Card, CardHeader, CardContent } from "../common/Card";
import { motion } from "framer-motion";

// Icons
import { HiOutlineCalculator } from "react-icons/hi";
import { FaUserDoctor } from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

// API imports
import { getAllPatientIds } from "../../service/patientAPI";
import { getAllReceptionistIds } from "../../service/staffAPI";

export default function AddBilling({ onClose, onAddBill, isLoading }) {
  // State Management
  // ---------------------------------------------------------------------------

  // Holds the form input data for billing
  const [formData, setFormData] = useState({
    patientID: "",
    receptionistID: "",
    treatmentFee: "",
    medicationFee: "",
    labTestFee: "",
    consultationFee: "",
    totalAmount: "",
    paymentStatus: "",
  });

  // Stores fetched patient IDs
  const [patientIds, setPatientIds] = useState([]);
  // Stores fetched receptionist IDs
  const [receptionistIds, setReceptionistIds] = useState([]);

  // Effects
  // ---------------------------------------------------------------------------

  // Fetches patient and receptionist IDs on component mount
  useEffect(() => {
    const fetchIds = async () => {
      try {
        // Fetch patients, handle potential errors
        let patients;
        try {
          patients = await getAllPatientIds();
        } catch (patientError) {
          console.error("Error fetching patients:", patientError);
          patients = [];
        }

        // Fetch receptionists, handle potential errors
        let receptionists;
        try {
          receptionists = await getAllReceptionistIds();
        } catch (receptionistError) {
          console.error("Error fetching receptionists:", receptionistError);
          receptionists = [];
        }

        // Process and set patient IDs
        const processedPatients = Array.isArray(patients?.data)
          ? patients.data
          : Array.isArray(patients)
          ? patients
          : [];
        setPatientIds(processedPatients);

        // Process and set receptionist IDs
        let processedReceptionists = [];
        if (Array.isArray(receptionists)) {
          processedReceptionists = receptionists.map((r) => {
            const id =
              typeof r === "object" ? r?.staffId || r?.staff_id || r?.id : r;
            return id?.toString();
          });
        } else if (receptionists?.data && Array.isArray(receptionists.data)) {
          processedReceptionists = receptionists.data.map((r) => {
            const id =
              typeof r === "object" ? r?.staffId || r?.staff_id || r?.id : r;
            return id?.toString();
          });
        } else {
          console.log("Receptionists format not recognized:", receptionists);
        }
        setReceptionistIds(processedReceptionists);
      } catch (error) {
        console.error("Error fetching IDs:", error);
      }
    };
    fetchIds();
  }, []); // Runs once on mount

  // Automatically calculates total amount when fees change
  useEffect(() => {
    const total =
      Number(formData.treatmentFee) +
      Number(formData.medicationFee) +
      Number(formData.labTestFee) +
      Number(formData.consultationFee);
    setFormData((prev) => ({
      ...prev,
      totalAmount: isNaN(total) ? "" : total,
    }));
  }, [
    formData.treatmentFee,
    formData.medicationFee,
    formData.labTestFee,
    formData.consultationFee,
  ]);

  // Event Handlers
  // ---------------------------------------------------------------------------

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Billing form submitted with data:", formData);

    // Basic form validation
    if (!formData.patientID) {
      alert("Please select a Patient ID");
      return;
    }
    if (!formData.receptionistID) {
      alert("Please select a Receptionist ID");
      return;
    }
    if (!formData.treatmentFee || formData.treatmentFee <= 0) {
      alert("Please enter a valid Treatment Fee");
      return;
    }
    if (!formData.medicationFee || formData.medicationFee <= 0) {
      alert("Please enter a valid Medication Fee");
      return;
    }
    if (!formData.labTestFee || formData.labTestFee <= 0) {
      alert("Please enter a valid Lab Test Fee");
      return;
    }
    if (!formData.consultationFee || formData.consultationFee <= 0) {
      alert("Please enter a valid Consultation Fee");
      return;
    }
    if (!formData.paymentStatus) {
      alert("Please select a Payment Status");
      return;
    }

    console.log("Billing form submitted with data:", formData);
    // Prepare data for parent component
    const billData = {
      receptionistId: formData.receptionistID,
      patientId: formData.patientID,
      treatmentFee: Number(formData.treatmentFee),
      medicationFee: Number(formData.medicationFee),
      labTestFee: Number(formData.labTestFee),
      consultationFee: Number(formData.consultationFee),
      totalAmount: Number(formData.totalAmount),
      paymentStatus: formData.paymentStatus.toLowerCase(),
    };

    // Call parent callbacks
    if (onAddBill) {
      onAddBill(billData);
    }
    if (onClose) {
      onClose();
    }
  };

  // Updates form data state on input change
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Render Logic
  // ---------------------------------------------------------------------------

  return (
    <Card>
      {/* Card Header */}
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2">
          <HiOutlineCalculator className="text-2xl text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-900">Billing Form</h1>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Animated form container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {/* Patient and Staff ID Section */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <FaUserDoctor className="text-l text-blue-1000" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Patient and Staff ID
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label required>Patient ID</Label>
                  <Dropdown
                    options={patientIds}
                    defaultLabel="Select Patient ID"
                    onSelect={(value) => handleInputChange("patientID", value)}
                  />
                </div>
                <div>
                  <Label required>Receptionist ID</Label>
                  {console.log(
                    "Dropdown receptionistIds prop:",
                    receptionistIds
                  )}
                  <Dropdown
                    options={receptionistIds}
                    defaultLabel="Select Receptionist ID"
                    onSelect={(value) =>
                      handleInputChange("receptionistID", value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Billing Fees Section */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <RiMoneyDollarCircleLine className="text-2xl text-blue-1000" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Billing Fees
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <Label required>Treatment Fee</Label>
                  <Input
                    type="number"
                    placeholder="Enter Treatment Fee"
                    value={formData.treatmentFee}
                    onChange={(e) =>
                      handleInputChange("treatmentFee", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label required>Medication Fee</Label>
                  <Input
                    type="number"
                    placeholder="Enter Medication Fee"
                    value={formData.medicationFee}
                    onChange={(e) =>
                      handleInputChange("medicationFee", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label required>Lab Test Fee</Label>
                  <Input
                    type="number"
                    placeholder="Enter Lab Test Fee"
                    value={formData.labTestFee}
                    onChange={(e) =>
                      handleInputChange("labTestFee", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label required>Consultation Fee</Label>
                  <Input
                    type="number"
                    placeholder="Enter Consultation Fee"
                    value={formData.consultationFee}
                    onChange={(e) =>
                      handleInputChange("consultationFee", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Payment Status Dropdown */}
              <div className="mt-4">
                <Label required>Payment Status</Label>
                <Dropdown
                  options={["Paid", "Unpaid", "Pending"]}
                  defaultLabel="Select Payment Status"
                  onSelect={(value) =>
                    handleInputChange("paymentStatus", value)
                  }
                />
              </div>

              {/* Total Amount Input (Read-only) */}
              <div className="mt-4">
                <Label>Total Amount</Label>
                <Input
                  type="number"
                  placeholder="$ Total Amount"
                  value={formData.totalAmount}
                  readOnly
                />
              </div>

              {/* Submit Button */}
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <div className="mt-6">
                  <Button
                    content={
                      isLoading ? "Creating..." : "Create Billing Record"
                    }
                    onClick={handleSubmit}
                    className="w-full"
                    isAddIcon={false}
                    disabled={isLoading}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
}
