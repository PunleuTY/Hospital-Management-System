import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Import Layout
import Navigations from "./layouts/Navigations.jsx";
import Header from "./layouts/Header.jsx";

// Import Table Layout
import Appointment from "./components/Appointment.jsx";
import Billing from "./components/Billing.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Staff from "./components/Staff.jsx";
import Patient from "./components/Patient.jsx";
import MedicalRecord from "./components/Medicalrecord.jsx";

// import Staff from "./components/Staff.jsx";
import Login from "./components/Login.jsx";
import AddStaff from "./components/Form/addStaff.jsx";
import AddUser from "./components/addUser.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={<DashboardWithLayout />} />
      </Routes>
    </Router>
  );
}

function DashboardWithLayout() {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Navigations sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden">
        <Header setSideBar={setSideBarOpen} />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointment />} />
            <Route path="/staff/add" element={<AddUser />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/patient" element={<Patient />} />
            <Route path="/records" element={<MedicalRecord />} />
            <Route path="/patient" element={<Patient />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </div>
  );
}
