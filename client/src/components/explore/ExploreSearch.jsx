import React,{useState} from "react";
import { Input,InputGroup,InputLeftElement,Grid,Card,CardBody,Heading,Text,Stack,Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";


const ExploreSearch = ({countries}) => {
    const [search,setSearch] = useState('')
    const [filteredCountries,setFilteredCountries] = useState([]);

    const handleChange = (e) => {
        setSearch(e.target.value)
        const currentCountries = countries.filter(count => {
            return count.name.common.toLowerCase().includes(search.toLowerCase())
        })
        setFilteredCountries(currentCountries)
    }
    

    return(
        <Box ml={{base:'rem',md:'',lg:'10rem',xl:'10rem'}}>
        <InputGroup>
            <InputLeftElement>
            <SearchIcon ml={{base:'4.5rem',xxm:'7.5rem',xm:'8.5rem',sm:'10rem',xmd:'30rem',md:'36rem',lg:'61rem',xl:'64.5rem',xxl:'90rem'}} mt='2rem' color='#FF4500'/>
            </InputLeftElement>
            <Input variant='outline' width='16rem' ml={{base:'2rem',xxm:'3.5rem',xm:'4rem',sm:'5rem',xmd:'15rem',md:'18rem',lg:'30.5rem',xl:'32rem',xxl:'45rem'}} mt={{base:'1rem',md:'',lg:'1rem',xl:'1rem'}} placeholder="Search by country name..." focusBorderColor='#FF4500' borderWidth='2px' onChange={handleChange}/>
        </InputGroup>


        <Grid templateColumns={{base:'',xmd:'repeat(3,1fr)',md:'repeat(4,1fr)',lg:'repeat(4,1fr)',xl:'repeat(4,1fr)'}} gap='4' p='2rem' mt='rem' ml={{base:'-1rem',xxm:'0.5rem',xm:'1.2rem',sm:'2rem',xmd:'-0.1rem',md:'-1rem',lg:'14rem',xl:'11rem',xxl:'14rem'}}>
                {filteredCountries.map(count => (
                  <Link to={`/exploreCountryDetails/${count.name.common}`}>
                    <Card maxW='sm' borderWidth='1px' borderColor='' height={{base:'33vh',xxm:'24vh',xm:'24vh',xm:'24vh',sm:'22vh',xmd:'20vh',md:'22vh',lg:'22vh',xl:'22vh'}} width={{base:'18rem',xm:'18rem',xm:'18rem',sm:'18rem',xmd:'12rem',md:'10rem',lg:'15.7rem',xl:'16rem'}}>
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
    )
}
export default ExploreSearch;