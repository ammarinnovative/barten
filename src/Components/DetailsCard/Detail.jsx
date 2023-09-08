import { extendTheme, ChakraProvider,InputGroup,InputLeftElement, Input, Center, Checkbox, ButtonGroup, CheckboxGroup, Circle, HStack, Box, Square, Flex, Text, Image, Button, Icon } from '@chakra-ui/react'
import { color } from 'framer-motion';
import { BsConeStriped, BsThreeDotsVertical } from 'react-icons/bs';



const Detail = ({ data }) => {
    return (
        <Box display={"flex"} gap={"10px"} flexWrap={"wrap"} alignItems={"center"}>
            {
                data.map((d,index) => {
                    return (
                        <Box key={d._id} transition={"0.5s"} _hover={{backgroundColor:"#2c339e",color:"#fff !important"}} role={"group"}  backgroundColor={"#ececec"} margin={"0 5px 20px 5px"} marginBottom={"20px"} rounded={"md"} padding={"15px"} paddingBottom={"30px"} width={{ base: "100%", md: "47%", lg: "30%" }} color={"#fff"} >
                            <Box display={"flex"}  justifyContent={"space-between"}>
                                <Text color={"black"} _groupHover={{color:"white"}} fontSize={"15px"}>{index+1}</Text>
                                <Box cursor={"pointer"}>
                                    <Icon color={'#000'} _groupHover={{color: '#fff'}} fontSize={"17px"} as={BsThreeDotsVertical} />
                                </Box>
                            </Box>
                            <Text fontFamily={"poppins"} _groupHover={{color:"white"}} color={"black"}  fontSize={"15px"} marginTop={"20px"}>{d.name}</Text>
                        </Box> 
                    )
                })
            }
        </Box>
    )
}


export default Detail;


