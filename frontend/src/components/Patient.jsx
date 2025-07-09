import React, { useState, useEffect } from "react";

export default function Patient() {
  const initialState = {
    patient_id: "",
    last_name: "",
    first_name: "",
    gender: "",
    height: "",
    weight: "",
    date_of_birth: "",
    address: "",
    contact: "",
    email: "",
    doctor_id: "",
  };

  const [patients, setPatients] = useState([]);
  const [patientHistory, setPatientHistory] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(stored);

    const history = JSON.parse(localStorage.getItem("patientHistory")) || [];
    setPatientHistory(history);
  }, []);

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem("patientHistory", JSON.stringify(patientHistory));
  }, [patientHistory]);

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmailError(validateEmail(value) ? "" : "Invalid email format");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePatientId = () => {
    const existingIds = patients.map((p) => p.patient_id);
    let maxNumber = 0;

    existingIds.forEach((id) => {
      const number = parseInt(id.replace("P", ""), 10);
      if (!isNaN(number) && number > maxNumber) {
        maxNumber = number;
      }
    });

    const nextNumber = maxNumber + 1;
    return `P${String(nextNumber).padStart(3, "0")}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError("Invalid email format");
      return;
    }

    if (editing) {
      setPatients((prev) =>
        prev.map((p) => (p.patient_id === formData.patient_id ? formData : p))
      );
    } else {
      const newPatient = {
        ...formData,
        patient_id: generatePatientId(),
      };
      setPatients((prev) => [...prev, newPatient]);
      setPatientHistory((prev) => [...prev, newPatient]);
    }

    setFormData(initialState);
    setEditing(false);
    setShowForm(false);
  };

  const handleEdit = (patient) => {
    setFormData(patient);
    setEditing(true);
    setShowForm(true);
    setEmailError("");
  };

  const handleDelete = (id) => {
    setPatients((prev) => prev.filter((p) => p.patient_id !== id));
    if (formData.patient_id === id) {
      setFormData(initialState);
      setEditing(false);
    }
  };

  const handleView = (patient) => {
    alert(JSON.stringify(patient, null, 2));
  };

  const handleCancel = () => {
    setFormData(initialState);
    setEditing(false);
    setShowForm(false);
    setEmailError("");
  };

  const handleSearch = () => {
    setActiveSearch(searchTerm);
  };

  const filteredPatients = patients.filter((p) =>
    Object.values(p)
      .join(" ")
      .toLowerCase()
      .includes(activeSearch.toLowerCase())
  );

  return (
    <div className="p-4 relative">
      <h1 className="text-xl font-bold mb-4">Patient Management</h1>

      {/* Top Button Row */}
      <div className="flex justify-between mb-4">
        <div className="flex w-full gap-2">
          <input
            type="text"
            placeholder="Search by name, email, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            Search
          </button>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => setShowHistory(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded"
          >
            History
          </button>
          <button
            onClick={() => {
              setFormData(initialState);
              setEditing(false);
              setShowForm(true);
              setEmailError("");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add Patient
          </button>
        </div>
      </div>

      {/* Add/Edit Patient Modal */}
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-3xl">
            <h2 className="text-lg font-semibold mb-4">
              {editing ? "Edit Patient" : "Add Patient"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {Object.keys(initialState)
                .filter((key) => key !== "patient_id")
                .map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1">
                      {key.replace(/_/g, " ")}
                    </label>
                    {key === "gender" ? (
                      <select
                        className="w-full p-2 border border-gray-300 rounded"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    ) : (
                      <input
                        className="w-full p-2 border border-gray-300 rounded"
                        type={key === "date_of_birth" ? "date" : "text"}
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        required
                      />
                    )}
                    {key === "email" && emailError && (
                      <p className="text-red-600 text-sm">{emailError}</p>
                    )}
                  </div>
                ))}
              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  disabled={emailError !== ""}
                >
                  {editing ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Patient History</h2>
              <button
                onClick={() => setShowHistory(false)}
                className="text-red-600 hover:underline"
              >
                Close
              </button>
            </div>
            <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {Object.keys(initialState).map((key) => (
                    <th key={key} className="border p-2 capitalize">
                      {key.replace(/_/g, " ")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {patientHistory.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="text-center p-4">
                      No history found.
                    </td>
                  </tr>
                ) : (
                  patientHistory.map((p, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      {Object.keys(initialState).map((key) => (
                        <td key={key} className="border p-2">
                          {p[key]}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Patients Table */}
      <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Patient ID</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Height (Cm)</th>
            <th className="border p-2">Weight (Kg)</th>
            <th className="border p-2">Date of Birth</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Doctor ID</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.patient_id} className="hover:bg-gray-50 group">
              <td className="border p-2">{patient.patient_id}</td>
              <td className="border p-2">{patient.last_name}</td>
              <td className="border p-2">{patient.first_name}</td>
              <td className="border p-2">{patient.gender}</td>
              <td className="border p-2">{patient.height}</td>
              <td className="border p-2">{patient.weight}</td>
              <td className="border p-2">{patient.date_of_birth}</td>
              <td className="border p-2">{patient.address}</td>
              <td className="border p-2">{patient.contact}</td>
              <td className="border p-2">{patient.email}</td>
              <td className="border p-2">{patient.doctor_id}</td>
              <td className="border p-2 text-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleView(patient)}
                  >
                    View
                  </button>
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => handleEdit(patient)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(patient.patient_id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredPatients.length === 0 && (
            <tr>
              <td colSpan="12" className="text-center p-4">
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
