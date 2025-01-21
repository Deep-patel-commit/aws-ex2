import {
  Box,
  Button,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";

export const ErrorTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: theme.spacing(2),
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h4.fontSize,
  paddingBottom: theme.spacing(2),
}));

export const StyledTextField = styled(TextField)(() => ({}));

export const StyledButton = styled(Button)(() => ({
  //   margin: theme.spacing(1),
}));

export const StyledPaper = styled(Paper)(() => ({
  padding: 2,
  marginTop: 5,
  backgroundColor: "#E0F2FC",
}));

export const ProfileBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

export const ProfileText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(1),
}));
