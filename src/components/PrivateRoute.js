import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ path }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Outlet />;
  }

  return <Navigate state={{ from: path }} replace to="/login" />;
};

export { PrivateRoute };
