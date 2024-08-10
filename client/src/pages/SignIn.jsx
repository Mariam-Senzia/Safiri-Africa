import React,{useEffect, useState} from "react";
import { Heading,FormControl,FormLabel,Input,InputGroup,InputRightElement,Box,Button,Text,Link,Flex,Alert,AlertIcon} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import { ViewIcon,ViewOffIcon } from "@chakra-ui/icons";
import useStore from "../store/UseStore";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })
  const [alertStatus,setAlertStatus] = useState(false);
  const [showPassword, setShowpassword] = useState(false);
  const {loggedInUser,setLoggedInUser} = useStore();

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

  const handlePassword = () => {
    setShowpassword(!showPassword)
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
        // setAlertStatus(true)
        // setTimeout(() => {
        //   navigate('/homeDefault')
        // },2200)
        return resp.json()
      }else {
        throw Error('Invalid email or password')
      }
    })
    .then((data) => {
      setAlertStatus(true)
      setLoggedInUser(data.name)
      setTimeout(() => {
          navigate('/homeDefault')
        },2200)
        // console.log(data.name)
    })
  }

  // useEffect(() => {
  //   console.log(loggedInUser)
  // },[loggedInUser]); //render once
  

    return(
        <Flex>
          {/* <Navbar /> */}
         <Box ml='16rem' width={'70rem'}>
        {alertStatus && (
            <Alert status='success' width='30rem' ml='auto' mr='auto' mt='4rem' borderRadius='10px'>
            <AlertIcon ml='2rem'/>
            Welcome Back {loggedInUser}!
          </Alert>
          // <Alert status='success' width='30rem' ml='auto' mr='auto' mt='4rem' borderRadius='10px'>
          //   <AlertIcon ml='2rem'/>
          //   Welcome Back {userLogin.name}!
          // </Alert>
        )}

        <Box p='2rem' borderWidth='3px' width='30rem' ml='auto' mr='auto' mt='9rem' borderRadius='10px'>
          <form onSubmit={handleLogin}>

            <Heading textAlign={'center'} color='#F55E00'>Sign In</Heading>    
            <FormControl mt={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input placeholder='' focusBorderColor="#FF4500" name='email' value={formData.email} onChange={handleInputChange}/>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input placeholder='' focusBorderColor="#FF4500" name='password' value={formData.password} onChange={handleInputChange} type={showPassword ? 'text' : 'password'}/>
                <InputRightElement onClick={handlePassword}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button type='submit' mt='2rem' width='26rem' bgColor='#F58549' colorScheme="#F58549">Sign In</Button>

            <Flex mt='1rem' ml='6rem'>
            <Text >Don't have an account?</Text>
            <Link textDecoration={'underline'} color='#F58549' ml='0.5rem' onClick={handleSignUp}>Sign Up</Link>
            </Flex>

          </form>
        </Box>
        </Box> 
        </Flex>
    )
}
export default SignIn;