import React from "react";
import { Text,Box,Heading,Divider } from "@chakra-ui/react";

const FilteredDestinations = () => {
    return (
        <>
            <Box bgColor={'#F5F5F5'} height={{base:'',md:'',lg:'100vh',xl:''}} width={{base:'',md:'',lg:'26.9vw',xl:''}} >
                <Heading mt={{base:'',md:'',lg:'3rem',xl:''}} ml={{base:'',md:'',lg:'40px',xl:''}} color=''>Preffered region</Heading>

                <Divider borderWidth={'1px'} mt={{base:'',md:'',lg:'3rem',xl:''}}/>
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}>Nothern Africa</Text>
                <Divider borderWidth={'1px'}/>
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}>Western Africa</Text>
                <Divider borderWidth={'1px'} />
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}>Central Africa</Text>
                <Divider borderWidth={'1px'} />
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}>East Africa</Text>
                <Divider borderWidth={'1px'}/>
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}>Southern Africa</Text>
                <Divider borderWidth={'1px'}/>

          </Box>
        </>
    )
}
export default FilteredDestinations;
