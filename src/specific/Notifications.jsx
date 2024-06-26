/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import {
  Dialog,
  Stack,
  DialogTitle,
  Typography,
  ListItem,
  Avatar,
  Button,
  Skeleton,
} from "@mui/material";
import { memo } from "react";
import {
  useAcceptFriendRequestMutation,
  useGetAllNotificationsQuery,
} from "../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { useSelector, useDispatch } from "react-redux";
import { setIsNotification } from "../redux/reducers/misc";
import { toast } from "react-hot-toast";

const Notifications = () => {
  const dispatch = useDispatch();
  const { data, isError, error, isLoading } = useGetAllNotificationsQuery();
  const [acceptRequest] = useAcceptFriendRequestMutation();

  const { isNotifications } = useSelector((state) => state.misc);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));

    try {
      const res = await acceptRequest({ requestId: _id, accept });

      if (res?.data?.success) {
        console.log("Socket perform");
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  useErrors([{ isError, error }]);

  const closeHandler = () => {
    dispatch(setIsNotification(false));
  };

  return (
    <Dialog open={isNotifications} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests?.length > 0 ? (
              data?.allRequests?.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography>No Notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} sent you a friend request. `}
        </Typography>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
