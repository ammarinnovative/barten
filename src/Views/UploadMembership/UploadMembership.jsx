import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { AiOutlineUpload } from "react-icons/ai";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Upload_your_video_1 from "../../Assets/Images/Upload_your_video_1.png";
import Upload_your_video_2 from "../../Assets/Images/Upload_your_video_2.png";
import { Title } from "chart.js";
import { useToast } from "@chakra-ui/react";
import { POST, PUT } from "../../utilities/ApiProvider";
import store from "../../app/store";
import { useSelector } from "react-redux";
import { baseURL } from "../../utilities/config";
import { GET } from "../../utilities/ApiProvider";
import { TailSpin } from "react-loader-spinner";
import { Form, json, useParams } from "react-router-dom";
import Item from "antd/es/list/Item";
import { FaEdit } from "react-icons/fa";
import { DELETE } from "../../utilities/ApiProvider";
import { imageURL } from "../../utilities/config";
import { MdDelete } from "react-icons/md";

export default function UploadMember() {
  const selector = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [catagories, setCatagories] = useState([]);
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const params = useParams();
  const [catLoad, setCarLoad] = useState(false);
  const [updateId, setUpdateId] = useState({});
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState("");
  const [FilterData, setFilerData] = useState();
  const [videoLoad,setVideoLoad] = useState(false);
  const [selectedItem, setSelectedItem] = useState({playlist:[]});
  const [videoItem, setVideoItem] = useState([]);

  

  const getCatagories = async () => {
    setCarLoad(true);
    const res = await GET(
      "courseCategory/getAllCourseCategoryList?limit=10&page=1",
      {
        authorization: `Bearer ${user.JWT_TOKEN}`,
      }
    );
    setCatagories(res.data);
    setCarLoad(false);
  };

  const [value, setValue] = useState({
    course_category_name: "",
  });

  const category = [
    ...new Set(videoItem.map((item) => item.course_category_name)),
  ];

  useEffect(() => {
    if (user) {
      getCatagories();
      getVideoItem();
    }
  }, [user]);

  useEffect(() => {
    if (selector) {
      setUser(selector?.user?.user?.data?.data);
    }
  }, [selector]);

  const createCat = async () => {
    setLoading(true);
    const formData = new FormData();
    for (let key in value) {
      formData.append(key, value[key]);
    }
    const res = await POST("courseCategory/addCourseCategoryDetail", value, {
      authorization: `bearer ${user.JWT_TOKEN}`,
    });
    if (res.status == 200) {
      toast({
        status: "success",
        position: "bottom-left",
        duration: 5000,
        isClosable: true,
        title: res.data.message,
      });
      setLoading(false);
      getCatagories();
      getVideoItem();
    } else {
      toast({
        status: "error",
        position: "bottom-left",
        duration: 5000,
        isClosable: true,
        description: res.data.error,
      });
      setLoading(false);
    }
    setValue({ course_category_name: "" });
  };

  const [fields, setFields] = useState({
    category: [],
    price: 5,
    video: "63f9516b352a3cbh2ea6b8dc",
  });

  const deleteCat = async (_id) => {
    const res = await DELETE(`courseCategory/delete/${_id}`, {
      authorization: `bearer ${user.JWT_TOKEN}`,
    });

    try {
      if (res.data.status == 200) {
        toast({
          status: "success",
          description: "Deleted successfully",
          isClosable: true,
          position: "bottom-left",
          duration: 5000,
        });
      }
    } catch (error) {}

    getCatagories();
    getVideoItem();
  };

  // const uploadMembership = async () => {
  //   setLoadings(true);
  //   if (fields.category.length == 0 || !fields.video) {
  //     toast({
  //       description: "Please fill all the fields",
  //       status: "error",
  //       isClosable: true,
  //       position: "bottom-left",
  //       duration: 3000,
  //     });
  //     setLoadings(false);
  //     return;
  //   }

  //   const jsonFields = JSON.stringify(fields);
  //   debugger;
  //   const res = await POST(`membership/playlist/${params.id}`, jsonFields, {
  //     authorization: `Bearer ${user.JWT_TOKEN}`,
  //   });

  //   try {
  //     if (res.status == 200) {
  //       toast({
  //         description: res.data.message,
  //         status: "success",
  //         isClosable: true,
  //         position: "bottom-left",
  //         duration: 3000,
  //       });
  //     } else {
  //       toast({
  //         description: res.data.error,
  //         status: "error",
  //         isClosable: true,
  //         position: "bottom-left",
  //         duration: 3000,
  //       });
  //     }
  //   } catch (error) {}

  //   setLoadings(false);
  // };

  const updateValue = (data) => {
    setToggle(true);
    setUpdateId(data._id);
    setValue({ course_category_name: data?.course_category_name });
  };

  const Updated = async () => {
    setLoading(true);
    const res = await PUT(`courseCategory/update/${updateId}`, value, {
      authorization: `bearer ${user.JWT_TOKEN}`,
    });

    try {
      if (res.status == 200) {
        toast({
          position: "bottom-left",
          status: "success",
          description: "Category Updated",
          isClosable: true,
          duration: 5000,
        });
      }
    } catch (error) {
      toast({
        position: "bottom-left",
        duration: 5000,
        status: "success",
        isClosable: true,
        description: res.data.error,
      });
    }

    getCatagories();
    getVideoItem();
    setToggle(false);
    setValue({ course_category_name: "" });
    setLoading(false);
  };

  const getItem = (category) => {
    const catData = videoItem.filter((item) => {
      return item.course_category_name == category;
    });
    setSelected(category);
    setFilerData(catData);
  };


  
  const SelectedItem = (Item) => {
    const items = selectedItem.playlist.find((item) => {
      return item.video == Item._id;
    });
    
    if(items){
      setSelectedItem({playlist:selectedItem.playlist.filter((data)=>data.video !== Item._id)})
    }
    else{
      setSelectedItem({playlist:[...selectedItem.playlist,{video:Item._id}]})
    }
   
    
  };
    

  const getVideoItem = async () => {
    const res = await GET(`video/admin`, {
      authorization: `bearer ${user?.JWT_TOKEN}`,
    });
    setVideoItem(res.data);
  };
  


  const UploadVideos = async ()=>{
    setVideoLoad(true);
    if(selectedItem.playlist.length<=0){
      toast({
        position:"bottom-left",
        status:"error",
        duration:5000,
        isClosable:true,
        description:"Please seclect any video"
      });
      setVideoLoad(false);
      return;
    }
    const JsonItem = JSON.stringify(selectedItem);
    
      const res = await POST(`membership/playlist/${params.id}`,JsonItem,{
        authorization: `bearer ${user?.JWT_TOKEN}`
      });
     if(res.status ==200){
      toast({
        status:"success",
        position:"bottom-left",
        duration:5000,
        isClosable:true,
        description:res.data.message
      })
     }
     else{
      toast({
        position:"bottom-left",
        status:"error",
        isClosable:true,
        duration:5000,
        description:res.data.error
      })
     }

     setSelectedItem({playlist:[]});
    setVideoLoad(false)
  }

  return (
    <Sidebar>
      <Flex
        gap={"20px"}
        flexDirection={{ base: "column-reverse", md: "row" }}
        textAlign={{ base: "center", md: "left", lg: "", "2xl": "" }}
      >
        <Stack flex={"2"}>
          
          <Box>
            <Heading as="h2" size="md" mt={"30px"} mb={"20px"}>
              Upload Video
            </Heading>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"left"}
            flexWrap={"wrap"}
            alignItems={"center"}
            gap={"10px"}
          >
            {category.map((item) => {
              return (
                <Button
                  onClick={() => {
                    getItem(item);
                  }}
                  backgroundColor={selected === item ? "#1e2598" : "none"}
                  color={selected === item ? "white" : "none"}
                  border={"2px solid #1e2598"}
                  _hover={"none"}
                >
                  {item}
                </Button>
              );
            })}
          </Box>
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"left"}
            gap={"10px"}
            alignItems={"center"}
          >
            {FilterData &&
              FilterData?.map((item) => {
                // console.log(array.includes((items)=> {return items['id'] === item?.id}))
                return (
                  <>
                    {item.video.map((data) => {
                      return (
                        <Box
                          cursor={"pointer"}
                          onClick={() => {
                            SelectedItem(data);
                          }}
                          borderRadius={"10px"}
                          mt={"20px"}
                          p={"5px"}
                          shadow={"md"}
                          width={{ base: "100%", md: "42%", lg: "32%" }}
                        >
                          <Image
                            width={"100%"}
                            src={imageURL + data.thumbnail}
                            alt={data.title}
                            shadow={"md"}
                          />
                          <Text fontSize={"20px"} mt={"5px"}>
                            {data.title}
                          </Text>
                        </Box>
                      );
                    })}
                  </>
                );
              })}
          </Box>
          <Box>
            <Button
              onClick={UploadVideos}
              width={{ base: "100%", md: "100%", lg: "20%" }}
              marginTop={"30px"}
              marginBottom={"30px"}
              padding={"0px 50px"}
              borderRadius={"5px"}
              border={"1px solid #1e2598"}
              bg={"#1e2598"}
              color={"#fff"}
              _hover={{
                bg: "transparent",
                color: "#000",
                transition: "all 0.5s",
                border: "1px solid #000",
              }}
            >
              {videoLoad ? (
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
                "Publish"
              )}
            </Button>
          </Box>
        </Stack>

        {/* Create New Category */}
        <Stack flex={"1"}>
          <Box bg={"#1e2598"} p={"15px 20px 20px 15px"} borderRadius={"5px"}>
            <Text
              color={"#fff"}
              fontWeight={"600"}
              fontFamily={"poppins"}
              fontSize={{ base: "15px", md: "18px" }}
              mb={"10px"}
            >
              Create Category
            </Text>
            <Box mt={"30px"} position={"relative"}>
              <Input
                type={Text}
                border={"1px solid #fff"}
                height={"50px"}
                color={"white"}
                placeholder="Enter Name"
                name="course_category_name"
                value={value.course_category_name}
                onChange={(e) => {
                  setValue({ course_category_name: e.target.value });
                }}
                _placeholder={{ color: "#fff" }}
              />
              <Box position={"absolute"} right={"8px"} top={"8px"}>
                {toggle ? (
                  <Button
                    h={"35px"}
                    onClick={Updated}
                    border={"1px solid #fff"}
                    cursor={"pointer"}
                    _hover={{
                      bg: "transparent",
                      border: "1px solid #fff",
                      color: "#fff",
                      transition: "all 0.5s",
                    }}
                  >
                    {loading ? (
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
                      "Update"
                    )}
                  </Button>
                ) : (
                  <Button
                    h={"35px"}
                    onClick={createCat}
                    border={"1px solid #fff"}
                    cursor={"pointer"}
                    _hover={{
                      bg: "transparent",
                      border: "1px solid #fff",
                      color: "#fff",
                      transition: "all 0.5s",
                    }}
                  >
                    {loading ? (
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
                      "Create"
                    )}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
          <Box>
            <Text fontSize={"20px"} fontWeight={"bold"}>
              {catagories.length > 0
                ? "Created Categories"
                : "No Categories found"}
            </Text>
            {catLoad ? (
              <Box>Loading....</Box>
            ) : (
              catagories?.map((data) => {
                return (
                  <Box
                    display={"flex"}
                    padding={"10px"}
                    gap={"5px"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    marginBottom={"10px"}
                    border={"1px solid gray"}
                    borderRadius={"5px"}
                  >
                    <Text>{data.course_category_name}</Text>
                    <Box display={"flex"} alignItems={"center"} gap={"8px"}>
                      <Box
                        display={"flex"}
                        gap={"5px"}
                        cursor={"pointer"}
                        alignItems={"center"}
                        onClick={() => {
                          updateValue(data);
                        }}
                      >
                        <FaEdit fontSize={"20px"} />
                        <Text>Edit</Text>
                      </Box>
                      <Box
                        display={"flex"}
                        gap={"5px"}
                        cursor={"pointer"}
                        alignItems={"center"}
                        onClick={() => {
                          deleteCat(data._id);
                        }}
                      >
                        <MdDelete fontSize={"20px"} />
                        <Text>Delete</Text>
                      </Box>
                    </Box>
                  </Box>
                );
              })
            )}
          </Box>
        </Stack>
      </Flex>
    </Sidebar>
  );
}
