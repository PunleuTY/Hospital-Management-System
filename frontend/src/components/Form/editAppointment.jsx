import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "../common/Card.jsx";
import Label from "../common/Label.jsx";
import Input from "../common/Input.jsx";
import Dropdown from "../common/Dropdown.jsx";
import Button from "../common/Button.jsx";
import { SiReacthookform } from "react-icons/si";
import { motion } from "framer-motion";

// API imports
import { getAllPatientIds } from "../../service/patientAPI.js";
import { getAllDoctorIds } from "../../service/staffAPI.js";

export default function EditAppointment({
  onClose,
  onUpdateAppointment,
  initialData,
}) {
  // Helper Function
  // ---------------------------------------------------------------------------

  // Extracts date and time strings from a full dateTime string
  const extractDateTime = (dateTimeStr) => {
    const dateObj = new Date(dateTimeStr);
    const date = dateObj.toISOString().split("T")[0]; // e.g., "2025-07-16"
    const time = dateObj.toISOString().split("T")[1].split("Z")[0]; // e.g., "14:15:00"
    return { date, time };
  };

  // State Management
  // ---------------------------------------------------------------------------

  // Holds the form input data, initialized with initialData
  const [formData, setFormData] = useState({
    appointmentId: initialData.appointmentId || "",
    purpose: initialData.purpose || "",
    date: extractDateTime(initialData.dateTime).date || "",
    time: extractDateTime(initialData.dateTime).time || "",
    DoctorID: initialData.doctorId || "",
    PatientID: initialData.patientId || "",
    status: initialData.status || "Scheduled",
  });

  // Stores fetched patient IDs
  const [patients, setPatients] = useState([]);
  // Stores fetched doctor IDs
  const [doctors, setDoctors] = useState([]);
  // Indicates if data is being loaded for dropdowns
  const [isLoading, setIsLoading] = useState(true);

  // Effects
  // ---------------------------------------------------------------------------

  // Fetches patient and doctor IDs when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        //!NOTE: We need to fetch all patient and doctor IDs to show in the dropdowns.

        //TODO: 1. uncomment lines below and getAllDoctorIds and getAllPatientIds, don't forget to use await
        // const allDoctorIds =
        // const allPatientIds =

        setPatients(allPatientIds.data);
        setDoctors(allDoctorIds.data);
      } catch (error) {
        console.error("Failed to fetch patients and doctors:", error);
        setPatients([]);
        setDoctors([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Runs once on mount

  // Event Handlers
  // ---------------------------------------------------------------------------

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    // Call parent update function if available
    if (onUpdateAppointment && initialData?.appointmentId) {
      //TODO: call onUpdateAppointment and pass initial.appointmentId and formData as parameter, see other components for example.
    }
    // Close the form/modal
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
          <SiReacthookform className="text-2xl text-blue-1000" />
          <h1 className="text-xl font-semibold text-gray-900">
            Appointment Form
          </h1>
        </div>
      </CardHeader>
      {/* Card Content */}
      <CardContent>
        <form className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="space-y-4">
              {/* Purpose of Visit Input */}
              <div>
                <Label required>Purpose of Visit</Label>
                <Input
                  placeholder="What is your purpose ..."
                  value={formData.purpose}
                  onChange={(e) => handleInputChange("purpose", e.target.value)}
                />
              </div>
              {/* Date and Time Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label required>Date</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>
                <div>
                  <Label required>Time</Label>
                  <Input
                    type="time"
                    placeholder="Select appointment time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                  />
                </div>
              </div>
              {/* Patient and Doctor Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label required>Patient</Label>
                  {isLoading ? (
                    <div className="p-2 text-gray-500">Loading patients...</div>
                  ) : (
                    <Dropdown
                      options={patients}
                      defaultLabel={`${formData.PatientID || "Select Patient"}`}
                      onSelect={(selectedLabel) => {
                        const selectedPatient = patients.find(
                          (p) => p.label === selectedLabel
                        );
                        handleInputChange("PatientID", selectedPatient?.value);
                      }}
                    />
                  )}
                </div>
                <div>
                  <Label required>Doctor</Label>
                  {isLoading ? (
                    <div className="p-2 text-gray-500">Loading doctors...</div>
                  ) : (
                    <Dropdown
                      options={doctors}
                      defaultLabel={`${formData.DoctorID || "Select Doctor"}`}
                      onSelect={(selectedLabel) => {
                        const selectedDoctor = doctors.find(
                          (d) => d.label === selectedLabel
                        );
                        handleInputChange("DoctorID", selectedDoctor?.value);
                      }}
                    />
                  )}
                </div>
              </div>
              {/* Status Dropdown */}
              <div>
                <Label required>Status</Label>
                <Dropdown
                  options={["Scheduled", "Completed", "Cancelled"]}
                  defaultLabel={`${formData.status || "Choose Status"}`}
                  onSelect={(value) => handleInputChange("status", value)}
                  value={formData.status}
                />
              </div>
              {/* Edit Appointment Button */}
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Button
                  content={"Edit Appointment"}
                  className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleSubmit}
                  isAddIcon={false}
                />
              </motion.div>
            </div>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
}
