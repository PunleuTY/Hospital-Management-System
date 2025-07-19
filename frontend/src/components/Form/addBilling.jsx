import React, { useState, useEffect } from "react";
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

export default function AddBilling({ onClose, onAddBill }) {
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

  // Automatically calculate total amount
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Billing form submitted with data:", formData);

    // Use the actual form data structure expected by the API
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

    if (onAddBill) {
      onAddBill(billData);
    }
    if (onClose) {
      onClose();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2">
          <HiOutlineCalculator className="text-2xl text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-900">Billing Form</h1>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {/* Patient and Staff */}
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
                    options={[1, 2, 3]}
                    defaultLabel="Select Patient ID"
                    onSelect={(value) => handleInputChange("patientID", value)}
                  />
                </div>
                <div>
                  <Label required>Receptionist ID</Label>
                  <Dropdown
                    options={["REC001", "REC002", "REC003"]}
                    defaultLabel="Select Receptionist ID"
                    onSelect={(value) =>
                      handleInputChange("receptionistID", value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Billing Fees */}
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

              {/* Payment Status */}
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

              {/* Total Amount */}
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
                    content="Create Billing Record"
                    onClick={handleSubmit}
                    className="w-full"
                    isAddIcon={false}
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
