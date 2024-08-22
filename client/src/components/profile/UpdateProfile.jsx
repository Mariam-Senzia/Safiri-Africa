import React,{useState,useEffect, useRef} from "react";
import { FormControl,FormLabel,Input,Flex,Box,Textarea, Select,Heading,Avatar,IconButton,Button,Tooltip,Alert,AlertIcon,Text} from "@chakra-ui/react";
import Navbar from "../home/Navbar";
import { EditIcon } from "@chakra-ui/icons";
import useStore from "../../store/UseStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
    const [countries,setCountries] = useState([]);
    const [selectedImage,setSelectedImage] = useState(null);
    const fileInputRef = useRef();
    const {loggedInUser} = useStore();
    const [userDetails,setUserDetails] = useState([]);
    const [errors,setErrors] = useState({});
    const [existingEmails,setExistingEmails] = useState([]);      //existing emails
    const [formData,setFormData] = useState({
        id: '',
        name: '',
        email: '',
        description: '',
        country: '',
        city: '',
        profile_url: ''
    });
    const [alertStatus,setAlertStatus] = useState(false);
    const user_id = userDetails.map((data) => data.id)     // user id
    const navigate = useNavigate();   

    // console.log(selectedImage)

    const handleProfilePicture = () => {
        // reference the file input element and allows us to click.
        fileInputRef.current.click()
    }

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => setCountries(data))
        .catch(e => console.log(e))
    },[])

    const countryNames = countries.map((count) => count.name.common).sort()
    // console.log(countryNames)

    useEffect(() => {
        fetch('http://127.0.0.1:5555/userProfile')
        .then((resp => resp.json()))
        .then((data) => {
            const filteredData = data.filter((detail) => detail.name === loggedInUser)
            setUserDetails(filteredData)
            // console.log(filteredData)
        })
    },[]);

    // fetch users and update existing emails state
    useEffect(() => {
        fetch('http://127.0.0.1:5555/users')
        .then(resp => resp.json())
        .then(data => {
            const emails = data.map((user) => user.email)
            setExistingEmails(emails)
        })
    },[])

    //validate email
    const validateForm = () => {
        const newErrors = {}

        // email format
        const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!emailFormat.test(formData.email)){
            newErrors.email = "Please enter a valid email address";
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;      //form is only submitted if there are no errors
    }

    ////form submissions
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });

        setErrors('')
    }

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0])
        setFormData({
            ...formData,
            profile_url:e.target.files[0]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();  

        if(validateForm()){
        const newData = new FormData();
        newData.append('id',user_id);
        newData.append('name', formData.name);
        newData.append('email',formData.email);
        newData.append('description',formData.description);
        newData.append('country',formData.country);
        newData.append('city', formData.city);
        newData.append('profile_url',formData.profile_url)

        fetch('http://127.0.0.1:5555/userProfile',{
            method: 'PUT',
            body: newData,
        })
        .then(resp => {
            if(!resp.ok){
                throw new Error('Network response was not ok');
              } else {
                return resp.json();
              }     
        })
        .then(() => {
            setFormData({
                name: '',
                email: '',
                description: '',
                country: '',
                city: '',
                profile_url: ''  
            });
            setAlertStatus(true)
            setTimeout(() => {
                setAlertStatus(true)
            },2000)
        })
    }
    }


    return (
        <>
        <Box>
            <Box display={{base:'none',sm:'none',md:'',lg:'block',xl:'block'}}>
            {alertStatus && (
                    <Alert status='success' mb={{base:'-2rem',sm:'-2rem',md:'-2rem',lg:'-2rem',xl:'-4rem'}} width='18rem' ml={{base:'2rem',sm:'',md:'rem',lg:'48rem',xl:'69rem'}} borderRadius='10px' mt={{base:'rem',sm:'',md:'',lg:'0.5rem',xl:'0.5rem'}} zIndex='100'>
                     <Flex mt='rem'>
                        <AlertIcon />
                            Profile updated successfully
                        <Link to='/homeDefault'>
                            <Text color='#FF4500' mt='1.3rem' ml='-10rem' textDecoration='underline'>Back to Home</Text>
                        </Link>
                        </Flex> 
                        {/* <Link to='/homeDefault'>
                        <Text color='#FF4500' mt='1.5rem' ml='-10rem'>Back to Home</Text>
                        </Link> */}
                    </Alert>
            )}
            </Box>

        <Flex>
            <Navbar display={{base:'none',sm:'none',md:'',slg:'none',lg:'',xl:''}}/>

            <Box borderWidth='3px' p='2rem' mt={{base:'-4rem',sm:'',md:'',slg:'1rem',lg:'2.8rem',xl:'1.5rem',xxl:'3rem'}}  width={{base:'60rem',sm:'60rem',md:'60rem',slg:'46.5rem',lg:'60rem',xl:'60rem',xxl:'76rem'}} ml={{base:'',sm:'',md:'-0.1rem',slg:'16rem',lg:'29rem',xl:'27rem'}} borderRadius='10px' height={{base:'',sm:'',md:'',slg:'100vh',lg:'',xl:'',xxl:'90vh'}}>
            {userDetails.map((user) => {
                return <> <Box display={{base:'none',sm:'',md:'',slg:'block',lg:'block',xl:'block'}}> 
                <form onSubmit={handleSubmit}>
                <Heading size='xl' textAlign='center'>Profile</Heading>

                <Flex mt='2rem' ml={{base:'',sm:'',xmd:'',md:'rem',slg:'17rem',lg:'24rem',xxl:'31.9rem'}} onClick={handleProfilePicture}>
                    {/* create a url from the selectedImage object */}
                    <Avatar size='2xl' src={selectedImage ? URL.createObjectURL(selectedImage) : user.profile_url}/>
                    <Tooltip label='Update profile picture' bgColor='#EBEBEB' color=''>
                        <IconButton borderRadius='50px' ml='-2rem' mt='5.5rem' color={'#FF4500'} >
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Input 
                        ref={fileInputRef}
                        type='file'
                        accept='image/*'
                        visibility='hidden'
                        onChange={handleImageChange}
                        name='profile_url'
                    />
                </Flex>
                
                <Flex gap='2rem'>
                    <FormControl mt={{base:'3rem',sm:'3rem',md:'3rem',lg:'3rem',xl:'3rem',xxl:'10rem'}} isRequired>
                        <FormLabel>Full name</FormLabel>
                        <Input focusBorderColor="#F58549" placeholder={user.name} name='name' value={formData.name} onChange={handleInputChange}/>
                    </FormControl>
                    <FormControl isrequired >
                        <FormLabel mt={{base:'3rem',sm:'3rem',md:'3rem',lg:'3rem',xl:'3rem',xxl:'10rem'}}>Email</FormLabel>
                        <Input focusBorderColor="#F58549" placeholder={user.email} name='email' value={formData.email} onChange={handleInputChange}/>
                        {errors.email && <Text color='red.500'>{errors.email}</Text>}
                    </FormControl>
                </Flex>

                <FormControl mt={{base:'1rem',sm:'1rem',md:'1rem',lg:'1rem',xl:'1rem',xxl:'3rem'}} isRequired>
                        <FormLabel>About</FormLabel>
                        <Textarea focusBorderColor="#F58549" placeholder={user.description} name='description' value={formData.description} onChange={handleInputChange}/>
                </FormControl>

                <Flex gap='2rem' isRequired>
                    <FormControl mt={{base:'1rem',sm:'1rem',md:'1rem',lg:'1rem',xl:'1rem',xxl:'3rem'}} isRequired>
                        <FormLabel>Country</FormLabel>
                        <Select name='country' value={formData.value} onChange={handleInputChange}>
                            <option>Select Country</option>
                            {user.country ? (<option>{user.country}</option>) : (
                                countryNames.map((nam) => {
                                    return <option>{nam}</option>
                                 }) 
                            )}
                            {/* {countryNames.map((nam) => {
                               return <option>{nam}</option>
                            })}   */}
                        </Select>
                    </FormControl>
                    <FormControl mt={{base:'1rem',sm:'1rem',md:'1rem',lg:'1rem',xl:'1rem',xxl:'3rem'}}>
                        <FormLabel>City</FormLabel>
                        <Input focusBorderColor="#F58549" placeholder={user.city} name='city' value={formData.city} onChange={handleInputChange}/>
                    </FormControl>
                </Flex>

                <Button type='submit' mt='2.5rem' mb='1rem' bgColor={'#F58549'} colorScheme="#F58549" color='' width='10vw' ml={{base:'46rem',sm:'46rem',md:'46rem',lg:'46rem',xl:'46rem',xxl:'61rem'}}>Save</Button>
            </form>
            </Box>

            {/* for mobile/tablet devices */}
            <Box display={{base:'block',sm:'',md:'',slg:'',lg:'none',xl:'none'}}>
            {alertStatus && (
                <Alert status='success' mb='-6rem' width={{base:'17rem',md:'18rem'}} ml={{base:'1.5rem',sm:'',md:'15rem',lg:'48rem',xl:'48rem'}} borderRadius='10px' mt={{base:'8rem',sm:'',md:'',lg:'0.5rem',xl:'0.5rem'}} >
                    <Flex mt='-3rem'>
                        <AlertIcon />
                            Profile updated successfully
                    </Flex>
                    <Link to='/homeDefault'>
                        <Text color='#FF4500' mt='2.5rem' ml='-10rem' textDecoration='underline'>Back to Home</Text>
                    </Link>
                </Alert>
            )}
            </Box>
            <Box display={{base:'block',sm:'',md:'',slg:'none',lg:'none',xl:'none'}} mt={{base:'125px',md:'11rem'}} borderWidth='2px' borderRadius='10px' width='99.1vw' ml={{base:'-2rem',md:''}}>
            <form onSubmit={handleSubmit}>
                <Heading size='xl' textAlign='center' mt='1rem'>Profile</Heading>

                <Flex mt={{base:'1rem',md:'1rem'}} ml={{base:'8rem',xmd:'19.7rem',md:'21.8rem'}} onClick={handleProfilePicture}>
                    {/* create a url from the selectedImage object */}
                    <Avatar size='2xl' src={selectedImage ? URL.createObjectURL(selectedImage) : user.profile_url}/>
                    <Tooltip label='Update profile picture' bgColor='#EBEBEB' color=''>
                        <IconButton borderRadius='50px' ml='-2rem' mt='5.5rem' color={'#FF4500'} >
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Input 
                        ref={fileInputRef}
                        type='file'
                        accept='image/*'
                        visibility='hidden'
                        onChange={handleImageChange}
                        name='profile_url'
                    />
                </Flex>

                <Box p={{base:'1rem',md:'2rem'}}>
                    <FormControl mt='3rem' isRequired>
                        <FormLabel>Full name</FormLabel>
                        <Input focusBorderColor="#F58549" placeholder={user.name} name='name' value={formData.name} onChange={handleInputChange}/>
                    </FormControl>

                    <FormControl isRequired >
                        <FormLabel mt='1.5rem'>Email</FormLabel>
                        <Input focusBorderColor="#F58549" placeholder={user.email} name='email' value={formData.email} onChange={handleInputChange}/>
                    </FormControl>

                    <FormControl mt='1.5rem' isRequired>
                        <FormLabel>About</FormLabel>
                        <Textarea focusBorderColor="#F58549" placeholder={user.description} name='description' value={formData.description} onChange={handleInputChange}/>
                    </FormControl>

                    <FormControl mt='1.5rem' isRequired>
                        <FormLabel>Country</FormLabel>
                        <Select name='country' value={formData.value} onChange={handleInputChange}>
                            <option>Select Country</option>
                            {user.country ? (<option>{user.country}</option>) : (
                                countryNames.map((nam) => {
                                    return <option>{nam}</option>
                                 }) 
                            )}
                            {/* {countryNames.map((nam) => {
                               return <option>{nam}</option>
                            })}   */}
                        </Select>
                    </FormControl>

                    <FormControl mt='1.5rem'>
                        <FormLabel>City</FormLabel>
                        <Input focusBorderColor="#F58549" placeholder={user.city} name='city' value={formData.city} onChange={handleInputChange}/>
                    </FormControl>

                </Box>

                <Button type='submit' mt='1rem' mb='1rem' bgColor={'#F58549'} colorScheme="#F58549" color='' width='30vw' ml={{base:'15.5rem',xmd:'32rem',md:'33rem'}}>Save</Button>

            </form>
            </Box>
            </>
             })}
            </Box>
        </Flex>
        </Box>  
        </>
    )
}
export default UpdateProfile