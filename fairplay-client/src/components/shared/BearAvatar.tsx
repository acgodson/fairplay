import React from "react";
import { createAvatar } from "@dicebear/core";
import { lorelei, adventurerNeutral } from "@dicebear/collection";
import { Avatar } from "@chakra-ui/react";

const BearAvatar = ({
  did,
  size,
}: {
  did: string;
  size: "sm" | "lg" | "xl";
}) => {
  // Generate the avatar URL based on the user's DID
  const avatarSvg = createAvatar(adventurerNeutral, {
    seed: did,
    flip: true,
    radius: 50,
    backgroundType: ["gradientLinear", "solid"],
  });

  return (
    <div>
      <Avatar size={size} src={avatarSvg.toDataUri()} />
    </div>
  );
};

export default BearAvatar;
