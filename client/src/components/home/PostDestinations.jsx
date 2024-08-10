import React, { useState, useEffect } from "react";
import { Box, Card, CardHeader, CardBody, CardFooter, Button, Text, Image, Flex, Avatar, Heading, IconButton, AspectRatio, Input, Alert,AlertIcon } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import ShareModal from "./ShareModal";
import useStore from "../../store/UseStore";

const PostDestinations = ({ destinations, filteredDestination }) => {
    const [likes, setLikes] = useState([]);
    const [activeDestination, setActiveDestination] = useState(null);
    const {loggedInUser} = useStore();
    const [formData, setFormData] = useState({
        user_id: '',
        destination_id: '',
        comment_text: '',
        username: loggedInUser
    });
    const [comments, setComments] = useState([]);
    const {randomColor} = useStore();
    const [alertStatus,setAlertStatus] = useState(false);
    

    // likes
    const handleLikes = (destinationId) => {
        const user_id = '';
        const destination_id = destinationId;
        const number_of_likes = 1;

        fetch('http://127.0.0.1:5555/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user_id': user_id,
                'destination_id': destination_id,
                'number_of_likes': number_of_likes
            })
        })
        .then(res => res.json())
    }

    useEffect(() => {
        fetch('http://127.0.0.1:5555/likes')
        .then(res => res.json())
        .then(data => setLikes(data))
    }, [])

    // comments
    const handleComments = (destinationId) => {
        setActiveDestination(destinationId);
    }

    const handleCommentInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmitComment = (e, destinationId) => {
        e.preventDefault();

        const user_id = '';
        const destination_id = destinationId;
        const comment_text = formData.comment_text;
        const username = formData.username;

        fetch('http://127.0.0.1:5555/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user_id': user_id,
                'destination_id': destination_id,
                'comment_text': comment_text,
                'username': username
            })
        })
        .then(resp => resp.json())
        .then(() => {
            setFormData({
                user_id: '',
                destination_id: '',
                comment_text: ''
            });
            setAlertStatus(!alertStatus)
        })
        .catch(e => console.log(e));
    }

    useEffect(() => {
            fetch('http://127.0.0.1:5555/comments')
            .then(resp => resp.json())
            .then(data => setComments(data.filter(comm => comm.destination_id === activeDestination)))
            .catch(e => console.log(e));
    }, [activeDestination]);

    return (
        <>  
            {(!filteredDestination || filteredDestination.length === 0) ? (    // main destinations displayed
            <Box display='flex' flexDirection='column' gap='4' ml={{base:'',md:'',lg:'22.5rem',xl:''}} mt={{base:'rem',md:'0.5rem',lg:'0.5rem',xl:'0.5rem'}} mb='1rem'>
                {destinations.map((dest) => {
                    const destLikes = likes.filter((like) => like.destination_id === dest.id);

                    return (
                        <Card width={{base:'',md:'',lg:'50vw',xl:'49vw'}} height={{base:'',md:'',lg:'vh',xl:''}} borderWidth='1px' borderColor='' key={dest.id} mt={{base:'10rem',md:'',lg:'',xl:'0.3rem'}}>
                            <CardHeader>
                                <Flex spacing='4'>
                                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                        <Avatar name={dest.username} bgColor={randomColor} />
                                        <Box>
                                            <Heading size='sm'>{dest.username}</Heading>
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
                                <Text>{dest.description}</Text>
                            </CardBody>
                            {dest.type === 'image' ? (
                                <Image
                                    objectFit='cover'
                                    src={dest.url}
                                    alt={dest.title}
                                    width={{base:'',md:'',lg:'',xl:''}}
                                    height={{base:'',md:'',lg:'45vh',xl:''}}
                                />
                            ) : (
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
                                <Button flex='1' variant='ghost' leftIcon={<BiLike color='#FF4500'/>} onClick={() => handleLikes(dest.id)}>
                                    {destLikes.length} Likes
                                </Button>
                                <Button flex='1' variant='ghost' leftIcon={<BiChat color='#FF4500'/>} onClick={() => handleComments(dest.id)}>
                                    Comment
                                </Button>
                                <Button flex='1' variant='ghost' leftIcon={<BiShare color='#FF4500'/>} >
                                    <ShareModal />
                                </Button>
                            </CardFooter>
                            {activeDestination === dest.id && (
                                <>
                                    <form onSubmit={(e) => handleSubmitComment(e, dest.id)}>
                                        {alertStatus && (
                                            <Alert status='success' mb='0.5rem' width='18rem' ml='15rem' borderRadius='10px'>
                                                <AlertIcon />
                                                Comment posted successfully
                                            </Alert>
                                        )}
                                        <Flex mb='1rem'>
                                            <Avatar size='md' ml='1.5rem' name={loggedInUser}/>
                                            <Input placeholder='Add a comment...' borderRadius={'20px'} mt='0.2rem' ml='0.5rem' width='37vw' name='comment_text' value={formData.comment_text} onChange={handleCommentInput} focusBorderColor="#FF934F"/>
                                            <Button ml='0.5rem' bgColor='#FF934F' mt='0.2rem' type='submit' colorScheme="#48C9B0" color=''>Post</Button>
                                        </Flex>
                                    </form>
                                    <Heading size='' ml='1.5rem'>Comments {comments.length}</Heading>
                                    {comments.map(comm => {
                                        return (
                                            <Flex key={comm.id} mt='1rem' mb='1rem'>
                                                <Avatar ml='1.5rem' name={comm.username}/>
                                                <Box bgColor='#EBEBEB' ml='0.5rem' width='41.8vw' borderRadius='10px' p='1rem'>
                                                    <Heading size='' ml='0.5rem' mt='-0.2rem'>{comm.username}</Heading>
                                                    {/* <Text ml='0.5rem' fontFamily={'monospace'} color='#7C858D'>User description</Text> */}
                                                    <Text ml='0.5rem' mt='rem'>{comm.comment_text}</Text>
                                                </Box>
                                            </Flex>
                                        );
                                    })}
                                </>
                            )}
                        </Card>
                    );
                })}
            </Box>
            ) : (    // filteredDestinations
                <Box display='flex' flexDirection='column' gap='4' ml={{base:'',md:'',lg:'22.5rem',xl:''}} mt='0.5rem' mb='1rem'>
                    {filteredDestination && filteredDestination.map((dest) => {
                        ///filter likes that match destination id
                        const destLikes = likes.filter((like) => like.destination_id === dest.id)

                        return (
                            <Card width={{base:'',md:'',lg:'50vw',xl:'49vw'}} height={{base:'',md:'',lg:'vh',xl:''}} borderWidth='1px' borderColor='' key={dest.name} mt={{base:'10rem',md:'',lg:'',xl:'0.5rem'}}>
                                <CardHeader>
                                    <Flex spacing='4'>
                                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                            <Avatar name={dest.username} bgColor={randomColor} />
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
                                    <Text>{dest.description}</Text>
                                </CardBody>
                                {dest.type === 'image' ? (
                                    <Image
                                        objectFit='cover'
                                        src={dest.url}
                                        alt={dest.title}
                                        width={{base:'',md:'',lg:'',xl:''}}
                                        height={{base:'',md:'',lg:'45vh',xl:''}}
                                    />
                                ) : (
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
                                    <Button flex='1' variant='ghost' leftIcon={<BiLike color='#FF4500'/>} onClick={() => handleLikes(dest.id)}>
                                       {destLikes.length} Likes
                                    </Button>
                                    <Button flex='1' variant='ghost' leftIcon={<BiChat color='#FF4500'/>} onClick={() => handleComments(dest.id)}>
                                        Comment
                                    </Button>
                                    <Button flex='1' variant='ghost' leftIcon={<BiShare color='#FF4500'/>}>
                                        <ShareModal />
                                    </Button>
                                </CardFooter>
                                {activeDestination === dest.id && (
                                     <>
                                     <form onSubmit={(e) => handleSubmitComment(e, dest.id)}>
                                         <Flex mb='1rem'>
                                             <Avatar size='md' ml='1.5rem' name={loggedInUser}/>
                                             <Input placeholder='Add a comment...' borderRadius={'20px'} mt='0.2rem' ml='0.5rem' width='37vw' name='comment_text' value={formData.comment_text} onChange={handleCommentInput} focusBorderColor="#FF934F"/>
                                             <Button ml='0.5rem' bgColor='#FF934F' mt='0.2rem' type='submit' colorScheme="#48C9B0" color=''>Post</Button>
                                         </Flex>
                                     </form>

                                     <Heading size='' ml='1.5rem'>Comments {comments.length}</Heading>
                                     {comments.map(comm => {
                                         return (
                                             <Flex key={comm.id} mt='1rem' mb='1rem'>
                                                {alertStatus && (
                                                    <Alert status='success' mb='0.5rem' width='18rem' ml='15rem' borderRadius='10px'>
                                                        <AlertIcon />
                                                        Comment posted successfully
                                                    </Alert>
                                                )}
                                                 <Avatar ml='1.5rem' name={comm.username}/>
                                                 <Box bgColor='#EBEBEB' ml='0.5rem' width='41.8vw' borderRadius='10px' p='1rem'>
                                                     <Heading size='' ml='0.5rem' mt='-0.2rem'>{dest.username}</Heading>
                                                     {/* <Text ml='0.5rem' fontFamily={'monospace'} color='#7C858D'>User description</Text> */}
                                                     <Text ml='0.5rem' mt='rem'>{comm.comment_text}</Text>
                                                 </Box>
                                             </Flex>
                                         );
                                     })}
                                 </>
                                )}
                            </Card>
                        );
                    })}
                </Box>
            )}
        </>
    )
}

export default PostDestinations;
