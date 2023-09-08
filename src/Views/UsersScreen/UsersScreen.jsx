import {
  extendTheme,
  ChakraProvider,
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
  Select,
  option,
  useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import BasicStatistics from "../../Components/Cards/Card";
import ReactPaginate from "react-paginate";
import Table from "../../Components/table/table";
import { GET } from "../../utilities/ApiProvider";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Item from "antd/es/list/Item";
import Pagination from "../../Components/Pagination/Pagination";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Card } from "antd";

export const UserScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cardData, setCardData] = useState("");
  const selecor = useSelector((state) => state);
  const [data, setData] = useState([]);
  const [user, settUser] = useState({});
  const [toggle, setToggle] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(0);
  const [load, setLoad] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    id: "",
  });
  const [filterData, setFilterData] = useState([]);
  const [selected, setSelected] = useState("bartender");
  const [btns, setBtns] = useState("");

  const [field, setField] = useState({
    customer: [],
    server: [],
    tavern: [],
    bartender: [],
  });

  const getUser = async () => {
    setLoad(true);
    const res = await GET(`admin/users?limit=10&page=${currentPage}`, {
      authorization: `bearer ${user?.verificationToken}`,
    });
    setField({
      bartender: res?.data[0]?.bartender,
      customer: res?.data[0]?.customer,
      server: res?.data[0]?.server,
      tavern: res?.data[0]?.tavern,
    });
    setFilterData(res?.data[0]?.bartender);
    setTotalPages(res?.data[3]?.totalPages);
    setLoad(false);
  };


  useEffect(() => {
    if (selecor) {
      settUser(selecor?.user?.user);
    }
  }, [selecor]);

  const btn = [];

  for (let key in field) {
    btn.push(key);
  }

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user,currentPage]);

  const btnData = (data) => {
    setFilterData(field[data]);
  };

  const btnItems = (_name, _number, _id) => {
    setDetails({
      name: _name,
      number: _number,
      id: _id,
    });
    onOpen();
  };

  const pageCount = 10;


  const getCurrentPage = (e)=>{
    setCurrentPage(e);
  }

  

  return (
    <Sidebar>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} gap={"20px"} flexWrap={"wrap"}>
              <Box width={"45%"}>
                <Text fontWeight={"bold"}>Name:</Text>
                <Text>{details.name}</Text>
              </Box>
              <Box width={"45%"}>
                <Text fontWeight={"bold"}>Phone:</Text>
                <Text>{details.number}</Text>
              </Box>
              <Box width={"100%"}>
                <Text fontWeight={"bold"}>ID:</Text>
                <Text>{details.id}</Text>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box paddingLeft={"16px"}>
        <Text
          fontSize={"30px"}
          textAlign={{ base: "center", md: "left", lg: "left" }}
          fontWeight={"700"}
        >
          Activities
        </Text>
      </Box>
      <Box padding={"16px"}>
        <Text
          fontFamily={"poppins"}
          textAlign={{ base: "center", md: "left", lg: "left" }}
          fontSize={"25px"}
          fontWeight={"900"}
        >
          Members Activities
        </Text>
        <Text
          fontSize={"20px"}
          color={"gray.700"}
          textAlign={{ base: "center", md: "left", lg: "left" }}
          fontFamily={"poppins"}
        >
          Manage total users,courses tears and their progress
        </Text>
        <Flex
          mt={"20px"}
          gap="10px"
          flexWrap={"wrap"}
          width={{ base: "100%", md: "100%", lg: "100%" }}
          justifyContent={"space-between"}
        >
          {btn.map((data) => {
            return (
              <Button
                onClick={() => {
                  btnData(data);
                  setSelected(data);
                }}
                _hover={{
                  backgroundColor: "hsl(352.86deg 100% 32.94%)",
                  color: "white",
                }}
                width={{ base: "100%", md: "40%", lg: "30%", xl: "23%" }}
                color={
                  data === selected ? "white" : "hsl(352.86deg 100% 32.94%)"
                }
                border={"1px solid hsl(352.86deg 100% 32.94%)"}
                marginBottom={"20px"}
                backgroundColor={
                  data === selected ? "hsl(352.86deg 100% 32.94%)" : "none"
                }
              >
                {data}
              </Button>
            );
          })}
        </Flex>
        <Box
          fontSize={"21px"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          fontWeight={"semibold"}
        ></Box>
        {load ? (
          <Box display={"grid"} height={"50vh"} placeItems={"center"}>
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
          filterData.length>0?
          filterData &&
          filterData?.map((data) => {
            return (
              <Table
                onOpen={onOpen}
                btnItems={btnItems}
                name={data?.fullname ?? ""}
                joined={data?.createdAt}
                id={data?._id}
                email={data?.email}
                profile={data?.profile_picture ?? ""}
              />
            );
          }):<Text display={"grid"} height={"60vh"} placeItems={"center"}>No data found</Text>
        )}
      </Box>
      <Pagination totalPages={totalPages} getCurrentPage={getCurrentPage} pageCount={pageCount}/>
    </Sidebar>
  );
};
