import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import {
  Box,
  Flex,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import Table from "../table/table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Avatar, Button } from "antd";
import { GET } from "../../utilities/ApiProvider";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Item from "antd/es/list/Item";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { imageURL } from "../../utilities/config";
import { TailSpin } from "react-loader-spinner";
import Detail from "../DetailsCard/Detail";
const Subcribers = () => {
  const [member, setMember] = useState([]);
  const [user, setUser] = useState();
  const params = useParams();
  const [loading,setLoading] = useState(true);
  const [details,setDetails] = useState();
  const getSubscriber = async () => {
    setLoading(true);
    const res = await GET(`membership/${params.id}/subscriptions`, {
      authorization: `bearer ${user?.JWT_TOKEN}`,
    });
    setMember(res.data);
    setLoading(false);
  };

  const selector = useSelector((state) => state);

  useEffect(() => {
    if (selector) {
      setUser(selector?.user?.user?.data?.data);
    }
  }, [selector]);

  useEffect(() => {
    if (user) {
      getSubscriber();
    }
  }, [user]);

  const { isOpen, onOpen, onClose } = useDisclosure();



  const getItem = (Item) => {
    setDetails(Item);
    onOpen();
  };


  return (
    <Sidebar>
      <Text
        fontSize={"30px"}
        letterSpacing={"5px"}
        mb={"30px"}
        fontWeight={"medibum"}
        textAlign={"center"}
      >
        Subcribers
      </Text>
      {
        loading?<Box display={"grid"} height={"50vh"} placeItems={"center"}>
        <TailSpin
          height="80"
          width="80"
          color="blue"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </Box>:
        <Box>
        {member &&
            member?.map((Item) => {
              return (
                <>
                  <Box
                    display={"flex"}
                    key={Item}
                    width={"100%"}
                    justifyContent={"space-between"}
                  >
                    <WrapItem width={"250px"}>
                      <Avatar
                        size={"xl"}
                        name={Item.full_name}
                        src={imageURL + Item.profilePic}
                      />
                      <Box>
                        <Text color={"gray.700"}>Name</Text>
                        <Text fontWeight={"bold"} fontSize={"13px"}>
                          {Item?.full_name ?? "loading"}
                        </Text>
                      </Box>
                    </WrapItem>
                    <Flex
                      justifyContent={"left"}
                      flexDirection={"column"}
                      width={"350px"}
                      display={{ base: "none", md: "none", lg: "block" }}
                    >
                      <Text>Email</Text>
                      <Text fontWeight={"500"}>{Item?.email ?? "loading"}</Text>
                    </Flex>
                    <Box
                      width={"250px"}
                      display={{ base: "none", md: "none", lg: "block" }}
                    >
                      <Text>Phone Number:</Text>
                      <Text fontWeight={"500"}>
                        {Item?.phone_number ?? "loading"}
                      </Text>
                    </Box>
                    <Box display={{ base: "block", md: "block", lg: "none" }}>
                      <Button
                        marginLeft={"120px"}
                        backgroundColor="hsl(352.86deg 100% 32.94%)"
                        color={"#fff"}
                        onClick={() => {
                          getItem(Item);
                        }}
                        size="sm"
                        _hover={{ backgroundColor: "0d1140" }}
                        
                      >
                        View Details
                      </Button>
                    </Box>
                    <Box borderBottom={"2px solid #000"}></Box>
                  </Box>
                  <Box
                    _last={{ width: 0 }}
                    width={"80%"}
                    marginLeft={"45px"}
                    margin={"20px 0"}
                    border={"1px solid gray"}
                  ></Box>
                </>
              );
            })}
      </Box>
      }

      <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"}  flexDirection={{base:"column",md:"row"}} gap={"20px"} flexWrap={"wrap"} justifyContent={"space-between"}>
              <Box width={"40%"}>
                <Text fontWeight={"bold"}>Name</Text>
                <Text>{details?.full_name ?? "loading"}</Text>
              </Box>
              <Box width={"40%"}>
                <Text fontWeight={"bold"}>Email</Text>
                <Text>{details?.email??"loading"}</Text>
              </Box>
              <Box width={"40%"}>
                <Text fontWeight={"bold"}>Phone Number</Text>
                <Text>{details?.phone_number??"loading"}</Text>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Sidebar>
  );
};

export default Subcribers;
