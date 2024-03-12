/* eslint-disable react/prop-types */

import { FileOpen as FileOpenIcon } from "@mui/icons-material";
import { transformImage } from "../../lib/features";

const RenderAttachments = ({ file, url }) => {
  switch (file) {
    case "video":
      return <video src={url} preload="none" width={"200px"} controls />;

    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          height={"150px"}
          width={"200px"}
          alt="Image"
          style={{
            objectFit: "contain",
          }}
        />
      );

    case "audio":
      return <audio src={url} preload="none" controls />;

    default:
      return <FileOpenIcon />;
  }
};

export default RenderAttachments;
