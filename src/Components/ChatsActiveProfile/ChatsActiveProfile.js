import React from "react";
import { CgProfile } from "react-icons/cg";
import { Text, Stack, Image } from "@chakra-ui/react";
import { imageURL } from "../../utilities/config";
export default function ChatsActiveProfile({ getUser, userList }) {
  return userList?.map((d) => {
    console.log(imageURL + d?.user?.profile_picture);
    return (
      <Stack
        cursor={"pointer"}
        onClick={() => {
          getUser(d.user);
        }}
        spacing={"2"}
        key={d.id}
        direction="row"
        alignItems={"center"}
        p={"8px 0px"}
        borderRight={"1px solid #ddd"}
        borderBottom={"1px solid #ddd"}
      >
        {d?.user?.profile_picture ? (
          <Image
            width={"27px"}
            height={"27px"}
            borderRadius={"50%"}
            src={imageURL + d?.user?.profile_picture}
          />
        ) : (
          <CgProfile fontSize={"23px"} />
        )}
        <Text
          fontSize={{ base: "18px", sm: "12px", md: "18px", lg: "", "2xl": "" }}
          color={"#000"}
          fontWeight={"600"}
        >
          {d?.user?.fullname}
        </Text>
      </Stack>
    );
  });
}
