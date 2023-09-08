import {
  extendTheme,
  Select,
  AvatarGroup,
  Wrap,
  WrapItem,
  ChakraProvider,
  Input,
  Center,
  Checkbox,
  ButtonGroup,
  CheckboxGroup,
  Circle,
  HStack,
  Box,
  Square,
  Flex,
  Text,
  Image,
  Button,
  Avatar,
  Stack,
} from "@chakra-ui/react";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import { useEffect, useState } from "react";
import StateCard from "../../Components/StatesCard/StateCard.jsx";
import { GET } from "../../utilities/ApiProvider.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { imageURL } from "../../utilities/config.js";
import { AiFillStar } from "react-icons/ai";
import store from "../../app/store.js";

export const Home = () => {
  const navigate = useNavigate();
  const selector = useSelector((store) => store);
  const [percentage,setPercentage] = useState([]);
  const [series,setSeries] = useState([]);
  const [color,setColor] = useState([]);
  const [user, setUser] = useState();
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [selector]);

  useEffect(() => {
    if (selector) {
      setUser(selector?.user?.user);
    }
  }, [selector]);

  const getData = async () => {
    const res = await GET("admin/home", {
      authorization: `bearer ${user?.verificationToken}`,
    });
    setData(res?.data);
    setPercentage(res?.data[2]?.rolePercentage?.percentage);
    setSeries(res?.data[2]?.rolePercentage?.options?.series);
    setColor(res?.data[2]?.rolePercentage?.options?.color);
  };


  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);


  return (
    <Sidebar>
      <StateCard series1={series} color={color} percentage={percentage} />
      <Box
        display={"flex"}
        width={"100%"}
        margin={"auto"}
        justifyContent={"space-between"}
        alignItems={"center"}
        m="30px 0"
        marginBottom={"20px"}
      >
        <Text fontSize={"20px"} fontWeight={"semibold"}>
          Bartenders
        </Text>
        <Link to={`/dashboard/user`}>
        <Text color={"gray.500"} fontSize={"18px"} fontWeight={"normal"}>
          See All
        </Text>
        </Link>
      </Box>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        gap={"10px"}
        justifyContent={{ base: "center", md: "left", lg: "left" }}
        alignItems={"center"}
      >
        {data && data[3]?.bartenders?.length > 0
          ? data[3]?.bartenders?.map((item) => {
              return (
                <Box
                  padding={"10px 20px"}
                  backgroundColor={"white"}
                  width={{base:"100%",md:"90%",lg:"45%"}}
                  key={item._id}
                  borderRadius={"10px"}
                >
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Wrap>
                      <WrapItem>
                        <Avatar
                          size={"md"}
                          mr={"5px"}
                          name="Ben"
                          src="https://bit.ly/dan-abramov"
                        />
                        <Box
                          display={"flex"}
                          gap={"2px"}
                          flexDirection={"column"}
                        >
                          <Text fontWeight={"semibold"}>{item?.fullname}</Text>
                          <Text
                            fontWeight={"semibold"}
                            fontSize={"17px"}
                            color={"hsl(352.86deg 100% 32.94%)"}
                          >
                            {item?.username}
                          </Text>
                        </Box>
                      </WrapItem>
                    </Wrap>
                    <Box>
                      <Flex direction={"row"} gap={"8px"} alignItems={"center"}>
                        <Text color={"gray.500"}>Visiting:</Text>{" "}
                        <Box alignItems={"center"} display={"flex"}>
                          <AiFillStar color="red" />
                          <Text>Frequenter</Text>
                        </Box>
                      </Flex>
                      <Flex direction={"row"} gap={"8px"} alignItems={"center"}>
                        <Text color={"gray.500"}>Playing:</Text>{" "}
                        <Box alignItems={"center"} display={"flex"}>
                          <AiFillStar color="blue" />
                          <Text color={"blue"}>Playa</Text>
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                  <Box
                    display={"flex"}
                    mt={"40px"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Box display={"flex"} flexDirection={"column"}>
                      <Text color={"gray.500"}>Joined Date</Text>
                      <Text fontWeight={"semibold"}>15 Feb, 2024</Text>
                    </Box>
                    <Box>
                      <Text color={"gray.500"}>User Type</Text>
                      <Text fontWeight={"semibold"}>Bartender</Text>
                    </Box>
                    <Box>
                      <Text color={"gray.500"}>DOB</Text>
                      <Text fontWeight={"semibold"}>18/03/2023</Text>
                    </Box>
                  </Box>
                  <Link to="/dashboard/user">
                    <Button
                      width="100%"
                      cursor={"pointer"}
                      color={"white"}
                      mt={"10px"}
                      _hover={"none"}
                      backgroundColor={"hsl(352.86deg 100% 32.94%)"}
                    >
                      View All
                    </Button>
                  </Link>
                </Box>
              );
            })
          : "No data found"}
      </Box>

      {/* //////////////////  FoodServers ///////////////// */}

      <Box mt={"30px"}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize={"20px"} fontWeight={"semibold"}>
            FoodServers
          </Text>
          <Link to={`/dashboard/user`}>
          <Text>View All</Text>
          </Link>
        </Box>
        <Box
          display={"flex"}
          gap={"10px"}
          width={"97%"}
          margin={"auto"}
          flexWrap={"wrap"}
          justifyContent={{ base: "center", md: "left" }}
          mt={"20px"}
        >
          {data && data[4]?.foodServers?.length > 0
            ? data[4]?.foodServers?.map((item) => {
                return (
                  <Box
                    shadow={"md"}
                    borderRadius={"6px"}
                    backgroundColor={"white"}
                    width={{ base: "100%", md: "48%", lg: "32%" }}
                    padding={"15px"}
                    key={item?._id}
                  >
                    <Wrap>
                      <WrapItem>
                        <Avatar
                          size={"md"}
                          mr={"5px"}
                          name="Ben"
                          src="https://bit.ly/dan-abramov"
                        />
                        <Box
                          display={"flex"}
                          gap={"2px"}
                          flexDirection={"column"}
                        >
                          <Text fontWeight={"semibold"}>{"ricky"}</Text>
                          <Text
                            fontWeight={"semibold"}
                            fontSize={"17px"}
                            color={"hsl(352.86deg 100% 32.94%)"}
                          >
                            {"ricky"}
                          </Text>
                        </Box>
                      </WrapItem>
                    </Wrap>
                    <Box mt={"20px"}>
                      <Flex direction={"row"} gap={"8px"} alignItems={"center"}>
                        <Text color={"gray.500"}>Visiting:</Text>{" "}
                        <Box alignItems={"center"} display={"flex"}>
                          <AiFillStar color="red" />
                          <Text>Frequenter</Text>
                        </Box>
                      </Flex>
                      <Flex direction={"row"} gap={"8px"} alignItems={"center"}>
                        <Text color={"gray.500"}>Playing:</Text>{" "}
                        <Box alignItems={"center"} display={"flex"}>
                          <AiFillStar color="blue" />
                          <Text color={"blue"}>Playa</Text>
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                );
              })
            : "No data found"}
        </Box>
      </Box>
      <Box
        display={"flex"}
        m={"20px 0"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontWeight={"semibold"} m={"20px 0"} fontSize={"23px"}>
          User
        </Text>
        <Link to={`/dashboard/user`}>
        <Text>View All</Text>
        </Link>
      </Box>
      <Box display={"flex"} gap={"40px"} flexDirection={"column"}>
        { data && data.length > 0
          ? data[5]?.allUser?.latestUser.map((item) => {
            console.log(item)
              return (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Wrap width={"150px"}>
                    <WrapItem>
                      <Avatar
                        size={"md"}
                        mr={"5px"}
                        name={item?.fullname}
                        src={`${imageURL}${item.profile_picture}`}
                        alt="image"
                      />
                      <Box
                        display={"flex"}
                        gap={"2px"}
                        flexDirection={"column"}
                      >
                        <Text fontWeight={"semibold"}>{item.nickName}</Text>
                        <Text
                          fontWeight={"semibold"}
                          fontSize={"17px"}
                          color={"hsl(352.86deg 100% 32.94%)"}
                        >
                          {item.fullname}
                        </Text>
                      </Box>
                    </WrapItem>
                  </Wrap>
                  <Box display={{ base: "none", md: "block" }}>
                    <Text color={"gray.500"}>Joined Date</Text>
                    <Text>{item.dob}</Text>
                  </Box>
                  <Box display={{ base: "none", md: "block" }}>
                    <Text color={"gray.500"}>User Type</Text>
                    <Text>{item?.user_type?item?.user_type:"none"}</Text>
                  </Box>
                  <Link to={`/dashboard/UserDetails/${item._id}`}>
                    <Button color={"gray.500"} border={"1px solid gray"}>
                      View Details
                    </Button>
                  </Link>
                </Box>
              );
            })
          : "No data found"}
      </Box>
    </Sidebar>
  );
};
