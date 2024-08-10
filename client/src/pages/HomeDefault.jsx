import React from "react";
import Navbar from "../components/home/Navbar";
import PostDestinations from "../components/home/PostDestinations";
import FilteredDestinations from "../components/home/FilteredDestinations";
import { Flex,Box} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const HomeDefault = ({destinations}) => {
    const location = useLocation();

    // use location to access the state passed and extract
    const filteredDestinations = location.state?.filteredDestination;
    // console.log(filteredDestinations)
    return (
        <Flex display={{base:'block',md:'',lg:'flex',xl:'flex'}}>
            <Navbar />
            <FilteredDestinations destinations={destinations} order={{base:1,md:1,lg:2,xl:2}} />
            <PostDestinations destinations={destinations} filteredDestination={filteredDestinations} order={{base:2,md:2,lg:1,xl:1}}/>
          
        </Flex>
    )
}
export default HomeDefault;