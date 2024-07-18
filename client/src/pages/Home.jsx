import React from "react";
import Navbar from "../components/home/Navbar";
import PostDestinations from "../components/home/PostDestinations";
import FilteredDestinations from "../components/home/FilteredDestinations";
import { Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const Home = ({destinations}) => {
    const location = useLocation();

    // use location to access the state passed and extract
    const filteredDestinations = location.state?.filteredDestination;
    // console.log(filteredDestinations)
    return (
        <Flex>
            <Navbar />
            <PostDestinations destinations={destinations} filteredDestination={filteredDestinations}/>
            <FilteredDestinations destinations={destinations}/>
        </Flex>
    )
}
export default Home;