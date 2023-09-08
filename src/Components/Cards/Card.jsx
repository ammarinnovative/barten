import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';



function StatsCard(props) {

const Details = [
  {

  }
]


  const { title, stat, view } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      color={"black"}
      fontFamily={"Poppins"}
      backgroundColor={"#ececec"}
      fontWeight={"normal"}
      letterSpacing={"1px"}
      role={"group"}
      border={"2px solid #dee2e6"}
      _hover={{ backgroundColor: "#2c339e", color: "white" }}
      transition={"0.5s"}
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          
            <StatLabel fontWeight={'600'} _groupHover={{ color: "white" }} color={"#2c339e"} isTruncated>
              {title}
            </StatLabel>
          <StatNumber fontSize={'34px'} color={"#2c339e"} _groupHover={{ color: "white" }} fontFamily={"poppins400"} fontWeight={'bold'}>
            {stat}
          </StatNumber>
          <StatLabel fontWeight={'600'} _groupHover={{ color: "white" }} color={"black"} isTruncated>
              {view}
            </StatLabel>          

        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics({ UserAct}) {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <SimpleGrid columns={{ base: 1, md: 2,lg:2 }} spacing={{ base: 5, lg: 8 }}>
        {
         UserAct && UserAct?.map((data,index) => {
            return (
              <StatsCard
                key={index}
                title={data.title}
                stat={data.numbers}
                view={data.view}
                
              />
            )
          })
        }

      </SimpleGrid>
    </Box>
  );
}