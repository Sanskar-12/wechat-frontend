/* eslint-disable react/prop-types */
import {
  Stack,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import UserItem from "../components/shared/UserItem";
import { sampleUsers } from "../constants/sampleData";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const addFriendHandler = (id) => {
    console.log(id, chatId);
  };

  return (
    <Dialog open>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {sampleUsers.length > 0 ? (
            sampleUsers.map((user) => (
              <UserItem key={user._id} user={user} handler={addFriendHandler} />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
