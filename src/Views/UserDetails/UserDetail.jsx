import React, { useState } from "react";
import {
  Box,
  WrapItem,
  Avatar,
  Text,
  Flex,
  Button,
  Image,
} from "@chakra-ui/react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { AiFillStar } from "react-icons/ai";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { GET } from "../../utilities/ApiProvider";
import { imageURL } from "../../utilities/config";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const UserDetail = () => {
  const [btn, setBtn] = useState("shifts");
  const [user, setUser] = useState("");
  const [data, setData] = useState({});
  const params = useParams();

  const selector = useSelector((state) => state);

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
  console.log(data);

  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user]);

  console.log();

  useEffect(() => {
    console.log(data);
  }, [data]);

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
            <Box>
              <Text fontSize={"18px"} fontWeight={"semibold"}>
                2 Shifts
              </Text>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box>
                  <Box display={"flex"} mt={"30px"} gap={"50px"}>
                    <Box>
                      {/* <Text color={"gray.500"}>{data?.shifts?.length && data?.shifts[0]['barName']}</Text> */}
                      <Text color={"hsl(352.86deg 100% 32.94%)"}>
                        The Dead Rabbit NYC
                      </Text>
                    </Box>
                    <Box>
                      <Text color={"gray.500"}>Day</Text>
                      <Text color={"hsl(352.86deg 100% 32.94%)"}>Monday</Text>
                    </Box>
                    <Box>
                      <Text color={"gray.500"}>Time</Text>
                      <Text color={"hsl(352.86deg 100% 32.94%)"}>
                        8pm to 4am
                      </Text>
                    </Box>
                  </Box>
                  <Box mt={"30px"}>
                    <Text color={"gray.500"}>Shift Type</Text>
                    <Text color={"hsl(352.86deg 100% 32.94%)"}>Free</Text>
                  </Box>
                </Box>
                <BsThreeDots color="gray" fontSize={"30px"} />
              </Box>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box>
              <Text fontSize={"18px"} m={"20px 0"} fontWeight={"semibold"}>
                1 promo post
              </Text>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                <Box display={"flex"} alignItems={"center"} gap={"20px"}>
                  <Image
                    height={"20vh"}
                    objectFit={"cover"}
                    borderRadius={"8px"}
                    width={"250px"}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNjIaNvHN82MYXRlSAFJiR7za0fSz26SHJVi-oxoB6La1Uv0h0gG2bhVgFKtc0WzQfHuI&usqp=CAU"
                    alt="image"
                  />
                  <Box>
                    <Text fontWeight={"semibold"} mb={"10px"}>
                      New Event
                    </Text>
                    <Text color={"gray.500"}>Description</Text>
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Omnis, eveniet!
                    </Text>
                  </Box>
                </Box>
                <Box>
                  <Text>Pay</Text>
                  <Text>$100.00</Text>
                </Box>
              </Box>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Sidebar>
  );
};

export default UserDetail;
