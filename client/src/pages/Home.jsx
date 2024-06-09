import React from "react";
import Navbar from "../components/home/Navbar";
import PostDestinations from "../components/home/PostDestinations";
import FilteredDestinations from "../components/home/FilteredDestinations";
import { Flex } from "@chakra-ui/react";

const Home = () => {
    return (
        <Flex>
            <Navbar />
            <PostDestinations />
            <FilteredDestinations />
        </Flex>
    )
}
export default Home;