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
        <Box >
            <Flex ml={{base:'',xxm:'0.5rem',xm:'0.5rem',sm:'1rem',xmd:'4rem',md:'',lg:'4.5rem',xl:'6rem',xxl:'12rem',xxxl:''}} mt={{base:'1rem',md:'2rem',lg:'-2rem',xl:'-2rem'}}>
                <Image src='https://i.pinimg.com/736x/b7/d0/a6/b7d0a6e3daf09aa075e12ad0215acb89.jpg' height={{base:'40px',md:'',lg:'60px',xl:''}} width={{base:'40px',md:'',lg:'60px',xl:''}} borderRadius={'50%'} mt={{base:'',md:'',lg:'3.5rem',xl:''}}/>
                <Heading mt={{base:'',md:'',lg:'4rem',xl:''}} mr={{base:'1.1rem',xxm:'1.3rem',xm:'2.7rem',sm:'3.7rem',md:'',lg:'px',xl:''}} ml={{base:'',xxm:'',xm:'',sm:'',md:'',lg:'5px',xl:''}} color='#FF4500'>Safiri Africa</Heading>
                <Button mt={{base:'rem',md:'',lg:'4.5rem',xl:'4.5rem'}} width={{base:'',md:'',lg:'10rem',xl:'10rem'}} ml={{base:'rem',xmd:'16rem',md:'19rem',lg:'44rem',xl:'53rem'}} colorScheme="#F58549" bgColor='#F58549' onClick={handleLogin} borderRadius='50px'>Sign In</Button>
            </Flex>

            {/* background image for mobile/tablet devices */}
            <Box backgroundImage={{base:'https://images.unsplash.com/photo-1623951578056-5082d34a9859?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',md:'https://images.unsplash.com/photo-1623951578056-5082d34a9859?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',lg:'none',xl:'none'}} backgroundSize='cover' backgroundPosition='center' height={{base:'90vh',md:'',lg:'',xl:'65vh'}} mt={{base:'rem',md:'',lg:'',xl:''}} width={{base:'109vw',md:'',lg:'',xl:''}}>
            <Flex justifyContent='' mt={{base:'1rem',md:'',lg:'',xl:'4rem',xxl:'8rem'}} >
               <Box width={{base:'18rem',xmd:'32rem',md:'30rem',lg:'',xl:'30rem'}} ml={{base:'1rem',xxm:'3rem',xm:'3.5rem',sm:'4.5rem',xmd:'10rem',md:'11rem',lg:'5rem',xl:'6rem',xxl:'12rem'}} mt={{base:'rem',xxm:'2rem',xm:'1rem',sm:'2rem',xmd:'4rem',md:'6rem',lg:'9rem',xl:'9rem',xxl:'12rem'}}>
                    <Heading size='lg' fontFamily='cursive' color={{base:'',md:'',lg:'',xl:''}}>Explore Africa's Breathtaking Destinations!</Heading>
                    <Text mt={{base:'',md:'1rem',lg:'1rem',xl:'1rem'}} display={{base:'block',md:'block',lg:'block',xl:'block'}} >Sign in to explore breathtaking landscapes, iconic wildlife, and rich cultures.Like, comment, and share your favorite spots with fellow adventurers!</Text>
               </Box> 

              <Box display={{base:'none',md:'none',lg:'flex',xl:'flex'}} mt={{base:'15rem',md:'',lg:'',xl:'0rem'}} ml={{base:'-25rem',md:'1rem',lg:'7.5rem',xl:'10.5rem'}}>
                <Image src='https://images.unsplash.com/photo-1623951578056-5082d34a9859?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' height={{base:'',md:'400px',lg:'',xl:'400px',xxl:'500px'}} width={{base:'170px',md:'200px',lg:'230px',xl:'290px',xxl:''}} ml={{base:'',md:'',lg:'',xl:'-1rem'}} mt={{base:'rem',md:'',lg:'-3.5rem',xl:'8rem'}} objectFit='cover' borderRadius='50px' />

                <Image src='https://images.unsplash.com/photo-1623745493581-2f7b3d0d2140?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' height={{base:'300px',md:'400px',lg:'',xl:'400px',xxl:'500px'}} width={{base:'170px',md:'200px',lg:'230px',xl:'290px',xxl:''}} ml={{base:'1rem',md:'',lg:'4rem',xl:'4rem'}} mt={{base:'rem',md:'-10rem',lg:'-12rem',xl:'0.1rem',xxl:'-2rem'}} objectFit='cover' borderRadius='50px'/>

               </Box>
            </Flex>
            </Box>

            <Box mt={{base:'3.5rem',md:'',lg:'-2rem',xl:'6rem'}} textAlign='center' ml='rem' mb={{base:'-2.5rem',md:'',lg:'',xl:''}} bgColor='#F5F5F5' p='1rem' width={{base:'',xxm:'',xm:'',sm:'',md:'',lg:'',xl:''}}>
                <Flex justifyContent='space-between' mt='2rem'>
                    <Text ml={{base:'1rem',xmd:'4rem',md:'5rem',lg:'8rem',xl:'10rem',xxl:'15rem'}}>Like</Text>
                    <Text>Comment</Text>
                    <Text mr={{base:'1rem',xmd:'4rem',md:'5rem',lg:'9rem',xl:'11.3rem',xxl:'15rem'}}>Share</Text>
                </Flex>
                
                <Flex justifyContent='space-between' mt='1rem' mb='2rem'>

                    <IconButton borderRadius='50px' width={{base:'3rem',xmd:'4rem',md:'5rem',lg:'5rem',xl:'5rem',xxl:'6rem'}} height={{base:'7vh',md:'',lg:'10vh',xl:'11vh',xxl:'10vh'}} ml={{base:'1rem',xmd:'3rem',md:'4rem',lg:'6.5rem',xl:'8.5rem',xxl:'13rem'}} bgColor='#EF233C'>
                        <BiLike color='white' fontSize={{base:'rem',md:'rem',lg:'2rem',xl:'2rem'}}/>
                    </IconButton>

                    <IconButton borderRadius='50px'  width={{base:'3rem',xmd:'4rem',md:'5rem',lg:'5rem',xl:'5rem',xxl:'6rem'}} height={{base:'7vh',md:'',lg:'10vh',xl:'11vh',xxl:'10vh'}} bgColor='#00F0B5'>
                        <BiComment color='white  ' fontSize={{base:'rem',md:'',lg:'2rem',xl:'2rem'}}/>
                    </IconButton>
                    
                    <IconButton mr={{base:'1rem',xmd:'3.5rem',md:'3.8rem',lg:'8rem',xl:'10rem',xxl:'13rem'}} borderRadius='50px'  width={{base:'3rem',xmd:'4rem',md:'5rem',lg:'5rem',xl:'5rem',xxl:'6rem'}} height={{base:'7vh',md:'',lg:'10vh',xl:'11vh',xxl:'10vh'}} bgColor='#52D1DC'>
                        <BiShare color='white' fontSize={{base:'rem',md:'',lg:'2rem',xl:'2rem'}}/>
                    </IconButton>
                
                </Flex>
            </Box>

            {/* footer */}
            <Box bgColor='#484349' mt='6rem'>
                <Flex justifyContent='space-between' p='2rem'>
                    <Box width='30rem' color='white' ml={{base:'rem',xxm:'',xm:'',sm:'rem',md:'',lg:'5rem',xl:'5rem'}}>
                        <Heading size='md' textDecoration='underline' display={{base:'none',md:'none',lg:'block',xl:'block'}}>Safiri Africa</Heading>
                        <Text mt='1rem' display={{base:'none',md:'none',lg:'block',xl:'block'}}>Designed for enthusiasts who have visited or plan to visit Africa. The app highlights various destinations across the continent through videos and images, allowing users to like, comment, and share. </Text>
                        <Text mt={{base:'12rem',md:'',lg:'2rem',xl:'2rem'}} width={{base:'20rem',xxm:'24rem',xm:'24rem',sm:'',md:'',lg:'',xl:''}} ml={{base:'-1.1rem',xxm:'-1.5rem',xm:'-0.6rem',sm:'-0rem',xmd:'11rem',md:'11.5rem',lg:'-0.5rem',xl:'0.1'}}>&copy; Copyright {new Date().getFullYear()} Safiri Africa.All rights reserved</Text>
                    </Box>

                    <Box color='white' ml={{base:'-20.8rem',xxm:'-24rem',xm:'-24rem',sm:'',xmd:'-32rem',md:'-35rem',lg:'1rem',xl:'2rem'}}>
                        <Heading size='md' textDecoration={{base:'underline',md:'',lg:'',xl:''}}>Get In Touch</Heading>
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

                    <Box color='white' mr='5rem' ml={{base:'3.5',xxm:'3.1rem',xm:'3.5rem',sm:'',md:'',lg:'',xl:''}}>
                        <Heading size='md' textDecoration={{base:'underline',md:'',lg:'',xl:''}}>Stay Connected</Heading>
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