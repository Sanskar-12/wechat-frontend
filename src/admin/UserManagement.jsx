import { useEffect, useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import Table from "../components/shared/Table";
import { Avatar } from "@mui/material";
import { transformImage } from "../lib/features";
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
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];

const UserManagement = () => {
  const [rows, setRows] = useState([]);

  const { loading, data, error } = useFetchData(
    `${server}/admin/users`,
    "users"
  );

  const { transformedUsers } = data || [];

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  useEffect(() => {
    if (transformedUsers) {
      setRows(
        transformedUsers?.map((user) => ({
          ...user,
          id: user._id,
          avatar: transformImage(user.avatar, 50),
        }))
      );
    }
  }, [transformedUsers]);

  return (
    <AdminLayout>
      {loading ? (
        <LayoutLoader />
      ) : (
        <Table rows={rows} columns={columns} heading={"All Users"} />
      )}
    </AdminLayout>
  );
};

export default UserManagement;
