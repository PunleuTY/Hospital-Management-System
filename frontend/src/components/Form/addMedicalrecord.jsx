import { React } from "react";
import { useState } from "react";
import Button from "../common/Button";
import Dropdown from "../common/Dropdown";
import Label from "../common/Label";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import { Card, CardHeader, CardContent } from "../common/Card";

//Icons
import { FaUserDoctor } from "react-icons/fa6";
import { FaNotesMedical } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";

export default function AddMedicalRecord() {
  const [formData, setFormData] = useState({
    prescription: "",
    diagnosis: "",
    lab_result: "",
    treatment: "",
    appointmentID: "",
    patientID: "",
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("Medical record form submitted with data:", formData);

    if (onAddMedicalRecord) {
      onAddMedicalRecord(formData);
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
          <FaNotesMedical className="text-2xl text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-900">
            Medical Record Form
          </h1>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handlesubmit} className="space-y-6">
          {/*Patient and Staff*/}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <FaUserDoctor className="text-l text-blue-1000" />
              <h2 className="text-lg font-semibold text-gray-900">
                Patient and Staff ID
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label required>Patient ID</Label>
                {/*PatientID from db*/}
                <Dropdown
                  options={[1, 2, 3]}
                  defaultLabel="Select PatientID"
                  onSelect={(value) => handleInputChange("patientID", value)}
                />
              </div>
              <div>
                <Label required>Appointment ID</Label>
                {/*AppointmentID from db*/}
                <Dropdown
                  options={[1, 2, 3]}
                  defaultLabel="Select AppointmentID"
                  onSelect={(value) =>
                    handleInputChange("appointmentID", value)
                  }
                />
              </div>
            </div>
          </div>

          {/*Medical Record Details*/}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <GrNotes className="text-l text-blue-1000" />
              <h2 className="text-lg font-semibold text-gray-900">
                Medical Record Details
              </h2>
            </div>
            <div className="space-y-6">
              {/* Diagnosis */}
              <div>
                <Label required>Diagnosis</Label>
                <Textarea
                  placeholder="Enter detailed diagnosis ..."
                  rows={4}
                  value={formData.diagnosis}
                  onChange={(e) =>
                    handleInputChange("diagnosis", e.target.value)
                  }
                  className="min-h-[100px]"
                />
              </div>

              {/* Treatment */}
              <div>
                <Label required>Treatment Plan</Label>
                <Textarea
                  placeholder="Enter the treatment plan ..."
                  rows={4}
                  value={formData.treatment}
                  onChange={(e) =>
                    handleInputChange("treatment", e.target.value)
                  }
                  className="min-h-[100px]"
                />
              </div>

              {/* Prescription */}
              <div>
                <Label required>Prescription</Label>
                <Textarea
                  placeholder="Enter all prescribed medications ..."
                  rows={5}
                  value={formData.prescription}
                  onChange={(e) =>
                    handleInputChange("prescription", e.target.value)
                  }
                  className="min-h-[120px]"
                />
              </div>

              {/* Lab Results */}
              <div>
                <Label>Laboratory Results</Label>
                <Textarea
                  placeholder="Enter laboratory test ..."
                  rows={4}
                  value={formData.lab_result}
                  onChange={(e) =>
                    handleInputChange("lab_result", e.target.value)
                  }
                  className="min-h-[100px]"
                />
              </div>
            </div>
            {/*Button*/}
            <div className="mt-6">
              <Button
                content={"Create Medical Records"}
                onClick={handlesubmit}
                className="w-full"
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
