import CakeIcon from "@mui/icons-material/Cake";
import EditIcon from "@mui/icons-material/Edit";
import HeightIcon from "@mui/icons-material/Height";
import LogoutIcon from "@mui/icons-material/Logout";
import MaleIcon from "@mui/icons-material/Male";
import { Button, Container } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { AuthContextProps, useAuth } from "react-oidc-context";
import { Link } from "react-router-dom";
import profile from "../assets/profile.jpg";
import { ProfileCardProps } from "../types/profile";

function ProfileCard(props: ProfileCardProps) {
  const imageSource = props.Picture
    ? `data:image/png;base64,${props.Picture}`
    : profile;
  const auth: AuthContextProps = useAuth();
  // const navigate = useNavigate();

  // function handleEditButton() {
  //   navigate("/editProfile", {
  //     state: {
  //       FirstName: props.FirstName,
  //       LastName: props.LastName,
  //       Height: props.Height,
  //       Gender: props.Gender,
  //       BirthDate: props.BirthDate,
  //     },
  //   });
  //   if (props.handleClose) props.handleClose();
  // }
  console.log(auth);

  return (
    <>
      <Container sx={{ flexGrow: 1 }}>
        <Grid
          container
          columns={{ xs: 1, sm: 4, md: 4, lg: 6 }}
          sx={{
            backgroundColor: "#E0F2FC",
            borderRadius: "10px",
          }}
          padding={2}
        >
          <Grid container key="details" size={{ xs: 1, sm: 2, md: 2, lg: 4 }}>
            <Grid key="profilepic" size={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
              <Box
                component="img"
                src={imageSource}
                alt="profile pic"
                sx={{
                  width: { xs: "80px", sm: "100px", md: "150px", lg: "200px" },
                  height: { xs: "80px", sm: "100px", md: "150px", lg: "200px" },
                  maxWidth: "200px",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Grid>
          </Grid>
          <Grid key="details2">
            <Box display="flex" alignItems="center" mb={1}>
              <Typography variant="h5" p={1} gutterBottom>
                {props.FirstName} {props.LastName}
              </Typography>
              <Tooltip title="Edit" placement="right">
                <IconButton>
                  <Link to="/editProfile">
                    <EditIcon fontSize="small" />
                  </Link>
                </IconButton>
              </Tooltip>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <HeightIcon />
              <Typography variant="body1" color="textSecondary" ml={1}>
                height : {props.Height}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <MaleIcon />
              <Typography variant="body1" color="textSecondary" ml={1}>
                Gender : {props.Gender}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <CakeIcon />
              <Typography variant="body1" color="textSecondary" ml={1}>
                Birth Date : {new Date(props.BirthDate).toDateString()}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <LogoutIcon />
              <Button
                onClick={() => {
                  auth.removeUser();
                }}
              >
                <Typography variant="body2" color="primary">
                  Sign out
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProfileCard;
