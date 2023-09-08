import { useState } from "react";
import {
  Box,
  Input,
  Select,
  Text,
  Flex,
  WrapItem,
  Avatar,
  Button,
  Wrap,
  useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GrAddCircle } from "react-icons/gr";
import { useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";
import { useToast } from "@chakra-ui/react";
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
import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { DELETE, GET, POST, PUT } from "../../utilities/ApiProvider";
import { json } from "react-router-dom";
const MeetingSchedule = () => {
  const selector = useSelector((state) => state);
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState({});
  const [meetingData, setMeetingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [time, setTime] = useState("");
  const [minutes, seconds] = time.split(":");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categeroy, setCategory] = useState([]);
  const [cancelledData, setCancelledData] = useState([]);
  const [catData, setCatData] = useState([]);
  const [fields, setFields] = useState({
    name: "",
    link: "",
    Date: "",
    time: "",
    membership: "",
    participant: "",
  });

  const toast = useToast();

  const createMeeting = async () => {
    console.log(time)
    if (
      !fields.name ||
      !fields.link ||
      !fields.Date ||
      !time ||
      !fields.membership ||
      !fields.participant
    ) {
      toast({
        position: "bottom-left",
        isClosable: true,
        duration: 5000,
        status: "error",
        description: "Please fill all the fields",
      });
      return;
    }
    setLoading(true);
    const totalseconds = parseInt(minutes) * 60 + parseInt(seconds);
    setFields({ ...fields, time: totalseconds.toString() });
    console.log(fields);
    // const jsonObj = JSON.stringify(fields);
    // console.log(jsonObj);
    const res = await POST("dashboard/meetings", fields, {
      authorization: `bearer ${user?.JWT_TOKEN}`,
    });
    console.log(res);
    if (res.status == 200) {
      toast({
        position: "bottom-left",
        isClosable: true,
        duration: 5000,
        status: "success",
        description: "Meeting schedule successfully",
      });
      setLoading(false);
    } else {
      toast({
        position: "bottom-left",
        isClosable: true,
        duration: 5000,
        status: "error",
        description: res.data.message,
      });
    }
    getMeeting();
    setLoading(false);
  };

  const getMeeting = async () => {
    const res = await GET("dashboard/meetings", {
      authorization: `bearer ${user?.JWT_TOKEN}`,
    });
    setMeetingData(res.data);
  };

  const getItem = (items) => {
    const find = categeroy.find((data) => data.name === items);
    setFields({ ...fields, membership: find._id });
    setCatData(find.subscriptions);
  };

  const getCategory = async () => {
    const res = await GET("membership/users", {
      authorization: ` bearer ${user?.JWT_TOKEN}`,
    });
    setCategory(res.data);
  };

  const CancelMeeting = async (id) => {
    const res = await PUT(`dashboard/meetings/${id}`);
    if (res.status == 200) {
      toast({
        position: "bottom-left",
        isClosable: true,
        duration: 5000,
        status: "success",
        description: "Meeting cancelled successfully",
      });
      getMeeting();
      cancellUser();
    } else {
      toast({
        position: "bottom-left",
        isClosable: true,
        status: "error",
        duration: 5000,
        description: res.message,
      });
    }
  };

  const cancellUser = async () => {
    const res = await GET("dashboard/meetings/cancelled", {
      authorization: `bearer ${user?.JWT_TOKEN}`,
    });
    setCancelledData(res.data);
  };

  useEffect(() => {
    if (selector) {
      setUser(selector?.user?.user?.data?.data);
    }
  }, [selector]);

  useEffect(() => {
    if (user) {
      getMeeting();
      cancellUser();
      getCategory();
    }
  }, [user]);

  const deleteMeeting = async (id) => {
    setToggle(true);
    try {
      const res = await DELETE(`dashboard/delete/${id}`, {
        authorization: `bearer ${user?.JWT_TOKEN}`,
      });
      if (res.status == 200) {
        toast({
          position: "bottom-left",
          isClosable: true,
          duration: 5000,
          status: "success",
          description: res.data.message,
        });
        setToggle(false);
      } else {
        toast({
          position: "bottom-left",
          isClosable: true,
          duration: 5000,
          status: "error",
          description: "",
        });
        setToggle(false);
      }
    } catch (error) {
      toast({
        position: "bottom-left",
        isClosable: true,
        duration: 5000,
        status: "error",
        description: "",
      });
    }
    setToggle(false);
    cancellUser();
  };

  return (
    <Sidebar>
      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Meeting</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="text"
              onChange={(e) => {
                setFields({ ...fields, name: e.target.value });
              }}
              m={"5px 0"}
              placeholder="Name"
            />
            <Input
              type="text"
              onChange={(e) => {
                setFields({ ...fields, link: e.target.value });
              }}
              m={"5px 0"}
              placeholder="Zoom Meeting Link"
            />
            <Input
              type="date"
              onChange={(e) => {
                setFields({ ...fields, Date: e.target.value });
              }}
            />
            <Input
              type="time"
              onChange={(e) => {
                setTime(e.target.value);
              }}
              m={"5px 0"}
            />
            <Select
              onChange={(e) => {
                getItem(e.target.value);
              }}
              placeholder="Select Membership"
              m={"5px 0"}
            >
              {categeroy &&
                categeroy?.map((item) => {
                  return <option>{item.name}</option>;
                })}
            </Select>
            <Select
              onChange={(e) => {
                setFields({ ...fields, participant: e.target.value });
              }}
              placeholder="Select User Id"
              m={"5px 0"}
            >
              {catData &&
                catData?.map((data) => {
                  return (
                    <option value={data?.user?._id}>
                      {data?.user?.full_name}
                    </option>
                  );
                })}
            </Select>
            <Button
              width={"100%"}
              m={"5px 0"}
              _hover={"none"}
              backgroundColor={"#1e2598"}
              color={"white"}
              onClick={createMeeting}
            >
              {loading ? (
                <TailSpin
                  width="30"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  visible={true}
                />
              ) : (
                " Create Meeting"
              )}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box
        display={"flex"}
        flexDirection={{
          base: "column",
          md: "column",
          lg: "column",
          xl: "row",
        }}
      >
        <Box flex={"2"}>
          <Box mt={"30px"}>
            <Text
              fontSize={"20px"}
              textAlign={{ base: "center", md: "center", lg: "left" }}
              margin="10px 0"
              fontFamily={"poppins"}
              fontWeight="600"
            >
              Next Zoom Meeting
            </Text>
            <Text textAlign={{ base: "center", md: "center", lg: "left" }}>
              {meetingData?.length} available meeting
            </Text>
            <Box marginTop={"30px"}>
              {meetingData &&
                meetingData?.map((data) => {
                  return (
                    <Box color={"black"} marginBottom={"30px"}>
                      <Flex
                        width={"100%"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <WrapItem>
                          <Avatar
                            name={data?.participant?.full_name}
                            border={"1px solid gray"}
                            src={imageURL + data?.participant?.profilePic}
                          />
                          <Box>
                            <Text color={"gray.700"}>Name</Text>
                            <Text fontWeight={"bold"} fontSize={"13px"}>
                              {data?.participant?.full_name}
                            </Text>
                          </Box>
                        </WrapItem>
                        <Box>
                          <Text>Date,</Text>
                          <Text fontWeight={"500"}>{data.date}</Text>
                        </Box>
                        <Button
                          color="red"
                          fontWeight={"normal"}
                          display={{ base: "none", md: "none", lg: "block" }}
                          border={"1px solid red"}
                          onClick={() => {
                            CancelMeeting(data._id);
                          }}
                        >
                          Cancel Meeting
                        </Button>
                        <Box
                          cursor="pointer"
                          display={{ base: "block", md: "block", lg: "none" }}
                        >
                          <GrClose />
                        </Box>
                        <Box borderBottom={"2px solid #000"}></Box>
                      </Flex>
                      <Box
                        width={"80%"}
                        _last={{ border: 0 }}
                        marginLeft={"45px"}
                        marginTop={"30px"}
                        border={"1px solid gray"}
                      ></Box>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </Box>
        <Box flex={"1"}>
          <Box
            display={"flex"}
            justifyContent={{
              base: "center",
              md: "left",
              lg: "left",
              xl: "right",
            }}
          >
            <Button
              onClick={onOpen}
              leftIcon={<GrAddCircle />}
              width={{ base: "100%", md: "100%", lg: "100%", xl: "60%" }}
              border={"1px solid #000"}
            >
              Create Meeting
            </Button>
          </Box>
          <Text mt={"30px"} fontSize={"20px"} fontWeight="600">
            Cancelled Meeting
          </Text>
          <Box>
            {cancelledData &&
              cancelledData?.map((item) => {
                return (
                  <>
                    <Box
                      display={"flex"}
                      justifyContent="space-between"
                      mt={"30px"}
                    >
                      <Box>
                        <Wrap>
                          <WrapItem display={"flex"} alignItems="center">
                            <Avatar
                              name={item?.participant?.full_name}
                              size={"md"}
                              src={imageURL + item?.participant?.profilePic}
                            />
                            <Text fontWeight={"600"} marginLeft={"5px"}>
                              {item?.participant?.full_name}
                            </Text>
                          </WrapItem>
                        </Wrap>
                      </Box>
                      <Box>
                        <Box color={"gray"}>Date:</Box>
                        <Box fontWeight={"600"}>15Feb,2023</Box>
                      </Box>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text
                        color={"red"}
                        marginBottom={"10px"}
                        marginTop="15px"
                        fontFamily="poppins"
                      >
                        This meeting has been deleted
                      </Text>
                      <Button
                        backgroundColor={"#1e2598"}
                        _hover={"none"}
                        onClick={() => {
                          deleteMeeting(item._id);
                        }}
                        color={"white"}
                        size={"sm"}
                      >
                        Delete
                      </Button>
                    </Box>
                    <Box
                      _last={{ border: 0 }}
                      borderBottom={"1px solid gray"}
                      marginTop="20px"
                    ></Box>
                  </>
                );
              })}
          </Box>
          <Box
            display={"flex"}
            marginTop={"10px"}
            justifyContent={{ base: "center", md: "center", lg: "right" }}
          >
            <Calendar onChange={setDate} value={date} maxDate={new Date()} />
          </Box>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default MeetingSchedule;
