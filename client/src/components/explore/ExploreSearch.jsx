import React from "react";
import { Input,InputGroup,InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";


const ExploreSearch = () => {
    return(
        <>
        <InputGroup>
            <InputLeftElement>
            <SearchIcon ml='80rem' mt='2rem' color='#FF4500'/>
            </InputLeftElement>
            <Input variant='outline' width='16rem' ml='40rem' mt='1rem' placeholder="Search by country name..." focusBorderColor='#FF4500'  />
        </InputGroup>
        </>
    )
}
export default ExploreSearch;