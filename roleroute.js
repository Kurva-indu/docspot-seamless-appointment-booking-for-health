import React from "react";
import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  if (!token) return <Navigate to="/login" />;

  if (userType !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleRoute;
