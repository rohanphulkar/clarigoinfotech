import { Outlet, Navigate, useLocation } from "react-router-dom";
const ProtectedRoute = () => {
  const auth = sessionStorage.getItem("jwt");
  const { pathname } = useLocation();
  const authpaths = pathname === "/login" || pathname === "/register";

  return auth ? (
    authpaths ? (
      <Navigate to="/" replace={true} />
    ) : (
      <Outlet />
    )
  ) : !authpaths ? (
    <Navigate to="/login" replace={true} />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
