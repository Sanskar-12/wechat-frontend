/* eslint-disable react/prop-types */
import {
  Stack,
  Dialog,
  DialogTitle,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";
import UserItem from "../components/shared/UserItem";
import { useState } from "react";
import {
  useAddGroupMemberMutation,
  useGetAvailableFriendsQuery,
} from "../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/misc";
import { useAsyncMutation, useErrors } from "../../hooks/hook";

const AddMemberDialog = ({ chatId }) => {
  const { isAddMember } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const [addGroupMember, addGroupMemberLoading] = useAsyncMutation(
    useAddGroupMemberMutation
  );
  const { isLoading, data, isError, error } =
    useGetAvailableFriendsQuery(chatId);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((current) => current !== id)
        : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    addGroupMember("Adding Members...", { chatId, members: selectedMembers });
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  useErrors([
    {
      isError,
      error,
    },
  ]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={addGroupMemberLoading}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
