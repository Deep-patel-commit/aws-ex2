import AccountCircle from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import { Button, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { removeUser, setUser } from "../slices/userSlice";
import { AuthState, ProfileCardProps, User } from "../types/profile";
import ProfileCard from "./ProfileCard";
export default function NavBar(): React.ReactElement {
  const auth = useSelector((state: { auth: AuthState }) => state.auth);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (window.location.pathname === "/editProfile") return;
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "profile-popover" : undefined;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const userDetails: ProfileCardProps = useSelector(
    (state: { user: User }) => state.user
  );
  const [image, setImage] = useState<string | undefined>(undefined);

  console.log(auth);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!auth.isAuthenticated) return;

      setLoading(true);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/v1/get/userDetails`,
          {
            headers: {
              userid: auth.user?.sub,
              identityToken: auth.user?.id_token,
            },
          }
        );
        if (response.data.statusCode === 200) {
          if (response.data.body.Item === undefined) {
            navigate("/editProfile");
            setLoading(false);
            return;
          } else {
            const userDetails: ProfileCardProps = {
              FirstName: response.data.body.Item.firstName.S,
              LastName: response.data.body.Item.lastName.S,
              Height: response.data.body.Item.height.S,
              Gender: response.data.body.Item.gender.S,
              BirthDate: response.data.body.Item.birthDate.S,
            };
            dispatch(setUser(userDetails));
            setLoading(false);
          }
        } else {
          dispatch(logout());
          dispatch(removeUser());
          navigate("/sign-in");
          Cookie.remove("access_token");
          Cookie.remove("refresh_token");
          Cookie.remove("id_token");
        }
      } catch (err) {
        console.error(err);
        if (err.response.status === 401) {
          dispatch(logout());
          dispatch(removeUser());
          navigate("/sign-in");
          Cookie.remove("access_token");
          Cookie.remove("refresh_token");
          Cookie.remove("id_token");
        }
      }
    };

    const fetchProfile = async () => {
      if (auth.isAuthenticated) {
        try {
          setLoading(true);
          const userId = auth.user?.sub;

          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/v1/get/profilePicture`,
            {
              headers: {
                userid: userId,
                identitytoken: auth.user?.id_token,
              },
            }
          );
          console.log("inside fetchProfile");

          setImage(response.data.body.image);
          setLoading(false);
        } catch (err) {
          console.error(err);
        }
      }
    };

    console.log("start details fetch");
    fetchUserDetails();
    console.log("start profile fetch");
    fetchProfile();
  }, [auth.user?.sub, auth.isAuthenticated, dispatch, auth, navigate]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#1E4F70",
        }}
      >
        <Toolbar>
          <Tooltip title="Home">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Link to="/" style={{ color: "white" }}>
                <PeopleIcon />
              </Link>
            </IconButton>
          </Tooltip>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Profiles
          </Typography>
          {auth.isAuthenticated ? (
            <div>
              <Tooltip title="Profile">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box sx={{ p: 2 }}>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <ProfileCard
                      FirstName={userDetails.FirstName}
                      LastName={userDetails.LastName}
                      Height={userDetails.Height}
                      Gender={userDetails.Gender}
                      BirthDate={userDetails.BirthDate}
                      Picture={image}
                      handleClose={handleClose}
                    />
                  )}
                </Box>
              </Popover>
            </div>
          ) : (
            <Tooltip title="Login">
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/sign-in");
                }}
              >
                Login
              </Button>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
