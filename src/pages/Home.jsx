import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Box
      bgcolor={"rgba(0,0,0,0.1)"}
      height={"100%"}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography p={"2rem"} variant="h5" textAlign="center">
        Select a friend to Chat
      </Typography>
    </Box>
  );
};

const Home = AppLayout()(HomePage);

export default Home;
