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

        // fetch('http://127.0.0.1:5555/likes', {
        fetch('https://safiri-africa-api.onrender.com/likes', {
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
        .then(newLike => {
            // Update the state directly
            setLikes(prevLikes => [...prevLikes, newLike]);

            // Fetch the updated list of likes to ensure it reflects in the UI
            fetchLikes();
        })
        .catch(err => console.error("Error liking destination:", err));
    }

    // Fetch likes from the server when the component mounts
    const fetchLikes = () => {
        // fetch('http://127.0.0.1:5555/likes')
        fetch('https://safiri-africa-api.onrender.com/likes')
        .then(res => res.json())
        .then(data => {
            setLikes(data);  // Update the likes state with the data
        })
        .catch(err => console.error("Error fetching likes:", err));
    };

    useEffect(() => {
        fetchLikes();  // Initial fetch for likes
    }, []);

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

        // fetch('http://127.0.0.1:5555/comments', {
        fetch('https://safiri-africa-api.onrender.com/comments', {
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
            fetchComments();
        })
        .catch(e => console.log(e));
    }

    const fetchComments = () => {
        // fetch('http://127.0.0.1:5555/comments')
        fetch('https://safiri-africa-api.onrender.com/comments')
            .then(resp => resp.json())
            .then(data => setComments(data.filter(comm => comm.destination_id === activeDestination)))
            .catch(e => console.log(e));
    }

    useEffect(() => {
        fetchComments();    
    }, [activeDestination]);

    return (
        <>  
            {(!filteredDestination || filteredDestination.length === 0) ? (    // main destinations displayed
            <Box display='flex' flexDirection='column' gap={{base:'4',md:'',lg:'4',xl:'4'}} ml={{base:'',md:'',slg:'15rem',lg:'19.6rem',xl:'22.7rem',dm:'24rem',xxl:'25.9rem'}} mt={{base:'1.5rem',md:'1.5rem',slg:'0.5rem',lg:'0.5rem',xl:'0.5rem'}} mb='1rem'>
                {destinations.map((dest) => {
                    const destLikes = likes.filter((like) => like.destination_id === dest.id);

                    return (
                        <Card width={{base:'',md:'',slg:'50vw',lg:'50vw',xl:'49vw'}} height={{base:'',md:'',lg:'vh',xl:''}} borderWidth={{base:'2px',md:'2px',lg:'1px',xl:'1px'}} borderColor='' key={dest.id} mt={{base:'rem',md:'',lg:'',xl:'0.3rem'}}>
                            <CardHeader>
                                <Flex spacing='4'>
                                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap' ml={{base:'-0.5rem',md:'',lg:'',xl:''}}>
                                        <Avatar name={dest.username} bgColor={randomColor} />
                                        <Box>
                                            <Heading size='sm'>{dest.username}</Heading>
                                            <Text width={{base:'65vw',xxm:'70vw',xm:'70vw',sm:'70vw',md:'80vw',slg:'40vw',lg:'40vw',xl:'40vw'}}>{dest.location}</Text>
                                        </Box>
                                    </Flex>
                                    {/* <IconButton
                                        variant='ghost'
                                        colorScheme='gray'
                                        aria-label='See menu'
                                        icon={<BsThreeDotsVertical />}
                                    /> */}
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
                                    height={{base:'',md:'',slg:'45vh',lg:'45vh',xl:''}}
                                />
                            ) : (
                                <AspectRatio maxW={{base:'',md:'',lg:'800px',xl:'800px'}} height='47vh' ratio={1}>
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
                                        minW: {base:'90px',md:'',lg:'136px',xl:'136px'},
                                    },
                                }}
                            >
                                <Button flex='1' variant='ghost' leftIcon={<BiLike color='#FF4500'/>} onClick={() => handleLikes(dest.id)} ml={{base:'-0.6rem',xxm:'-0.5rem',xm:'-0.2rem',sm:'-0.5rem',md:'',lg:'',xl:''}}>
                                    {destLikes.length} Likes
                                </Button>
                                <Button flex='1' variant='ghost' leftIcon={<BiChat color='#FF4500'/>} onClick={() => handleComments(dest.id)} ml={{base:'0.5rem',xxm:'1rem',xm:'2rem',sm:'2rem',md:'',lg:'',xl:''}}>
                                    Comment
                                </Button>
                                <Button flex='1' variant='ghost' leftIcon={<BiShare color='#FF4500'/>} ml={{base:'0.5rem',xxm:'1rem',xm:'2rem',sm:'2rem',md:'',lg:'',xl:''}}>
                                    <ShareModal />
                                </Button>
                            </CardFooter>
                            {activeDestination === dest.id && (
                                <>
                                    <form onSubmit={(e) => handleSubmitComment(e, dest.id)}>
                                        {alertStatus && (
                                            <Alert status='success' mb={{base:'1rem',md:'1rem',lg:'0.5rem',xl:'0.5rem'}} width={{base:'17.5rem',md:'',lg:'18rem',xl:'18rem'}} ml={{base:'3rem',md:'16rem',lg:'15rem',xl:'15rem'}} borderRadius={{base:'10px',md:'',lg:'10px',xl:'10px'}}>
                                                <AlertIcon />
                                                Comment posted successfully
                                            </Alert>
                                        )}
                                        <Flex mb='1rem'>
                                            <Avatar size='md' ml={{base:'0.1rem',xxm:'0.3rem',xm:'0.5rem',sm:'0.5rem',xmd:'3.5rem',md:'3.5rem',slg:'1rem',lg:'1.5rem',xl:'1.5rem'}} name={loggedInUser}/>
                                            <Input placeholder='Add a comment...' borderRadius={'20px'} mt='0.2rem' ml='0.5rem' width={{base:'56.5vw',xxm:'60vw',xm:'61vw',sm:'63vw',md:'68vw',slg:'34vw',lg:'36vw',xl:'37vw'}} name='comment_text' value={formData.comment_text} onChange={handleCommentInput} focusBorderColor="#FF934F"/>
                                            <Button ml='0.5rem' bgColor='#FF934F' mt='0.2rem' type='submit' colorScheme="#48C9B0" color=''>Post</Button>
                                        </Flex>
                                    </form>
                                    <Heading size='' ml={{base:'0.1rem',xxm:'0.5rem',xm:'0.5rem',sm:'0.5rem',xmd:'3.5rem',md:'3.5rem',slg:'1rem',lg:'1.5rem',xl:'1.5rem'}}>Comments {comments.length}</Heading>
                                    {comments.map(comm => {
                                        return (
                                            <Flex key={comm.id} mt='1rem' mb='1rem'>
                                                <Avatar ml={{base:'0.1rem',xxm:'0.3rem',xm:'0.5rem',sm:'0.5rem',xmd:'3.5rem',md:'3.5rem',slg:'1rem',lg:'1.5rem',xl:'1.5rem'}} name={comm.username}/>
                                                <Box bgColor='#EBEBEB' ml='0.5rem' width={{base:'16rem',xxm:'18rem',xm:'19.5rem',sm:'21rem',xmd:'35rem',md:'40rem',slg:'41.1vw',lg:'33.5rem',xl:'38.9rem',dm:'40.2rem',xxl:'43.5rem'}} borderRadius='10px' p='1rem'>
                                                    <Heading size='' ml={{base:'-0.5rem',md:'',lg:'0.5rem',xl:'0.5rem'}} mt={{base:'-0.6rem',md:'',lg:'-0.2rem',xl:'-0.2rem'}}>{comm.username}</Heading>
                                                    {/* <Text ml='0.5rem' fontFamily={'monospace'} color='#7C858D'>User description</Text> */}
                                                    <Text ml={{base:'-0.5rem',md:'',lg:'0.5rem',xl:'0.5rem'}} mt='rem'>{comm.comment_text}</Text>
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
                <Box display='flex' flexDirection='column' gap='4' ml={{base:'',md:'',slg:'15rem',lg:'19.6rem',xl:'22.7rem',dm:'24rem',xxl:'25.9rem'}} mt={{base:'1.5rem',md:'0.5rem',lg:'0.5rem',xl:'0.5rem'}} mb='1rem'>
                    {filteredDestination && filteredDestination.map((dest) => {
                        ///filter likes that match destination id
                        const destLikes = likes.filter((like) => like.destination_id === dest.id)

                        return (
                            <Card width={{base:'',md:'',slg:'32rem',lg:'50vw',xl:'49vw'}} height={{base:'',md:'',lg:'vh',xl:''}} borderWidth={{base:'2px',md:'2px',lg:'1px',xl:'1px'}} borderColor='' key={dest.name} mt={{base:'rem',md:'1rem',lg:'',xl:'0.3rem'}}>
                                <CardHeader>
                                    <Flex spacing='4'>
                                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap' ml={{base:'-0.5rem',md:'',lg:'',xl:''}}>
                                            <Avatar name={dest.username} bgColor={randomColor} />
                                            <Box>
                                                <Heading size='sm'>{dest.username}</Heading>
                                                <Text width={{base:'65vw',xxm:'70vw',xm:'70vw',sm:'70vw',md:'80vw',slg:'40vw',lg:'40vw',xl:'40vw'}}>{dest.location}</Text>
                                            </Box>
                                        </Flex>
                                        {/* <IconButton
                                            variant='ghost'
                                            colorScheme='gray'
                                            aria-label='See menu'
                                            icon={<BsThreeDotsVertical />}
                                        /> */}
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
                                        height={{base:'',md:'',slg:'45vh',lg:'45vh',xl:''}}
                                    />
                                ) : (
                                    <AspectRatio maxW={{base:'',md:'',lg:'800px',xl:'800px'}} height='47vh' ratio={1}>
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
                                            minW: {base:'90px',md:'',lg:'136px',xl:'136px'},
                                        },
                                    }}
                                >
                                    <Button flex='1' variant='ghost' leftIcon={<BiLike color='#FF4500'/>} onClick={() => handleLikes(dest.id)} ml={{base:'-0.6rem',xxm:'-0.5rem',xm:'-0.2rem',sm:'-0.5rem',md:'',lg:'',xl:''}}>
                                       {destLikes.length} Likes
                                    </Button>
                                    <Button flex='1' variant='ghost' leftIcon={<BiChat color='#FF4500'/>} onClick={() => handleComments(dest.id)} ml={{base:'0.5rem',xxm:'1rem',xm:'2rem',sm:'2rem',md:'',lg:'',xl:''}}>
                                        Comment
                                    </Button>
                                    <Button flex='1' variant='ghost' leftIcon={<BiShare color='#FF4500'/>} ml={{base:'0.5rem',xxm:'1rem',xm:'2rem',sm:'2rem',md:'',lg:'',xl:''}}>
                                        <ShareModal />
                                    </Button>
                                </CardFooter>
                                {activeDestination === dest.id && (
                                     <>
                                     <form onSubmit={(e) => handleSubmitComment(e, dest.id)}>
                                        {alertStatus && (
                                                <Alert status='success' mb={{base:'1rem',md:'1rem',lg:'0.5rem',xl:'0.5rem'}} width={{base:'17.5rem',md:'',lg:'18rem',xl:'18rem'}} ml={{base:'3rem',md:'16rem',lg:'15rem',xl:'15rem'}} borderRadius='10px'>
                                                    <AlertIcon />
                                                    Comment posted successfully
                                                </Alert>
                                        )}

                                         <Flex mb='1rem'>
                                             <Avatar size='md' ml={{base:'0.1rem',xxm:'0.3rem',xm:'0.5rem',sm:'0.5rem',xmd:'3.5rem',md:'3.5rem',slg:'1rem',lg:'1.5rem',xl:'1.5rem'}} name={loggedInUser}/>
                                             <Input placeholder='Add a comment...' borderRadius={'20px'} mt='0.2rem' ml='0.5rem' width={{base:'56.5vw',xxm:'60vw',xm:'61vw',sm:'63vw',md:'68vw',slg:'33.5vw',lg:'36vw',xl:'37vw'}}  name='comment_text' value={formData.comment_text} onChange={handleCommentInput} focusBorderColor="#FF934F"/>
                                             <Button ml='0.5rem' bgColor='#FF934F' mt='0.2rem' type='submit' colorScheme="#48C9B0" color=''>Post</Button>
                                         </Flex>
                                     </form>

                                     <Heading size='' ml={{base:'0.1rem',xxm:'0.5rem',xm:'0.5rem',sm:'0.5rem',xmd:'3.5rem',md:'3.5rem',slg:'1rem',lg:'1.5rem',xl:'1.5rem'}}>Comments {comments.length}</Heading>

                                     {comments.map(comm => {
                                         return (
                                             <Flex key={comm.id} mt='1rem' mb='1rem'>
                                                 <Avatar ml={{base:'0.1rem',xxm:'0.3rem',xm:'0.5rem',sm:'0.5rem',xmd:'3.5rem',md:'3.5rem',slg:'1rem',lg:'1.5rem',xl:'1.5rem'}} name={comm.username}/>
                                                 <Box bgColor='#EBEBEB' ml='0.5rem' width={{base:'16rem',xxm:'18rem',xm:'19.5rem',sm:'21rem',xmd:'35rem',md:'40rem',slg:'26rem',lg:'33.5rem',xl:'38.9rem',dm:'40.2rem',xxl:'43.5rem'}} borderRadius='10px' p='1rem'>
                                                     <Heading size='' ml={{base:'-0.5rem',md:'',lg:'0.5rem',xl:'0.5rem'}} mt={{base:'-0.6rem',md:'',lg:'-0.2rem',xl:'-0.2rem'}}>{dest.username}</Heading>
                                                     {/* <Text ml='0.5rem' fontFamily={'monospace'} color='#7C858D'>User description</Text> */}
                                                     <Text ml={{base:'-0.5rem',md:'',lg:'0.5rem',xl:'0.5rem'}} mt='rem'>{comm.comment_text}</Text>
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
