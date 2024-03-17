/* eslint-disable react/prop-types */
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import AdminLayout from "../components/layout/AdminLayout";
import { Container, Paper, Stack, Typography, Box } from "@mui/material";
import moment from "moment";
import {
  CurveButton,
  SearchField,
} from "../components/styles/StyledComponents";
import { DoughnutChart, LineChart } from "../specific/Charts";

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
            {moment().format("dddd, D MMMM YYYY")}
          </Typography>

          <NotificationsIcon />
        </Stack>
      </Paper>
    </>
  );

  const Widgets = (
    <>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={"2rem"}
        justifyContent={"space-between"}
        alignItems={"center"}
        margin={"2rem 0"}
      >
        <Widget title={"Users"} value={34} Icon={<PersonIcon />} />
        <Widget title={"Chats"} value={34} Icon={<GroupIcon />} />
        <Widget title={"Messages"} value={34} Icon={<MessageIcon />} />
      </Stack>
    </>
  );

  return (
    <AdminLayout>
      <Container component={"main"}>
        {AppBar}

        <Stack direction={"row"} spacing={"2rem"} flexWrap={"wrap"}>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
              height: "25rem",
            }}
          >
            <Typography margin={"2rem 0"} variant="h4">
              Last Messages
            </Typography>
            <LineChart value={[1, 1, 334, 34, 354, 5, 6]} />
          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: {
                xs: "100%",
                sm: "50%",
              },
              position: "relative",
              maxWidth: "25rem",
              height: "25rem",
            }}
          >
            <DoughnutChart />

            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <GroupIcon />
              <Typography>Vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>

        {Widgets}
      </Container>
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1.5rem",
        width: "20rem",
      }}
    >
      <Stack alignItems={"center"} spacing={"1rem"}>
        <Typography
          sx={{
            color: "rgba(0,0,0,0.7)",
            borderRadius: "50%",
            border: `5px solid #0077B6`,
            width: "5rem",
            height: "5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {value}
        </Typography>
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
          {Icon}
          <Typography>{title}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default AdminDashboard;
