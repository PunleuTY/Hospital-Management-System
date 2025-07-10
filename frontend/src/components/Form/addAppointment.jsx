import { useState } from "react";
import { Card, CardHeader, CardContent } from "../Common/Card.jsx";
import Label from "../Common/Label.jsx";
import Input from "../Common/Input.jsx";
import Dropdown from "../Common/Dropdown.jsx";
import Button from "../Common/Button.jsx";
import { SiReacthookform } from "react-icons/si";
import { motion } from "framer-motion";

export default function AddAppointment({ onClose, onAddAppointment }) {
  const [formData, setFormData] = useState({
    purposeOfVisit: "",
    preferredDate: "",
    preferredTime: "",
    DoctorID: "",
    PatientID: "",
    status: "pending", // default to pending
  });

  function handlesubmit(e) {
    e.preventDefault();
    const newAppointment = {
      id: `A${Math.floor(Math.random() * 100000)}`,
      patient: formData.PatientID,
      doctor: formData.DoctorID,
      date: formData.preferredDate,
      time: formData.preferredTime,
      status: formData.status || "pending",
      purposeOfVisit: formData.purposeOfVisit,
    };
    if (onAddAppointment) onAddAppointment(newAppointment);
    if (onClose) onClose();
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
                    placeholder="Appointment Time (24:00)"
                    value={formData.preferredTime}
                    onChange={(e) =>
                      handleInputChange("preferredTime", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label required>Patient ID</Label>
                  <Dropdown
                    options={[1, 2, 3, 4, 5]}
                    defaultLabel="Select Patient ID"
                    onSelect={(value) => handleInputChange("PatientID", value)}
                  />
                </div>
                <div>
                  <Label required>Doctor ID</Label>
                  <Dropdown
                    options={[1, 2, 3, 4, 5]}
                    defaultLabel="Select Doctor ID"
                    onSelect={(value) => handleInputChange("DoctorID", value)}
                  />
                </div>
              </div>
              <div>
                <Label required>Status</Label>
                <Dropdown
                  options={["Pending", "Confirmed", "Cancelled"]}
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
                  type="submit"
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
