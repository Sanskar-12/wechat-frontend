/* eslint-disable react/display-name */
/* eslint-disable react-hooks/rules-of-hooks */
import { Grid } from "@mui/material";
import Title from "../shared/Title";
import Header from "./Header";
import ChatList from "../../specific/ChatList";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../shared/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { Skeleton, Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsDeleteMenu,
  setIsMobileMenu,
  setIsSelectedDeleteChat,
} from "../../redux/reducers/misc";
import { useErrors, useSocket } from "../../../hooks/hook";
import { getContext } from "../../socket";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../../constants/events";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  incrementNotifications,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";
import { getOrSaveFromStorage } from "../../lib/features";
import DeleteChatMenu from "../../dialog/DeleteChatMenu";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const navigate = useNavigate();
    const deleteOptionAnchor = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const { isMobileMenu } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    const socket = getContext();

    const { data, isError, error, isLoading, refetch } = useMyChatsQuery("");

    const newMessageAlertHandler = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [dispatch, chatId]
    );

    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotifications());
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onlineUserListener = useCallback((data) => {
      setOnlineUsers(data);
    }, []);

    const eventHanders = {
      [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUserListener,
    };

    useSocket(socket, eventHanders);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setIsSelectedDeleteChat({ chatId, groupChat }));
      deleteOptionAnchor.current = e.currentTarget;
    };

    const handleMobileClose = () => {
      dispatch(setIsMobileMenu(false));
    };

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);

    return (
      <>
        <Title />
        <Header />

        <DeleteChatMenu
          dispatch={dispatch}
          deleteOptionAnchor={deleteOptionAnchor}
        />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenu} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}
            />
          </Drawer>
        )}

        <Grid container height={"calc(100vh-4rem)"}>
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
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6}>
            <WrappedComponent {...props} chatId={chatId} />
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
