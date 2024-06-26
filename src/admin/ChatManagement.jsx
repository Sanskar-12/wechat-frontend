import { useEffect, useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import Table from "../components/shared/Table";
import { Avatar, Stack } from "@mui/material";
import { transformImage } from "../lib/features";
import AvatarCard from "../components/shared/AvatarCard";
import { useFetchData } from "6pp";
import { server } from "../constants/config";
import { LayoutLoader } from "../components/layout/Loaders";
import { useErrors } from "../../hooks/hook.js";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];

const ChatManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/admin/chats`,
    "chats"
  );

  const { transformedChats } = data || [];

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (transformedChats) {
      setRows(
        transformedChats?.map((chat) => ({
          ...chat,
          id: chat._id,
          avatar: chat.avatar.map((i) => transformImage(i, 50)),
          members: chat.members.map((i) => transformImage(i.avatar, 50)),
          creator: {
            name: chat.creator.name,
            avatar: transformImage(chat.creator.avatar),
          },
        }))
      );
    }
  }, [transformedChats]);

  return (
    <AdminLayout>
      {loading ? (
        <LayoutLoader />
      ) : (
        <Table rows={rows} columns={columns} heading={"All Chats"} />
      )}
    </AdminLayout>
  );
};

export default ChatManagement;
