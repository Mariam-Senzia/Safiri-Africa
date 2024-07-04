import React from "react";
import { Heading ,Flex,Box, Avatar,Text,Button,Card,CardHeader,CardBody,CardFooter,Image,IconButton, AspectRatio} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike,BiChat,BiShare } from "react-icons/bi";
import Navbar from "../components/home/Navbar";
import EditProfileModal from "../components/profile/EditProfileModal";

const Profile = () => {
    return(
        <Flex >
        <Navbar />

        <Box borderWidth='px' width='60rem' ml='30rem' mt='0.1rem' height=''>
           
            <Flex ml='3rem' mt='1rem'>
                <Avatar bg='' size='xl' src='https://cdn.thecoolist.com/wp-content/uploads/2021/03/Zebras-group-in-the-African-savanna-Serengeti-National-Park.jpg' />
                <Box>
                <Heading ml='1rem' size='lg' mt='0.3rem' color=''>Senzia Mariee</Heading>
                <Text ml='1rem' width='47rem'>I am a travel enthusiast who loves exploring new places, cultures, and foods. I enjoy immersing myself in local life and discovering hidden gems.</Text>
                </Box>
            </Flex>

            <Flex ml='3rem' mt='2rem' gap='2.6rem'>
                <Button width='16rem' bgColor='#48C9B0' colorScheme="#48C9B0">Posts</Button>
                <Button width='16rem' bgColor='#48C9B0' colorScheme="#48C9B0">Comments</Button>
                <Button width='16rem' bgColor='#48C9B0' colorScheme="#48C9B0"> <EditProfileModal /> </Button>
            </Flex>

            <Box mb='2rem'>
            <Card maxW='' mt='2rem' borderWidth='1px' borderColor='' ml='3rem' width='55.4vw'>
            <CardHeader>
                <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                    <Box>
                    <Heading size='sm'>Segun Adebayo</Heading>
                    <Text>Creator, Chakra UI</Text>
                    </Box>
                </Flex>
                <IconButton
                    variant='ghost'
                    colorScheme='gray'
                    aria-label='See menu'
                    icon={<BsThreeDotsVertical />}
                />
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>
                With Chakra UI, I wanted to sync the speed of development with the speed
                of design. I wanted the developer to be just as excited as the designer to
                create a screen.
                </Text>
            </CardBody>
            <Image
                objectFit='cover'
                src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Chakra UI'
                height='45vh'
            />

            <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                '& > button': {
                    minW: '136px',
                },
                }}
            >
                <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                Like
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                Comment
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                Share
                </Button>
            </CardFooter>
            </Card>
            </Box>
        </Box>
        </Flex>
    )
}
export default Profile;