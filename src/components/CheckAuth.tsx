import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthState } from "../types/profile";

const CheckAuth = () => {
  const auth = useSelector((state: { auth: AuthState }) => state.auth);
  const navigate = useNavigate();
  if (auth.loading) {
    navigate("/");
    return <></>;
  } else if (!auth.isAuthenticated) {
    navigate("/sign-in");
    return <></>;
  }

  return <>{auth.isAuthenticated ? <Outlet /> : <></>}</>;
};

export default CheckAuth;
