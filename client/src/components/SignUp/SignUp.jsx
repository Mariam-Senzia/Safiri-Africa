import React,{useState} from "react";
import { Heading,FormControl,FormLabel,Input,Box,Button,Text,Link,Flex,Alert,AlertIcon} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../home/Navbar";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:''
    })
    const navigate = useNavigate();
    const [alertStatus, setAlertStatus] = useState(false)
    // const [alertMessage,setALertMessage] = useState('')


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:5555/users',{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData),
        })
        .then(res => {
            if(res.ok){
                setAlertStatus(true)
                // setFormData({
                //     name:'',
                //     email:'',
                //     password:''
                // })
                setTimeout(() => {
                    navigate('/signIn')
                },2500)
               
            }else {
                throw new Error('Failed to create new user')
            }
        })
        .catch(e => console.log(e))
    }

    return(
        <Flex>
            <Navbar />
        <Box ml='26rem' width={'70rem'}>   
        {alertStatus && (
           <Alert status='success' width='30rem' ml='auto' mr='auto' mt='4rem' borderRadius='10px'>
            <AlertIcon ml='10rem'/>
            Welcome to Safiri Africa {formData.name}
           </Alert> 
        )}
        <Box p='2rem' borderWidth='3px' width='30rem' ml='auto' mr='auto' mt='7rem' borderRadius='10px'>
          <form onSubmit={handleSubmitForm}>

            <Heading textAlign={'center'} color='#F55E00'>Sign Up</Heading>  

            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input placeholder='' focusBorderColor="#FF4500" name='name' value={formData.name} onChange={handleInputChange}/>
            </FormControl>
 
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input placeholder='' focusBorderColor="#FF4500" name='email' value={formData.email} onChange={handleInputChange}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input placeholder='' focusBorderColor="#FF4500" name='password' value={formData.password} onChange={handleInputChange}/>
            </FormControl>

            <Button type='submit' mt='2rem' width='26rem' bgColor='#F58549' colorScheme="#F58549" mb='1rem'>Sign Up</Button>

          </form>
        </Box>
        </Box> 
        </Flex>
    )
}
export default SignUp;