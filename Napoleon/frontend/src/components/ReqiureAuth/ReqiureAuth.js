import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const token = window.localStorage.getItem("token");
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/" />
  );
};
export default RequireAuth;
