import { FaHome, FaUserCheck, FaDollarSign } from "react-icons/fa";
import React, { ReactNode, useEffect, useState } from "react";
import { Link as ReactLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../Assets/Images/Logo.png";
import { SearchIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  Image,
  Link,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  InputLeftElement,
  MenuList,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  AiOutlineHome,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { MdOutlinePayment } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import { ReactText } from "react";
import {
  BsWallet,
  BsFillChatTextFill,
  BsFillPlayCircleFill,
  BsFillCloudUploadFill,
} from "react-icons/bs";
import { logout } from "../../reducers/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { RiWechatPayLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { imageURL } from "../../utilities/config";
import { Button } from "antd";

const LinkItems = [
  { name: "Home", icon: FaHome, url: "/" },
  { name: "Tiers", icon: FaDollarSign, url: "/dashboard/Tiers" },
  { name: "Support", icon: HiSpeakerphone, url: "/dashboard/support" },
  { name: "Users", icon: FaUserCheck, url: "/dashboard/User" },
  { name: "Settings", icon: FiSettings, url: "/dashboard/Setting" },
];

export default function SidebarWithHeader({ children }) {
  const [user,setUser] = useState()
  const location = useLocation();
  const navigate = useNavigate();
  const [curLoc, setCurLoc] = useState("Overview");

  useEffect(() => {
    let tempLoc = String(location.pathname).split("/")[2];
    
    if (tempLoc !== "" || tempLoc !== undefined || tempLoc !== null) {
      setCurLoc(tempLoc);
    } else {
      setCurLoc("Overview");
    }
  }, [location]);


  const { isOpen, onOpen, onClose } = useDisclosure();
  const selector = useSelector((state) => state);

  useEffect(()=>{
    if(!selector){
      navigate("/login");
    }
  },[selector])




  
  const [same, setSame] = useState("true");
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav
        imageURL={imageURL}
        onOpen={onOpen}
        profile={selector?.user?.user?.profile_picture}
        tarLoc={curLoc}
      />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const location = useLocation();

  return (
    <Box
      transition="3s ease"
      borderRight="1px"
      backgroundColor={"hsl(352.86deg 100% 32.94%)"}
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      // color="red"
      paddingTop={"22px"}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Image width={"130px"} src={Logo} alt="img" />
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box mt={"40px"}>
        {LinkItems.map((link) => (
          <Link as={ReactLink} backgroundColor={"#fff"} to={link.url}>
            <NavItem
              url={link?.url}
              width={"100%"}
              marginLeft={"0"}
              borderRadius={"0"}
              key={link.name}
              color={"gray.12"}
              icon={link.icon}
            >
              {link.name}
            </NavItem>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, url, children, ...rest }) => {
  const location = useLocation();
  return (
    <Link
      color={
        url === location.pathname ? "hsl(352.86deg 100% 32.94%)" : "gray.200"
      }
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      _hover={"none"}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={url === location.pathname ? "#fff" : "transparent"}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, profile, imageURL, tarLoc, ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clearItem = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      backgroundColor={"#0d1140"}
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "space-between" }}
      {...rest}
    >
      <Box>
        <Text
          display={{ base: "none", md: "block" }}
          fontWeigh={"bold"}
          fontSize={"27px"}
          color={"black"}
        >
          {tarLoc ?? "Overview"}
        </Text>
      </Box>
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Image src={Logo} />
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                {profile ? (
                  <Avatar size={"sm"} src={imageURL + profile ?? CgProfile} />
                ) : (
                  <CgProfile />
                )}
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <Link as={ReactLink} to="/dashboard/Setting">
                <MenuItem>Settings</MenuItem>
              </Link>
              <MenuDivider />

              <MenuItem onClick={() => clearItem()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
