import { React } from "react";
import { useState } from "react";
import Button from "../Common/Button";
import Dropdown from "../Common/Dropdown";
import Label from "../Common/Label";
import Input from "../Common/Input";
import Textarea from "../Common/Textarea";
import { Card, CardHeader, CardContent } from "../Common/Card";

//Icons
import { RiUserAddLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { GiBodyHeight } from "react-icons/gi";
import { IoIosMailUnread } from "react-icons/io";

export default function AddPatient({ onClose, onAddPatient }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    height: "",
    weight: "",
    date_of_birth: "",
    address: "",
    contact: "",
    email: "",
    staffID: "",
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    alert("Medicalrecord Added Successfully");
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
        <div className="flex items-center justify-center gap-2 mb-2">
          <RiUserAddLine className="text-2xl text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-900">
            Patient Registration Form
          </h1>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handlesubmit} className="space-y-6">
          {/*Patient Personal Information*/}
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
                  value={formData.first_name}
                  onChange={(e) =>
                    handleInputChange("first_name", e.target.value)
                  }
                />
              </div>

              <div>
                <Label required>Last Name</Label>
                <Input
                  placeholder="Enter last name"
                  value={formData.last_name}
                  onChange={(e) =>
                    handleInputChange("last_name", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <div>
                {/*Gender*/}
                <Label required>Gender</Label>
                <Dropdown
                  options={["M", "F"]}
                  defaultLabel="Select gender"
                  value={formData.gender}
                  onSelect={(value) => handleInputChange("gender", value)}
                />
              </div>

              <div>
                {/*DOB*/}
                <Label required>Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) =>
                    handleInputChange("date_of_birth", e.target.value)
                  }
                />
              </div>

              <div>
                {/*Doctor (staff table)*/}
                <Label required>DoctorID</Label>
                <Dropdown
                  options={[1, 2, 3]}
                  defaultLabel="Select staff member"
                  value={formData.staffID}
                  onSelect={(value) => handleInputChange("staffID", value)}
                />
              </div>
            </div>
          </div>

          {/*Patient Physical Information*/}
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

          {/*Contact Information*/}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <IoIosMailUnread className="text-2xl text-blue-500" />
              <h2 className="text-lg font-medium text-gray-900">
                Contact Information
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                {/*Address */}
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
                  {/*Phone Number*/}
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
                  {/*Email Address*/}
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

          {/*Submit Button*/}
          <div className="mt-6">
            <Button
              content={"Create Patient Record"}
              onClick={handlesubmit}
              className="w-full"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
