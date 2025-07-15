import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "../common/Card.jsx";
import Label from "../common/Label.jsx";
import Input from "../common/Input.jsx";
import Dropdown from "../common/Dropdown.jsx";
import Button from "../common/Button.jsx";
import { SiReacthookform } from "react-icons/si";
import { motion } from "framer-motion";

// API imports
import { getAllPatients, getAllPatientIds } from "../../service/patientAPI.js";
import { getAllStaffs, getAllDoctorIds } from "../../service/staffAPI.js";

export default function AddAppointment({ onClose, onAddAppointment }) {
  const [formData, setFormData] = useState({
    purposeOfVisit: "",
    preferredDate: "",
    preferredTime: "",
    DoctorID: "",
    PatientID: "",
    status: "pending", // default to pending
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch patients and doctors when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const allDoctorIds = await getAllDoctorIds();
        const allPatientIds = await getAllPatientIds();
        console.log("Fetched patients:", allPatientIds);
        console.log("Fetched doctors:", allDoctorIds);
        setPatients(allPatientIds);
        setDoctors(allDoctorIds);
      } catch (error) {
        console.error("Failed to fetch patients and doctors:", error);
        setPatients([]);
        setDoctors([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  function handlesubmit(e) {
    e.preventDefault();

    console.log("Appointment form submitted with data:", formData);

    // Validation
    if (
      !formData.PatientID ||
      !formData.DoctorID ||
      !formData.preferredDate ||
      !formData.preferredTime
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Pass the actual form data to the parent component
    const appointmentData = {
      patientId: formData.PatientID,
      doctorId: formData.DoctorID,
      dateTime: `${formData.preferredDate}T${formData.preferredTime}:00`,
      purpose: formData.purposeOfVisit,
      status: formData.status || "scheduled",
    };

    console.log("Sending appointment data:", appointmentData);

    if (onAddAppointment) {
      onAddAppointment(appointmentData);
    }
    if (onClose) {
      onClose();
    }
  }

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
          <SiReacthookform className="text-2xl text-blue-1000" />
          <h1 className="text-xl font-semibold text-gray-900">
            Appointment Form
          </h1>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlesubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="space-y-4">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label required>Patient</Label>
                  {isLoading ? (
                    <div className="p-2 text-gray-500">Loading patients...</div>
                  ) : (
                    <Dropdown
                      options={patients.map((p) => p.label)}
                      defaultLabel="Select Patient"
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
                      options={doctors.map((d) => d.label)}
                      defaultLabel="Select Doctor"
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
              <div>
                <Label required>Status</Label>
                <Dropdown
                  options={["Scheduled", "Completed", "Cancelled"]}
                  defaultLabel="Choose Status"
                  onSelect={(value) => handleInputChange("status", value)}
                  value={formData.status}
                />
              </div>
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
