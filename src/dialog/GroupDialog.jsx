import {
  Dialog,
  Stack,
  DialogTitle,
  Typography,
  TextField,
  Button,
  Skeleton,
} from "@mui/material";
import UserItem from "../components/shared/UserItem";
import { useInputValidation } from "6pp";
import { useState } from "react";
import {
  useGetAvailableFriendsQuery,
  useNewGroupChatMutation,
} from "../redux/api/api.js";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNewGroup } from "../redux/reducers/misc.js";
import toast from "react-hot-toast";

const GroupDialog = () => {
  const { data, isLoading, isError, error } = useGetAvailableFriendsQuery("");

  const [selectedMembers, setSelectedMembers] = useState([]);
  const { isNewGroup } = useSelector((state) => state.misc);
  const [newGroup, newGroupLoading] = useAsyncMutation(useNewGroupChatMutation);

  const groupName = useInputValidation("");
  const dispatch = useDispatch();

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((current) => current !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group Name is Required");
    if (selectedMembers.length < 2)
      return toast.error("Please select atleast 2 members");
    newGroup("Creating New Group...", {
      name: groupName.value,
      members: selectedMembers,
    });
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  useErrors([{ isError, error }]);

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"25rem"} spacing={"1rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>

        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((user) => (
              <UserItem
                user={user}
                key={user._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          )}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            variant="text"
            color="error"
            size="large"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            disabled={newGroupLoading}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default GroupDialog;
