import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthState } from "../types/profile";

const CheckAdmin = () => {
  const auth = useSelector((state: { auth: AuthState }) => state.auth);
  const navigate = useNavigate();
  if (auth.loading) {
    navigate("/");
    return <></>;
  }
  if (!auth.isAuthenticated) {
    navigate("/sign-in");
    return <></>;
  }

  const group = auth.user?.group;

  if (group && group === "admin") {
    return <Outlet />;
  }
  navigate("/");
  return null;
};

export default CheckAdmin;
