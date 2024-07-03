import React,{useEffect,useState} from "react";
import { Heading,Card,CardBody,CardFooter,Image,Stack,Text,Divider,Grid,Box,Flex } from "@chakra-ui/react";
import { color } from "framer-motion";
import ExploreSearch from "../components/explore/ExploreSearch";
import { Link } from "react-router-dom";
import Navbar from "../components/home/Navbar";

const Explore = () => {
    const [countries,setCountries] = useState([])

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => setCountries(data))
        .catch(e => console.log(e))
    },[])

    const africanCountries = countries.filter((count) => count.region === 'Africa')
    // console.log(africanCountries)
    

    return(
        <Flex>
            <Navbar />

            <Box>
            <Heading size='lg' mt='3rem' textAlign='center' color='#FF4500' ml='23rem'>Explore different countries in Africa</Heading>

            <Box>
                <ExploreSearch countries={africanCountries}/>
            </Box>

            <Grid templateColumns='repeat(4,1fr)' gap='4' p='2rem' mt='-3rem' width='70rem' ml='24rem'>
                {africanCountries.map(count => (
                  <Link to={`/exploreCountryDetails/${count.name.common}`}>
                    <Card maxW='sm' borderWidth='1px' borderColor='' height='22vh'>
                    <CardBody textAlign={'center'}>
                      <Stack mt='6' spacing='3'>
                        <Heading size='md'>{count.name.common}</Heading>
                        <Text color='blue.600' fontSize='2xl'>
                          {count.flag}
                        </Text> 
                      </Stack>
                    </CardBody>
                  </Card>
                  </Link>
                ))}

            </Grid>
            </Box>
        </Flex>
    )
}
export default Explore;