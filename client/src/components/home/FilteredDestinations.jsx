import React from "react";
import { Text,Box,Heading,Divider,Menu,Button,
    MenuButton,
    MenuList,
    MenuItem,
   } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Post from "../../pages/Post";

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
        <Box ml={{dm:'6.8vw'}}>
            <Box display={{base:'none',md:'none',slg:'block',lg:'block',xl:'block',dm:'block',xxl:'block'}} bgColor={'#F5F5F5'} height={{base:'',md:'',slg:'100vh',lg:'100vh',xl:''}} width={{base:'',md:'',slg:'26vw',lg:'25vw',xl:''}} position={{base:'',md:'fixed',slg:'fixed',lg:'fixed',xl:'fixed',dm:''}}  ml={{base:'',md:'',slg:'47.4rem',lg:'60rem',xl:'68.5rem',dm:'80rem',xxl:'78rem',xxxl:''}} >

                <Heading mt={{base:'',md:'',slg:'2rem',lg:'3rem',xl:''}} ml={{base:'',md:'',slg:'1rem',lg:'10px',xl:'2rem',dm:''}} color=''>Preffered region</Heading>

                
                <Divider borderWidth={'1px'} mt={{base:'',md:'',slg:'1rem',lg:'3rem',xl:''}}/>
                {/* pass text as parameter on the callback func */}
                <Text p={{base:'',md:'',slg:'1rem',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',slg:'1rem',lg:'1.5rem',xl:''}}
                onClick={() => handlePreferences('Nothern Africa')}>Nothern Africa</Text>
                <Divider borderWidth={'1px'}/>
                <Text p={{base:'',md:'',slg:'1rem',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',slg:'1rem',lg:'1.5rem',xl:''}}
                onClick={() => handlePreferences('Western Africa')}>Western Africa</Text>
                <Divider borderWidth={'1px'} />
                <Text p={{base:'',md:'',slg:'1rem',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',slg:'1rem',lg:'1.5rem',xl:''}}
                onClick={() => handlePreferences('Central Africa')}>Central Africa</Text>
                <Divider borderWidth={'1px'} />
                <Text p={{base:'',md:'',slg:'1rem',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',slg:'1rem',lg:'1.5rem',xl:''}}
                onClick={() => handlePreferences('East Africa')}>East Africa</Text>
                <Divider borderWidth={'1px'}/>
                <Text p={{base:'',md:'',slg:'1rem',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',slg:'1rem',lg:'1.5rem',xl:''}} onClick={() => handlePreferences('Southern Africa')}>Southern Africa</Text>
                <Divider borderWidth={'1px'}/> 

                <Text p={{base:'',md:'',slg:'1rem',lg:'1rem',xl:''}} ml={{base:'',md:'',slg:'1rem',lg:'1.5rem',xl:''}}  color='#F07619' onClick={handleResetFilter}>Show All Destinations</Text>
                <Divider borderWidth='1px'/>
                
          </Box>
        </Box>

        {/* md screens and below */}
        <Box display={{base:'block',xmd:'flex',md:'flex',slg:'none',lg:'none',xl:'none'}}>
          <Menu >
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mt={{base:'6rem',md:'6rem'}} width={{base:'18rem',xxm:'20.5rem',xm:'22rem',sm:'23.8rem',xmd:'20rem',md:'20rem'}} ml={{base:'1rem',xmd:'26.3rem',md:'29.5rem'}} bgColor='#F58549' colorScheme="#F58549" position={''} borderRadius='50px'>
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

          <Box mt='3.5rem' ml={{xmd:'7rem',md:'1rem'}} display={{base:'none',xmd:'',md:'',lg:'none',xl:'none'}}>
            <Post />
          </Box>
          </Box>
        </>
    )
}
export default FilteredDestinations;
