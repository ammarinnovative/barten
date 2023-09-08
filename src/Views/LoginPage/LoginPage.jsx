import {
  extendTheme,
  ChakraProvider,
  Center,
  Checkbox,
  CheckboxGroup,
  Circle,
  HStack,
  Box,
  Square,
  Flex,
  Text,
  Image,
  Button,
  Container,
  VStack,
  InputGroup,
  InputRightElement,
  Toast,
} from "@chakra-ui/react";
import ColorShade from "../../Assets/Images/back.jpg";
import Logo from "../../Assets/Images/Logo.png";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { POST } from "../../utilities/ApiProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { addUser } from "../../reducers/UserReducer";
import { Dispatch } from "react";
import { useToast } from "@chakra-ui/react";

export const LoginPage = () => {
  const toast = useToast();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);
  const [Fields, setFields] = useState({
    username: "",
    password: "",
    fcm: "cyWpPiJYTiWCPF6dq7KVdF:APA91bE3vKforkbKdH1vnDqi1rYvCYr9TBCNYDkOJkp8sKI8Ku4LxyjUJ4SuXRQFgC-l2N2D8PIgHKX2IEmX__YWlcNUCwQIFP-YhqcJd4FwsR2vPCyfQETA7XUTeU9sMi3xnAmWnYgJ",
  });

  const submitForm = async () => {
    if (!Fields.username || !Fields.password) {
      toast({
        description: "Please fill all the fields",
        status: "error",
        isClosable: true,
        position: "bottom-left",
        duration: 5000,
      });
      return;
    }
    setToggle(true);
    try {
      const res = await POST("users/login", Fields);
      if (res.status == 200) {
        toast({
          description: "Login successfully",
          status: "success",
          isClosable: true,
          position: "bottom-left",
          duration: 5000,
        });
        setToggle(false);
        dispatch(addUser(res?.data?.data));
        navigate("/");
      } else {
        toast({
          description: res?.data?.message,
          status: "error",
          isClosable: true,
          position: "bottom-left",
          duration: 5000,
        });
        setToggle(false);
      }
      setToggle(false);
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        isClosable: true,
        position: "bottom-left",
        duration: 5000,
      });
      setToggle(false);
    }
  };

  const selector = useSelector((store) => store);
  const [show, setShow] = useState(false);
  return (
    <Box
      backgroundImage={ColorShade}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      className="boxMode"
      width={"100%"}
      height={"100vh"}
      backgroundSize={"cover"}
    >
      <Box
        display={"flex"}
        width="100%"
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Image src={Logo} width={"200px"} marginBottom={"24px"} />
        <Text
          textTransform={"uppercase"}
          fontFamily={"Poppins700"}
          fontSize={{ base: "35px", md: "50px", lg: "68px" }}
          fontWeight={"900"}
          color={"white"}
        >
          Welcome back
        </Text>
        <Text
          color={"white"}
          letterSpacing={"2px"}
          fontWeight={"normal"}
          marginBottom={"30px"}
          fontFamily={"poppins400"}
        >
          Enter your details
        </Text>
        <Container>
          <VStack>
            <FormControl>
              <Input
                type={"text"}
                onChange={(e) => {
                  setFields({ ...Fields, username: e.target.value });
                }}
                value={Fields.username}
                placeholder="Enter your Username"
                color={"white"}
              />
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  value={Fields.password}
                  onChange={(e) => {
                    setFields({ ...Fields, password: e.target.value });
                  }}
                  color="white"
                  placeholder="Enter your password"
                />
                <InputRightElement width={"4.5rem"}>
                  <Button
                    background={"hsl(352.86deg 100% 32.94%)"}
                    onClick={() => {
                      setShow(!show);
                    }}
                    color="white"
                    _hover={"none"}
                    size={"sm"}
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              width={"100%"}
              color={"white"}
              _hover={"none"}
              onClick={submitForm}
              border={"1px solid white"}
              backgroundColor={"hsl(352.86deg 100% 32.94%)"}
            >
              {toggle ? (
                <TailSpin
                  // height="20"
                  width="30"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                "Login"
              )}
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};
