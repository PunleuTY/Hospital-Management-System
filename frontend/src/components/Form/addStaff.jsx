import { React } from "react";
import { useState } from "react";
import Button from "../common/Button";
import Dropdown from "../common/Dropdown";
import Label from "../common/Label";
import Input from "../common/Input";
import { Card, CardHeader, CardContent } from "../common/Card";
import { motion } from "framer-motion";
//Icons
import { MdOutlineGroups } from "react-icons/md";
import { GiNetworkBars } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";

export default function AddStaff({ onClose, onAddStaff }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    role: "",
    contact: "",
    specialization: "",
    department_id: "",
    doctor_id: "",
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("Staff form submitted with data:", formData);

    // Pass the actual form data
    if (onAddStaff) onAddStaff(formData);
    if (onClose) onClose();
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
          <MdOutlineGroups className="text-3xl text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-900">New Staff</h1>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handlesubmit} className="space-y-6">
          {/*Staff Information*/}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <FaRegUser className="text-l text-blue-500" />
                  <h2 className="text-lg font-medium text-gray-900">
                    Staff Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label required>First Name</Label>
                    <Input
                      type="text"
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
                      type="text"
                      placeholder="Enter last name"
                      value={formData.last_name}
                      onChange={(e) =>
                        handleInputChange("last_name", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label required>Gender</Label>
                    <Dropdown
                      options={["Male", "Female"]}
                      defaultLabel="Select your Gender"
                      value={formData.gender}
                      onSelect={(value) => handleInputChange("gender", value)}
                    />
                  </div>

                  <div>
                    <Label required>Contact Number</Label>
                    <Input
                      type="number"
                      placeholder="Phone number(e.g.069 924 540)"
                      value={formData.contact}
                      onChange={(e) =>
                        handleInputChange("contact", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/*Job Information*/}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <GiNetworkBars className="text-l text-blue-500" />
                  <h2 className="text-lg font-medium text-gray-900">
                    Job Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label required>Role/Position</Label>
                    <Input
                      type="text"
                      placeholder="Enter your role/postion"
                      value={formData.role}
                      onChange={(e) =>
                        handleInputChange("role", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Specialization</Label>
                    <Input
                      type="text"
                      placeholder="Enter your specialization"
                      value={formData.specialization}
                      onChange={(e) =>
                        handleInputChange("specialization", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label required>DepartmentID</Label>
                    <Dropdown
                      options={[1, 2, 3, 4, 5]}
                      defaultLabel="Select DepartmentID"
                      value={formData.department_id}
                      onSelect={(value) =>
                        handleInputChange("department_id", value)
                      }
                    />
                  </div>

                  <div>
                    <Label>StaffID(Doctor)</Label>
                    <Dropdown
                      options={[1, 2, 3, 4, 5]}
                      defaultLabel="Select DoctorID"
                      value={formData.doctor_id}
                      onSelect={(value) =>
                        handleInputChange("doctor_id", value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/*Submit Button*/}
              <motion.div className="mt-6">
                <Button
                  content={"Create Staff Record"}
                  onClick={handlesubmit}
                  className="w-full"
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
