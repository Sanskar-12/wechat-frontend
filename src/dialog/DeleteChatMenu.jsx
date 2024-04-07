/* eslint-disable react/prop-types */

import { Menu, Stack } from "@mui/material";

const DeleteChatMenu = ({ dispatch, deleteOptionAnchor }) => {
  const closeHandler = () => {};

  return (
    <Menu open onClose={closeHandler} anchorEl={deleteOptionAnchor}>
      <Stack
        sx={{
          width: "10rem",
        }}
      ></Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
