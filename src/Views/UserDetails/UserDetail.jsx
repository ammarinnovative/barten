import React, { useState } from "react";
import {
  Box,
  WrapItem,
  Avatar,
  Text,
  Flex,
  Button,
  Image,
  Stack,
} from "@chakra-ui/react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { AiFillStar } from "react-icons/ai";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GET, DELETE, PUT } from "../../utilities/ApiProvider";
import { imageURL } from "../../utilities/config";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const UserDetail = () => {
  const [btn, setBtn] = useState("shifts");
  const [user, setUser] = useState("");
  const [data, setData] = useState({});
  const params = useParams();
  const toast = useToast();

  const selector = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (selector) {
      setUser(selector?.user?.user);
    }
  }, [selector]);

  const getUserData = async () => {
    const res = await GET(`admin/getSingleUser/${params.id}`, {
      authorization: `bearer ${user?.verificationToken}`,
    });
    setData(res?.data);
  };
  useEffect(() => {
    if (user) {
      getUserData();
    }
    if (!JSON.parse(localStorage.getItem("userss"))) {
      navigate("/login");
    }
  }, [user, navigate]);

  const deletUser = async () => {
    const res = await PUT(`users/deleteUserByAdmin/${params.id}`,{}, {
      authorization: `bearer ${user?.verificationToken}`,
    });
  console.log("res",res);
    if (res.status == 200) {
      toast({
        position: "bottom-left",
        isClosable: true,
        duration: 5000,
        description: "Deleted successfully",
        status: "success",
      });
      navigate('/dashboard/user')
    } else {
      toast({
        position: "bottom-left",
        isClosable: true,
        duration: 5000,
        description: res.message,
        status: "error",
      });
    }
  };

  return (
    <Sidebar>
      <Box>
        <Box
          fontSize={{ base: "27px", md: "23px" }}
          textAlign={{ base: "center", md: "left" }}
          mb={"20px"}
          fontWeight={"semibold"}
        >
          Info
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={{ base: "column", lg: "row" }}
          flexWrap={"wrap"}
          gap={"20px"}
        >
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            flex={"4"}
            justifyContent={{ base: "center", lg: "space-between" }}
          >
            <Box
              display={"flex"}
              textAlign={{ base: "left", lg: "center" }}
              m={"20px 0"}
              width={{ base: "90%", md: "50%", lg: "32%" }}
              alignItems={"center"}
              justifyContent={{ base: "center", md: "left" }}
            >
              <WrapItem>
                <Avatar
                  size="md"
                  name="Ryan Florence"
                  src={`${imageURL}${data.profile_picture}`}
                  alt="image"
                />{" "}
              </WrapItem>
              <Flex
                flexDirection={"column"}
                m={"10px 0"}
                justifyContent={{ base: "left", lg: "center" }}
                textAlign={"left"}
              >
                <Text color={"gray"}>Name:</Text>
                <Text>{data.fullname ? data?.fullname : "none"}</Text>
              </Flex>
            </Box>

            <Flex
              flexDirection={"column"}
              width={{ base: "90%", md: "50%", lg: "32%" }}
              m={"20px 0"}
              textAlign={{ base: "center", md: "left" }}
            >
              <Text color={"gray"}>DOB:</Text>
              <Text>{data?.dob ? data?.dob : "none"}</Text>
            </Flex>
            <Flex
              flexDirection={"column"}
              width={{ base: "90%", md: "50%", lg: "32%" }}
              m={"20px 0"}
              textAlign={{ base: "center", md: "left" }}
            >
              <Text color={"gray"}>Email:</Text>
              <Text>{data?.email}</Text>
            </Flex>
            <Flex
              flexDirection={"column"}
              width={{ base: "90%", md: "50%", lg: "32%" }}
              m={"20px 0"}
              textAlign={{ base: "center", md: "left" }}
            >
              <Text color={"gray"}>Nick Name:</Text>
              <Text>{data.nickName ? data?.nickName : "none"}</Text>
            </Flex>
            <Flex
              flexDirection={"column"}
              width={{ base: "90%", md: "50%", lg: "32%" }}
              m={"20px 0"}
              textAlign={{ base: "center", md: "left" }}
            >
              <Text color={"gray"}>username:</Text>
              <Text>{data.username ? data?.username : "none"}</Text>
            </Flex>
            <Flex
              flexDirection={"column"}
              width={{ base: "90%", md: "50%", lg: "32%" }}
              m={"20px 0"}
              textAlign={{ base: "center", md: "left" }}
            >
              <Text color={"gray"}>Favourite Drink:</Text>
              <Text>{data?.favDrink ? data?.favDrink : "none"}</Text>
            </Flex>
          </Box>
          <Box flex={{ base: "1" }}>
            <Button
              color="red"
              border={"1px solid red"}
              backgroundColor={"transparent"}
              m={{ base: "20px", md: "none" }}
              onClick={deletUser}
            >
              Delete Account
            </Button>
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={{ base: "center", lg: "left" }}
          gap={"30px"}
          alignItems={"center"}
        >
          <Box display={"flex"} alignItems={"center"}>
            <Text marginRight={"10px"}>Visiting:</Text>{" "}
            <Text>
              <AiFillStar color={"red"} />
            </Text>{" "}
            <Text color={"red"}>Frequenter</Text>
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Text marginRight={"10px"}>Playing:</Text>{" "}
            <Text>
              <AiFillStar color={"blue"} />
            </Text>{" "}
            <Text color={"blue"}>Piaya</Text>
          </Box>
        </Box>
        <Box mt={"20px"}>
          <Text
            fontSize={"20px"}
            m={"20px 0px"}
            textAlign={{ base: "center", lg: "left" }}
            fontWeight={"semibold"}
          >
            Pay Subscription:
          </Text>
        </Box>
      </Box>
      <Tabs variant={"enclosed"}>
        <TabList>
          <Tab width={{ base: "50%", lg: "18%" }}>
            <Button
              width={"100%"}
              border={"1px solid black"}
              _hover={"none"}
              backgroundColor={
                btn == "shifts" ? "hsl(352.86deg 100% 32.94%)" : "white"
              }
              color={btn == "shifts" ? "white" : "black"}
              onClick={() => {
                setBtn("shifts");
              }}
            >
              Shifts
            </Button>
          </Tab>
          <Tab width={{ base: "50%", lg: "18%" }}>
            <Button
              width={"100%"}
              border={"1px solid black"}
              _hover={"none"}
              backgroundColor={
                btn == "posts" ? "hsl(352.86deg 100% 32.94%)" : "white"
              }
              color={btn == "posts" ? "white" : "black"}
              onClick={() => {
                setBtn("posts");
              }}
            >
              Promo Posts
            </Button>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box display={"flex"} gap={"30px"} flexDirection={"column"}>
              <Text fontSize={"18px"} fontWeight={"semibold"}>
                {data?.shifts?.length} Shifts
              </Text>
              <Box>
                {data?.shifts && data?.shifts.length > 0 ? (
                  data?.shifts?.map((item) => {
                    return (
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        margin={"20px 0"}
                        key={item?._id}
                        justifyContent={"space-between"}
                      >
                        <Box>
                          <Box display={"flex"} mt={"30px"} gap={"50px"}>
                            <Box width={"150px"}>
                              <Text color={"gray.500"}>Bar</Text>
                              <Text color={"hsl(352.86deg 100% 32.94%)"}>
                                {" "}
                                {item?.barName}
                              </Text>
                            </Box>

                            <Box width={"150px"}>
                              <Text color={"gray.500"}>Day</Text>
                              <Text color={"hsl(352.86deg 100% 32.94%)"}>
                                {item?.day}
                              </Text>
                            </Box>
                            <Box>
                              <Text color={"gray.500"}>Time</Text>
                              <Text color={"hsl(352.86deg 100% 32.94%)"}>
                                {new Date(item?.startTime).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                ) +
                                  " to " +
                                  new Date(item?.endTime).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    }
                                  )}
                              </Text>
                            </Box>
                          </Box>
                          <Box
                            display={"flex"}
                            gap={"50px"}
                            alignItems={"center"}
                            mt={"30px"}
                          >
                            <Box width={"150px"}>
                              <Text color={"gray.500"}>Shift Type</Text>
                              <Text color={"hsl(352.86deg 100% 32.94%)"}>
                                {item?.type}
                              </Text>
                            </Box>
                            <Box width={"400px"}>
                              <Text color={"gray.500"}>Address</Text>
                              <Text color={"hsl(352.86deg 100% 32.94%)"}>
                                {item?.barAddress}
                              </Text>
                            </Box>
                          </Box>
                          <Box
                            backgroundColor={"gray"}
                            marginTop={"10px"}
                            height={"2px"}
                            width={"100%"}
                          ></Box>
                        </Box>
                        {/* <BsThreeDots color="gray" fontSize={"30px"} /> */}
                      </Box>
                    );
                  })
                ) : (
                  <Text>No data Found</Text>
                )}
              </Box>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box>
              <Text fontSize={"18px"} m={"20px 0"} fontWeight={"semibold"}>
                {data?.promo?.length} promo post
              </Text>
              {data?.promo && data?.promo.length > 0 ? (
                data?.promo?.map((item) => {
                  return (
                    <Box
                      display={"flex"}
                      key={item?._id}
                      margin={"10px 0"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      flexWrap={"wrap"}
                    >
                      <Box display={"flex"} alignItems={"center"} gap={"20px"}>
                        <Box minW={"300px"}>
                          <Image
                            height={"20vh"}
                            objectFit={"cover"}
                            borderRadius={"8px"}
                            width={"100%"}
                            src={imageURL + item?.picture}
                            alt="image"
                          />
                        </Box>
                        <Box>
                          <Text fontWeight={"semibold"} mb={"10px"}>
                            {item?.title}
                          </Text>
                          <Text color={"gray.500"}>Description</Text>
                          <Text>{item?.description}</Text>
                        </Box>
                      </Box>
                      <Box>
                        <Text>Pay</Text>
                        <Text>$100.00</Text>
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Text fontWeight={"bold"} fontSize={"20px"}>
                  No Data Found
                </Text>
              )}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Sidebar>
  );
};

export default UserDetail;
