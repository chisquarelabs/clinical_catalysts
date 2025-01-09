import React from "react";
import { createBrowserRouter } from "react-router-dom";
import OTPLogin from "../pages/Login/OTPLogin";
import EmailLogin from "../pages/Login/EmailLogin";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from '../components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <OTPLogin />,
  },
  {
    path: "/login",
    element: <EmailLogin />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);
