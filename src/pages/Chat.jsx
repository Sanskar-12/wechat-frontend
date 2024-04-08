/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Stack, IconButton, Skeleton } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../dialog/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { getContext } from "../socket";
import {
  ALERT,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events.js";
import {
  useGetChatDetailsQuery,
  useGetMessagesQuery,
} from "../redux/api/api.js";
import { useErrors, useSocket } from "../../hooks/hook.js";
import { useSelector, useDispatch } from "react-redux";
import { useInfiniteScrollTop } from "6pp";
import { setIsFileMenu } from "../redux/reducers/misc.js";
import { removeNewMessagesAlert } from "../redux/reducers/chat.js";
import { TypingLoader } from "../components/layout/Loaders.jsx";
import { useNavigate } from "react-router-dom";

const ChatPage = ({ chatId }) => {
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const socket = getContext();
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [iamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const bottomref = useRef(null);

  const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk?.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk?.data?.messages
  );

  const { user } = useSelector((state) => state.auth);

  const members = chatDetails.data?.chat.members;

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    //emitting the message to the backend
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  useEffect(() => {
    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessage("");
      setMessages([]);
      setPage(1);
      setOldMessages([]);
    };
  }, [chatId, dispatch, setOldMessages]);

  useEffect(() => {
    if (chatDetails?.isError) {
      return navigate("/");
    }
  }, [chatDetails?.isError, navigate]);

  const newMessageHandler = useCallback(
    (data) => {
      if (data?.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data?.chatId !== chatId) return;
      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data?.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (content) => {
      const messageForAlert = {
        content,
        sender: {
          _id: "sdfsdf",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHander = {
    [NEW_MESSAGE]: newMessageHandler,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
    [ALERT]: alertListener,
  };

  useSocket(socket, eventHander);
  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  const messageOnChangeHandler = (e) => {
    setMessage(e.target.value);
    if (!iamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, 2000);
  };

  useEffect(() => {
    if (bottomref.current) {
      bottomref.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <>
      {chatDetails.isLoading ? (
        <Skeleton />
      ) : (
        <>
          <Stack
            ref={containerRef}
            boxSizing={"border-box"}
            padding={"1rem"}
            spacing={"1rem"}
            bgcolor={"#e7ecef"}
            height={"100vh"}
            sx={{
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {allMessages.map((message) => (
              <MessageComponent
                key={message._id}
                message={message}
                user={user}
              />
            ))}

            {userTyping && <TypingLoader />}

            <div ref={bottomref} />
          </Stack>

          <form
            style={{
              height: "10%",
            }}
            onSubmit={submitHandler}
          >
            <Stack
              direction={"row"}
              height={"100%"}
              padding={"1rem"}
              alignItems={"center"}
              position={"relative"}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  left: "1.5rem",
                  rotate: "30deg",
                }}
                onClick={handleFileOpen}
              >
                <AttachFileIcon />
              </IconButton>
              <InputBox
                placeholder="Type Message Here..."
                value={message}
                onChange={messageOnChangeHandler}
              />
              <IconButton
                type="submit"
                sx={{
                  bgcolor: "#00b4d8",
                  color: "white",
                  marginLeft: "1rem",
                  padding: "0.5rem",
                  "&:hover": {
                    bgcolor: "#0096C7",
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Stack>
          </form>

          <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
        </>
      )}
    </>
  );
};

const Chat = AppLayout()(ChatPage);

export default Chat;
