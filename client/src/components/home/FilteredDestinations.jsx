import React from "react";
import { Text,Box,Heading,Divider,Menu,Button,
    MenuButton,
    MenuList,
    MenuItem,
   } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";

const FilteredDestinations = ({destinations}) => {
    const navigate = useNavigate()

    const handlePreferences = (region) => {
        const filteredDestination = destinations.filter((dest) => dest.region === region);

        // pass filteredDestion as state to SearchDestination component
        navigate("/homeDefault", { state: { filteredDestination } });
    }

    // reset filter to display all destinations
    const handleResetFilter = () => {
        navigate("/homeDefault", { state : {filteredDestination: null} })
    }
    
    return (
        <>
            
            <Box display={{base:'none',md:'block',lg:'block',xl:'block'}} bgColor={'#F5F5F5'} height={{base:'',md:'',lg:'100vh',xl:''}} width={{base:'',md:'',lg:'26.9vw',xl:''}} position={{base:'',md:'fixed',lg:'fixed',xl:'fixed'}} ml={{base:'',md:'',lg:'70rem',xl:''}}>

                <Heading mt={{base:'',md:'',lg:'3rem',xl:''}} ml={{base:'',md:'',lg:'40px',xl:''}} color=''>Preffered region</Heading>

                
                <Divider borderWidth={'1px'} mt={{base:'',md:'',lg:'3rem',xl:''}}/>
                {/* pass text as parameter on the callback func */}
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}
                onClick={() => handlePreferences('Nothern Africa')}>Nothern Africa</Text>
                <Divider borderWidth={'1px'}/>
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}
                onClick={() => handlePreferences('Western Africa')}>Western Africa</Text>
                <Divider borderWidth={'1px'} />
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}
                onClick={() => handlePreferences('Central Africa')}>Central Africa</Text>
                <Divider borderWidth={'1px'} />
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}
                onClick={() => handlePreferences('East Africa')}>East Africa</Text>
                <Divider borderWidth={'1px'}/>
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}} onClick={() => handlePreferences('Southern Africa')}>Southern Africa</Text>
                <Divider borderWidth={'1px'}/> 

                <Text p={{base:'',md:'',lg:'1rem',xl:''}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}  color='#F07619' onClick={handleResetFilter}>Show All Destinations</Text>
                <Divider borderWidth='1px'/>
                
          </Box>

        <Box display={{base:'block',md:'none',lg:'none',xl:'none'}}  mt=''>
          <Menu >
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mt='4rem' width='22rem' ml='1rem' bgColor='#F58549' colorScheme="#F58549" position={''}>
                Preferred Destinations
            </MenuButton>
            <MenuList>
                <MenuItem> 
                    <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}
                    onClick={() => handlePreferences('Nothern Africa')}>Nothern Africa</Text>
                </MenuItem>

                <MenuItem>
                    <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}
                    onClick={() => handlePreferences('Western Africa')}>Western Africa</Text>
                </MenuItem>
                    
                <MenuItem>
                    <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}
                    onClick={() => handlePreferences('Central Africa')}>Central Africa</Text>
                </MenuItem>

                <MenuItem>
                    <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}
                    onClick={() => handlePreferences('East Africa')}>East Africa</Text>
                </MenuItem>

                <MenuItem>
                    <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}} onClick={() => handlePreferences('Southern Africa')}>Southern Africa</Text>
                </MenuItem>

                <MenuItem>
                    <Text p={{base:'',md:'',lg:'1rem',xl:''}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}  color='#F07619' onClick={handleResetFilter}>Show All Destinations</Text>
                </MenuItem>
            </MenuList>
          </Menu>
          </Box>
        </>
    )
}
export default FilteredDestinations;
