import { useState, useEffect } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Label from "../common/Label";
import Textarea from "../common/Textarea";
import { Card, CardHeader, CardContent } from "../common/Card";
import {
  createMedicalRecord,
  updateMedicalRecord,
  fetchPatients,
  fetchAppointments,
} from "../../service/medicalrecordAPI.js";
import { FaUserDoctor } from "react-icons/fa6";
import { FaNotesMedical } from "react-icons/fa";
import { success, error } from "../utils/toast.js";

export default function AddMedicalRecord({
  onClose,
  onAddMedicalRecord,
  editData = null,
}) {
  // State Management
  // ---------------------------------------------------------------------------

  // Holds the form input data for medical record
  const [formData, setFormData] = useState({
    patientID: editData?.patientId?.toString() || "",
    appointmentID: editData?.appointmentId?.toString() || "",
    diagnosis: editData?.diagnosis || "",
    treatment: editData?.treatment || "",
    prescription: editData?.prescription || "",
    lab_result: editData?.labResult || "",
  });
  // Stores available patient IDs for dropdown
  const [patientOptions, setPatientOptions] = useState([]);
  // Stores available appointment IDs for dropdown
  const [appointmentOptions, setAppointmentOptions] = useState([]);
  // Indicates if form is currently submitting
  const [submitting, setSubmitting] = useState(false);

  // Effects
  // ---------------------------------------------------------------------------

  // Fetches valid patient and appointment IDs on component mount
  useEffect(() => {
    const loadValidIds = async () => {
      try {
        const [pRes, aRes] = await Promise.all([
          fetchPatients(),
          fetchAppointments(),
        ]);
        const rawPatients = pRes.data?.data ?? pRes.data ?? [];
        const rawAppointments = aRes.data?.data ?? aRes.data ?? [];

        // Extract patient IDs
        const patientIds = rawPatients.map((p) =>
          Number(p.patientId ?? p.patient_id)
        );
        // Extract appointment IDs
        const appointmentIds = rawAppointments.map((a) =>
          Number(a.appointmentId ?? a.appointment_id)
        );

        setPatientOptions(patientIds);
        setAppointmentOptions(appointmentIds);
      } catch (err) {
        console.error("Failed to load valid IDs:", err);
      }
    };
    loadValidIds();
  }, []); // Runs once on mount

  // Event Handlers
  // ---------------------------------------------------------------------------

  // Updates form data state on input change
  const handleInputChange = (field, value) => {
    setFormData((f) => ({ ...f, [field]: value }));
  };

  // Handles form submission (create or update medical record)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) {
      return; // Prevent double submission
    }
    setSubmitting(true);

    // Parse and validate IDs
    const pid = parseInt(formData.patientID.trim(), 10);
    const aid = parseInt(formData.appointmentID.trim(), 10);

    if (!pid || !aid) {
      setSubmitting(false);
      return error("Patient ID and Appointment ID must be positive numbers.");
    }

    // Prepare payload for API call
    const payload = {
      patientId: pid,
      appointmentId: aid,
      diagnosis: formData.diagnosis,
      treatment: formData.treatment,
      prescription: formData.prescription,
      labResult: formData.lab_result,
    };

    try {
      // Call appropriate API based on editData presence
      if (editData) {
        await updateMedicalRecord(editData.recordId, payload);
        success("Medical record updated successfully!");
      } else {
        await createMedicalRecord(payload);
        success("Medical record created successfully!");
      }
      onAddMedicalRecord && onAddMedicalRecord(payload); // Notify parent
      onClose && onClose(); // Close form
    } catch (err) {
      console.error("Failed to save medical record:", err);
      error("Error saving medical record.");
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };

  // Render Logic
  // ---------------------------------------------------------------------------

  return (
    <Card>
      {/* Card Header */}
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2">
          <FaNotesMedical className="text-2xl text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-900">
            {editData ? "Update" : "Create"} Medical Record
          </h1>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient and Appointment ID Section */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <FaUserDoctor className="text-l text-blue-1000" />
              <h2 className="text-lg font-semibold text-gray-900">
                Patient and Appointment ID
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label required>Patient ID</Label>
                <Input
                  type="number"
                  placeholder="Enter Patient ID"
                  value={formData.patientID}
                  min="1"
                  onChange={(e) =>
                    handleInputChange("patientID", e.target.value)
                  }
                />
              </div>
              <div>
                <Label required>Appointment ID</Label>
                <Input
                  type="number"
                  placeholder="Enter Appointment ID"
                  value={formData.appointmentID}
                  min="1"
                  onChange={(e) =>
                    handleInputChange("appointmentID", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Diagnosis Input */}
          <div>
            <Label required>Diagnosis</Label>
            <Textarea
              rows={4}
              placeholder="Enter detailed diagnosis …"
              value={formData.diagnosis}
              onChange={(e) => handleInputChange("diagnosis", e.target.value)}
            />
          </div>

          {/* Treatment Plan Input */}
          <div>
            <Label required>Treatment Plan</Label>
            <Textarea
              rows={4}
              placeholder="Enter the treatment plan …"
              value={formData.treatment}
              onChange={(e) => handleInputChange("treatment", e.target.value)}
            />
          </div>

          {/* Prescription Input */}
          <div>
            <Label required>Prescription</Label>
            <Textarea
              rows={5}
              placeholder="Enter prescribed medications …"
              value={formData.prescription}
              onChange={(e) =>
                handleInputChange("prescription", e.target.value)
              }
            />
          </div>

          {/* Laboratory Results Input */}
          <div>
            <Label>Laboratory Results</Label>
            <Textarea
              rows={4}
              placeholder="Enter laboratory test …"
              value={formData.lab_result}
              onChange={(e) => handleInputChange("lab_result", e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <Button
              type="submit"
              disabled={submitting}
              content={
                editData ? "Update Medical Record" : "Create Medical Record"
              }
              className="w-full"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
