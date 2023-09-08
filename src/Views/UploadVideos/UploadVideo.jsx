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
  Modal,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Stack,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { POST, Post } from "../../utilities/ApiProvider";
import { Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { GET } from "../../utilities/ApiProvider";
import { imageURL } from "../../utilities/config";
import { TailSpin } from "react-loader-spinner";

const UploadVideo = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selector = useSelector((state) => state);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false);
  const [Category, setCategory] = useState([]);
  const [user, setUser] = useState(null);
  const [catVal,setCatVal] = useState([]);
  const [fields,setFields] = useState(
    {
      title:"",
      thumbnail:null,
      video:null,
      privatePath:"",
      category:[]
    }
    );
    console.log(fields)
  const Upload = async () => {
    setState(true);
    if(!fields.title || !fields.thumbnail || !fields.video || !fields.category.length>0 || !fields.privatePath){
      toast({
        position:"bottom-left",
        status:"error",
        isClosable:"true",
        duration:5000,
        description:"please fill all the fields to proceed further"
      });
      setState(false);
      return;
    }
    const formData = new FormData();
    for(let key in fields){
      formData.append(key,fields[key])
    }
    const res = await POST("video", formData, {
      authorization: `bearer ${user?.JWT_TOKEN}`,
    });
    if (res.status == 200) {
      toast({
        title: res.data.message,
        position: "bottom-left",
        duration: "5000",
        isClosable: true,
        status: "success",
      });
      setState(false);
      onClose();
    } else {
      toast({
        title: "Someting went wrong",
        status: "error",
        position: "bottom-left",
        duration: "5000",
        isClosable: true,
      });
      setState(false);
    }

    getVides();
  };  

  const getVides = async () => {
    setLoading(true);
    const res = await GET("video", {
      authorization: `bearer ${user?.JWT_TOKEN}`,
    });
    setData(res.data);
    setLoading(false);
  };

  const getCategory = async () => {
    const res = await GET(
      `courseCategory/getAllCourseCategoryList?limit=10&page=1`,
      {
        authorization: `bearer ${user.JWT_TOKEN}`,
      }
    );
    setCategory(res.data);
    console.log(Category);
  };

  useEffect(() => {
    if (selector) {
      setUser(selector?.user?.user?.data?.data ?? "");
    }
  }, [selector]);

  useEffect(() => {
    if (user) {
      getVides();
      getCategory();
    }
  }, [user]);




  return (
    <Box>
      <Sidebar>
        <Box>
          <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset="slideInBottom"
            size={"xl"}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Upload Video</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={3}>
                  <form id="form">
                    <Input
                      name="title"
                      size="lg"
                      onChange={(e)=>{setFields({...fields,title:e.target.value})}}
                      margin="5px"
                      placeholder="Title"
                      type="text"
                      height={"30px"}
                    />
                    <FormControl>
                      <FormLabel>Upload image</FormLabel>
                      <Input
                        size="lg"
                        name="thumbnail"
                        onChange={(e)=>{setFields({...fields,thumbnail:e.target.files[0]})}}
                        placeholder="thumbnail"
                        type="file"
                        height={"30px"}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Upload Video</FormLabel>
                      <Input
                        size="lg"
                        placeholder="Video"
                        onChange={(e)=>{setFields({...fields,video:e.target.files[0]})}}
                        name="video"
                        type="file"
                        accept="video/*"
                        height={"30px"}
                      />
                    </FormControl>
                    <Select  margin={"10px 0"} name="category" onChange={(e)=>{setFields({...fields,category:[e.target.value]})}} placeholder="Select option">
                      {
                        Category.map((item)=>{
                          return(
                            <option value={item._id}>{item.course_category_name}</option>
                          )
                        })
                      }
                    </Select>
                    
                    <Input
                      size="lg"
                      margint="5px"
                      name="privatePath"
                      placeholder="Enter the URL"
                      type="text"
                      onChange={(e)=>{setFields({...fields,privatePath:e.target.value})}}
                      height={"30px"}
                    />
                 </form>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  border={"1px solid"}
                  onClick={Upload}
                >
                  {state ? (
                    <TailSpin
                      height="20"
                      width="20"
                      color="blue"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  ) : (
                    "Upload"
                  )}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {loading ? (
            <Box display={"grid"} placeItems={"center"} height={"60vh"}>
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
                  {data.length} Videos Uploaded
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
                  Upload New Video
                </Button>
              </Flex>
              <Flex
                justifyContent={{ base: "center", md: "left" }}
                flexWrap={"wrap"}
                gap={"15px"}
                width={"100%"}
              >
                {data.map((data) => {
                  return (
                    <Box
                      cursor={"pointer"}
                      backgroundColor={"white"}
                      borderRadius={"8px"}
                      padding={"10px"}
                      width={{ base: "80%", md: "40%", lg: "30%" }}
                    >
                      <Box width={"100%"}>
                      <Image
                        src={imageURL + data.thumbnail}
                        width={"100%"}
                        objectFit={"cover"}
                        height={"160px"}
                        rounded={"8px"}
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
                        {data.title}
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
                        ></Box>
                      </Box>
                    </Box>
                  );
                })}
              </Flex>
            </>
          )}
        </Box>
      </Sidebar>
    </Box>
  );
};

export default UploadVideo;
