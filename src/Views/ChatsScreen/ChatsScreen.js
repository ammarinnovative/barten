import React, { useEffect, useState } from "react";
import {
  Heading,
  Stack,
  Flex,
  Box,
  Text,
  Image,
  Button,
  Input,
  Link,
  Tabs,
  TabList,
  TabPanels,
  CheckboxGroup,
  Tab,
  TabPanel,
  InputGroup,
  Checkbox,
  InputLeftElement,
  useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { LinkIcon } from "@chakra-ui/icons";
import { FaEllipsisV } from "react-icons/fa";
import CahtProfile from "../../Assets/Images/cahtProfile.png";
import CahtProfilein from "../../Assets/Images/cahtProfilein.png";
import Avatar from "../../Assets/Images/Avatar.png";
import Avatar2 from "../../Assets/Images/Avatar2.png";
import Avatar3 from "../../Assets/Images/Avatar3.png";
import ActiveProfile from "../../Components/ChatsActiveProfile/ChatsActiveProfile";
import CahtProfilein2 from "../../Assets/Images/cahtProfilein2.png";
import { useSelector } from "react-redux";
import { GET } from "../../utilities/ApiProvider";
import { POST } from "../../utilities/ApiProvider";
import Avatar4 from "../../Assets/Images/Avatar4.png";
import { useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Select,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import io from "socket.io-client";
import { message } from "antd";
import { imageURL, socketUrl } from "../../utilities/config";

export default function ChatsScreen() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);

  const [fields, setFields] = useState({
    title: "",
    details: "",
    membership: [],
    categories: [],
  });
  const [category, setCategories] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectUser, setSelectUser] = useState(false);
  const navigate = useNavigate();
  const [chatUser, setChatUser] = useState({});
  const GetCategories = async () => {
    // const res =await GET(`courseCategory/getAllCourseCategoryList`,{
    //     authorization: `bearer${`${user.JWT_TOKEN}`}`
    // });
    const res = await GET("courseCategory/getAllCourseCategoryList", {
      authorization: `bearer ${user?.JWT_TOKEN}`,
    });
    setCategories(res?.data);
  };

  const [membership, setMembership] = useState([]);
  const getMembership = async () => {
    const res = await GET(`membership?limit=23&page=`, {
      authorization: `bearer ${user?.JWT_TOKEN}`,
    });
    setMembership(res.data);
  };

  const selector = useSelector((state) => state);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (selector) {
      setUser(selector?.user?.user);
    }
  }, [selector]);

  useEffect(() => {
    if (user) {
      GetCategories();
      getMembership();
    }
    if(!JSON.parse(localStorage.getItem("userss"))){
      navigate("/login")
    }
  }, [user,navigate]);

  const CreateAnnouncement = async () => {
    setLoading(true);
    if (
      !fields.title ||
      !fields.details ||
      !fields.categories ||
      !fields.membership
    ) {
      toast({
        position: "bottom-left",
        isClosable: true,
        status: "error",
        duration: 5000,
        description: "please fill all the fields",
      });
      setLoading(false);
      return;
    }

    const res = await POST("announcement", fields, {
      authorization: `bearer ${user?.JWT_TOKEN}`,
    });
    if (res.status == 200) {
      toast({
        position: "bottom-left",
        isClosable: true,
        status: "success",
        duration: 5000,
        description: res.data.message,
      });
      setFields({
        title: "",
        details: "",
        membership: [],
        categories: [],
      });
    } else {
      toast({
        position: "bottom-left",
        isClosable: true,
        status: "error",
        duration: 5000,
        description: res.data.message,
      });
      setFields({
        title: "",
        details: "",
        membership: [],
        categories: [],
      });
    }
    setLoading(false);
  };



  const getUser = (data) => {
    setChatUser(data);
    socket?.emit("chatMessages", {
      senderId: user?._id,
      receiverId: data._id,
    });
    setSelectUser(true);
  };

  // ! SOCKET IMPLEMENTATIONS

  const [socketConnected, setSocketConnected] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [messageField, setMessageField] = useState("");

  console.log("messageList",messageList);

  console.log(messageList);

  useEffect(() => {
    if (user) {
      const newSocket = io(socketUrl);
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  useEffect(() => {
    if (socket == null) {
      return;
    }
    socket?.on("chatList", (data) => {
      setUserList(data);
    });
    socket?.emit("chatList", {
      senderId: user?._id,
    });

    // socket?.on("chatMessages", (vals) => {
    //   setMessageList(vals);
    //   console.log("work", vals);
    // });
    socket?.on("chatMessages", (newMessages) => {
      setMessageList((prevMessages) => [...prevMessages, ...newMessages]);
    });
    socket?.on("message", (code) => {
      console.log("code", code);
    });
  }, [socket]);

  const sendMessage = () => {
    if (messageField !== "") {
      socket?.emit("message", {
        senderId: user?._id,
        receiverId: chatUser._id,
        message: messageField,
      });
      setMessageField("");
      setMessageList((prevMessages) => [
        ...prevMessages,
        {
          senderId: user?._id,
          receiverId: chatUser._id,
          message: messageField,
        },
      ]);
    }
  };

  return (
    <Sidebar>
      <Stack
        spacing={"20px"}
        direction={"row"}
        flexDirection={{
          base: "column",
          sm: "row",
          md: "row",
          lg: "",
          "2xl": "",
        }}
      >
        {/* profile */}
        <Stack flex={"1"} overflow={"auto"} height={"820px"}>
          <Heading as="h2" size="md">
            All Chats
          </Heading>

          <Text
            color={"hsl(352.86deg 100% 32.94%)"}
            mt={"20px"}
            mb={"20px"}
            fontWeight={"600"}
          >
            Direct Chats
          </Text>
          <Stack
            height={"500px"}
            overflowX={"hidden !important"}
            overflow={"scroll"}
          >
            <ActiveProfile getUser={getUser} userList={userList} />
          </Stack>
        </Stack>
        <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Annoucnment</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Tilte"
                margin={"5px 0"}
                value={fields.title}
                onChange={(e) => {
                  setFields({ ...fields, title: e.target.value });
                }}
                name="title"
              />
              <Input
                placeholder="details"
                margin={"5px 0"}
                value={fields.details}
                onChange={(e) => {
                  setFields({ ...fields, details: e.target.value });
                }}
                name="details"
              />
              <Text
                fontSize={"18px"}
                marginBottom={"5px"}
                fontWeight={"normal"}
              >
                Select Membership:
              </Text>
              <CheckboxGroup
                onChange={(e) => {
                  setFields({ ...fields, membership: e });
                }}
                value={fields.membership}
                colorScheme="blue"
              >
                <Stack direction={["column"]} spacing={[1, 5]}>
                  {membership &&
                    membership?.map((item) => {
                      return (
                        <Checkbox size={"md"} key={item?._id} value={item._id}>
                          {item.name}
                        </Checkbox>
                      );
                    })}
                </Stack>
              </CheckboxGroup>
              <Text
                fontSize={"18px"}
                marginTop={"20px"}
                colorScheme="blue"
                marginBottom={"10px"}
                fontWeight={"normal"}
              >
                Select Category:
              </Text>
              <CheckboxGroup
                value={fields.categories}
                onChange={(e) => {
                  setFields({ ...fields, categories: e });
                }}
              >
                <Stack direction={["column"]} mb={"20px"} spacing={5}>
                  {category &&
                    category?.map((item) => {
                      return (
                        <Checkbox
                          value={item?._id}
                          colorScheme="blue"
                          size={"md"}
                          key={item?._id}
                        >
                          {item?.course_category_name}
                        </Checkbox>
                      );
                    })}
                </Stack>
              </CheckboxGroup>
              <Button
                width="100%"
                color={"white"}
                onClick={CreateAnnouncement}
                mt={"15px"}
                _hover={"none"}
                backgroundColor={"#1e2597"}
              >
                Submit
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Header , writter */}
        <Stack
          flex={"4"}
          borderBottom={"1px solid #000"}
          boxShadow={"3px -1px 5px -1px #000"}
          position="relative"
          height={"700px"}
        >
          {/* Header */}

          <>
            <Box
              bg={"hsl(352.86deg 100% 32.94%)"}
              color={"#fff"}
              padding={"15px 30px"}
            >
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Heading as="h2" size="md">
                  {chatUser?.fullname}
                </Heading>
                <Link to="/">
                  <FaEllipsisV />
                </Link>
              </Flex>
            </Box>
            {/* tabs */}
            <Tabs>
              {/* chat */}
              <TabPanels>
                <TabPanel>
                  <Box
                    height={"500px"}
                    mb={{ base: "50px", sm: "", md: "0px", lg: "", "2xl": "" }}
                    overflow={"auto"}
                  >
                    {messageList?.length > 0 ? (
                      messageList &&
                      messageList?.map((data) =>(
                        
                        <Box
                          key={data?._id}
                          padding={{
                            base: "0",
                            sm: "",
                            md: "10px",
                            lg: "",
                            "2xl": "",
                          }}
                        >
                          <Stack
                            spacing={{
                              base: "0",
                              sm: "",
                              md: "6",
                              lg: "",
                              "2xl": "",
                            }}
                            direction={
                              user?._id === data?.senderId
                                ? "row-reverse"
                                : "row"
                            }
                            alignItems={"center"}
                            paddingBottom={"20px"}
                          >
                            {
                              user?._id === data?.senderId?<Image
                              width={{
                                base: "15%",
                                sm: "8%",
                                md: "3%",
                                lg: "",
                                "2xl": "",
                              }}
                              src={imageURL+user?.profile_picture}

                            ></Image>:<Image
                            width={{
                              base: "15%",
                              sm: "8%",
                              md: "3%",
                              lg: "",
                              "2xl": "",
                            }}
                            src={Avatar4}

                          ></Image>
                            }
                            
                            <Text
                              fontSize={"md"}
                              bg={
                                user?._id === data?.senderId
                                  ? "hsl(352.86deg 100% 32.94%)"
                                  : "#b2b2b2"
                              }
                              color={
                                user?._id === data?.senderId ? "#fff" : "#000"
                              }
                              borderRadius={
                                user?._id === data?.senderId
                                  ? "12px 12px 0px 12px"
                                  : "12px 12px 12px 0px"
                              }
                              padding={"10px 20px"}
                            >
                              {data?.message ??
                                "Waiting for this message to arrive..."}
                            </Text>
                          </Stack>
                        </Box>
                      ))
                    ) : (
                      <Text color={"black"}>No Conversation yet</Text>
                    )}
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>

            {/* writter */}
            <Stack
              bg={"#c8c8c8"}
              position={"absolute"}
              w={"100%"}
              bottom={"0"}
              padding={{
                base: "10px 10px",
                sm: "",
                md: "10px 30px",
                lg: "",
                "2xl": "",
              }}
              justifyContent={"space-between"}
              direction={"column,row"}
              alignItems={"center"}
            >
              <Link to="/">
                <LinkIcon fontSize={"20px"} color={"#000"} />
              </Link>
              <Input
                type="text"
                color={"#000"}
                border={"none"}
                height={"auto"}
                placeholder=" Enter your message"
                _placeholder={{ color: "#000" }}
                _focusVisible={{ border: "none" }}
                value={messageField}
                onChange={(e) => setMessageField(e.target.value)}
              />
              <Button
                padding={{
                  base: "25px 20px",
                  sm: "",
                  md: "25px 50px",
                  lg: "",
                  "2xl": "",
                }}
                BorderRadius={"3px"}
                bg={"hsl(352.86deg 100% 32.94%)"}
                color={"#fff"}
                onClick={sendMessage}
                _hover={{
                  bg: "transparent",
                  border: "1px solid hsl(352.86deg 100% 32.94%)",
                  color: "hsl(352.86deg 100% 32.94%)",
                  transition: "all 0.3s",
                }}
              >
                Send
              </Button>
            </Stack>
          </>
        </Stack>
      </Stack>
    </Sidebar>
  );
}
