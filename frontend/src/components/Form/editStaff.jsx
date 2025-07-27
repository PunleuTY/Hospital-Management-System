import { useState } from "react";

// Common UI components
import Button from "../common/Button";
import Label from "../common/Label";
import Input from "../common/Input";
import Dropdown from "../common/Dropdown";
import { Card, CardHeader, CardContent } from "../common/Card";

export default function EditStaff({ onClose, onUpdateStaff, initialData }) {
  // Set initial form data from props
  const [formData, setFormData] = useState({
    firstName: initialData?.first_name || "",
    lastName: initialData?.last_name || "",
    gender: initialData?.gender || "",
    role: initialData?.role || "",
    contact: initialData?.contact || "",
    specialization: initialData?.specialization || "",
    departmentId: initialData?.department_id || "",
    doctorId: initialData?.doctor_id || "",
  });

  // Update form field value
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (onUpdateStaff && initialData?.staff_id) {
      onUpdateStaff(initialData.staff_id, formData);
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <h1 className="text-xl font-semibold text-gray-900">Edit Staff</h1>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label required>First Name</Label>
              <Input
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>

            <div>
              <Label required>Last Name</Label>
              <Input
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>

            <div>
              <Label required>Gender</Label>
              <Dropdown
                options={["Male", "Female", "Other"]}
                defaultLabel={`${formData.gender || "Select Gender"}`}
                value={formData.gender}
                onSelect={(value) => handleInputChange("gender", value)}
              />
            </div>

            <div>
              <Label required>Role</Label>
              <Dropdown
                options={["Doctor", "Nurse", "Receptionist"]}
                defaultLabel={`${formData.role || "Select Role"}`}
                value={formData.role}
                onSelect={(value) => handleInputChange("role", value)}
              />
            </div>

            <div>
              <Label>Contact</Label>
              <Input
                placeholder="Enter contact"
                value={formData.contact}
                onChange={(e) => handleInputChange("contact", e.target.value)}
              />
            </div>

            {formData.role === "Doctor" && (
              <div>
                <Label>Specialization</Label>
                <Input
                  placeholder="Enter specialization"
                  value={formData.specialization}
                  onChange={(e) =>
                    handleInputChange("specialization", e.target.value)
                  }
                />
              </div>
            )}

            <div>
              <Label>Department ID</Label>
              <Input
                placeholder="Enter department ID"
                value={formData.departmentId}
                onChange={(e) =>
                  handleInputChange("departmentId", e.target.value)
                }
              />
            </div>

            {formData.role !== "Doctor" && (
              <div>
                <Label>Doctor ID (Supervisor)</Label>
                <Input
                  placeholder="Enter doctor ID"
                  value={formData.doctorId}
                  onChange={(e) =>
                    handleInputChange("doctorId", e.target.value)
                  }
                />
              </div>
            )}
          </div>

          {/* Submit button */}
          <div className="mt-6">
            <Button
              content={"Update Staff Record"}
              className="w-full"
              isAddIcon={false}
              onClick={handleSubmit}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
