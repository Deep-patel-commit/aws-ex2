import { Box, LinearProgress, Paper, styled } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContextProps, useAuth } from "react-oidc-context";
import { Item } from "../types/profile";

const AdminPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth: AuthContextProps = useAuth();
  const [Items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/v1/admin/getProfiles`, {
        headers: {
          userid: auth.user?.profile.sub,
          identitytoken: auth.user?.id_token,
        },
      })
      .then((res) => {
        if (res.data.statusCode == 400) {
          console.log("Unauthorized");
          window.alert("Unauthorized");
          auth.signinRedirect();
          return;
        } else if (res.data.statusCode == 500) {
          console.log("Internal Server Error");
          window.alert("Internal Server Error");
          return;
        } else if (res.data.statusCode == 200) {
          console.log("Success");
          setItems(res.data.body.Items);
          setIsLoading(false);
        }
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
          <TableContainer component={Paper} elevation={5}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {/* <TableCell>userid</TableCell> */}
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
                    {/* <TableCell>{item.userId.S}</TableCell> */}
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
