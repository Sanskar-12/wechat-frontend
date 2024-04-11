import { useEffect, useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import Table from "../components/shared/Table";
import { Avatar, Stack, Box } from "@mui/material";
import { fileFormat, transformImage } from "../lib/features";
import moment from "moment";
import RenderAttachments from "../components/shared/RenderAttachments";
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
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;

      return attachments.length > 0
        ? attachments.map((attachment, index) => {
            const url = attachment.url;

            const file = fileFormat(url);

            return (
              <Box key={index}>
                <a
                  href={url}
                  target="_blank"
                  download
                  style={{
                    color: "black",
                  }}
                >
                  <RenderAttachments file={file} url={url} />
                </a>
              </Box>
            );
          })
        : "No Attachments";
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];

const MessageManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/admin/messages`,
    "messages"
  );

  const { transformedMessages } = data || [];

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (transformedMessages) {
      setRows(
        transformedMessages?.map((message) => ({
          ...message,
          id: message._id,
          sender: {
            name: message.sender.name,
            avatar: transformImage(message.sender.avatar, 50),
          },
          createdAt: moment(message.createdAt).format(
            "MMMM Do YYYY, h:mm:ss a"
          ),
        }))
      );
    }
  }, [transformedMessages]);

  return (
    <AdminLayout>
      {loading ? (
        <LayoutLoader />
      ) : (
        <Table
          rows={rows}
          columns={columns}
          heading={"All Messages"}
          rowHeight={200}
        />
      )}
    </AdminLayout>
  );
};

export default MessageManagement;
