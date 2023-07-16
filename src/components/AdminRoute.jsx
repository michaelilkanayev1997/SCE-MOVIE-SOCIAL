import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  return localStorage.getItem("isAdmin") === "true" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminRoute;
