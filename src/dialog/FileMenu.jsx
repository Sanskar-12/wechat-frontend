/* eslint-disable react/prop-types */

import { Menu } from "@mui/material";

const FileMenu = ({ anchorE1 }) => {
  return (
    <Menu anchorEl={anchorE1} open={false}>
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
