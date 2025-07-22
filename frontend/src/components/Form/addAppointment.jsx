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

export default function AddAppointment({ onClose, onAddAppointment }) {
  // State Management
  // ---------------------------------------------------------------------------

  // Holds the form input data
  const [formData, setFormData] = useState({
    purposeOfVisit: "",
    preferredDate: "",
    preferredTime: "",
    DoctorID: "",
    PatientID: "",
    status: "Scheduled",
  });

  // Stores fetched patient IDs
  const [patients, setPatients] = useState([]);
  // Stores fetched doctor IDs
  const [doctors, setDoctors] = useState([]);
  // Indicates if data is being loaded
  const [isLoading, setIsLoading] = useState(true);

  // Effects
  // ---------------------------------------------------------------------------

  // Fetches patient and doctor IDs on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        //!NOTE: We need to fetch all patient and doctor IDs to show in the dropdowns.

        //TODO: 1. uncomment lines below and getAllDoctorIds and getAllPatientIds, don't forget to use await
        // const allDoctorIds =
        // const allPatientIds =

        console.log("Fetched patients:", allPatientIds);
        console.log("Fetched doctors:", allDoctorIds);

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
  const handlesubmit = (e) => {
    e.preventDefault();

    console.log("Appointment form submitted with data:", formData);

    // Basic form validation
    if (
      !formData.PatientID ||
      !formData.DoctorID ||
      !formData.preferredDate ||
      !formData.preferredTime
    ) {
      alert("Please fill in all required fields"); // Consider a custom modal
      return;
    }

    // Combine date and time into a single Date object
    const dateStr = `${formData.preferredDate}T${formData.preferredTime}:00`;
    const dateTime = new Date(dateStr);

    // Validate the date object
    if (isNaN(dateTime.getTime())) {
      throw new Error("Invalid date or time input");
    }

    // Prepare data for parent component
    const appointmentData = {
      patientId: formData.PatientID,
      doctorId: formData.DoctorID,
      dateTime: dateTime.toISOString(),
      purpose: formData.purposeOfVisit,
      status: formData.status || "scheduled",
    };

    console.log("Sending appointment data:", appointmentData);

    // Call parent callbacks
    if (onAddAppointment) {
      //TODO: call onAddAppointment and pass appointmentData as parameter
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
          <SiReacthookform className="text-2xl text-blue-1000" />
          <h1 className="text-xl font-semibold text-gray-900">
            Appointment Form
          </h1>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent>
        <form onSubmit={handlesubmit} className="space-y-6">
          {/* Animated form container */}
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
                  value={formData.purposeOfVisit}
                  onChange={(e) =>
                    handleInputChange("purposeOfVisit", e.target.value)
                  }
                />
              </div>

              {/* Date and Time Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label required>Date</Label>
                  <Input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) =>
                      handleInputChange("preferredDate", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label required>Time</Label>
                  <Input
                    type="time"
                    placeholder="Select appointment time"
                    value={formData.preferredTime}
                    onChange={(e) =>
                      handleInputChange("preferredTime", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Patient and Doctor Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label required>Patient</Label>
                  <Dropdown
                    options={patients}
                    defaultLabel={"Select Patient"}
                    value={formData.PatientID}
                    onSelect={(value) => handleInputChange("PatientID", value)}
                  />
                </div>
                <div>
                  <Label required>Doctor</Label>
                  <Dropdown
                    options={doctors}
                    defaultLabel={"Select Doctor"}
                    value={formData.DoctorID}
                    onSelect={(value) => handleInputChange("DoctorID", value)}
                  />
                </div>
              </div>

              {/* Status Dropdown */}
              <div>
                <Label required>Status</Label>
                <Dropdown
                  options={["Scheduled", "Completed", "Cancelled"]}
                  defaultLabel="Choose Status"
                  onSelect={(value) => handleInputChange("status", value)}
                  value={formData.status}
                />
              </div>

              {/* Create Appointment Button */}
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Button
                  content={"Create Appointment"}
                  className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handlesubmit}
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
