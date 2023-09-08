import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { GET } from "../../utilities/ApiProvider";

const StateCard = ({ series1, percentage, color }) => {
  const [data, setData] = useState({
    series: [],
    options: {
      labels:[]
      
    },
  });


  const selector = useSelector((state) => state);
  const [user, setUser] = useState({});
  const [datas, setDatas] = useState("");

  useEffect(() => {
    if (selector) {
      setUser(selector?.user?.user);
    }
  }, [selector]);

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  useEffect(() => {
    setData({
      ...data,
      series: percentage,
      color: color,
      labels: series1,
    });
  }, [series1, color, percentage]);

  const getData = async () => {
    const res = await GET("admin/home", {
      authorization: `bearer ${user?.verificationToken}`,
    });
    setDatas(res?.data);
  };



  let totalUser = 0;
  let totalRevenue =0;

  // if (datas && datas.length > 0) {
  //   totalUser = datas[0]?.totalUsers ?? 0;
  //   totalRevenue = datas[1]?.totalRevenue ?? 0;
  // }

  if(datas && datas?.length>0){
    totalUser = datas[0]['totalUsers'];
    totalRevenue = datas[1]['totalRevenue'];
  }


  return (
    <Box
      gap={"20px"}
      display={"flex"}
      flexDirection={{ base: "column", md: "column", lg: "row" }}
      width={"100%"}
      justifyContent={"left"}
      alignItems={"center"}
    >
      <Box
        gap={"20px"}
        display={"flex"}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
        width={"100%"}
        justifyContent={"left"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          width={{ base: "100%", md: "45%", lg: "35%" }}
          padding={"15px"}
          backgroundColor={"white"}
          borderRadius={"5px"}
        >
          <Text
            mb={"20px"}
            fontSize={"20px"}
            fontWeight={"semibold"}
            color={"gray.700"}
          >
            Total User's
          </Text>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text
              color={"hsl(352.86deg 100% 32.94%)"}
              fontSize={"30px"}
              fontWeight={"semibold"}
            >
              {totalUser??"0"}
            </Text>
            <Text cursor={"pointer"}>View All</Text>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          width={{ base: "100%", md: "45%", lg: "35%" }}
          padding={"15px"}
          backgroundColor={"hsl(352.86deg 100% 32.94%)"}
          borderRadius={"5px"}
        >
          <Text
            mb={"20px"}
            fontSize={"20px"}
            fontWeight={"semibold"}
            color={"white"}
          >
            Total Revenue
          </Text>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text color={"white"} fontSize={"30px"} fontWeight={"semibold"}>
              ${totalRevenue??"0"}
            </Text>
            <Text color={"white"} cursor={"pointer"}>
              View All
            </Text>
          </Box>
        </Box>
      </Box>
      <Box>
        <ReactApexChart
          width={"300px"}
          options={data}
          series={data?.series}
          type="pie"
          height={350}
        />
      </Box>
    </Box>
  );
};

export default StateCard;
