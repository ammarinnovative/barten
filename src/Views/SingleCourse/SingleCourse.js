import React from "react";
import {
  Stack,
  Flex,
  Button,
  Text,
  Heading,
  Image,
  Input,
  Textarea,
  Checkbox,
  Select,
  Box,
  Link,
  InputGroup,
  FormControl,
} from "@chakra-ui/react";
import { AiOutlineUpload } from "react-icons/ai";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { imageURL } from "../../utilities/config";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Upload_your_video_1 from "../../Assets/Images/Upload_your_video_1.png";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { GrUpload } from "react-icons/gr";
import Upload_your_video_2 from "../../Assets/Images/Upload_your_video_2.png";
import { useEffect } from "react";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useToast } from "@chakra-ui/react";
import { GET, POST } from "../../utilities/ApiProvider";
import { useParams } from "react-router-dom";
import Item from "antd/es/list/Item";
export default function SingleCourse() {
  const [user, setUser] = useState({});
  const selector = useSelector((state) => state);
  const [video, setVideo] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterVideo, setFilterVideo] = useState([]);
  const [filterItem, setFilterItem] = useState([]);
  const [loading,setLoading] = useState(false);
  const [state,setState] = useState(0);

  const params = useParams();

  const toast = useToast();

  const [fields, setFields] = useState({
    category_id: "",
    video: [],
  });

  const getVideo = async () => {
    const res = await GET("video/admin", {
      authorization: `bearer ${user?.JWT_TOKEN}`,
    });
    setVideo(res.data);
  };

  useEffect(() => {
    if (selector) {
      setUser(selector?.user?.user?.data?.data);
    }
  }, [selector]);
  useEffect(() => {
    if (user) {
      getVideo();
    }
  }, [user]);

  const Category = [
    ...new Set(
      video &&
        video?.map((item) => {
          return item.course_category_name;
        })
    ),
  ];

  const getElement = (item) => {
    const find = video.filter((data) => {
      return data.course_category_name === item;
    });
    setFilterVideo(find[0].video);
    setFields({ ...fields, category_id: find[0]._id });
    // setFields({...fields,category_id:item._id});
    // const cat = video.filter((item)=>item.course_category_name==item.course_category_name);
  };

  const filter = (item) => {
    
    const items = fields.video.find((data) => {
      return data == item._id;
    });
    if (items) {
      setFields({...fields,video:fields.video.filter((data)=>{return data !== item._id})});
    } else {
      setFields({...fields,video:[...fields.video,item._id]});
    }
  };
  

  useEffect(()=>{
    setFields({...fields,course_id:params.id,video:[]});
  },[state])
  
  const postVideo = async ()=>{
  setLoading(true);
  if(!fields.category_id || !fields.course_id || !fields.video.length>0){
    toast({
      position:"bottom-left",
      isClosable:true,
      duration:5000,
      status:"error",
      description:"Please fill all the fields"
    });
    setLoading(false);
    return;
  }
  const res = await POST("courseTopic/AddCourseTopicDetail",fields,{
    authorization:`bearer ${user?.JWT_TOKEN}`
  })
  if(res.status ==200){
    toast({
      position:"bottom-left",
      isClosable:true,
      duration:5000,
      status:"success",
      description:res.data.message
    });
    // setFields({category_id:"",video:[]});
    // setFields({video:[],category_id:" "});
    if(state<10){
    setState(state+1);
  }
  else{
      setState(0);
    }
  }
  else{
    toast({
      position:"bottom-left",
      isClosable:true,
      duration:5000,
      status:"error",
      description:res.data.error
    })
  }

  setLoading(false);
  
}


console.log(fields.video);
  return (
    <Sidebar>
      <Flex
        gap={"20px"}
        mt={"20px"}
        flexDirection={{ base: "column-reverse", md: "row" }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Stack flex={"2"}>
          <Box>
            <Select
              onChange={(e) => {
                getElement(e.target.value);
              }}
              // value={fields.category_id}
              mt={"15px"}
              border={"1px solid #000"}
              _placeholder={{ color: "#867878", fontWeight: "bold" }}
            >
              {video &&
                video?.map((item) => {
                  return (
                    <option value={item.course_category_name}>
                      {item?.course_category_name}
                    </option>
                  );
                })}
            </Select>
          </Box>

          <Flex
            gap="15px"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={{ base: "center", sm: "center", md: "left" }}
            flexWrap={"wrap"}
          >
            {filterVideo &&
              filterVideo?.map((item) => {
                return (
                  <>
                    <Box

                    cursor={"pointer"}
                      onClick={() => {
                        filter(item);
                      }}
                      borderRadius={"8px"}
                      objectFit={"cover"}
                      padding={"5px"}
                      border={fields.video.includes(item._id)?"3px solid blue":"none"}
                      height={"200px"}
                    >
                      <Box width={"200px"} height={"140px"} objectFit={"cover"}>
                        <Image borderRadius={"8px"} height={"100%"} src={imageURL+item.thumbnail} w="100%" />
                      </Box>
                      <Stack
                        spacing={"15px"}
                        direction={"row"}
                        mt={"5px"}
                        justifyContent={"space-between"}
                      >
                        <Text textTransform={"capitalize"} fontWeight={"bold"}>
                          {item.title} 
                        </Text>
                      </Stack>
                    </Box>
                  </>
                );
              })}
          </Flex>
          <Box></Box>
          <Box>
            <Button
              width={{ base: "100%", md: "100%", lg: "20%" }}
              marginTop={"30px"}
              marginBottom={"30px"}
              padding={"0px 50px"}
              borderRadius={"5px"}
              border={"1px solid #1e2598"}
              bg={"#1e2598"}
              onClick={postVideo}
              color={"#fff"}
              _hover={{
                bg: "transparent",
                color: "#000",
                transition: "all 0.5s",
                border: "1px solid #000",
              }}
            >
              {
                loading?<TailSpin
                width="30"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
              />:"Publish"
              }
              
            </Button>
          </Box>
        </Stack>
      </Flex>
    </Sidebar>
  );
}
