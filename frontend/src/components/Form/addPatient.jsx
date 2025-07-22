import { useState } from "react";

// Common UI components
import Button from "../common/Button";
import Label from "../common/Label";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import { Card, CardHeader, CardContent } from "../common/Card";

// Icons
import { RiUserAddLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { GiBodyHeight } from "react-icons/gi";
import { IoIosMailUnread } from "react-icons/io";

export default function AddPatient({ onClose, onAddPatient }) {
  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    height: "",
    weight: "",
    dateOfBirth: "",
    address: "",
    contact: "",
    email: "",
  });

  // Handle input field change
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    onAddPatient(formData);
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <RiUserAddLine className="text-2xl text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-900">
            Patient Registration Form
          </h1>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Personal Information */}
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

          {/* Patient Physical Information */}
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

          {/* Contact Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <IoIosMailUnread className="text-2xl text-blue-500" />
              <h2 className="text-lg font-medium text-gray-900">
                Contact Information
              </h2>
            </div>

            <div className="space-y-4">
              <div>
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
              content={"Create Patient Record"}
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
