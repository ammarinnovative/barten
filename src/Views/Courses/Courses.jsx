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
  useDisclosure,
  Input,
  useToast,
} from "@chakra-ui/react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Img4 from "../../Assets/Images/Courses/Image4.jpg";
import Img5 from "../../Assets/Images/Courses/image5.jpg";
import Img6 from "../../Assets/Images/Courses/Image6.jpg";
import Img7 from "../../Assets/Images/Courses/Image7.jpg";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Select,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { imageURL } from "../../utilities/config";
import ContentLoader from "react-content-loader";
import { GET, POST } from "../../utilities/ApiProvider";
export const Courses = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState();
  const [category, setCategory] = useState([]);
  const [isToggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(false);
  const [course, setCourses] = useState([]);
  const [fields, setFields] = useState({
    category_id: "",
    name: "",
    sub_title: "",
    description: "",
    price: null,
    course_pic: null,
    user_id: "63cf042fa7e6c6b2cef26d9b",
  });

  const selector = useSelector((state) => state);

  useEffect(() => {
    if (selector) {
      setUser(selector?.user?.user?.data?.data);
    }
  }, [selector]);

  useEffect(() => {
    if (user) {
      getCategory();
      getCourseVideos();
    }
  }, [user]);
  const toast = useToast();

  const getCategory = async () => {
    const res = await GET("courseCategory/getAllCourseCategoryList", {
      authorization: `bearer ${user?.JWT_TOKEN}`,
    });
    console.log(res);
    debugger;
    setCategory(res?.data);
  };

  const createPost = async () => {
    setLoading(true);
    if (
      !fields.name ||
      !fields.price ||
      !fields.category_id ||
      !fields.sub_title ||
      !fields.course_pic ||
      !fields.description
    ) {
      toast({
        position: "bottom-left",
        isClosable: true,
        duration: 5000,
        status: "error",
        description: "Please fill all the fields",
      });
      setLoading(false);
      return;
    }
    const formData = new FormData();
    for (let key in fields) {
      formData.append(key, fields[key]);
    }
    const res = await POST("course/addCourseDetail", formData, {
      authorization: `bearer ${user?.JWT_TOKEN}`,
    });
    toast({
      position: "bottom-left",
      isClosable: true,
      duration: 5000,
      status: "success",
      description: "Video created successfully",
    });
    getCourseVideos();
    setLoading(false);
  };

  const getCourseVideos = async () => {
    setToggle(true);
    const res = await GET("course?limit=6&page=1", {
      authorization: `bearer ${user?.JWT_TOKEN}`,
    });
    setCourses(res.data);
    setToggle(false);
  };

  return (
    <Box>
      <Sidebar>
        <Box>
          {isToggle ? (
            <Box
              display={"flex"}
              justifyContent={"center"}
              height={"70vh"}
              alignItems={"center"}
            >
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
            </Box>
          ) : (
            <>
              <Flex
                justifyContent={"space-between"}
                margin={"20px 0"}
                flexDirection={{ base: "column", md: "column", lg: "row" }}
                alignItems={"center"}
              >
                <Text
                  fontSize={{ base: "30px", md: "22px" }}
                  fontFamily={"AvenirLT"}
                  fontWeight={"bold"}
                >
                  {course.length} Crypto courses
                </Text>
                <Button
                  color={"#000000"}
                  outline={"none"}
                  fontSize={"16px"}
                  width={{ base: "100%", md: "100%", lg: "35%" }}
                  size="md"
                  border={"1px solid #000000"}
                  backgroundColor={"#ffffff"}
                  onClick={onOpen}
                >
                  Create New Courses
                </Button>
              </Flex>
              <Flex
                justifyContent={{ base: "center", md: "left" }}
                flexWrap={"wrap"}
                gap={"40px"}
                width={"100%"}
              >
                {course &&
                  course?.map((item) => {
                    return (
                      <Box
                        cursor={"pointer"}
                        width={{ base: "80%", md: "40%", lg: "30%" }}
                        alignSelf={"normal"}
                        objectFit={"cover"}
                      >
                        <Link to={`/dashboard/CourseDetails/${item._id}`}>
                          <Box height={"200px"}>
                            <Image
                              src={imageURL + item.coursePic}
                              width={"100%"}
                              borderRadius={"7px"}
                              height={"100%"}
                              marginTop={"50px"}
                              alt={"Image"}
                            />
                          </Box>
                          <Text
                            fontWeight={"600"}
                            fontFamily={"Poppins700"}
                            marginTop={"5px"}
                            fontSize={"20px"}
                          >
                            {item?.name}
                          </Text>
                          <Box marginTop={"15px"}>
                            <Box
                              display={"flex"}
                              fontSize={"20px"}
                              color={"gray.600"}
                              fontFamily={"Poppins400"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Text>Category</Text>
                              <Text>Videos</Text>
                            </Box>
                            <Box
                              display={"flex"}
                              fontSize={"20px"}
                              color={"blue"}
                              fontFamily={"Poppins400"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Text>Price</Text>
                              <Text>{item.price}</Text>
                            </Box>
                          </Box>
                        </Link>
                      </Box>
                    );
                  })}
              </Flex>
            </>
          )}
        </Box>
        <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cretae New Courses</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                onChange={(e) => {
                  setFields({ ...fields, name: e.target.value });
                }}
                type="text"
                placeholder="Name"
                m={"5px 0"}
              />
              <Input
                onChange={(e) => {
                  setFields({ ...fields, price: e.target.value });
                }}
                type="number"
                placeholder="price"
                m={"5px 0"}
              />
              <Input
                onChange={(e) => {
                  setFields({ ...fields, sub_title: e.target.value });
                }}
                type="text"
                placeholder="Sub Title"
                m={"5px 0"}
              />
              <Input
                onChange={(e) => {
                  setFields({ ...fields, description: e.target.value });
                }}
                type="text"
                placeholder="Description"
                m={"5px 0"}
              />
              <Select
                onChange={(e) => {
                  setFields({ ...fields, category_id: e.target.value });
                }}
                placeholder="Select Option"
              >
                {category &&
                  category?.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.course_category_name}
                      </option>
                    );
                  })}
              </Select>
              <Input
                type="file"
                onChange={(e) => {
                  setFields({ ...fields, course_pic: e.target.files[0] });
                }}
                placeholder="Image"
                m={"5px 0"}
              />
              <Button
                onClick={createPost}
                backgroundColor={"#1e2598"}
                _hover={"none"}
                width={"100%"}
                color={"white"}
              >
                {loading ? (
                  <TailSpin
                    width="30"
                    color="white"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                ) : (
                  "Create"
                )}
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Sidebar>
    </Box>
  );
};
