import React from "react";
import { Flex,Image,Heading,Button,Box,Text,IconButton} from "@chakra-ui/react";
import { BiLike ,BiComment, BiShare,BiPhone,BiMailSend} from "react-icons/bi";
import { FaInstagram,FaTwitter,FaLinkedin} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/signIn')
    }

    return (
        <>
        <Box>
            <Flex ml={{base:'0.1rem',md:'',lg:'',xl:'8rem'}} mt={{base:'',md:'',lg:'',xl:'-2rem'}}>
                <Image src='https://i.pinimg.com/736x/b7/d0/a6/b7d0a6e3daf09aa075e12ad0215acb89.jpg' height={{base:'40px',md:'',lg:'60px',xl:''}} width={{base:'40px',md:'',lg:'60px',xl:''}} borderRadius={'50%'} mt={{base:'',md:'',lg:'3.5rem',xl:''}}/>
                <Heading mt={{base:'',md:'',lg:'4rem',xl:''}} mr={{base:'0.4rem',md:'',lg:'3px',xl:''}} color='#FF4500'>Safiri Africa</Heading>
                <Button mt='4.5rem' width='10rem' ml='53rem' colorScheme="#F58549" bgColor='#F58549' onClick={handleLogin}>Sign In</Button>
            </Flex>

            <Flex justifyContent='' mt={{base:'',md:'',lg:'',xl:'4rem'}} >
               <Box width='30rem' ml={{base:'',md:'',lg:'',xl:'8rem'}} mt='9rem'>
                    <Heading size='xl' fontFamily='cursive'>Explore Africa's Breathtaking Destinations!</Heading>
                    <Text mt='1rem' >Discover breathtaking landscapes, iconic wildlife, and rich cultures. Like, comment, and share your your favorite spots with fellow adventurers!</Text>
               </Box> 

              <Box display='flex' mt='rem' ml='15rem'>
                <Image src='https://images.unsplash.com/photo-1623951578056-5082d34a9859?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' height={{base:'',md:'',lg:'',xl:'400px'}} width={{base:'',md:'',lg:'',xl:'250px'}} ml={{base:'',md:'',lg:'',xl:'-1rem'}} mt='8rem' objectFit='cover' borderRadius='50px' />

                <Image src=' https://images.unsplash.com/photo-1623745493581-2f7b3d0d2140?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' height={{base:'',md:'',lg:'',xl:'400px'}} width={{base:'',md:'',lg:'',xl:'250px'}} ml={{base:'',md:'',lg:'',xl:'4rem'}} mt='rem' objectFit='cover' borderRadius='50px'/>

               </Box>
            </Flex>

            <Box mt='6rem' textAlign='center' ml='rem' mb='rem' bgColor='#F5F5F5' p='1rem' >
                <Flex justifyContent='space-between' mt='2rem'>
                    <Text ml='15rem'>Like</Text>
                    <Text>Comment</Text>
                    <Text mr='16rem'>Share</Text>
                </Flex>
                
                <Flex justifyContent='space-between' mt='1rem' mb='2rem'>

                    <IconButton borderRadius='50px' width='5rem' height='10vh' ml='13.8rem' bgColor='#EF233C'>
                        <BiLike color='white' fontSize='2rem'/>
                    </IconButton>

                    <IconButton borderRadius='50px'  width='5rem' height='10vh' bgColor='#00F0B5'>
                        <BiComment color='white  ' fontSize='2rem'/>
                    </IconButton>
                    
                    <IconButton mr='15rem' borderRadius='50px'  width='5rem' height='10vh' bgColor='#52D1DC'>
                        <BiShare color='white' fontSize='2rem'/>
                    </IconButton>
                
                </Flex>
            </Box>

            {/* footer */}
            <Box bgColor='#484349' mt='6rem'>
                <Flex justifyContent='space-between' p='2rem'>
                    <Box width='30rem' color='white' ml='5rem'>
                        <Heading size='md' textDecoration='underline'>Safiri Africa</Heading>
                        <Text mt='1rem'>Designed for enthusiasts who have visited or plan to visit Africa. The app highlights various destinations across the continent through videos and images, allowing users to like, comment, and share. </Text>
                        <Text mt='2rem'>&copy; Copyright {new Date().getFullYear()} Safiri Africa.All rights reserved</Text>
                    </Box>

                    <Box color='white'>
                        <Heading size='md'>Get In Touch</Heading>
                        <Flex mt='1rem'>
                            <BiPhone fontSize='1.5rem' color='#FF4500'/>
                            <Text ml='0.5rem'>+254721680965</Text>
                        </Flex>
                        <Flex mt='1rem'>
                            <BiMailSend fontSize='1.5rem' color='#FF4500'/>
                            <Text ml='0.5rem'>safiriafrica@gmail.com</Text>
                        </Flex>
                        <Text mt='1rem'>Nairobi,Kenya</Text>

                    </Box>

                    <Box color='white' mr='5rem'>
                        <Heading size='md'>Stay Connected</Heading>
                        <Flex mt='1rem' >
                            <FaInstagram fontSize='1.5rem' color='#FF4500'/>
                            <Text ml='0.5rem'>Instagram</Text>
                        </Flex>
                        <Flex mt='1rem'>
                            <FaTwitter fontSize='1.5rem' color='#FF4500'/>
                            <Text ml='0.5rem'>Twitter</Text>
                        </Flex>
                        <Flex mt='1rem'>
                            <FaLinkedin fontSize='1.5rem' color='#FF4500'
                            />
                            <Text ml='0.5rem'>Linkedin</Text>
                        </Flex>

                    </Box>
                </Flex>
            </Box>
        </Box>
        </>
    )
}
export default Homepage