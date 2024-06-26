import {
  Grid,
  Tooltip,
  IconButton,
  Box,
  Drawer,
  Stack,
  Typography,
  TextField,
  Button,
  Backdrop,
  Skeleton,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import GroupList from "../specific/GroupList";
import UserItem from "../components/shared/UserItem";
import {
  useDeleteGroupMutation,
  useGetChatDetailsQuery,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api.js";
import { useAsyncMutation, useErrors } from "../../hooks/hook.js";
import { LayoutLoader } from "../components/layout/Loaders";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/misc.js";
const ConfirmDeleteDialog = lazy(() => import("../dialog/ConfirmDeleteDialog"));
const AddMemberDialog = lazy(() => import("../dialog/AddMemberDialog"));

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");

  const { isAddMember } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isLoading, data, isError, error } = useMyGroupsQuery("");
  const { data: chatDetailsData } = useGetChatDetailsQuery({
    chatId,
    populate: true,
  });

  const [renameGroup, renameGroupLoading] = useAsyncMutation(
    useRenameGroupMutation
  );

  const [removeGroupMember, removeGroupMemberLoading] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );

  const [deleteGroup] = useAsyncMutation(useDeleteGroupMutation);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [updatedgroupName, setUpdatedGroupName] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [members, setMembers] = useState([]);

  const navigate = useNavigate();

  useErrors([{ isError, error }]);

  const navigateBack = () => {
    navigate("/");
  };

  const handleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupName = () => {
    setIsEdit(false);
    renameGroup("Updating Group name...", { chatId, name: updatedgroupName });
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    closeConfirmDeleteHandler();
    navigate("/groups");
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const removeMemberHandler = (id) => {
    removeGroupMember("Removing Member...", { chatId, userId: id });
  };

  useEffect(() => {
    if (chatDetailsData) {
      setMembers(chatDetailsData?.chat?.members);
      setGroupName(chatDetailsData?.chat?.name);
      setUpdatedGroupName(chatDetailsData?.chat?.name);
    }

    return () => {
      setMembers([]);
      setGroupName("");
      setUpdatedGroupName("");
      setIsEdit(false);
    };
  }, [chatDetailsData]);

  useEffect(() => {
    if (!chatId) {
      navigate("/groups");
    }

    return () => {
      setGroupName("");
      setUpdatedGroupName("");
      setIsEdit(false);
    };
  }, [chatId, navigate]);

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "2rem",
          },
        }}
      >
        <IconButton onClick={handleMenu}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "rgb(0,0,0,0.8)",
            color: "white",
            "&:hover": {
              bgcolor: "black",
              color: "white",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={"1rem"}
        padding={"3rem"}
      >
        {isEdit ? (
          <>
            <TextField
              value={updatedgroupName}
              onChange={(e) => setUpdatedGroupName(e.target.value)}
            />
            <IconButton onClick={updateGroupName} disabled={renameGroupLoading}>
              <DoneIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="h4">{groupName}</Typography>
            <IconButton onClick={() => setIsEdit(true)}>
              <EditIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </>
  );

  const ButtonGroup = (
    <>
      <Stack
        direction={{
          xs: "column-reverse",
          sm: "row",
        }}
        spacing={"1rem"}
        p={{
          xs: "0",
          sm: "1rem",
          md: "1rem 4rem",
        }}
      >
        <Button
          size="large"
          startIcon={<DeleteIcon />}
          color="error"
          onClick={openConfirmDeleteHandler}
        >
          Delete Group
        </Button>
        <Button
          size="large"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAddMemberHandler}
        >
          Add Member
        </Button>
      </Stack>
    </>
  );

  return isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
      >
        <GroupList myGroups={data?.groups} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}

        {groupName && (
          <>
            {GroupName}

            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Group Members
            </Typography>

            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              {removeGroupMemberLoading ? (
                <Skeleton />
              ) : (
                members?.map((user) => (
                  <UserItem
                    key={user._id}
                    user={user}
                    isAdded
                    styling={{
                      boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                    }}
                    handler={removeMemberHandler}
                  />
                ))
              )}
            </Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={openConfirmDeleteHandler}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      <Drawer
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <GroupList myGroups={data?.groups} chatId={chatId} w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default Groups;
