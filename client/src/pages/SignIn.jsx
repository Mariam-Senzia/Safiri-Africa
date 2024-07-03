import React,{useState} from "react";
import { Heading,FormControl,FormLabel,Input,Box,Button,Text,Link,Flex,Alert,AlertIcon} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })
  const [alertStatus,setAlertStatus] = useState(false)

  const navigate = useNavigate();

  const handleSignUp = () => {
        navigate('/signUp')
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:5555/login',{
      method:'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })
    .then(resp => {
      if(resp.ok){
        setAlertStatus(true)
        setTimeout(() => {
          navigate('/')
        },2200)
      }else {
        throw Error('Invalid email or password')
      }
    })
  }

    return(
        <>
        {alertStatus && (
          <Alert status='success' width='30rem' ml='auto' mr='auto' mt='4rem' borderRadius='10px'>
            <AlertIcon ml='10rem'/>
            Welcome Back!
          </Alert>
        )}

        <Box p='2rem' borderWidth='3px' width='30rem' ml='auto' mr='auto' mt='9rem' borderRadius='10px'>
          <form onSubmit={handleLogin}>

            <Heading textAlign={'center'} color='#F55E00'>Sign In</Heading>    
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input placeholder='' focusBorderColor="#FF4500" name='email' value={formData.email} onChange={handleInputChange}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input placeholder='' focusBorderColor="#FF4500" name='password' value={formData.password} onChange={handleInputChange}/>
            </FormControl>

            <Button type='submit' mt='2rem' width='26rem' bgColor='#F58549' colorScheme="#F58549">Sign In</Button>

            <Flex mt='1rem' ml='6rem'>
            <Text >Don't have an account?</Text>
            <Link textDecoration={'underline'} color='#F58549' ml='0.5rem' onClick={handleSignUp}>Sign Up</Link>
            </Flex>

          </form>
        </Box>
        </>
    )
}
export default SignIn;