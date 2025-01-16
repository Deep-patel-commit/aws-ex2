import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Container, Paper, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import DOMPurify from "dompurify";
import { ChangeEvent, useState } from "react";
import { AuthContextProps, useAuth } from "react-oidc-context";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ProfileCardProps, User } from "../types/profile";

const EditProfile: React.FC = () => {
  const auth: AuthContextProps = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const userDetails: ProfileCardProps = useSelector(
    (state: { user: User }) => state.user
  );
  // console.log(userDetails);
  const [formData, setFormData] = useState<ProfileCardProps>({
    FirstName: userDetails.FirstName || state?.FirstName || "",
    LastName: state?.LastName || userDetails.LastName || "",
    Height: state?.Height || userDetails.Height || 51,
    Gender: state?.Gender || userDetails.Gender || "Male",
    BirthDate: state?.BirthDate || userDetails.BirthDate || new Date(),
    Picture: state?.Picture || "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [heightError, setHeightError] = useState<boolean>(false);
  const [genderError, setGenderError] = useState<boolean>(false);
  const [birthDateError, setBirthDateError] = useState<boolean>(false);
  const [pictureError, setPictureError] = useState<boolean>(false);

  const [firstNameErrorMessage, setFirstNameErrorMessage] =
    useState<string>("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState<string>("");
  const [heightErrorMessage, setHeightErrorMessage] = useState<string>("");
  const [genderErrorMessage, setGenderErrorMessage] = useState<string>("");
  const [birthDateErrorMessage, setBirthDateErrorMessage] =
    useState<string>("");
  const [pictureErrorMessage, setPictureErrorMessage] = useState<string>("");

  const [imagePreview, setImagePreview] = useState<string>(
    formData.Picture || ""
  );

  const closeError = (attribute: string) => {
    switch (attribute) {
      case "FirstName":
        setFirstNameError(false);
        setFirstNameErrorMessage("");
        break;
      case "LastName":
        setLastNameError(false);
        setLastNameErrorMessage("");
        break;
      case "Height":
        setHeightError(false);
        setHeightErrorMessage("");
        break;
      case "Gender":
        setGenderError(false);
        setGenderErrorMessage("");
        break;
      case "BirthDate":
        setBirthDateError(false);
        setBirthDateErrorMessage("");
        break;
      case "Picture":
        setPictureError(false);
        setPictureErrorMessage("");
        break;
      default:
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    closeError(e.target.name);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    setPictureError(false);
    const file = e.target.files[0];
    console.log(file);
    if (file.size > 10 * 1024) {
      setPictureError(true);
      setPictureErrorMessage("Image too large");
      return;
    }
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

  const validateFormData = (data: ProfileCardProps) => {
    let isValid = true;

    if (
      !/^[A-Za-z]+$/.test(data.FirstName) ||
      data.FirstName.length < 2 ||
      data.FirstName.length > 10
    ) {
      setFirstNameError(true);
      setFirstNameErrorMessage(
        "First Name must be 2-10 characters long and contain only alphabets."
      );
      isValid = false;
    }

    if (
      !/^[A-Za-z]+$/.test(data.LastName) ||
      data.LastName.length < 2 ||
      data.LastName.length > 10
    ) {
      setLastNameError(true);
      setLastNameErrorMessage(
        "Last Name must be 2-10 characters long and contain only alphabets."
      );
      isValid = false;
    }
    if (data.Height < 50 || data.Height > 260) {
      setHeightError(true);
      setHeightErrorMessage("Height must be a number between 50 and 260.");
      isValid = false;
    }

    if (!["Male", "Female"].includes(data.Gender)) {
      setGenderError(true);
      setGenderErrorMessage("Gender must be Male / Female");
      isValid = false;
    }

    if (
      !data.BirthDate ||
      isNaN(new Date(data.BirthDate).getTime()) ||
      new Date(data.BirthDate) >= new Date()
    ) {
      setBirthDateError(true);
      setBirthDateErrorMessage("Birth Date must be a valid date");
      isValid = false;
    }

    return isValid;
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
    setIsLoading(true);
    console.log(formData);
    const sanitizedData = sanitizeData(formData);
    setFormData({ ...formData, ...sanitizedData });

    if (!validateFormData(formData)) {
      setIsLoading(false);
      return;
    }
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
        setIsLoading(false);
        window.alert("Details Updated Successfully");
        setIsLoading(true);
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
              setIsLoading(false);
              navigate("/");
            });
        } else {
          setIsLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        window.alert("Profile Update Failed");
      });
  };

  return (
    <>
      {isLoading && <LinearProgress />}
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
                  {pictureError && pictureErrorMessage}
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
                  error={firstNameError}
                  helperText={firstNameErrorMessage}
                  color={firstNameError ? "error" : "primary"}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  name="LastName"
                  label="Last Name"
                  value={formData.LastName}
                  onChange={handleChange}
                  error={lastNameError}
                  helperText={lastNameErrorMessage}
                  color={lastNameError ? "error" : "primary"}
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
                  error={heightError}
                  helperText={heightErrorMessage}
                  color={heightError ? "error" : "primary"}
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
                  error={genderError}
                  helperText={genderErrorMessage}
                  color={genderError ? "error" : "primary"}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="date"
                  name="BirthDate"
                  label="Birth Date"
                  value={
                    new Date(formData.BirthDate).toISOString().split("T")[0]
                  }
                  onChange={handleChange}
                  error={birthDateError}
                  helperText={birthDateErrorMessage}
                  color={birthDateError ? "error" : "primary"}
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
    </>
  );
};

export default EditProfile;
