import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Backdrop,
} from "@mui/material";
import { darkBlue } from "../../constants/color";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
const Search = lazy(() => import("../../specific/Search"));
const Notifications = lazy(() => import("../../specific/Notifications"));
const GroupDialog = lazy(() => import("../../dialog/GroupDialog"));

const Header = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);

  const handleMobileMenu = () => {
    setIsMobile((prev) => !prev);
  };

  const handleSearchDialog = () => {
    setIsSearch((prev) => !prev);
  };

  const openNewGroupHandler = () => {
    setIsNewGroup((prev) => !prev);
  };

  const navigateToGroup = () => {
    navigate("/groups");
  };

  const notificationHandler = () => {
    setIsNotifications((prev) => !prev);
  };

  const logoutHandler = () => {
    console.log("logout");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: darkBlue,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              WeChat
            </Typography>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobileMenu}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <Tooltip title="Search Users">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={handleSearchDialog}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="New Group">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={openNewGroupHandler}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Manage Group">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={navigateToGroup}
                >
                  <GroupIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Notifications">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={notificationHandler}
                >
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={logoutHandler}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <Search />
        </Suspense>
      )}

      {isNotifications && (
        <Suspense fallback={<Backdrop open />}>
          <Notifications />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <GroupDialog />
        </Suspense>
      )}
    </>
  );
};

export default Header;
