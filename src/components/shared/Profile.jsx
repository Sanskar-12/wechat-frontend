/* eslint-disable react/prop-types */
import { Avatar, Stack, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";

const Profile = ({ user }) => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
        src={transformImage(user?.avatar?.url)}
      />
      <ProfileCard text={user && user.bio} heading={"Bio"} />
      <ProfileCard
        text={user && user.username}
        heading={"Username"}
        Icon={UserNameIcon}
      />
      <ProfileCard text={user && user.name} heading={"Name"} Icon={FaceIcon} />
      <ProfileCard
        text={moment(user && user.createdAt).fromNow()}
        heading={"Joined"}
        Icon={CalendarIcon}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}
    >
      {Icon && <Icon />}

      <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography color={"gray"} variant="caption">
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;
