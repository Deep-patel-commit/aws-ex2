import { AuthContextProps, useAuth } from "react-oidc-context";
import { Outlet, useNavigate } from "react-router-dom";

const CheckAuth = () => {
  const auth: AuthContextProps = useAuth();
  const navigate = useNavigate();
  if (auth.isLoading) {
    navigate("/");
    return <></>;
  } else if (!auth.isAuthenticated) {
    auth.signinRedirect();
    return <></>;
  }

  return <>{auth.isAuthenticated ? <Outlet /> : <></>}</>;
};

export default CheckAuth;
