import React,{useState,useEffect} from "react";
import { Heading,Box,Text,Flex,Image,Divider, IconButton,Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure,Button} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Post from "../../pages/Post";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
   
    return (
        <>
          <Box bgColor={{base:'',md:'#F5F5F5',lg:'#F5F5F5',xl:'#F5F5F5'}} height={{base:'',md:'',lg:'100vh',xl:''}} width={{base:'100vw',xxm:'100vw',md:'100vw',lg:'24vw',xl:''}} position='fixed' zIndex={{base:'10',md:'',lg:'',xl:''}} >
            
           <Box display={{base:'flex',md:'flex',lg:'block',xl:'block'}} mt={{base:'',md:'',lg:'',xl:'-1rem'}} bgColor={{base:'#E0E0E1',md:'#E0E0E1',lg:'#F5F5F5',xl:'#F5F5F5'}} p={{base:'1rem',md:'',lg:'',xl:''}} justifyContent='space-between'>
            <Flex ml={{base:'rem',xxmd:'1.5rem',md:'1.5rem',lg:'40px',xl:''}}>
                <Image src='https://i.pinimg.com/736x/b7/d0/a6/b7d0a6e3daf09aa075e12ad0215acb89.jpg' height={{base:'40px',md:'',lg:'60px',xl:''}} width={{base:'40px',md:'',lg:'60px',xl:''}} borderRadius={'50%'} mt={{base:'',md:'',lg:'3.5rem',xl:''}}/>
                <Heading mt={{base:'',md:'',lg:'4rem',xl:''}} ml={{base:'0.4rem',xmd:'',md:'',lg:'3px',xl:'0.5rem'}}color='#FF4500'>Safiri Africa</Heading>
            </Flex>

            {/* tablet display */}
            <Box display={{base:'none',xmd:'flex',md:'flex',lg:'none',xl:'none'}} >
            <Link to='/homeDefault'>
                  <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml='10rem' mt='0.5rem'>Home</Text>
            </Link>

            <Link to='/explore'>
                  <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml='5rem' mt='0.5rem' >Explore</Text>
            </Link>

            <Link to='/profile'>
                  <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml='5rem' mr='1.5rem' mt='0.5rem'>Profile</Text>
            </Link>
           
            </Box>

            {/* HamburgerIcon for smaller devices */}
            <IconButton icon={<HamburgerIcon/>} display={{base:'',xmd:'none',md:'none',lg:'none',xl:'none'}} ml={{base:'rem',md:'30rem'}} onClick={onOpen} bgColor='#DCE0E5'/>
            </Box> 

            {/* mobile display  */}
            <Drawer
              isOpen={isOpen}
              placement='right'
              onClose={onClose}
              // finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                {/* <DrawerHeader>Create your account</DrawerHeader> */}

                <DrawerBody>
                  {/* <Divider borderWidth={'1px'} mt={{base:'',md:'',lg:'18rem',xl:''}}/> */}
                  <Link to='/homeDefault'>
                  <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}} mt='3rem' >Home</Text>
                  </Link>

                  <Divider borderWidth={'1px'}/>
                  <Link to='/explore'>
                  <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}mt='2.5rem' >Explore</Text>
                  </Link>

                  <Divider borderWidth={'1px'} />
                  <Link to='/profile'>
                  <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}mt='2.5rem'>Profile</Text>
                  </Link>

                  {/* <Link to='/signIn'>
                  <Divider borderWidth={'1px'} />
                  <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}} mt='2.5rem'>Sign In</Text>
                  </Link> */}

                  <Divider borderWidth={'1px'}/>
                  <Post />

                  
                </DrawerBody>

              </DrawerContent>
            </Drawer>

            <Box display={{base:'none',md:'none',lg:'block',xl:'block'}}>
                <Divider borderWidth={'1px'} mt={{base:'',md:'',lg:'18rem',xl:'',xxl:'25rem'}}/>
                <Link to='/homeDefault'>
                <Text p={{base:'',md:'',lg:'1rem',xl:'',xxl:'2.5rem'}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}>Home</Text>
                </Link>

                <Divider borderWidth={'1px'}/>
                <Link to='/explore'>
                <Text p={{base:'',md:'',lg:'1rem',xl:'',xxl:'2.5rem'}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}>Explore</Text>
                </Link>

                <Divider borderWidth={'1px'} />
                <Link to='/profile'>
                <Text p={{base:'',md:'',lg:'1rem',xl:'',xxl:'2.5rem'}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}>Profile</Text>
                </Link>

                {/* <Link to='/signIn'>
                <Divider borderWidth={'1px'} />
                <Text p={{base:'',md:'',lg:'1rem',xl:''}} _hover={{color:'#FF4500'}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}>Sign In</Text>
                </Link> */}

                <Divider borderWidth={'1px'}/>
                <Post />
            </Box>


          </Box>
        </>
    )
}
export default Navbar;