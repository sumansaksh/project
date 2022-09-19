import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
// isAuthenticated ? <Component /> : <Navigate to="/login" />;
