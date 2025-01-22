import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import BackgroundImage from "../assets/pxfuel.jpg";

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

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(5),
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

export const ButtonText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.body1.fontSize,
}));

export const ButtonContained = styled(Button, {
  shouldForwardProp: () => true,
})(() => ({}));

export const CardImage = styled(Box, { shouldForwardProp: () => true })(
  ({ theme }) => ({
    width: theme.breakpoints.values.xs
      ? "80px"
      : theme.breakpoints.values.sm
      ? "100px"
      : theme.breakpoints.values.md
      ? "150px"
      : "200px",
    height: theme.breakpoints.values.xs
      ? "80px"
      : theme.breakpoints.values.sm
      ? "100px"
      : theme.breakpoints.values.md
      ? "150px"
      : "200px",
    maxWidth: "200px",
    maxHeight: "200px",
    objectFit: "cover",
    borderRadius: "50%",
  })
);

export const LandingBackBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${BackgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(6),
}));

export const LandingTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.h2.fontSize,
  marginBottom: theme.spacing(2),
  textAlign: "center",
}));

export const LandingSubTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.h5.fontSize,
  textAlign: "center",
}));

export const LandingGridContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  justifyContent: "center",
}));

export const LandingGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const LandingPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#F6F0FC",
}));

export const SignUpContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(6),
}));

export const SignUpCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  backgroundColor: "#FFFFFF",
}));

export const SignUpDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

export const SignUpLink = styled(Link)(({ theme }) => ({
  alignSelf: "center",
}));

export const EditProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  marginBottom: theme.spacing(2),
}));

export const FlexColumnBox = styled(Box, { shouldForwardProp: () => true })(
  ({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: theme.spacing(2),
  })
);

export const StyledTypography = styled(Typography)(({ theme }) => ({}));
