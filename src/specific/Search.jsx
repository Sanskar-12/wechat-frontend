import {
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  InputAdornment,
  List,
} from "@mui/material";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../components/shared/UserItem";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsSearch } from "../redux/reducers/misc";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../redux/api/api";
import { useAsyncMutation } from "../../hooks/hook";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const [users, setUsers] = useState([]);

  const search = useInputValidation("");

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending Friend Request...", { userId: id });
  };

  const handleClose = () => {
    dispatch(setIsSearch(false));
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((err) => console.log(err));
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={handleClose}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
