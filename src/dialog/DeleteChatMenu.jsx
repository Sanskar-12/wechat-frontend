/* eslint-disable react/prop-types */

import { Menu, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../redux/reducers/misc";
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useDeleteGroupMutation,
  useLeaveGroupMutation,
} from "../redux/api/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DeleteChatMenu = ({ dispatch, deleteOptionAnchor }) => {
  const navigate = useNavigate();
  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );
  const [deleteChat, deleteChatLoading, deleteChatData] = useAsyncMutation(
    useDeleteGroupMutation
  );
  const [leaveGroup, leaveGroupLoading, leaveGroupData] = useAsyncMutation(
    useLeaveGroupMutation
  );

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
  };

  const deleteChatHandler = () => {
    closeHandler();
    deleteChat("Deleting Chat...", selectedDeleteChat.chatId);
  };
  const leaveGroupHandler = () => {
    closeHandler();
    leaveGroup("Leaving Group...", { chatId: selectedDeleteChat.chatId });
  };

  useEffect(() => {
    if (deleteChatData || leaveGroupData) {
      navigate("/");
    }
  }, [deleteChatData, navigate, leaveGroupData]);

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteOptionAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={
          selectedDeleteChat.groupChat ? leaveGroupHandler : deleteChatHandler
        }
      >
        {selectedDeleteChat.groupChat ? (
          <>
            <ExitToAppIcon />
            <Typography>Leave Group</Typography>
          </>
        ) : (
          <>
            <DeleteIcon />
            <Typography>Delete Chat</Typography>
          </>
        )}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
