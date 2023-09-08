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
import userEvent from "@testing-library/user-event";
import io from "socket.io-client";
import { socketUrl } from "../../utilities/config";
var socket;

export default function ChatsScreen() {
  const [data, setData] = useState([
    {
      name: "Crypto Trading",
      img: CahtProfile,
      id: 1,
    },
    {
      name: "Stock Marketing",
      img: CahtProfile,
      id: 2,
    },
    {
      name: "Nfts Bet",
      img: CahtProfile,
      id: 3,
    },
  ]);

  const [data2, setData2] = useState([
    {
      name: "John Doe",
      img: Avatar,
      id: 4,
    },
    {
      name: "Alexa Alexander",
      img: Avatar2,
      id: 5,
    },
    {
      name: "Adam Knight",
      img: Avatar3,
      id: 6,
    },
  ]);

  const [data3, setData3] = useState([
    {
      name: "Crypto Trading",
      img: CahtProfile,
      id: 7,
    },
    {
      name: "Stock Marketing",
      img: CahtProfile,
      id: 8,
    },
    {
      name: "Nfts Bet",
      img: CahtProfile,
      id: 9,
    },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const [fields, setFields] = useState({
    title: "",
    details: "",
    membership: [],
    categories: [],
  });
  const [category, setCategories] = useState([]);
  const GetCategories = async () => {
    // const res =await GET(`courseCategory/getAllCourseCategoryList`,{
    //     authorization: `bearer${`${user.JWT_TOKEN}`}`
    // });
    const res = await GET("courseCategory/getAllCourseCategoryList", {
      authorization: `bearer ${user?.JWT_TOKEN}`,
    });
    setCategories(res.data);
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
      console.log(selector?.user?.user?.data?.data);
      setUser(selector?.user?.user?.data?.data);
    }
  }, [selector]);

  useEffect(() => {
    if (user) {
      GetCategories();
      getMembership();
    }
  }, [user]);

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

  // ! SOCKET IMPLEMENTATIONS

  // State to check if socket connected successfully!
  const [socketConnected, setSocketConnected] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [messageField, setMessageField] = useState('');

  // To establish connection of socket if socket is not connected and after connection is
  // created emitting chatMessage to get the array of the message behalf of the reciever's ID.

  useEffect(() => {
    if (user) {
      if (!socketConnected) {
        socket = io("143.198.160.137:5405");
        socket.connect();
        socket.on('connected', () => {
          console.log('Socket connected successfully!');
          setSocketConnected(true);
        });
      }
      socket?.emit('chatMessages', {
        senderId: user?._id,
        receiverId: "646f08905d9a442875f38ffc"
      });
    }
  }, [user]);

  // A listener which listens upon chatMessages and bring updated array of the message
  useEffect(() => {
    if (socketConnected) {
      socket?.on('chatMessages', (messageList) => {
        console.log('message list from socket server', messageList);
        console.log(typeof messageList);
        if (messageList?.message) {
          setMessageList((prev) => [...prev, messageList]);
        } else {
          setMessageList((prev) => [...prev, ...messageList]);
        }
      });
    }
  }, [socketConnected]);

  const sendMessage = () => {
    if (messageField !== '') {
      console.log(messageField);
      socket?.emit('message', {
        senderId: user?._id,
        receiverId: "646f08905d9a442875f38ffc",
        message: messageField
      });
    }
  }

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
          
          <Text color={"hsl(352.86deg 100% 32.94%)"} mt={"20px"} mb={"20px"} fontWeight={"600"}>
            Direct Chats
          </Text>
          <ActiveProfile data={data2} />

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
        >
          {/* Header */}
          <Box bg={"hsl(352.86deg 100% 32.94%)"} color={"#fff"} padding={"15px 30px"}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Heading as="h2" size="md">
                Alexa John
              </Heading>
              <Link to="/">
                <FaEllipsisV />
              </Link>
            </Flex>
          </Box>
          {/* tabs */}
          <Tabs >
            <TabList borderBottom={"1px solid #1e2597"}>
            
              <Tab
                fontSize={{
                  base: "15px",
                  sm: "",
                  md: "row",
                  lg: "",
                  "2xl": "24px",
                }}
                color={"#727272"}
                fontWeight={"600"}
              >
                Alex John
              </Tab>
            </TabList>

            {/* chat */}
            <TabPanels>
              
            <TabPanel>
                <Box
                  height={"600px"}
                  mb={{ base: "50px", sm: "", md: "0px", lg: "", "2xl": "" }}
                  overflow={"auto"}
                >
                  {
                    messageList.length &&
                    messageList?.map(data =>
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
                          direction={user?._id === data?.senderId ? 'row-reverse' : 'row'}
                          alignItems={"center"}
                          paddingBottom={"20px"}
                        >
                          <Image
                            width={{
                              base: "15%",
                              sm: "8%",
                              md: "3%",
                              lg: "",
                              "2xl": "",
                            }}
                            src={Avatar4}
                          ></Image>
                          <Text
                            fontSize={"md"}
                            bg={user?._id === data?.senderId ? "#1e2597" : "#b2b2b2"}
                            color={user?._id === data?.senderId ? "#fff" : "#000"}
                            borderRadius={user?._id === data?.senderId ? "12px 12px 0px 12px" : "12px 12px 12px 0px"}
                            padding={"10px 20px"}
                          >
                            {data?.message ?? 'Waiting for this message to arrive...'}
                          </Text>
                        </Stack>
                      </Box>
                    )
                  }

                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  height={"600px"}
                  mb={{ base: "50px", sm: "", md: "0px", lg: "", "2xl": "" }}
                  overflow={"auto"}
                >
                  <Box
                    padding={{
                      base: "0px 0px",
                      sm: "",
                      md: "10px 30px",
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
                      direction="row"
                      alignItems={"center"}
                      justifyContent={"right"}
                      textAlign={"left"}
                      paddingBottom={"20px"}
                    >
                      <Text
                        fontSize={"md"}
                        bg={"#1e2598"}
                        color={"#fff"}
                        borderRadius={"12px 12px 0px 12px"}
                        padding={"10px 20px"}
                      >
                        Duis aute irure dolor in reprehenderit
                      </Text>
                      <Image
                        width={{
                          base: "15%",
                          sm: "8%",
                          md: "3%",
                          lg: "",
                          "2xl": "",
                        }}
                        src={CahtProfilein2}
                      ></Image>
                    </Stack>
                  </Box>

                  <Box
                    padding={{
                      base: "0px 0px",
                      sm: "",
                      md: "10px 30px",
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
                      direction="row"
                      alignItems={"center"}
                      justifyContent={"right"}
                      textAlign={"left"}
                      paddingBottom={"20px"}
                    >
                      <Text
                        fontSize={"md"}
                        bg={"#1e2598"}
                        color={"#fff"}
                        borderRadius={"12px 12px 0px 12px"}
                        padding={"10px 20px"}
                      >
                        Duis aute irure dolor in reprehenderit
                      </Text>
                      <Image
                        width={{
                          base: "15%",
                          sm: "8%",
                          md: "3%",
                          lg: "",
                          "2xl": "",
                        }}
                        src={CahtProfilein2}
                      ></Image>
                    </Stack>
                  </Box>

                  <Box
                    padding={{
                      base: "0px 0px",
                      sm: "",
                      md: "10px 30px",
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
                      direction="row"
                      alignItems={"center"}
                      justifyContent={"right"}
                      textAlign={"left"}
                      paddingBottom={"20px"}
                    >
                      <Text
                        fontSize={"md"}
                        bg={"#1e2598"}
                        color={"#fff"}
                        borderRadius={"12px 12px 0px 12px"}
                        padding={"10px 20px"}
                      >
                        Duis aute irure dolor in reprehenderit
                      </Text>
                      <Image
                        width={{
                          base: "15%",
                          sm: "8%",
                          md: "3%",
                          lg: "",
                          "2xl": "",
                        }}
                        src={CahtProfilein2}
                      ></Image>
                    </Stack>
                  </Box>
                  <Box
                    padding={{
                      base: "0px 0px",
                      sm: "",
                      md: "10px 30px",
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
                      direction="row"
                      alignItems={"center"}
                      justifyContent={"right"}
                      textAlign={"left"}
                      paddingBottom={"20px"}
                    >
                      <Text
                        fontSize={"md"}
                        bg={"#1e2598"}
                        color={"#fff"}
                        borderRadius={"12px 12px 0px 12px"}
                        padding={"10px 20px"}
                      >
                        Duis aute irure dolor in reprehenderit
                      </Text>
                      <Image
                        width={{
                          base: "15%",
                          sm: "8%",
                          md: "3%",
                          lg: "",
                          "2xl": "",
                        }}
                        src={CahtProfilein2}
                      ></Image>
                    </Stack>
                  </Box>
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
              onChange={e => setMessageField(e.target.value)}
            />
            <Button
              onClick={sendMessage}
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
        </Stack>
      </Stack>
    </Sidebar>
  );
}
