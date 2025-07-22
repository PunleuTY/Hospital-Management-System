import { useState } from "react";
import Button from "../common/Button";
import Label from "../common/Label";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import { Card, CardHeader, CardContent } from "../common/Card";

//Icons
import { RiUserAddLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { GiBodyHeight } from "react-icons/gi";
import { IoIosMailUnread } from "react-icons/io";

export default function EditPatient({ onClose, onUpdatePatient, initialData }) {
  // State Management
  // ---------------------------------------------------------------------------

  // Holds the form input data, initialized with initialData
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    height: initialData?.height || "",
    weight: initialData?.weight || "",
    dateOfBirth: initialData?.dateOfBirth || "",
    address: initialData?.address || "",
    contact: initialData?.contact || "",
    email: initialData?.email || "",
  });

  // Event Handlers
  // ---------------------------------------------------------------------------

  // Updates form data state on input change
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    // Call parent update function if available
    if (onUpdatePatient && initialData?.patientId) {
      onUpdatePatient(initialData.patientId, formData);
    }
    // Close the form/modal
    if (onClose) {
      onClose();
    }
  };

  // Render Logic
  // ---------------------------------------------------------------------------

  return (
    <Card>
      {/* Card Header */}
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <RiUserAddLine className="text-2xl text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-900">Edit Patient</h1>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Personal Information Section */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <FaRegUser className="text-l text-blue-500 gap-2" />
              <h2 className="text-lg font-medium text-gray-900">
                Patient Personal Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label required>First Name</Label>
                <Input
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                />
              </div>

              <div>
                <Label required>Last Name</Label>
                <Input
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                />
              </div>

              <div>
                {/* Date of Birth Input */}
                <Label required>Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Patient Physical Information Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GiBodyHeight className="text-2xl text-blue-500" />
              <h2 className="text-lg font-medium text-gray-900">
                Physical Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label required>Height (meters)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 1.75"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                />
              </div>

              <div>
                <Label required>Weight (kilograms)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 70"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <IoIosMailUnread className="text-2xl text-blue-500" />
              <h2 className="text-lg font-medium text-gray-900">
                Contact Information
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                {/* Address Input */}
                <Label required>Address</Label>
                <Textarea
                  placeholder="Enter complete address including street, city, state, and postal code"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  {/* Phone Number Input */}
                  <Label required>Contact Number</Label>
                  <Input
                    type="tel"
                    placeholder="e.g.,069924540"
                    value={formData.contact}
                    onChange={(e) =>
                      handleInputChange("contact", e.target.value)
                    }
                  />
                </div>

                <div>
                  {/* Email Address Input */}
                  <Label required>Email Address</Label>
                  <Input
                    type="email"
                    placeholder="patient@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <Button
              content={"Update Patient Record"}
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
