import React,{useState,useEffect} from "react";
import { Heading ,Flex,Box, Avatar,Text,Button,Card,CardHeader,CardBody,CardFooter,Image,IconButton,Tooltip,AspectRatio,Input} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike,BiChat,BiShare,BiLogIn } from "react-icons/bi";
import Navbar from "../components/home/Navbar";
import { useNavigate } from "react-router-dom";
import useStore from "../store/UseStore";
import ShareModal from "../components/home/ShareModal";

const Profile = () => {
    const navigate = useNavigate();
    const {loggedInUser} = useStore();
    const {randomColor,setRandomColor} = useStore();
    const [allDestinations,setAllDestinations] = useState([]);
    const [likes, setLikes] = useState([]);
    const [activeDestination, setActiveDestination] = useState(null);
    const [comments, setComments] = useState([]);
    const [alertStatus,setAlertStatus] = useState(false);
    const [formData, setFormData] = useState({
        user_id: '',
        destination_id: '',
        comment_text: '',
        username: loggedInUser
    });
   
    const handleUpdateProfile = () => {
        navigate('/updateProfile')
    }

    // generate random color
    const randomHexColor = () => {
        let letters = '0123456789ABCDEF'
        let color = '#'
        for(let i = 0 ; i < letters.length ; i++){
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color;
    }

    useEffect(() => {
        setRandomColor(randomHexColor());
    },[])

    useEffect(() => {
        fetch('http://127.0.0.1:5555/destinations')
        .then(resp => resp.json())
        .then(data => setAllDestinations(data))
    },[]) 
    
    const filteredDestinations = allDestinations.filter((dest) => dest.username === loggedInUser)
    // console.log(filteredDestinations)

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

    return(
        <Flex >
        <Navbar />

        <Box borderWidth='px' width='60rem' ml={{base:'',sm:'',md:'25rem',lg:'28rem'}} mt='rem' height=''>
           
            <Flex ml='1.5rem' mt='rem' bgColor='' p='1rem' borderRadius='10px'>
                <Avatar ml='rem'  bgColor={randomColor} name={loggedInUser} size='2xl' src='' />
                <Box>
                <Heading ml='1.5rem' size='lg' mt='2.5rem' color=''>{loggedInUser}</Heading>
                </Box>
            </Flex>
            {/* tooltip: show text on hover */}
            {/* <Tooltip label='Edit profile' bgColor='#EBEBEB' color=''>
                <IconButton color={'#FF4500'} borderRadius={'50px'} ml='58.1rem' mt='-2.4rem' onClick={handleUpdateProfile}>
                    <EditIcon />
                </IconButton>
            </Tooltip> */}

            <Flex gap='3rem' mt='0.5rem' mb='3rem'>
                {/* <Heading size='md' ml='3rem' color='#FF4500' textDecorationLine='' mt='1rem'>My Posts</Heading> */}
                <Button bgColor='#F58549' colorScheme='#F58549' width='18vw' ml='3rem' >My Posts</Button>
                <Button bgColor='#F58549' colorScheme='#F58549' width='18vw' onClick={handleUpdateProfile}>Edit Profile</Button>
                <Button width='18vw' bgColor='#F58549' colorScheme='#F58549'>
                    <BiLogIn size='1.5rem' />
                    <Text ml='0.5rem'>Sign Out</Text>
                </Button>
            </Flex>

            <Box mb='2rem' mt='-1.3rem'>
            {filteredDestinations.map((dest) => {
                const destLikes = likes.filter((like) => like.destination_id === dest.id); //likes that match the destination id

                return <Card key={dest.id} maxW='' mt='2rem' borderWidth='1px' borderColor='' ml='3rem' width='vw'>
                    <CardHeader>
                        <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={loggedInUser} bgColor={randomColor} />

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
                                <AspectRatio maxW='' height='47vh' ratio={1}>
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
                    {activeDestination === dest.id && (         //comments
                                <>
                                    <form onSubmit={(e) => handleSubmitComment(e, dest.id)}>
                                        {alertStatus && (
                                            <Alert status='success' mb='0.5rem' width='18rem' ml='15rem' borderRadius='10px'>
                                                <AlertIcon />
                                                Comment posted successfully
                                            </Alert>
                                        )}
                                        <Flex mb='1rem' >
                                            <Avatar size='md' ml='1.5rem' name={loggedInUser}/>
                                            <Input placeholder='Add a comment...' borderRadius={'20px'} mt='0.2rem' ml='0.5rem' width={{base:'',md:'',lg:'37vw',xl:'47vw'}} name='comment_text' value={formData.comment_text} onChange={handleCommentInput} focusBorderColor="#FF934F"/>
                                            <Button ml='0.5rem' bgColor='#FF934F' mt='0.2rem' type='submit' colorScheme="#48C9B0" color=''>Post</Button>
                                        </Flex>
                                    </form>
                                    <Heading size='' ml='1.5rem'>Comments {comments.length}</Heading>
                                    {comments.map(comm => {
                                        return (
                                            <Flex key={comm.id} mt='1rem' mb='1rem'>
                                                <Avatar ml='1.5rem' name={comm.username}/>
                                                <Box bgColor='#EBEBEB' ml='0.5rem' width={{base:'',md:'',lg:'41vw',xl:'49.8rem'}} borderRadius='10px' p='1rem'>
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
                
                    })}
             </Box>
        </Box>
        </Flex>
    )
}
export default Profile;