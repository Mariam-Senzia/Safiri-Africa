import React,{useEffect,useState} from "react";
import { Heading,Card,CardBody,Stack,Text,Grid,Box,Flex } from "@chakra-ui/react";
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
            <Navbar display={{base:'none',md:'none',lg:'flex',xl:'flex'}}/>

            <Box ml={{lg:'rem',dm:'6.5rem'}}>
            <Heading size={{base:'lg',md:'lg',lg:'lg',xl:'lg',lg:''}} mt={{base:'6rem',md:'',slg:'3rem',lg:'3rem',xl:'3rem'}} color={{base:'#303236',md:'',lg:'#FF4500',xl:'#FF4500'}} textAlign='center' ml={{base:'rem',xxm:'1.5rem',xm:'2rem',sm:'3rem',xmd:'-1rem',md:'0.5rem',slg:'14rem',lg:'25rem',xl:'rem',dm:'rem',xxl:'29rem'}} width={{base:'20rem',xmd:'50rem',md:'50rem',lg:'rem',xl:'100rem',dm:'70rem'}}>Explore different countries in Africa</Heading>

            <Box>
                <ExploreSearch countries={africanCountries}/>
            </Box>

            <Grid templateColumns={{base:'repeat(2,1fr)',xmd:'repeat(3,1fr)',md:'repeat(4,1fr)',slg:'repeat(3,1fr)',lg:'repeat(4,1fr)',xl:'repeat(4,1fr'}} gap={{base:'2',xxm:'3',xm:'3',sm:'3',xmd:'3',md:'3',slg:'2',lg:'0',xl:''}} p='2rem' mt='-3rem'  ml={{base:'rem',md:'',slg:'15rem',lg:'22rem',xl:'2rem',dm:''}}>
                {africanCountries.map(count => (
                  <Link to={`/exploreCountryDetails/${count.name.common}`}>
                    <Card borderWidth='1px' borderColor='' height={{base:'26.5vh',xxm:'19.5vh',xm:'19.5vh',sm:'16vh',md:'16vh',slg:'23vh',lg:'23vh',xl:'22vh'}} width={{base:'9.5rem',xxm:'9rem',xm:'10rem',sm:'11rem',xmd:'',md:'9rem',slg:'13rem',lg:'12.5rem',xl:'16rem',dm:'16rem',xxl:'16rem'}} ml={{base:'0.1rem',xxm:'1.1rem',xm:'1.1rem',sm:'1.1rem',xmd:'2rem',md:'',slg:'1rem',lg:'rem',xl:'1.1rem',dm:'',xxl:'4.2rem'}} mb='1rem' key={count.name}> 
                    <CardBody textAlign={'center'}>
                      <Stack mt={{base:'',md:'',lg:'6',xl:'6'}} spacing='3'>
                        <Heading size={{base:'sm',md:'',lg:'md',xl:'md'}}>{count.name.common}</Heading>
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