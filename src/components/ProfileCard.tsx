import CakeIcon from "@mui/icons-material/Cake";
import EditIcon from "@mui/icons-material/Edit";
import HeightIcon from "@mui/icons-material/Height";
import LogoutIcon from "@mui/icons-material/Logout";
import MaleIcon from "@mui/icons-material/Male";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import profile from "../assets/profile.jpg";
import { logout } from "../slices/authSlice";
import { removeUser } from "../slices/userSlice";
import { ProfileBox, ProfileText } from "../styledMui/Styled";
import { ProfileCardProps } from "../types/profile";
function ProfileCard(props: ProfileCardProps) {
  const imageSource = props.Picture
    ? `data:image/png;base64,${props.Picture}`
    : profile;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Box>
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
            <ProfileBox display="flex" alignItems="center" mb={1}>
              <Typography variant="h5" p={1} gutterBottom>
                {props.FirstName} {props.LastName}
              </Typography>
              <Tooltip title="Edit" placement="right">
                <Link to="/editProfile">
                  <IconButton>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Link>
              </Tooltip>
            </ProfileBox>
            <ProfileBox display="flex" alignItems="center" mb={1}>
              <HeightIcon />
              <ProfileText>height : {props.Height}</ProfileText>
            </ProfileBox>
            <ProfileBox display="flex" alignItems="center" mb={1}>
              <MaleIcon />
              <ProfileText>Gender : {props.Gender}</ProfileText>
            </ProfileBox>
            <ProfileBox display="flex" alignItems="center" mb={1}>
              <CakeIcon />
              <ProfileText>
                Birth Date : {new Date(props.BirthDate).toDateString()}
              </ProfileText>
            </ProfileBox>
            <ProfileBox display="flex" alignItems="center" mb={1}>
              <LogoutIcon />
              <Button
                onClick={() => {
                  dispatch(logout());
                  dispatch(removeUser());
                  navigate("/sign-in");
                  Cookie.remove("access_token");
                  Cookie.remove("refresh_token");
                  Cookie.remove("id_token");
                }}
              >
                <Typography variant="body2" color="primary">
                  Sign out
                </Typography>
              </Button>
            </ProfileBox>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ProfileCard;
