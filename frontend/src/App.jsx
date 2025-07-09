import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Import Layout
import Navigations from "./layouts/Navigations.jsx";
import Header from "./layouts/Header.jsx";

// Import Table Layout
import Appointment from "./components/Appointment.jsx";
import Dashboard from "./components/Dashboard.jsx";
// import Staff from "./components/Staff.jsx";
import Login from "./components/Login.jsx";
import AddStaff from "./components/Form/addStaff.jsx";
import AddUser from "./components/addUser.jsx";

/*
import Billing from "./components/Billing.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Patient from "./components/Patient.jsx";
import Login from "./components/Login.jsx";
import Staff from "./components/Staff.jsx";
*/
/*
import Button from "./components/Common/Button.jsx";
import Navigation from "./layouts/Navigations.jsx";
import Dropdown from "./components/Common/Dropdown.jsx";
*/

// import Patient from "./components/Patient.jsx";

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
    <>
      <Navigations sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      <div className="w-full h-full">
        <Header setSideBar={setSideBarOpen} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/staff/add" element={<AddUser />} />
          {/* <Route path="/staff" element={<Staff />} /> */}
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </>
  );
}
