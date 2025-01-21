import { Checkbox, Container, LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Cookies from "js-cookie";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, startAuth } from "../slices/authSlice";
import {
  ErrorTypography,
  FormTitle,
  StyledButton,
  StyledTextField,
} from "../styledMui/Styled";
import { SignInProp } from "../types/profile";
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: theme.spacing(4),
  justifySelf: "center",
  justifyItems: "center",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "600px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const SignIn = () => {
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState<SignInProp>({
    userName: "",
    passWord: "",
  });
  const [authError, setAuthError] = useState<boolean>(false);
  const [authErrorMessage, setAuthErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeError = (attribute: string) => {
    switch (attribute) {
      case "userName":
        setUsernameError(false);
        setUsernameErrorMessage("");
        break;
      case "passWord":
        setPasswordError(false);
        setPasswordErrorMessage("");
        break;
      default:
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthError(false);
    setAuthErrorMessage("");
    closeError(e.target.name);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateInputs = (formData: SignInProp) => {
    let isValid = true;
    if (!formData.userName) {
      setUsernameError(true);
      setUsernameErrorMessage("Please enter a valid username.");
      isValid = false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    console.log(formData);
    if (!formData.passWord || !passwordRegex.test(formData.passWord)) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "Password must be at least 8 characters long, contain at least one number and one special character."
      );
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (!validateInputs(formData)) {
      console.log("Invalid input");
      return;
    } else {
      setIsLoading(true);
      dispatch(startAuth());
      axios
        .post(`${import.meta.env.VITE_TEMP_API_URL}/auth/login`, {
          username: formData.userName,
          password: formData.passWord,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          if (res.data.statusCode === 200) {
            navigate("/");
            dispatch(
              login({
                sub: res.data.body.userId,
                email_verified: true,
                id_token: res.data.body.idToken,
                access_token: res.data.body.accessToken,
                refresh_token: res.data.body.refreshToken,
                ...(res.data.body.group && { group: res.data.body.group }),
              })
            );
            console.log(res.data);
            Cookies.set("id_token", res.data.body.idToken);
            Cookies.set("access_token", res.data.body.accessToken);
            Cookies.set("refresh_token", res.data.body.refreshToken);
          } else if (res.data.statusCode === 401) {
            if (res.data.body.message === "User is not confirmed.") {
              navigate("/confirm-email", {
                state: { username: formData.userName },
              });
            }
            setAuthError(true);
            setAuthErrorMessage(res.data.body.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {isLoading && <LinearProgress />}
      <Container sx={{ mt: 4 }}>
        <Card variant="outlined">
          <FormTitle>Sign In</FormTitle>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <StyledTextField
              error={usernameError}
              helperText={usernameErrorMessage}
              id="userName"
              name="userName"
              placeholder="userName"
              label="username"
              required
              onChange={handleChange}
              color={usernameError ? "error" : "primary"}
            />
            <StyledTextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="passWord"
              placeholder="••••••"
              type={showPassword ? "text" : "password"}
              id="passWord"
              label="Password"
              value={formData.passWord}
              required
              onChange={handleChange}
              color={passwordError ? "error" : "primary"}
            />
            <Box>
              <Checkbox
                checked={showPassword}
                onChange={() => {
                  setShowPassword(() => {
                    return !showPassword;
                  });
                }}
              />
              Show password
            </Box>
            <Box>
              <ErrorTypography>
                {authError ? authErrorMessage : ""}
              </ErrorTypography>
            </Box>
            <StyledButton onClick={handleSubmit} variant="contained">
              Sign in
            </StyledButton>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default SignIn;
