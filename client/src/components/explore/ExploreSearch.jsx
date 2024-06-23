import React,{useState} from "react";
import { Input,InputGroup,InputLeftElement,Grid,Card,CardBody,Heading,Text,Stack } from "@chakra-ui/react";
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
        <>
        <InputGroup>
            <InputLeftElement>
            <SearchIcon ml='80rem' mt='2rem' color='#FF4500'/>
            </InputLeftElement>
            <Input variant='outline' width='16rem' ml='40rem' mt='1rem' placeholder="Search by country name..." focusBorderColor='#FF4500'  onChange={handleChange}/>
        </InputGroup>


        <Grid templateColumns='repeat(5,1fr)' gap='4' p='2rem' mt='rem'>
                {filteredCountries.map(count => (
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
        </>
    )
}
export default ExploreSearch;