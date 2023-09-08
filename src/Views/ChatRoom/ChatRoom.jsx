import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import {
  Box,
  Container,
  Stack,
  Toast,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Button, Checkbox, Input, Select } from "antd";
import { DELETE, GET, PUT } from "../../utilities/ApiProvider";
import { POST } from "../../utilities/ApiProvider";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaBeer, FaEdit } from 'react-icons/fa';
import { TailSpin } from "react-loader-spinner";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

function ChatRoom() {
  const [Category, setCategory] = useState([]);
  const [val, setVal] = useState("");
  const [user, setUser] = useState(null);
  const selector = useSelector((state) => state);
  const [chatData, setChatData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [toggle,setToggle] = useState(false);
  const [dataId,setDataId] = useState("");
  const params = useParams();

  const toast = useToast();
  const getCat = async () => {
    const res = await GET(
      "courseCategory/getAllCourseCategoryList?limit=10&page=1",
      {
        authorization: `bearer ${user.JWT_TOKEN}`,
      }
    );
    setCategory(res.data);
  };

  const [fields, setFields] = useState({
    title: "",
    details: "",
    readonly: false,
    category: [],
  });
  const PostData = async () => {
    if (
      !fields.title ||
      !fields.details ||
      !fields.readonly ||
      !fields.category
    ) {
      toast({
        position: "bottom-left",
        isClosable: true,
        status: "error",
        duration: 5000,
        description: "Please fill all the fields",
      });
      return;
    }
    const res = await POST("chatroom", fields, {
      authorization: `bearer ${user?.JWT_TOKEN}`,
    });
    try {
      if (res.status == 200) {
        toast({
          position: "bottom-left",
          duration: 5000,
          isClosable: true,
          description: res.data.message,
          status: "success",
        });
      }
      setFields({
        title: "",
        details: "",
        readonly: false,
        category: [],
      });
      getChat();
    } catch (error) {
      toast({
        position: "bottom-left",
        isClosable: true,
        status: "error",
        description: res.data.error,
        duration: 5000,
      });
    }
  };

  const getChat = async () => {
    setLoading(true);
    const res = await GET(`chatroom`, {
      authorization: `bearer ${user.JWT_TOKEN}`,
    });
    setChatData(res.data);
    setLoading(false)
  };

  const DeleteChatRoom =async (id)=>{
    try {
      const res = await DELETE(`chatroom/${id}`);
      if(res.status==200){
        toast({
          position:"bottom-left",
          isClosable:true,
          duration:5000,
          status:"success",
          description:res.data.message
        })
        getChat();
      }
    } catch (error) {
      console.log(error)
      toast({
        position:"bottom-left",
        isClosable:true,
        status:"error",
        duration:5000,
        description:error.data.meesage
      })
    }
    
  }

 
  useEffect(() => {
    if (user) {
      getCat();
      getChat();
    }
  }, [user]);
  useEffect(() => {}, [fields]);

  useEffect(() => {
    if (selector) {
      setUser(selector?.user?.user?.data?.data);
    }
  }, [selector]);

  const update = (item)=>{
    setToggle(true);
    setDataId(item._id);
    setFields({
      title:item.title,
      details:item.details,
      readonly:item.readonly,
      category:item.category

    })
  }
  const updateData = async ()=>{
    const res = await PUT(`chatroom/${dataId}`,fields,{
      authorization: `bearer ${user.JWT_TOKEN}`
    })
    try {
      if(res.status ==200){
        toast({
          position:"bottom-left",
          status:"success",
          isClosable:"true",
          duration:5000,
          description:"Updated successfully"
        })
        setFields({
          title:"",
          details:"",
          readonly:false,
          category:[]
        })
        getChat();
        setToggle(false);
      }
    } catch (error) {
      toast({
        position:"bottom-left",
        isClosable:true,
        duration:5000,
        status:"success",
        description:res.data.error
      })
    }
  }




  return (
    <Sidebar>
      <Stack maxW={"800px"} margin={"auto"}>
        <Input
          value={fields.title}
          margin="15px 0"
          onChange={(e) => {
            setFields({ ...fields, title: e.target.value });
          }}
          type="text"
          placeholder="Title"
        />
        <Input
          value={fields.details}
          padding="5px"
          margin="15px 0"
          onChange={(e) => {
            setFields({ ...fields, details: e.target.value });
          }}
          type="text"
          placeholder="Details"
        />
        <Select
          value={fields.category}
          onChange={(e) => {
            setFields({ ...fields, category: [e] });
          }}
          padding="5px"
          margin="15px 0"
          placeholder="Select option"
        >
          {Category?.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {item.course_category_name}
              </option>
            );
          })}
        </Select>{" "}
        <Checkbox
          checked={fields.readonly}
          onChange={(e) => {
            setFields({ ...fields, readonly: !fields.readonly });
          }}
          margin="15px 0"
          defaultChecked
        >
          Checkbox
        </Checkbox>
        {
          toggle?<Button onClick={updateData}>Update</Button>:<Button onClick={PostData}>Create</Button>
        }
        
      </Stack>
      {
         loading?<Box display={"flex"} marginTop={"60px"} justifyContent={"center"} alignItems={"center"}>
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
       </Box>:
       <TableContainer>
       <Table variant="simple" boxShadow={"lg"} bg={"white"} mt={"40px"} mb={"40px"} borderRadius={"7px"} padding={"20px"} >
         <Thead>
           <Tr >
             <Th color={"gray"} fontWeight={"normal"} fontSize={"20px"}>Title</Th>
             <Th color={"gray"} fontWeight={"normal"} fontSize={"20px"}>Details</Th>
             <Th color={"gray"} fontWeight={"normal"} fontSize={"20px"}>category ID</Th>
           </Tr>
         </Thead>
         <Tbody>
           {
            
             chatData?.map((item) => {
               return (
               
                 <Tr>
                   <Td>{item.title}</Td>
                   <Td>{item.details}</Td>
                   <Td>{item.category}</Td>
                   <Td onClick={()=>{update(item)}} fontSize={"20px"} cursor={"pointer"}><FaEdit /></Td>
                   <Td onClick={()=>{DeleteChatRoom(item._id)}} fontSize={"20px"} cursor={"pointer"}><MdDelete /></Td>
                 </Tr>
               );
             })
             }
           
         </Tbody>
       </Table>
     </TableContainer>
      }
      
    </Sidebar>
  );
}

export default ChatRoom;
