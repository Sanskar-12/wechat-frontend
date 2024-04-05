/* eslint-disable react/prop-types */

import { Menu, MenuList, MenuItem, Tooltip, ListItemText } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setIsFileMenu, setIsUploadingLoader } from "../redux/reducers/misc";
import {
  Image as ImageIcon,
  AudioFile as AudioFileIcon,
  VideoFile as VideoFileIcon,
  UploadFile as UploadFileIcon,
} from "@mui/icons-material";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useSendAttachmentsMutation } from "../redux/api/api";

const FileMenu = ({ anchorE1, chatId }) => {
  const dispatch = useDispatch();
  const { isFileMenu } = useSelector((state) => state.misc);
  const imageRef = useRef();
  const audioRef = useRef();
  const videoRef = useRef();
  const fileRef = useRef();

  const [sendAttachments] = useSendAttachmentsMutation();

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

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);

    if (files.length <= 0) return;

    if (files.length > 5) {
      return toast.error(`You can only send 5 ${key} at a time`);
    }

    dispatch(setIsUploadingLoader(true));
    const toastId = toast.loading(`Sending ${key} ...`);
    closeHandler();

    try {
      const myForm = new FormData();

      myForm.append("chatId", chatId);
      files.forEach((file) => myForm.append("files", file));

      const res = await sendAttachments(myForm);
      if (res?.data) {
        toast.success(`${key} sent successfully`, { id: toastId });
      } else {
        toast.error(`Failed to send ${key}`, { id: toastId });
      }
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      dispatch(setIsUploadingLoader(false));
    }
  };

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
              accept="image/png, image/jpeg, image/jpg, image/gif"
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
