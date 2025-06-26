import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./pages/UserDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";

// Inside <Routes>...
<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <UserDashboard />
    </PrivateRoute>
  }
/>
<Route
  path="/doctor-dashboard"
  element={
    <PrivateRoute>
      <DoctorDashboard />
    </PrivateRoute>
  }
/>

import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./pages/UserDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";

// Inside <Routes>...
<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <UserDashboard />
    </PrivateRoute>
  }
/>
<Route
  path="/doctor-dashboard"
  element={
    <PrivateRoute>
      <DoctorDashboard />
    </PrivateRoute>
  }
/>
