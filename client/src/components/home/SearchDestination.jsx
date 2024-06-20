import React from "react";
import { Text,Box,Heading,Divider,Card,CardHeader,Flex,Avatar,IconButton,CardBody,CardFooter, AspectRatio,Button, Image } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike,BiChat,BiShare } from "react-icons/bi";

function SearchDestination({filteredRegion}) {
    console.log(filteredRegion)
    return (
        <>
        <Box display='' flexDirection='column' gap='4' ml={{base:'',md:'',lg:'',xl:''}} mt='0.1rem'>
            {filteredRegion.map((dest) => {
                return <Card  width={{base:'',md:'',lg:'50vw',xl:''}} height={{base:'',md:'',lg:'80vh',xl:''}} borderWidth='1px' borderColor='' key={dest.name}>
                <CardHeader>
                    <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
    
                        <Box>
                        <Heading size='sm'>Segun Adebayo</Heading>
                        <Text>{dest.location}</Text>
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
                    {dest.description}
                    </Text>
                </CardBody>

                {/* accommodate image and video ternary operator */}
                {dest.type === 'image' ? (
                     <Image
                     objectFit='cover'
                     src={dest.url}
                     alt={dest.title}
                     width={{base:'',md:'',lg:'',xl:''}}
                     height={{base:'',md:'',lg:'45vh',xl:''}}
                 />) : (
                    <AspectRatio maxW='800px' height='47vh' ratio={1}>
                        <video
                            title={dest.title}
                            src={dest.url}
                            controls
                            allowFullScreen
                        />
                    </AspectRatio>
                 )}
    
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
             })} 
            </Box>
        </>
    )
}

export default SearchDestination;