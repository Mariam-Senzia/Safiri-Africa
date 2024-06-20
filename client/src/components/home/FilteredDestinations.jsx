import React,{useState} from "react";
import { Text,Box,Heading,Divider,Card,CardHeader,Flex,Avatar,IconButton,CardBody,CardFooter, AspectRatio,Button, Image } from "@chakra-ui/react";
import SearchDestination from "./SearchDestination";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const FilteredDestinations = ({destinations}) => {
    // update destination state and filter
    const [currentRegion, setCurrentRegion] = useState('')
    // const navigate = useNavigate()

    const handlePreferences = (region) => {
        setCurrentRegion(region) 
    }
    
    // filter destinations that much current region
    const filteredRegion = destinations.filter((reg) => {
        return reg.region === currentRegion
    })

    

    return (
        <>
            
            <Box bgColor={'#F5F5F5'} height={{base:'',md:'',lg:'100vh',xl:''}} width={{base:'',md:'',lg:'26.9vw',xl:''}} position={'fixed'} ml={{base:'',md:'',lg:'70rem',xl:''}}>
                <Heading mt={{base:'',md:'',lg:'3rem',xl:''}} ml={{base:'',md:'',lg:'40px',xl:''}} color=''>Preffered region</Heading>

                <Divider borderWidth={'1px'} mt={{base:'',md:'',lg:'3rem',xl:''}}/>
                {/* pass text as parameter on the callback func */}
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}
                onClick={() => handlePreferences('Nothern Africa')}>Nothern Africa</Text>
                <Divider borderWidth={'1px'}/>
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}onClick={() => handlePreferences('Western Africa')}>Western Africa</Text>
                <Divider borderWidth={'1px'} />
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}onClick={() => handlePreferences('Central Africa')}>Central Africa</Text>
                <Divider borderWidth={'1px'} />
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}
                onClick={() => handlePreferences('East Africa')}>East Africa</Text>
                <Divider borderWidth={'1px'}/>
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}onClick={() => handlePreferences('Southern Africa')}>Southern Africa</Text>
                <Divider borderWidth={'1px'}/>
          </Box>

          {/* <SearchDestination filteredRegion={filteredRegion}/> */}
        </>
    )
}
export default FilteredDestinations;
