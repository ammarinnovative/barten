import { Box, Button, Text, WrapItem, Flex, Avatar, } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imageURL } from "../../utilities/config";


export default function Table({ name, email,joined, profile, id, onOpen, btnItems }) {
  return (
    <Box marginTop={"70px"}>
      <Box marginBottom={"30px"} key={id}>
        <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
          <WrapItem width={"200px"}>
            <Avatar name={name} src={`${imageURL}${profile}`} />
            <Box>
              <Text color={"gray.700"}>Name</Text>
              <Text fontWeight={"bold"} fontSize={"13px"}>
                {name}
              </Text>
            </Box>
          </WrapItem>
          <Box
            width={"200px"}
            display={{ base: "none", md: "none", lg: "block" }}
          >
            <Text>Email</Text>
            <Text fontWeight={"500"}>{email}</Text>
          </Box>
          <Box display={{ base: "none", md: "none", lg: "block" }}>
            <Text>Joined At</Text>
            <Text fontWeight={"600"}>{joined}</Text>
          </Box>
          <Box display={{ base: "none", md: "none", lg: "block" }}>
            <Text></Text>
            <Text fontWeight={"500"}></Text>
          </Box>
          <Box>
          <Link to={`/dashboard/UserDetails/${id}`}>
            <Button
              marginLeft={"120px"}
              color={"#fff"}
              size="sm"
              _hover={"none"}
              backgroundColor={"hsl(352.86deg 100% 32.94%)"}
            >
              View Details
            </Button>
            </Link>
          </Box>
          <Box borderBottom={"2px solid #000"}></Box>
        </Box>
        <Box
          width={"80%"}
          marginLeft={"45px"}
          marginTop={"30px"}
          border={"1px solid gray"}
        ></Box>
      </Box>
    </Box>
  );
}
