/* eslint-disable react/prop-types */

import { Menu } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";

const FileMenu = ({ anchorE1 }) => {
  const dispatch = useDispatch();
  const { isFileMenu } = useSelector((state) => state.misc);

  const closeHandler = () => {
    dispatch(setIsFileMenu(false));
  };

  return (
    <Menu anchorEl={anchorE1} open={isFileMenu} onClose={closeHandler}>
      <div
        style={{
          width: "10rem",
        }}
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
        voluptatibus asperiores tempora iusto, odit nostrum minima possimus
        atque, fugit quo libero eum dolorum reiciendis soluta provident error
        quae? Quisquam, adipisci.
      </div>
    </Menu>
  );
};

export default FileMenu;
