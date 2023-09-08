import {
  extendTheme,
  ChakraProvider,
  Avatar,
  Center,
  WrapItem,
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
  useDisclosure,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { SmallAddIcon } from "@chakra-ui/icons";
import { Select } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
import { GET, PUT } from "../../utilities/ApiProvider";
import { useSelector } from "react-redux";
import { POST } from "../../utilities/ApiProvider";
import Item from "antd/es/list/Item";
import StateCard from "../../Components/StatesCard/StateCard";
import ReactPaginate from "react-paginate";
import Pagination from "../../Components/Pagination/Pagination";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
export const Tiers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [feature, setFeature] = useState([]);
  const [MembershipPlan, setMembershipPlan] = useState([]);
  const [catData, setCatData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const selector = useSelector((state) => state);
  const [user, setUser] = useState(null);
  const [stateLoad, setStateLoad] = useState(false);
  const [id, setId] = useState("");
  const [totalRecords, setTotalRecords] = useState();
  const [fields, setFields] = useState({
    name: "",
    price: null,
  });
  // const [loading,setLoading] = useState(false);
  // const [membershipData, setmembershipData] = useState([]);

  const getData = async () => {
    setStateLoad(true);
    const res = await GET("admin/tiers", {
      authorization: `bearer ${user?.verificationToken}`,
    });
    setCatData(res?.data[0]?.tierPlan);
    setStateLoad(false);
  };

  const toast = useToast();

  useEffect(() => {
    if (selector) {
      setUser(selector?.user?.user ?? "");
    }
  }, [selector]);

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  console.log(fields);

  const updateData = (data) => {
    setFields({ ...fields, name: data.name, price: data.price });
    setId(data._id);
  };

  const updateTiers = async () => {
    setLoad(true);
    try {
      const res = await PUT(`admin/updateRole/${id}`, fields, {
        authorization: `bearer ${user.verificationToken}`,
      });
      if (res.status == 200) {
        toast({
          position: "bottom-left",
          isClosable: true,
          status: "success",
          description: "Updated successfully",
          duration: 5000,
        });
        setLoad(false);
        onClose();
      } else {
        toast({
          position: "bottom-left",
          isClosable: true,
          duration: 5000,
          status: "error",
          description: res.data.message,
        });
        setLoad(false);
      }

      getData();
    } catch (error) {
      toast({
        position: "bottom-left",
        isClosable: true,
        duration: 5000,
        status: "error",
        description: error,
      });
      setLoad(false);
    }
  };

  return (
    <Sidebar>
      <StateCard />
      <Modal
        size={"xl"}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        // id="container"
      >
        <ModalOverlay />
        <ModalContent>
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <ModalHeader display={"flex"} alignItems={"center"}>
              <AiOutlineArrowLeft cursor={"pointer"} onClick={onClose} />
              <Text marginLeft={"10px"} width={"240px"}>
                {" "}
                Update tier details
              </Text>
            </ModalHeader>
          </Box>
          <ModalBody pb={6}>
            <Box display="flex" flexDirection={"column"} gap={"10px"}>
              <Input
                onChange={(e) => {
                  setFields({ ...fields, name: e.target.value });
                }}
                type="text"
                value={fields.name}
                placeholder="Enter the name"
              />
              <Input
                onChange={(e) => {
                  setFields({ ...fields, price: e.target.value });
                }}
                type="number"
                value={fields.price}
                placeholder="Enter the price"
              />
              <Button
                width={"100%"}
                _hover={"none"}
                color={"white"}
                backgroundColor={"hsl(352.86deg 100% 32.94%)"}
                onClick={updateTiers}
              >
                {load ? (
                  <TailSpin
                    height="30"
                    width="30"
                    color="white"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                ) : (
                  "Update tier details"
                )}
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex
        justifyContent={"space-between"}
        gap="20px"
        flexDirection={{ base: "column", md: "row" }}
        flexWrap={"wrap"}
        alignItems={"center"}
      >
        <Text fontSize={"25px"} fontWeight={"600"}>
          Current Tiers Plan
        </Text>
      </Flex>
      {stateLoad ? (
        <Box display={"grid"} height={"70vh"} placeItems={"center"}>
          <TailSpin
            height="40"
            width="80"
            color="hsl(352.86deg 100% 32.94%)"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </Box>
      ) : (
        <>
          <Box
            marginTop={"20px"}
            display={"flex"}
            role={"group"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            margin={"20px 5px 20px 5px"}
          >
            {catData &&
              catData?.map((item) => {
                return (
                  <Box
                    backgroundColor={"white"}
                    margin={"20px 5px 20px 5px"}
                    rounded={"md"}
                    color={"white"}
                    padding={"10px"}
                    width={{ base: "100%", md: "47%", lg: "40%", xl: "32%" }}
                    key={item._id}
                    alignSelf={"normal"}
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      width={"100%"}
                      flexDirection={{
                        base: "column-reverse",
                        md: "column-reverse",
                        lg: "row",
                      }}
                      justifyContent={"space-between"}
                    >
                      <Text color={"hsl(352.86deg 100% 32.94%)"}>
                        {item?.name}
                      </Text>
                      <Box
                        display={"flex"}
                        width={"100%"}
                        gap={"5px"}
                        justifyContent={{
                          base: "center",
                          md: "center",
                          lg: "right",
                        }}
                        flexDirection={{
                          base: "column",
                          md: "column",
                          lg: "row",
                        }}
                      >
                        <Button
                          border={"1px solid hsl(352.86deg 100% 32.94%)"}
                          px={"30px"}
                          backgroundColor={"hsl(352.86deg 100% 32.94%)"}
                          color={"white"}
                          width={{ base: "100%", md: "100%", lg: "20%" }}
                          _hover={"none"}
                          onClick={() => {
                            updateData(item);
                            onOpen();
                          }}
                        >
                          Edit
                        </Button>
                      </Box>
                    </Box>

                    <Flex
                      color={"black"}
                      marginTop={"15"}
                      alignItems={"center"}
                    >
                      <Flex fontSize={"40px"} fontWeight={"bold"}>
                        ${item.price}
                      </Flex>
                      <Text marginTop={"18px"} marginLeft={"5px"}>
                        per Month
                      </Text>
                    </Flex>
                    <Box
                      marginTop={"10px"}
                      borderBottom={"1px solid #fff"}
                    ></Box>
                    <Flex
                      padding={"20px 2px 30px 20px"}
                      flexDirection={"column"}
                    >
                      <ul>
                        {item?.description.length &&
                          item?.description?.map((feature) => {
                            return (
                              <li
                                color="hsl(352.86deg 100% 32.94%)"
                                key={feature._id}
                              >
                                {feature}
                              </li>
                            );
                          })}
                      </ul>
                    </Flex>
                  </Box>
                );
              })}
          </Box>
        </>
      )}
    </Sidebar>
  );
};
