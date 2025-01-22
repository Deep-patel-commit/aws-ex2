import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthState } from "../types/profile";

interface CheckAuthProps {
  children?: ReactNode;
}

const CheckAuth = ({ children }: CheckAuthProps) => {
  const auth = useSelector((state: { auth: AuthState }) => state.auth);
  const navigate = useNavigate();
  if (auth.loading) {
    navigate("/");
    return <></>;
  } else if (!auth.isAuthenticated) {
    navigate("/sign-in");
    return <></>;
  }

  return <>{auth.isAuthenticated ? children || <Outlet /> : <></>}</>;
};

export default CheckAuth;
