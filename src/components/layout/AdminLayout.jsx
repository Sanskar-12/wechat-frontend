/* eslint-disable react/prop-types */
import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Groups as GroupsIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import {
  Grid,
  Box,
  IconButton,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material";
import { useState } from "react";
import { useLocation, Link as LinkComponent } from "react-router-dom";
import { Navigate } from "react-router-dom";

const routes = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users-management",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats-management",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();

  const logoutHandler = () => {
    console.log("Logout");
  };

  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        WeChat
      </Typography>

      <Stack spacing={"1rem"}>
        {routes.map((route) => (
          <Link
            to={route.path}
            key={route.path}
            sx={
              location.pathname === route.path && {
                bgcolor: "#023E8A",
                color: "white",
                ":hover": {
                  color: "white",
                },
              }
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing="1rem">
              {route.icon}
              <Typography>{route.name}</Typography>
            </Stack>
          </Link>
        ))}
        <Link onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing="1rem">
            <ExitToAppIcon />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  const isAdmin = true;

  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };

  const handleClose = () => {
    setIsMobile(false);
  };

  if (!isAdmin) {
    return <Navigate to={"/admin/login"} />;
  }

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <Sidebar />
      </Grid>

      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: "#f5f5f5",
        }}
      >
        {children}
      </Grid>

      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
