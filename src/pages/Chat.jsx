/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Stack, IconButton, Skeleton } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../dialog/FileMenu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { getContext } from "../socket";
import { NEW_MESSAGE } from "../constants/events.js";
import { useGetChatDetailsQuery } from "../redux/api/api.js";

const user = {
  _id: "sdfsfds",
  name: "Sanskar",
};

const ChatPage = ({ chatId }) => {
  const containerRef = useRef(null);

  const socket = getContext();

  const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });

  const [message, setMessage] = useState("");
  const members = chatDetails.data?.chat.members;

  console.log(members);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    //emitting the message to the backend
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

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
            bgcolor="#e7ecef"
            height={"90%"}
            sx={{
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {sampleMessage.map((message) => (
              <MessageComponent
                key={message._id}
                message={message}
                user={user}
              />
            ))}
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
              >
                <AttachFileIcon />
              </IconButton>
              <InputBox
                placeholder="Type Message Here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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

          <FileMenu />
        </>
      )}
    </>
  );
};

const Chat = AppLayout()(ChatPage);

export default Chat;
