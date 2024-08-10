import React,{useState,useEffect, useRef} from "react";
import { FormControl,FormLabel,Input,Flex,Box,Textarea, Select,Heading,Avatar,IconButton,Button,Tooltip,Alert,AlertIcon} from "@chakra-ui/react";
import Navbar from "../home/Navbar";
import { EditIcon } from "@chakra-ui/icons";
import useStore from "../../store/UseStore";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const [countries,setCountries] = useState([]);
    const [selectedImage,setSelectedImage] = useState(null);
    const fileInputRef = useRef();
    const {loggedInUser} = useStore();
    const [userDetails,setUserDetails] = useState([]);
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

    ////form submissions
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
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
            // setFormData({
            //     name: '',
            //     email: '',
            //     description: '',
            //     country: '',
            //     city: '',
            //     profile_url: ''  
            // });
            setAlertStatus(true)
            navigate('/profile')
        })
    }


    return (
        <>
        <Box>
        {alertStatus && (
                <Alert status='success' mb='-2rem' width='20rem' ml='48rem' borderRadius='10px' mt='0.5rem'>
                    <AlertIcon />
                        Profile updated successfully
                </Alert>
        )}
        <Flex>
            <Navbar/>

            <Box borderWidth='3px' p='2rem' mt={{base:'',sm:'',md:'',lg:'2.8rem'}}  width='60rem' ml={{base:'',sm:'',md:'20rem',lg:'29rem'}} borderRadius='10px'>
            {userDetails.map((user) => {
                return <form onSubmit={handleSubmit}>
                <Heading size='xl' textAlign='center'>Profile</Heading>

                <Flex mt='2rem' ml={{base:'',sm:'',md:'-0.5rem',lg:'24rem'}} onClick={handleProfilePicture}>
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
                    <FormControl mt='3rem' isRequired>
                        <FormLabel>Full name</FormLabel>
                        <Input focusBorderColor="#F58549" placeholder={user.name} name='name' value={formData.name} onChange={handleInputChange}/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel mt='3rem'>Email</FormLabel>
                        <Input focusBorderColor="#F58549" placeholder={user.email} name='email' value={formData.email} onChange={handleInputChange}/>
                    </FormControl>
                </Flex>

                <FormControl mt='1rem' isRequired>
                        <FormLabel>About</FormLabel>
                        <Textarea focusBorderColor="#F58549" placeholder={user.description} name='description' value={formData.description} onChange={handleInputChange}/>
                </FormControl>

                <Flex gap='2rem' isRequired>
                    <FormControl mt='1rem' isRequired>
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
                    <FormControl mt='1rem'>
                        <FormLabel>City</FormLabel>
                        <Input focusBorderColor="#F58549" placeholder={user.city} name='city' value={formData.city} onChange={handleInputChange}/>
                    </FormControl>
                </Flex>

                <Button type='submit' mt='2.5rem' mb='1rem' bgColor={'#F58549'} colorScheme="#F58549" color='' width='10vw' ml='46rem'>Save</Button>
            </form>
             })}
            </Box>
        </Flex>
        </Box>  
        </>
    )
}
export default UpdateProfile