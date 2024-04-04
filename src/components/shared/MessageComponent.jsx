/* eslint-disable react/prop-types */
import { memo } from "react";
import { Typography, Box } from "@mui/material";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachments from "./RenderAttachments";

const MessageComponentPage = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const sameSender = sender._id === user._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? "#90E0EF" : "white",
        color: sameSender ? "#00171f" : "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography color={"#023E8A"} fontWeight={"600"} variant="caption">
          {sender.name}
        </Typography>
      )}

      {content && <Typography>{content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
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
        })}

      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </div>
  );
};

const MessageComponent = memo(MessageComponentPage);
export default MessageComponent;
