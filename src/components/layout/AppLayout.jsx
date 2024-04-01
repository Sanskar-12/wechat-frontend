/* eslint-disable react/display-name */
/* eslint-disable react-hooks/rules-of-hooks */
import { Grid } from "@mui/material";
import Title from "../shared/Title";
import Header from "./Header";
import ChatList from "../../specific/ChatList";
import { useParams } from "react-router-dom";
import Profile from "../shared/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { Skeleton, Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobileMenu } from "../../redux/reducers/misc";
import { useErrors } from "../../../hooks/hook";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../../constants/config";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;

    const { isMobileMenu } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const { data, isError, error, refetch, isLoading } = useMyChatsQuery("");

    useEffect(() => {
      const fetchAllChats = async () => {
        const { data } = await axios.get(`${server}/chat/my/chat`, {
          withCredentials: true,
        });

        console.log(data);
      };
      fetchAllChats();
    }, []);

    console.log(data);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log(_id, groupChat);
    };

    const handleMobileClose = () => {
      dispatch(setIsMobileMenu(false));
    };

    useErrors([{ isError, error }]);

    return (
      <>
        <Title />
        <Header />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenu} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
