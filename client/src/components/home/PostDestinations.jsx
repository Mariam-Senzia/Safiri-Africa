import React, { useState, useEffect } from "react";
import { Box, Card, CardHeader, CardBody, CardFooter, Button, Text, Image, Flex, Avatar, Heading, IconButton, AspectRatio, Input } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import ShareModal from "./ShareModal";

const PostDestinations = ({ destinations, filteredDestination }) => {
    const [likes, setLikes] = useState([]);
    const [activeDestination, setActiveDestination] = useState(null);
    const [formData, setFormData] = useState({
        user_id: '',
        destination_id: '',
        comment_text: ''
    });
    const [comments, setComments] = useState([]);

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

        fetch('http://127.0.0.1:5555/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user_id': user_id,
                'destination_id': destination_id,
                'comment_text': comment_text
            })
        })
        .then(resp => resp.json())
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
            {(!filteredDestination || filteredDestination.length === 0) ? ( 
            <Box display='flex' flexDirection='column' gap='4' ml={{base:'',md:'',lg:'22.5rem',xl:''}} mt='0.5rem' mb='1rem'>
                {destinations.map((dest) => {
                    const destLikes = likes.filter(like => like.destination_id === dest.id);

                    return (
                        <Card width={{base:'',md:'',lg:'50vw',xl:''}} height={{base:'',md:'',lg:'vh',xl:''}} borderWidth='1px' borderColor='' key={dest.name}>
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
                                <Button flex='1' variant='ghost' leftIcon={<BiLike />} onClick={() => handleLikes(dest.id)}>
                                    {destLikes.length} Likes
                                </Button>
                                <Button flex='1' variant='ghost' leftIcon={<BiChat />} onClick={() => handleComments(dest.id)}>
                                    Comment
                                </Button>
                                <Button flex='1' variant='ghost' leftIcon={<BiShare />} >
                                    <ShareModal />
                                </Button>
                            </CardFooter>
                            {activeDestination === dest.id && (
                                <>
                                    <form onSubmit={(e) => handleSubmitComment(e, dest.id)}>
                                        <Flex mb='1rem'>
                                            <Avatar size='md' ml='1.5rem'/>
                                            <Input placeholder='Add a comment...' borderRadius={'20px'} mt='0.2rem' ml='0.5rem' width='37vw' name='comment_text' value={formData.comment_text} onChange={handleCommentInput} focusBorderColor="#48C9B0"/>
                                            <Button ml='0.5rem' bgColor='#FF934F' mt='0.2rem' type='submit' colorScheme="#48C9B0" color=''>Post</Button>
                                        </Flex>
                                    </form>
                                    <Heading size='' ml='1.5rem'>Comments {comments.length}</Heading>
                                    {comments.map(comm => {
                                        return (
                                            <Flex key={comm.id} mt='1rem' mb='1rem'>
                                                <Avatar ml='1.5rem' />
                                                <Box bgColor='#EBEBEB' ml='0.5rem' width='41.8vw' borderRadius='10px' p='1rem'>
                                                    <Heading size='' ml='0.5rem' mt='-0.8rem'>User</Heading>
                                                    <Text ml='0.5rem' fontFamily={'monospace'} color='#7C858D'>User description</Text>
                                                    <Text ml='0.5rem' mt='1rem'>{comm.comment_text}</Text>
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
            ) : (
                <Box display='flex' flexDirection='column' gap='4' ml={{base:'',md:'',lg:'22.5rem',xl:''}} mt='0.5rem' mb='1rem'>
                    {filteredDestination && filteredDestination.map((dest) => {
                        ///filter likes that match destination id
                        const destLikes = likes.filter((like) => like.destination_id === dest.id)

                        return (
                            <Card width={{base:'',md:'',lg:'50vw',xl:''}} height={{base:'',md:'',lg:'vh',xl:''}} borderWidth='1px' borderColor='' key={dest.name}>
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
                                    <Button flex='1' variant='ghost' leftIcon={<BiLike />} onClick={() => handleLikes(dest.id)}>
                                       {destLikes.length} Likes
                                    </Button>
                                    <Button flex='1' variant='ghost' leftIcon={<BiChat />} onClick={() => handleComments(dest.id)}>
                                        Comment
                                    </Button>
                                    <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                                        <ShareModal />
                                    </Button>
                                </CardFooter>
                                {activeDestination === dest.id && (
                                     <>
                                     <form onSubmit={(e) => handleSubmitComment(e, dest.id)}>
                                         <Flex mb='1rem'>
                                             <Avatar size='md' ml='1.5rem'/>
                                             <Input placeholder='Add a comment...' borderRadius={'20px'} mt='0.2rem' ml='0.5rem' width='37vw' name='comment_text' value={formData.comment_text} onChange={handleCommentInput} focusBorderColor="#48C9B0"/>
                                             <Button ml='0.5rem' bgColor='#FF934F' mt='0.2rem' type='submit' colorScheme="#48C9B0" color=''>Post</Button>
                                         </Flex>
                                     </form>

                                     <Heading size='' ml='1.5rem'>Comments {comments.length}</Heading>
                                     {comments.map(comm => {
                                         return (
                                             <Flex key={comm.id} mt='1rem' mb='1rem'>
                                                 <Avatar ml='1.5rem' />
                                                 <Box bgColor='#EBEBEB' ml='0.5rem' width='41.8vw' borderRadius='10px' p='1rem'>
                                                     <Heading size='' ml='0.5rem' mt='-0.8rem'>User</Heading>
                                                     <Text ml='0.5rem' fontFamily={'monospace'} color='#7C858D'>User description</Text>
                                                     <Text ml='0.5rem' mt='1rem'>{comm.comment_text}</Text>
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
