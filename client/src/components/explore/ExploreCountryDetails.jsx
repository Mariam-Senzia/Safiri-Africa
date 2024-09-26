import React,{useState,useEffect} from "react";
import { Card,Heading,Stack,Box,CardHeader,Text,CardBody,StackDivider,Link } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const ExploreCountryDetails = () => {
    const {countryName} = useParams();
    const [countries,setCountries] = useState([])

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => setCountries(data))
        .catch(e => console.log(e))
    },[])

    const africanCountries = countries.filter((count) => count.region === 'Africa')
    const clickedCountry = africanCountries.filter((count) => count.name.common === countryName)
    // console.log(clickedCountry)
    
    return(
        <>
        <Box bgImage='https://www.eastafricansafari.net/wp-content/uploads/2023/08/When-Is-the-Best-Time-to-Go-on-an-African-Safari.jpg' bgSize={'cover'} height={{base:'145vh',xxm:'120vh',xm:'115vh',sm:'120vh',xmd:'100vh',md:'',slg:'120vh',lg:'100vh',xl:'100vh'}} display='flex'>
        {clickedCountry.map((count) => {
            return <Card borderWidth='1px' width={{base:'50rem',md:'60rem',slg:'35rem',lg:'50rem',xl:'50rem'}} ml={{base:'rem',md:'',slg:'14rem',lg:'15.5rem',xl:'21rem',dm:'23rem',xxl:'28rem'}} mt={{base:'3rem',xmd:'8rem',md:'10rem',slg:'1rem',lg:'3rem',xl:'3rem',xxl:'9rem'}} height={{base:'130vh',xxm:'105vh',xm:'100vh',sm:'105vh',xmd:'75vh',md:'70vh',slg:'115vh',lg:'91vh',xl:'90vh',xxl:'70vh'}} >
            <CardHeader display='flex'>
              <Text fontSize='2xl'>{count.flag}</Text>
              <Heading size='lg' ml='1rem'>{count.name.common}</Heading>
              <Text ml='1rem' fontSize='2xl'>{count.flag}</Text>
            </CardHeader>
          
            <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Map and Images
                  </Heading>
                  {/* open link in a new tab */}
                  <Link pt='2' fontSize='sm' href={count.maps.googleMaps} rel="noreferrer" target={'_blank'} color='#F58549'>
                    {count.maps.googleMaps}
                  </Link>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Capital City
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {count.capital}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Sub-Region
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {count.subregion}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Currency
                  </Heading>
                  {Object.values(count.currencies).map(c => (
                    <Text pt='2' fontSize='sm'>
                        {c.name}({c.symbol})
                    </Text>
                    ))}
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Languages
                  </Heading>
                  {/* convert to arr then iterate */}
                  {Object.values(count.languages).slice(0,3).map(c => 
                  <Text pt='2' fontSize='sm'>
                    {c}
                  </Text>
        )}
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Timezones
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {count.timezones}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Car side
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {count.car.side}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        })}
            
        </Box>
        </>
    )
}
export default ExploreCountryDetails;