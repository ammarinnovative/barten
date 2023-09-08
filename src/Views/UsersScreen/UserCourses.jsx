import { Box, Text, Image, Container, Flex, WrapItem, VStack, Tabs, TabList, Tab, TabPanels, TabPanel, Stack, Avatar } from "@chakra-ui/react"
import Sidebar from "../../Components/Sidebar/Sidebar";
import BasicStatistics from "../../Components/Cards/Card";
import { Button } from "@chakra-ui/react";
import Course3 from "../../Assets/Images/Courses/course3.jpg";
import { FaAngleDown } from "react-icons/fa";

export const UserCourses = () => {

    const UserAct =
        [
            {
                title: "Total Course Purchased",
                total: "3"
            },
            {
                title: "Total Referral Point",
                total: "$214.00"
            },
        ]

    return (
        <Sidebar>
            <Text fontFamily={'poppins'} display={"flex"} justifyContent={{base:"center",md:"center",lg:"left"}} fontWeight='600' fontSize={"23px"}>User Activies:</Text>
            <Box>
                <Box display={"flex"} flexDirection={{base:"column",md:"column",lg:"column",xl:"row"}}>
                    <Box flex={"3"}>
                        <Box >
                            <BasicStatistics UserAct={UserAct} />
                        </Box>
                        <Tabs width={"100%"} colorScheme={"gray.800"} color="#ecf2f7" borderBottom={"none"}>
                            {/* <Box padding={"20px"}> */}
                            <TabList display={"flex"} flexDirection={{base:"column",md:"column",lg:"row"}} width={"100%"}>
                                <Tab width={"100%"}><Button width={{base:"100%",md:"100%",lg:"50"}} _hover={{ backgroundColor: "none" }} color={"white"} backgroundColor={"#24349d"}>Total Courses</Button></Tab>
                                <Tab width={"100%"}><Button width={{base:"100%",md:"100%",lg:"50"}}  px={"30px"} border={"1px solid black"} color={"black"}>User Logs</Button></Tab>
                            </TabList>
                            {/* </Box> */}
                            <TabPanels>

                                <TabPanel padding={"20px"}>
                                    <Text fontSize={{base:"25px",md:"20px",lg:"25px"}} textAlign={{base:"center",md:"center",lg:"left"}} color="black" fontWeight={"600"}>2 Courses</Text>

                                    <Box display={"flex"} flexDirection="column">
                                        
                                    <Box display={"flex"} flexDirection={{base:"column",md:"column",lg:"row"}} margin={"30px 0"}>
                                            <Box >
                                                <Image width={{base:"100%",md:"80%",lg:"500px"}} src={Course3} alt="img" />
                                            </Box>
                                            <Box width={"100%"} padding={"10px"}>
                                                <Text fontWeight={"600"} color="black" fontSize="18px">Crypto Explained:Security Action</Text>
                                                <Box display={"flex"} color="gray" width="100%" marginTop={"10px"} justifyContent="space-between">
                                                    <Text>Category:</Text>
                                                    <Text color="black">Videos</Text>
                                                </Box>
                                                <Box display={"flex"} color="#24349d" width="100%" justifyContent="space-between">
                                                    <Text>Crypto trading</Text>
                                                    <Text>11</Text>
                                                </Box>
                                                <Box display={"flex"} flexDirection={"row"} marginTop="10px" color="gray" justifyContent="space-between">
                                                    <Text>Purchase Date:</Text>
                                                    <Text color="black">15Feb,2023</Text>
                                                </Box>
                                                <Box display={"flex"} flexDirection={"row"} marginTop="10px" color="gray" justifyContent="space-between">
                                                    <Text>item:</Text>
                                                    <Text color="black">Crypto Explained</Text>
                                                </Box>
                                                <Box display={"flex"}  marginTop="10px" color="black"justifyContent="space-between" >
                                                    <Text color={"gray"}>Pay:</Text>
                                                    <Text>$100.00</Text>
                                                </Box>

                                            </Box>
                                        </Box>
                                        <Box display={"flex"} flexDirection={{base:"column",md:"column",lg:"row"}} margin={"30px 0"}>
                                            <Box >
                                                <Image width={{base:"100%",md:"80%",lg:"500px"}} src={Course3} alt="img" />
                                            </Box>
                                            <Box width={"100%"} padding={"10px"}>
                                                <Text fontWeight={"600"} color="black" fontSize="18px">Crypto Explained:Security Action</Text>
                                                <Box display={"flex"} color="gray" width="100%" marginTop={"10px"} justifyContent="space-between">
                                                    <Text>Category:</Text>
                                                    <Text color="black">Videos</Text>
                                                </Box>
                                                <Box display={"flex"} color="#24349d" width="100%" justifyContent="space-between">
                                                    <Text>Crypto trading</Text>
                                                    <Text>11</Text>
                                                </Box>
                                                <Box display={"flex"} flexDirection={"row"} marginTop="10px" color="gray" justifyContent="space-between">
                                                    <Text>Purchase Date:</Text>
                                                    <Text color="black">15Feb,2023</Text>
                                                </Box>
                                                <Box display={"flex"} flexDirection={"row"} marginTop="10px" color="gray" justifyContent="space-between">
                                                    <Text>item:</Text>
                                                    <Text color="black">Crypto Explained</Text>
                                                </Box>
                                                <Box display={"flex"}  marginTop="10px" color="black"justifyContent="space-between" >
                                                    <Text color={"gray"}>Pay:</Text>
                                                    <Text>$100.00</Text>
                                                </Box>

                                            </Box>
                                        </Box>
                                        
                                    </Box>

                                </TabPanel>
                                <TabPanel mt={"10px"} padding={"20px"}>
                                    {/* //// Logs Details  */}
                                    <Text fontSize={"21px"} fontWeight="600" marginBottom={"20px"} color={"black"}>Logs Details</Text>
                                    <Box color={"black"} marginBottom={"30px"}>
                                        <Flex width={"100%"} alignItems={"center"} justifyContent={"space-between"}>
                                            <WrapItem  >
                                                <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                                                <Box>
                                                    <Text color={"gray.700"}>Name</Text>
                                                    <Text fontWeight={"bold"} fontSize={"13px"}>John Peterson</Text>
                                                </Box>
                                            </WrapItem>
                                            <Box display={{ base: "none", md: "none", lg: "block" }}>
                                                <Text>Billing Date,</Text>
                                                <Text fontWeight={"500"}>15Feb 2023</Text>
                                            </Box>
                                            <Box display={{ base: "none", md: "none", lg: "block" }}>
                                                <Text>Item:</Text>
                                                <Text fontWeight={"500"}>(Silver Tier)</Text>
                                            </Box>
                                            <Box display={{ base: "none", md: "none", lg: "block" }}>
                                                <Text>Pay</Text>
                                                <Text fontWeight={"500"}>$10,00</Text>
                                            </Box>
                                            <Box display={{ base: "block", md: "block", lg: "none" }}>
                                                <Button color={"#fff"} marginLeft={"120px"} size="sm" _hover={{ backgroundColor: "0d1140" }} backgroundColor={"#24349d"}>View Details</Button>
                                            </Box>
                                            <Box borderBottom={"2px solid #000"}></Box>

                                        </Flex>
                                        <Box width={"80%"} marginLeft={"45px"} marginTop={"30px"} border={"1px solid gray"}></Box>
                                    </Box>


                                    {/* ///////// Earn Referral points */}
                                    <Text fontSize={"21px"} fontWeight="600" marginBottom={"20px"} color={"black"}>Earn Referral Points</Text>
                                    <Box color={"black"} marginBottom={"30px"}>
                                        <Flex width={"100%"} alignItems={"center"} justifyContent={"space-between"}>
                                            <WrapItem  >
                                                <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                                                <Box display={"flex"} flexDirection="column">
                                                    <Box>
                                                        <Text color={"gray.700"}>Name</Text>
                                                        <Text fontWeight={"600"} fontSize={"13px"}>John Peterson</Text>
                                                    </Box>
                                                    <Box>
                                                        <Text>Billing Date,</Text>
                                                        <Text fontWeight={"600"}>15Feb 2023</Text>
                                                    </Box>
                                                </Box>
                                            </WrapItem>
                                            <Box display={{ base: "none", md: "none", lg: "block" }}>
                                                <Box>
                                                    <Text>Signup Date,</Text>
                                                    <Text fontWeight="600" >15Feb 2023</Text>
                                                </Box>
                                                <Box mt={"10px"}>
                                                    <Text>Item Purchased:</Text>
                                                    <Text  fontWeight={"600"}>15Feb 2023</Text>
                                                </Box>
                                                <Box mt={"10px"}>
                                                    <Text>Crypto Courses:</Text>
                                                    <Text fontWeight={"600"}>($25.00)</Text>
                                                </Box>
                                                <Text mt={"10px"} cursor="pointer" color={"blue"}>View Courses</Text>
                                            </Box>
                                            <Box display={{ base: "none", md: "none", lg: "block" }}>
                                                <Text>Plan:</Text>
                                                <Text fontWeight={"600"}>(Silver Tier)</Text>
                                            </Box>
                                            <Box display={{ base: "none", md: "none", lg: "block" }}>
                                                <Text>Pay</Text>
                                                <Text fontWeight={"600"}>$10,00</Text>
                                            </Box>
                                            <Box display={{ base: "block", md: "block", lg: "none" }}>
                                                <Button color={"#fff"} marginLeft={"120px"} size="sm" _hover={{ backgroundColor: "0d1140" }} backgroundColor={"#24349d"}>View Details</Button>
                                            </Box>
                                            <Box borderBottom={"2px solid #000"}></Box>

                                        </Flex>
                                        <Box width={"80%"} marginLeft={"45px"} marginTop={"30px"} border={"1px solid gray"}></Box>
                                    </Box>
                                    <Text fontSize={"21px"} fontWeight="600" marginBottom={"20px"} color={"black"}>Purchased Course</Text>
                                    <Box color={"black"} marginBottom={"30px"}>
                                        <Flex width={"100%"} alignItems={"center"} justifyContent={"space-between"}>
                                            <WrapItem  >
                                                <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                                                <Box>
                                                    <Text color={"gray.700"}>Name</Text>
                                                    <Text fontWeight={"bold"} fontSize={"13px"}>John Peterson</Text>
                                                </Box>
                                            </WrapItem>
                                            <Box display={{ base: "none", md: "none", lg: "block" }}>
                                                <Box mt={"10px"}>
                                                    <Text>Item Purchased:</Text>
                                                </Box>
                                                <Box mt={"10px"}>
                                                    <Text>Crypto Courses:</Text>
                                                    <Text fontWeight={"600"}>($25.00)</Text>
                                                </Box>
                                                <Text mt={"10px"} cursor="pointer" color={"blue"}>View Courses</Text>
                                            </Box>
                                            <Box display={{ base: "none", md: "none", lg: "block" }}>
                                                <Text>Item:</Text>
                                                <Text fontWeight={"600"}>(Silver Tier)</Text>
                                            </Box>
                                            <Box display={{ base: "none", md: "none", lg: "block" }}>
                                                <Text>Date</Text>
                                                <Text fontWeight={"600"}>3/13/2023</Text>
                                            </Box>
                                            <Box display={{ base: "block", md: "block", lg: "none" }}>
                                                <Button color={"#fff"} marginLeft={"120px"} size="sm" _hover={{ backgroundColor: "0d1140" }} backgroundColor={"#24349d"}>View Details</Button>
                                            </Box>
                                            <Box borderBottom={"2px solid #000"}></Box>

                                        </Flex>
                                        <Box width={"80%"} marginLeft={"45px"} marginTop={"30px"} border={"1px solid gray"}></Box>
                                    </Box>


                                </TabPanel>

                            </TabPanels>
                        </Tabs>
                    </Box>
                    <Box flex={"2"}>
                        <Container maxW={{base:"none",md:"sm",lg:"sm"}}>
                            <Text fontSize={{base:"25px",md:"20px"}} textAlign={{base:"center",md:"center",lg:"left"}} marginBottom={"10px"} fontWeight="600">User Details</Text>
                            <Box backgroundColor={"#24349d"} rounded="lg">
                                <VStack color={"gray.300"}>
                                    <Tabs borderBottom={"gray"} colorScheme='white' width={"100%"}>
                                        <TabList>
                                            <Tab color={"white"} width={"50%"}>Info</Tab>
                                            <Tab color={"white"} width={"50%"}>Credit Card</Tab>
                                        </TabList>

                                        <TabPanels>
                                            <TabPanel>
                                                <Box>
                                                    <Box display={"flex"} justifyContent="space-between">
                                                        <Box display={"flex"}>
                                                            <Avatar name="Ava Peter" src="https://bit.ly/kent-c-dodds" />
                                                            <Box marginLeft={"10px"}>
                                                                <Text color={"gray.300"}>Name:</Text>
                                                                <Text>Ava Peter</Text>
                                                            </Box>
                                                        </Box>
                                                        <FaAngleDown cursor={"pointer"} />
                                                    </Box>
                                                    <Box>
                                                        <Box margin={"20px 0"}>
                                                            <Text fontSize={"normal"} color={"gray.300"}>Email:</Text>
                                                            <Text color={"white"} fontWeight={'300'}>ava@gamail.com</Text>
                                                        </Box>
                                                        <Box margin={"20px 0"}>
                                                            <Text color={"gray.300"}>Phone:</Text>
                                                            <Text color={"white"}>+9178498494</Text>
                                                        </Box>
                                                        <Box margin={"20px 0"}>
                                                            <Text color={"gray.300"}>Sign Up Date:</Text>
                                                            <Text color={"white"}>3/12/2023</Text>
                                                        </Box>
                                                        <Box margin={"20px 0"}>
                                                            <Text color={"gray.300"}>Tier Plan:</Text>
                                                            <Text color={"white"}>Silver Tier ($20.00)</Text>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </TabPanel>
                                            <TabPanel>
                                                <Box display={"flex"} justifyContent="space-between">
                                                    <Box display={"flex"}>
                                                        <Avatar name="Ava Peter" src="https://bit.ly/kent-c-dodds" />
                                                        <Box marginLeft={"10px"}>
                                                            <Text color={"gray.300"}>Name:</Text>
                                                            <Text>Ava Peter</Text>
                                                        </Box>
                                                    </Box>
                                                    <FaAngleDown cursor={"pointer"} />
                                                </Box>
                                                <Box>
                                                    <Box margin={"20px 0"}>
                                                        <Text fontSize={"normal"} color={"gray.300"}>Card Number:</Text>
                                                        <Text color={"white"} fontWeight={'300'}>898432032032</Text>
                                                    </Box>
                                                    <Box margin={"20px 0"}>
                                                        <Text color={"gray.300"}>Card Holder:</Text>
                                                        <Text color={"white"}>Ava Peter</Text>
                                                    </Box>
                                                    <Box margin={"20px 0"}>
                                                        <Text color={"gray.300"}>Exp:</Text>
                                                        <Text color={"white"}>08/24</Text>
                                                    </Box>
                                                </Box>
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
                                </VStack>
                            </Box>
                        </Container>

                    </Box>
                </Box>
                <Box>

                </Box>
            </Box>
        </Sidebar>
    )
}

















