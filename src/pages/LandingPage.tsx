import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import {
  LandingBackBox,
  LandingPaper,
  LandingSubTypography,
  LandingTypography,
  StyledButton,
  StyledTypography,
} from "../styledMui/Styled";

const LandingPage: React.FC = () => {
  return (
    <>
      <LandingBackBox>
        <Container maxWidth="sm">
          <LandingTypography>
            Welcome to User Profile Management
          </LandingTypography>
          <LandingSubTypography>
            Manage your profile efficiently and securely with our
            state-of-the-art user profile management system.
          </LandingSubTypography>
          <Grid container spacing={2} justifyContent="center" p={2}>
            <Grid>
              <StyledButton variant="contained" color="primary">
                Get Started
              </StyledButton>
            </Grid>
          </Grid>
        </Container>

        <Container maxWidth="md">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <LandingPaper elevation={7}>
                <Typography variant="h6" gutterBottom>
                  Profile Picture
                </Typography>
                <StyledTypography>
                  Upload Your Profile Picture your profile Pictures
                </StyledTypography>
              </LandingPaper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <LandingPaper elevation={7}>
                <Typography variant="h6" gutterBottom>
                  Details
                </Typography>
                <StyledTypography>
                  Add Details like Name , Height , Gender , BirthDate
                </StyledTypography>
              </LandingPaper>
            </Grid>
          </Grid>
        </Container>
      </LandingBackBox>
    </>
  );
};

export default LandingPage;
