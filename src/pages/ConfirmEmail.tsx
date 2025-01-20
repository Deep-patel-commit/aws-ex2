import { Container, LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { MuiOtpInput } from "mui-one-time-password-input";
import { SetStateAction, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const ConfirmEmail = () => {
  const [otpError, setOtpError] = useState<boolean>(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState<string>("");
  const [authError, setAuthError] = useState<boolean>(false);
  const [authErrorMessage, setAuthErrorMessage] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleChange = (e: SetStateAction<string>) => {
    setOtpError(false);
    setOtpErrorMessage("");
    setOtp(e);
  };

  const { state } = useLocation();

  const validateInputs = (otp: string) => {
    let isValid = true;
    if (
      otp == "" ||
      otp.length < 6 ||
      otp.includes(" ") ||
      isNaN(Number(otp))
    ) {
      setOtpError(true);
      setOtpErrorMessage("Please enter a valid OTP");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (!validateInputs(otp)) {
      return;
    } else {
      setIsLoading(true);
      axios
        .post(`${import.meta.env.VITE_TEMP_API_URL}/auth/confirm-email`, {
          username: state.username,
          code: otp,
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

  return (
    <>
      {isLoading && <LinearProgress />}
      <Container sx={{ mt: 4 }}>
        <Card variant="outlined">
          <Typography variant="h4" sx={{ pb: 2 }}>
            Confirm Email
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
            <MuiOtpInput value={otp} onChange={handleChange} length={6} />
            {otpError && (
              <Typography variant="body2" color="error">
                {otpErrorMessage}
              </Typography>
            )}
            {authError && (
              <Typography variant="body2" color="error">
                {authErrorMessage}
              </Typography>
            )}
            <Button onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default ConfirmEmail;
