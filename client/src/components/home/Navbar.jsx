import React from "react";
import { Heading,Box,Text,Flex,Button,Image,Divider} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Post from "../../pages/Post";

const Navbar = () => {
    return (
        <>
          <Box bgColor={'#F5F5F5'} height={{base:'',md:'',lg:'100vh',xl:''}} width={{base:'',md:'',lg:'23vw',xl:''}} position='fixed' >
            <Flex ml={{base:'',md:'',lg:'40px',xl:''}} >
                <Image src='https://i.pinimg.com/736x/b7/d0/a6/b7d0a6e3daf09aa075e12ad0215acb89.jpg' height={{base:'',md:'',lg:'60px',xl:''}} width={{base:'',md:'',lg:'60px',xl:''}} borderRadius={'50%'} mt={{base:'',md:'',lg:'3.5rem',xl:''}}/>
                <Heading mt={{base:'',md:'',lg:'4rem',xl:''}} ml={{base:'',md:'',lg:'3px',xl:''}} color='#FF4500'>Safiri Africa</Heading>
            </Flex>

            <Box>
                <Divider borderWidth={'1px'} mt={{base:'',md:'',lg:'18rem',xl:''}}/>
                <Link to='/'>
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}>Home</Text>
                </Link>

                <Divider borderWidth={'1px'}/>
                <Link to='explore'>
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}>Explore</Text>
                </Link>

                <Divider borderWidth={'1px'} />
                <Link to='/profile'>
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}>Profile</Text>
                </Link>

                <Link to='/signIn'>
                <Divider borderWidth={'1px'} />
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}>SignIn</Text>
                </Link>

                <Divider borderWidth={'1px'}/>
                <Post />
                {/* <Button mt={{base:'',md:'',lg:'2.5rem',xl:''}} ml={{base:'',md:'',lg:'1.5rem',xl:''}} bgColor={'#F58549'} width='19vw' colorScheme="#F58549"> <Post /> </Button> */}
            </Box>

          </Box>
        </>
    )
}
export default Navbar;