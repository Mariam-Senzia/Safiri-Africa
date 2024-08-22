import React,{useState,useEffect} from "react";
import { Heading ,Flex,Box, Avatar,Text,Button,Card,CardHeader,CardBody,CardFooter,Image,IconButton,Tooltip,AspectRatio,Input} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike,BiChat,BiShare,BiLogIn } from "react-icons/bi";
import Navbar from "../components/home/Navbar";
import { useNavigate } from "react-router-dom";
import useStore from "../store/UseStore";
import ShareModal from "../components/home/ShareModal";
import Post from "./Post";

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

    const handleSignOut = () => {
        navigate('/')
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
        <Navbar display={{base:'none',xmd:'none',md:'none',lg:'flex',xl:'flex'}}/>

        <Box borderWidth='px' width={{base:'60rem',sm:'60rem',md:'60rem',lg:'60rem',xl:'60rem',xxl:'66rem'}} ml={{base:'-2rem',sm:'',md:'rem',slg:'13rem',lg:'20rem',xl:'25rem',xxl:'30rem'}} mt={{base:'5rem',md:'',slg:'0.5rem',lg:'0.5rem',xl:'1'}} height=''>
           
            <Flex ml='1.5rem' mt='rem' bgColor='' p='1rem' borderRadius='10px'>
                <Avatar ml={{base:'rem',xmd:'1rem',md:'1.5rem',lg:'',xl:''}}  bgColor={randomColor} name={loggedInUser} size={{base:'xl',md:'2xl',lg:'2xl',xl:'2xl'}} src='' />
                <Box>
                <Heading ml={{base:'1rem',xmd:'1rem',md:'1rem',lg:'1.5rem',xl:'1.5rem'}} size='lg' mt='2.5rem' color=''>{loggedInUser}</Heading>
                </Box>
            </Flex>
            {/* tooltip: show text on hover */}
            {/* <Tooltip label='Edit profile' bgColor='#EBEBEB' color=''>
                <IconButton color={'#FF4500'} borderRadius={'50px'} ml='58.1rem' mt='-2.4rem' onClick={handleUpdateProfile}>
                    <EditIcon />
                </IconButton>
            </Tooltip> */}

            <Flex gap={{base:'0.7rem',xxm:'1rem',xm:'1rem',sm:'1rem',md:'3rem',lg:'3rem',xl:'3rem'}} mt='0.5rem' mb='3rem'>
                {/* <Heading size='md' ml='3rem' color='#FF4500' textDecorationLine='' mt='1rem'>My Posts</Heading> */}
                <Button bgColor='#F58549' colorScheme='#F58549' width={{base:'6rem',xxm:'6.5rem',xm:'7rem',sm:'7.5rem',xmd:'30vw',md:'26vw',slg:'19vw',lg:'19vw',xl:'18vw',xxl:'25vw'}} ml={{base:'2.3rem',xmd:'3.5rem',md:'4.5rem',lg:'4rem',xl:'4rem'}} >My Posts</Button>
                <Button bgColor='#F58549' colorScheme='#F58549' width={{base:'6rem',xxm:'6.5rem',xm:'7rem',sm:'7.5rem',xmd:'30vw',md:'26vw',slg:'19vw',lg:'19vw',xl:'18vw',xxl:'25vw'}} onClick={handleUpdateProfile}>Edit Profile</Button>
                <Button width={{base:'6rem',xxm:'6.5rem',xm:'7.7rem',sm:'8.3rem',xmd:'30vw',md:'26vw',slg:'20vw',lg:'19vw',xl:'18vw',xxl:'25vw'}} bgColor='#F58549' colorScheme='#F58549' onClick={handleSignOut}>
                    <BiLogIn size='1.5rem' />
                    <Text ml='0.5rem'>Sign Out</Text>
                </Button>
            </Flex>

            {filteredDestinations && filteredDestinations.length > 0 ? (
            <Box mb='2rem' mt='-1.3rem' ml={{base:'2rem',md:'',slg:'4.5rem',lg:'4rem',xl:'4rem'}}>
            {filteredDestinations.map((dest) => {
                const destLikes = likes.filter((like) => like.destination_id === dest.id); //likes that match the destination id

                return <Card key={dest.id} maxW='' mt='2rem' borderWidth={{base:'2px',md:'2px',lg:'1px',xl:'1px'}} borderColor='' ml='rem' width={{base:'',xxm:'',xm:'',sm:'',xmd:'',md:'',slg:'43.1rem',lg:'51.5rem',xl:'56rem',xxl:'62rem'}}>
                    <CardHeader>
                        <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap' ml={{base:'-0.5rem',md:'',lg:'',xl:''}}>
                            <Avatar name={loggedInUser} bgColor={randomColor} />

                            <Box>
                            <Heading size='sm'>{dest.username}</Heading>
                            <Text width={{base:'65vw',xxm:'70vw',xm:'70vw',sm:'70vw',md:'80vw',slg:'50vw',lg:'40vw',xl:'40vw'}}>{dest.location}</Text>
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
                            minW: {base:'90px',md:'',lg:'136px',xl:'136px'},
                        },
                        }}
                    >
                        <Button flex='1' variant='ghost' leftIcon={<BiLike color='#FF4500'/>} onClick={() => handleLikes(dest.id)} ml={{base:'-2.6rem',xxm:'-0.5rem',xm:'-0.2rem',sm:'-0.5rem',md:'',lg:'',xl:''}}>
                            {destLikes.length} Likes
                        </Button>
                        <Button flex='1' variant='ghost' leftIcon={<BiChat color='#FF4500'/>} onClick={() => handleComments(dest.id)}  ml={{base:'-3.5rem',xxm:'1rem',xm:'2rem',sm:'2rem',md:'',lg:'',xl:''}}>
                            Comment
                        </Button>
                        <Button flex='1' variant='ghost' leftIcon={<BiShare color='#FF4500'/>} ml={{base:'-2.5rem',xxm:'1rem',xm:'2rem',sm:'2rem',md:'',lg:'',xl:''}}>
                          <ShareModal />
                        </Button>
                    </CardFooter>
                    {activeDestination === dest.id && (         //comments
                                <>
                                    <form onSubmit={(e) => handleSubmitComment(e, dest.id)}>
                                        {alertStatus && (
                                            <Alert status='success' mb={{base:'1rem',md:'1rem',lg:'0.5rem',xl:'0.5rem'}} width={{base:'17.5rem',md:'3rem',lg:'18rem',xl:'18rem'}} ml={{base:'3rem',md:'',lg:'15rem',xl:'15rem'}} borderRadius='10px'>
                                                <AlertIcon />
                                                Comment posted successfully
                                            </Alert>
                                        )}
                                        <Flex mb='1rem' >
                                            <Avatar size='md' ml={{base:'0.1rem',xxm:'0.3rem',xm:'0.5rem',sm:'0.5rem',xmd:'3.5rem',md:'3.5rem',slg:'1rem',lg:'1.5rem',xl:'1.5rem'}} name={loggedInUser}/>
                                            <Input placeholder='Add a comment...' borderRadius={'20px'} mt='0.2rem' ml='0.5rem' width={{base:'56.5vw',xxm:'60vw',xm:'61vw',sm:'63vw',md:'67vw',slg:'51vw',lg:'50vw',xl:'47.5vw'}} name='comment_text' value={formData.comment_text} onChange={handleCommentInput} focusBorderColor="#FF934F"/>
                                            <Button ml='0.5rem' bgColor='#FF934F' mt='0.2rem' type='submit' colorScheme="#48C9B0" color=''>Post</Button>
                                        </Flex>
                                    </form>
                                    <Heading size='' ml={{base:'0.1rem',xxm:'0.5rem',xm:'0.5rem',sm:'0.5rem',xmd:'3.5rem',md:'3.5rem',slg:'1rem',lg:'1.5rem',xl:'1.5rem'}}>Comments {comments.length}</Heading>
                                    {comments.map(comm => {
                                        return (
                                            <Flex key={comm.id} mt='1rem' mb='1rem'>
                                                <Avatar ml={{base:'0.1rem',xxm:'0.3rem',xm:'0.5rem',sm:'0.5rem',xmd:'3.5rem',md:'3.5rem',slg:'1rem',lg:'1.5rem',xl:'1.5rem'}} name={comm.username}/>
                                                <Box bgColor='#EBEBEB' ml='0.5rem' width={{base:'16rem',xxm:'18rem',xm:'19.5rem',sm:'21rem',xmd:'35rem',md:'39.5rem',slg:'37.2rem',lg:'44.8rem',xl:'48.7rem',xxl:'55rem'}} borderRadius='10px' p='1rem'>
                                                    <Heading size='' ml={{base:'-0.5rem',md:'',lg:'0.5rem',xl:'-0.5rem'}} mt={{base:'-0.6rem',md:'',lg:'-0.2rem',xl:'-0.5rem'}}>{comm.username}</Heading>
                                                    {/* <Text ml='0.5rem' fontFamily={'monospace'} color='#7C858D'>User description</Text> */}
                                                    <Text ml={{base:'-0.5rem',md:'',lg:'0.5rem',xl:'-0.5rem'}} mt='rem'>{comm.comment_text}</Text>
                                                </Box>
                                            </Flex>
                                        );
                                    })}
                                </>
                            )}
                    </Card>
                
                    })}
             </Box> ) : (

            <Box bgColor='' borderWidth='2px' p={{base:'2rem',xxm:'3rem',xm:'4rem',sm:'5rem',xmd:'10rem',md:'rem',slg:'6rem',lg:'rem',xl:'5rem',xxl:'8.5rem'}} ml={{base:'2.5rem',xm:'rem',sm:'rem',xm:'3.5rem',md:'4.7rem',lg:'4.1rem',xl:'4rem',xxl:'4rem'}} borderRadius='10px' width={{base:'19rem',xxm:'21.5rem',xm:'23.5rem',sm:'25rem',xmd:'45rem',md:'46rem',slg:'43rem',lg:'51.5rem',xl:'56rem',xxl:'62rem'}}> 
                <Text ml={{base:'',xxm:'rem',xm:'rem',sm:'rem',md:'rem',lg:'rem',xl:'9rem'}}>No posts yet! Share your favorite destinations to inspire others.</Text>
                <Box ml={{base:'5rem',xxm:'4rem',xm:'rem',sm:'rem',xmd:'6rem',md:'8rem',lg:'rem',xl:'12rem',xxl:'10rem'}} mt={{base:'',xm:'rem',sm:'rem',md:'rem',lg:'rem',xl:'-1rem'}}>
                <Post />
                </Box>
            </Box>
            )}
        </Box>
        </Flex>
    )
}
export default Profile;