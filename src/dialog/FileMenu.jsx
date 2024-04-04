/* eslint-disable react/prop-types */

import { Menu, MenuList, MenuItem, Tooltip, ListItemText } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import {
  Image as ImageIcon,
  AudioFile as AudioFileIcon,
  VideoFile as VideoFileIcon,
  UploadFile as UploadFileIcon,
} from "@mui/icons-material";
import { useRef } from "react";

const FileMenu = ({ anchorE1 }) => {
  const dispatch = useDispatch();
  const { isFileMenu } = useSelector((state) => state.misc);
  const imageRef = useRef();
  const audioRef = useRef();
  const videoRef = useRef();
  const fileRef = useRef();

  const closeHandler = () => {
    dispatch(setIsFileMenu(false));
  };

  const selectImage = () => {
    imageRef.current.click();
  };
  const selectAudio = () => {
    audioRef.current.click();
  };
  const selectVideo = () => {
    videoRef.current.click();
  };
  const selectFile = () => {
    fileRef.current.click();
  };

  const fileChangeHandler = (e, key) => {};

  return (
    <Menu anchorEl={anchorE1} open={isFileMenu} onClose={closeHandler}>
      <div
        style={{
          width: "10rem",
        }}
      >
        <MenuList>
          <MenuItem onClick={selectImage}>
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg, image/gif"
              style={{
                display: "none",
              }}
              onChange={(e) => fileChangeHandler(e, "Images")}
              ref={imageRef}
            />
          </MenuItem>
          <MenuItem onClick={selectAudio}>
            <Tooltip title="Audio">
              <AudioFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
            <input
              type="file"
              multiple
              accept="audio/mpeg, audio/wav"
              style={{
                display: "none",
              }}
              onChange={(e) => fileChangeHandler(e, "Audios")}
              ref={audioRef}
            />
          </MenuItem>
          <MenuItem onClick={selectVideo}>
            <Tooltip title="Video">
              <VideoFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
            <input
              type="file"
              multiple
              accept="video/mp4, video/webm, video/ogg"
              style={{
                display: "none",
              }}
              onChange={(e) => fileChangeHandler(e, "Videos")}
              ref={videoRef}
            />
          </MenuItem>
          <MenuItem onClick={selectFile}>
            <Tooltip title="File">
              <UploadFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>File</ListItemText>
            <input
              type="file"
              multiple
              accept="*"
              style={{
                display: "none",
              }}
              onChange={(e) => fileChangeHandler(e, "Files")}
              ref={fileRef}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
};

export default FileMenu;
