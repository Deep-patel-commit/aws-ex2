import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React from "react";

import Grid from "@mui/material/Grid2";
import BackgroundImage from "../assets/pxfuel.jpg";

const LandingPage: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Welcome to User Profile Management
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary">
              Manage your profile efficiently and securely with our
              state-of-the-art user profile management system.
            </Typography>
            <Grid container spacing={2} justifyContent="center" p={2}>
              <Grid>
                <Button variant="contained" color="primary">
                  Get Started
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <Paper elevation={7} sx={{ p: 2, backgroundColor: "#F6F0FC" }}>
                <Typography variant="h6" gutterBottom>
                  Profile Picture
                </Typography>
                <Typography>
                  Upload Your Profile Picture your profile Pictures
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <Paper elevation={7} sx={{ p: 2, backgroundColor: "#F6F0FC" }}>
                <Typography variant="h6" gutterBottom>
                  Details
                </Typography>
                <Typography>
                  Add Details like Name , Height , Gender , BirthDate
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* <EditProfile
        FirstName="John"
        LastName="Doe"
        Height="180"
        Gender="male"
        BirthDate={new Date()}
      /> */}
    </>
  );
};

export default LandingPage;
