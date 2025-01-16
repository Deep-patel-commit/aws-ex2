import { AuthContextProps, useAuth } from "react-oidc-context";
import { Outlet, useNavigate } from "react-router-dom";

const CheckAdmin = () => {
  const auth: AuthContextProps = useAuth();
  const navigate = useNavigate();
  if (auth.isLoading) {
    navigate("/");
    return <></>;
  } else if (!auth.isAuthenticated) {
    auth.signinRedirect();
    return <></>;
  }

  const profile = auth.user?.profile;
  const groups = profile?.["cognito:groups"] as string[];

  if (groups && groups[0] === "admin") {
    return <Outlet />;
  } else {
    window.alert("hi");
    console.log("after alert");
    navigate("/");
    return null;
  }
};

export default CheckAdmin;
