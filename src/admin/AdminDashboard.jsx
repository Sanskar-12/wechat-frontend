import { AdminPanelSettings as AdminPanelSettingsIcon } from "@mui/icons-material";
import AdminLayout from "../components/layout/AdminLayout";
import { Container, Paper, Stack, Typography, Box } from "@mui/material";
import moment from "moment";
import {
  CurveButton,
  SearchField,
} from "../components/styles/StyledComponents";

const AdminDashboard = () => {
  const AppBar = (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          margin: "2rem 0",
          borderRadius: "1rem",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
          <AdminPanelSettingsIcon
            sx={{
              fontSize: "3rem",
            }}
          />
          <SearchField />

          <CurveButton>Search</CurveButton>
          <Box flexGrow={1} />
          <Typography
            display={{
              xs: "none",
              lg: "block",
            }}
            color={"rgba(0,0,0,0.7)"}
            textAlign={"center"}
          >
            {moment().format("MMMM Do YYYY")}
          </Typography>
        </Stack>
      </Paper>
    </>
  );

  return (
    <AdminLayout>
      <Container component={"main"}>{AppBar}</Container>
    </AdminLayout>
  );
};

export default AdminDashboard;
