import React from 'react'
import { Text , Stack, Image } from '@chakra-ui/react'
export default function ChatsActiveProfile({data}) {
  return (
    data.map((d)=>{
      return(
        <Stack spacing={"2"} key={d.id} direction="row" alignItems={"center"} p={"8px 0px"} borderRight={"1px solid #ddd"} borderBottom={"1px solid #ddd"}>
          <Image width={{base:"18%", sm:"23%", md: '18%', lg: '', '2xl':''}}  opacity={"0.5"} src={d.img}></Image>
          <Text fontSize={{base:"18px", sm:"12px", md: '18px', lg: '', '2xl':''}} color={"#000"} opacity={"0.5"} fontWeight={"600"}>
              {d.name}
          </Text>
        </Stack>
      )
    }) 
  )
}


