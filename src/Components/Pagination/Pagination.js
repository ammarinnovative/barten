import ReactPaginate from 'react-paginate';
import React, { useState } from 'react'


// import {
//     Flex,
//     Text,
//     Stack,
//   } from "@chakra-ui/react";

// const Pagination = ({getPage,totalPage,totalRecords}) => {

//     const [number,setNumber] = useState(1);
//     console.log(number);
//     const numbers = Array.from({ length: totalPage }, (_, index) => index + 1);
//     const getPageNumber = (item)=>{
//       setNumber(item);
//       getPage(item);
//     }
//     return (
//     <Flex justify={"center"}>
//         <Stack direction={"row"} spacing={5}>
//         {
//            totalRecords>3 && numbers.map((item)=>{
//                 return(
//                     <Text borderRadius={"sm"} fontSize={"20px"} padding={'5px 8px'} cursor={"pointer"} backgroundColor={number === item?"hsl(352.86deg 100% 32.94%)":"transparent"} color={number===item?"white":"gray.700"} border={"1px solid hsl(352.86deg 100% 32.94%)"}  onClick={()=>{getPageNumber(item)}} key={item}>{item}</Text>
//                 )
//             })
//         }
//         </Stack>
//     </Flex>
//   )
// }

// export default Pagination


const Pagination = ({ pageCount,getCurrentPage,totalPages }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    getCurrentPage(selectedPage.selected+1);
  };
  
  return (
    <div>      
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default Pagination;