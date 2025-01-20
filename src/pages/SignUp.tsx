import { Checkbox, Container, LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpProp } from "../types/profile";
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

const SignUp = () => {
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [confirmPassWordError, setConfirmPassWordError] =
    useState<boolean>(false);
  const [confirmPassWordErrorMessage, setConfirmPassWordErrorMessage] =
    useState<string>("");
  const [authError, setAuthError] = useState<boolean>(false);
  const [authErrorMessage, setAuthErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignUpProp>({
    userName: "",
    passWord: "",
    emailAddress: "",
    confirmPassWord: "",
  });

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
      case "emailAddress":
        setEmailError(false);
        setEmailErrorMessage("");
        break;
      case "confirmPassWord":
        setConfirmPassWordError(false);
        setConfirmPassWordErrorMessage("");
        break;
      default:
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    closeError(e.target.name);
    setAuthError(false);
    setAuthErrorMessage("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateInputs = (formData: SignUpProp) => {
    let isValid = true;
    if (!formData.userName) {
      setUsernameError(true);
      setUsernameErrorMessage("Please enter a valid username.");
      isValid = false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.passWord || !passwordRegex.test(formData.passWord)) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "Password must be at least 8 characters long, contain at least one number and one special character."
      );
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.emailAddress || !emailRegex.test(formData.emailAddress)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    }

    if (formData.passWord !== formData.confirmPassWord) {
      setConfirmPassWordError(true);
      setConfirmPassWordErrorMessage("Passwords do not match.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (!validateInputs(formData)) {
      return;
    } else {
      setIsLoading(true);
      axios
        .post(`${import.meta.env.VITE_TEMP_API_URL}/auth/sign-up`, {
          username: formData.userName,
          password: formData.passWord,
          email: formData.emailAddress,
        })
        .then((res) => {
          console.log(res);
          if (res.data.statusCode === 200) {
            navigate("/sign-in");
          } else {
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
          <Typography variant="h4" sx={{ pb: 2 }}>
            Sign in
          </Typography>
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
            <TextField
              error={usernameError}
              helperText={usernameErrorMessage}
              id="userName"
              name="userName"
              placeholder="userName"
              label="username"
              required
              value={formData.userName}
              onChange={handleChange}
              color={usernameError ? "error" : "primary"}
            />
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="emailAddress"
              name="emailAddress"
              placeholder="email@email.com"
              label="email"
              required
              onChange={handleChange}
              color={emailError ? "error" : "primary"}
            />
            <TextField
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
            <TextField
              error={confirmPassWordError}
              helperText={confirmPassWordErrorMessage}
              type={showPassword ? "text" : "password"}
              id="confirmPassWord"
              name="confirmPassWord"
              placeholder="confirmPassWord"
              label="confirm password"
              value={formData.confirmPassWord}
              required
              onChange={handleChange}
              color={confirmPassWordError ? "error" : "primary"}
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

            {authError && (
              <Typography variant="body2" color="error">
                {authErrorMessage}
              </Typography>
            )}

            <Button onClick={handleSubmit} variant="contained">
              Sign Up
            </Button>
          </Box>

          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link
                href="/sign-in"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default SignUp;
