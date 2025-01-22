import { Box, LinearProgress, Paper, styled, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormTitle } from "../styledMui/Styled";
import { AuthState, Item } from "../types/profile";
const AdminPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const auth = useSelector((state: { auth: AuthState }) => state.auth);
  const [Items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/v1/admin/getProfiles`, {
        headers: {
          userid: auth.user?.sub,
          identitytoken: auth.user?.id_token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.statusCode == 401) {
          setIsError(true);
          setErrorMessage("Unauthorized");
          navigate("/sign-in");
          return;
        } else if (res.data.statusCode == 500) {
          setIsError(true);
          setErrorMessage("Internal Server Error");
          return;
        } else if (res.data.statusCode == 200) {
          console.log("Success");
          setItems(res.data.body.Items);
          setIsLoading(false);
        } else if (res.data.statusCode == 400) {
          setIsError(true);
          setErrorMessage(res.data.body?.message);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [auth]);

  const HeadCell = styled(TableCell)(() => ({
    backgroundColor: "#9da6bf",
  }));
  return (
    <>
      {isLoading ? (
        <Box m={1}>
          <LinearProgress variant="indeterminate" color="inherit" />
        </Box>
      ) : (
        <Box m={1}>
          {isError && (
            <Box>
              <Typography variant="h5" color="error">
                {errorMessage}
              </Typography>
            </Box>
          )}
          <FormTitle>Users</FormTitle>
          <TableContainer component={Paper} elevation={5}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <HeadCell>FName</HeadCell>
                  <HeadCell>LName</HeadCell>
                  <HeadCell>Gender</HeadCell>
                  <HeadCell>Birth Date</HeadCell>
                  <HeadCell>Height</HeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Items.map((item) => (
                  <TableRow key={item.userId.S} hover>
                    <TableCell>{item.firstName.S}</TableCell>
                    <TableCell>{item.lastName.S}</TableCell>
                    <TableCell>{item.gender.S}</TableCell>
                    <TableCell>
                      {new Date(item.birthDate.S).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{item.height.S}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export default AdminPage;
