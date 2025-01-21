import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { removeUser } from "../slices/userSlice";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  padding: theme.spacing(2),
  height: "100vh",
}));

const ErrorElement: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoHome = () => {
    dispatch(logout());
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <StyledBox>
      <Typography variant="h4" color="error" gutterBottom>
        Oops! Something went wrong.
      </Typography>

      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Go HOME
      </Button>
    </StyledBox>
  );
};

export default ErrorElement;
