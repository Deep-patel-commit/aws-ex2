import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Container, Paper, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import DOMPurify from "dompurify";
import { ChangeEvent, useState } from "react";
import { AuthContextProps, useAuth } from "react-oidc-context";
import { useLocation, useNavigate } from "react-router-dom";
import { ProfileCardProps } from "../types/profile";

const EditProfile: React.FC<ProfileCardProps> = (props: ProfileCardProps) => {
  const auth: AuthContextProps = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [formData, setFormData] = useState<ProfileCardProps>({
    FirstName: state.FirstName || props.FirstName || "",
    LastName: state.LastName || props.LastName || "",
    Height: state.Height || props.Height || "",
    Gender: state.Gender || props.Gender || "",
    BirthDate:
      new Date(state.BirthDate).toISOString().split("T")[0] ||
      props.BirthDate ||
      "",
    Picture: props.Picture || "",
  });
  const [imagePreview, setImagePreview] = useState<string>(
    formData.Picture || ""
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData({
          ...formData,
          Picture: base64String.split(",")[1],
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const sanitizeData = (data: ProfileCardProps): ProfileCardProps => {
    const step1 = {
      ...data,
      FirstName: data.FirstName.trim(),
      LastName: data.LastName.trim(),
      Height: data.Height,
      BirthDate: data.BirthDate,
    };
    const step2 = {
      ...step1,
      FirstName: DOMPurify.sanitize(step1.FirstName),
      LastName: DOMPurify.sanitize(step1.LastName),
    };
    return step2;
  };

  const handleSubmit = () => {
    console.log(formData);
    const sanitizedData = sanitizeData(formData);
    setFormData({ ...formData, ...sanitizedData });

    console.log(formData);
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/v1/upload/userDetails`,
        {
          firstName: formData.FirstName,
          lastName: formData.LastName,
          height: formData.Height,
          gender: formData.Gender,
          birthDate: formData.BirthDate,
          userId: auth.user?.profile.sub,
        },
        {
          headers: {
            userid: auth.user?.profile.sub,
            identitytoken: auth.user?.id_token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        window.alert("Details Updated Successfully");
        if (formData.Picture != "") {
          axios
            .post(
              `${import.meta.env.VITE_API_URL}/v1/upload/profilePicture`,
              {
                profilePicture: formData.Picture,
              },
              {
                headers: {
                  userid: auth.user?.profile.sub,
                  identitytoken: auth.user?.id_token,
                },
              }
            )
            .then((response) => {
              console.log(response);
              window.alert("Profile Picture Updated Successfully");
              navigate("/");
            });
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        window.alert("Profile Update Failed");
      });
  };

  return (
    <Container>
      <Paper sx={{ p: 2, mt: 5, backgroundColor: "#E0F2FC" }} elevation={7}>
        <Box component="form">
          <Grid container spacing={2}>
            <Grid
              size={{ xs: 12 }}
              display="flex"
              justifyContent="space-between"
            >
              <Box position="relative">
                <Avatar
                  src={imagePreview}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <input
                  accept="image/*"
                  type="file"
                  id="profile-picture"
                  hidden
                  onChange={handleImageUpload}
                />
                <label htmlFor="profile-picture">
                  <Button variant="contained" component="span">
                    Upload Picture
                  </Button>
                </label>
              </Box>
              <Box>
                <IconButton onClick={() => navigate("/")}>
                  <CloseIcon color="primary" />
                </IconButton>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="FirstName"
                label="First Name"
                value={formData.FirstName}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="LastName"
                label="Last Name"
                value={formData.LastName}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="Height"
                label="Height(cm)"
                value={formData.Height}
                onChange={handleChange}
                type="number"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="Gender"
                label="Gender"
                value={formData.Gender}
                onChange={handleChange}
                select
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                name="BirthDate"
                label="Birth Date"
                value={formData.BirthDate}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button variant="contained" fullWidth onClick={handleSubmit}>
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditProfile;
