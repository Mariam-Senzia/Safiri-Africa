import React,{useEffect, useState} from "react";
import { Heading,FormControl,FormLabel,Input,InputGroup,InputRightElement,Box,Button,Text,Link,Flex,Alert,AlertIcon,Image} from "@chakra-ui/react";
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

  // fetch email of the loggedInUser
  useEffect(() => {
    fetch('http://127.0.0.1:5555/users')
    .then(resp => resp.json())
    .then(data => {
      const user = data.filter((user) => user.name === loggedInUser)
      console.log(user)
    })
  },[loggedInUser])    //add dependency since state changes over time
  // console.log(loggedInUser)

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
        alert('Invalid email or password')
      }
    })
    .then((data) => {
      setAlertStatus(true)
      setLoggedInUser(data.name)
      setTimeout(() => {
          navigate('/homeDefault')
        },2000)
        // console.log(data.name)
    })
  }

  // useEffect(() => {
  //   console.log(loggedInUser)
  // },[loggedInUser]); //render once
  

    return(
      <>
        <Flex backgroundImage={{base:'https://i.pinimg.com/564x/6f/73/6e/6f736e3f397c68b5eb80f12306e3b66e.jpg',md:'https://i.pinimg.com/564x/6f/73/6e/6f736e3f397c68b5eb80f12306e3b66e.jpg',lg:'none',xl:'none'}} backgroundSize='cover' height={{base:'100vh',md:'',lg:'',xl:'100vh'}} backgroundPosition={{base:'center',md:'center',lg:'',xl:''}} bgColor={{base:'none',md:'none',lg:'',xl:''}}>
          {/* <Navbar /> */}
         <Box ml={{base:'0.5rem',md:'',lg:'16rem',xl:'16rem'}} width={{base:'',md:'',lg:'70rem',xl:'70rem'}} >

        {alertStatus && (
            <Alert status='success' width={{base:'20rem',xxm:'21rem',xm:'22.5rem',sm:'24rem',md:'25rem',lg:'30rem',xl:'30rem'}} ml={{base:'-0.5rem',xxm:'0.3rem',xm:'rem',sm:'rem',xmd:'11rem',md:'13rem',lg:'30rem',xl:'37rem',xxl:'50rem'}} mr={{base:'',md:'',lg:'',xl:''}} mt={{base:'1.5rem',xmd:'20rem',md:'25rem',lg:'1rem',xl:'1rem'}} mb={{base:'-5rem',xmd:'-25rem',md:'-28rem',lg:'-4rem',xl:'rem'}} borderRadius='10px'>
            <AlertIcon ml={{base:'',md:'',lg:'2rem',xl:'2rem'}}/>
            Welcome Back {loggedInUser}!
          </Alert>
          // <Alert status='success' width='30rem' ml='auto' mr='auto' mt='4rem' borderRadius='10px'>
          //   <AlertIcon ml='2rem'/>
          //   Welcome Back {userLogin.name}!
          // </Alert>
        )}

        <Flex>
        <Box display={{base:'none',md:'none',lg:'block',xl:'block'}}>
          <Image src='https://i.pinimg.com/564x/6f/73/6e/6f736e3f397c68b5eb80f12306e3b66e.jpg' height={{lg:'100vh'}} width={{lg:'90rem',xl:'60.5rem',xxl:'75rem'}} mt={{lg:'0rem'}} ml='-16rem' />
          <Flex ml={{base:'rem',md:'',lg:'-3.5rem',xl:'-1.5rem',xxl:'3rem'}} mt='-17rem'>
                <Image src='https://i.pinimg.com/736x/b7/d0/a6/b7d0a6e3daf09aa075e12ad0215acb89.jpg' height={{base:'40px',md:'',lg:'60px',xl:''}} width={{base:'40px',md:'',lg:'60px',xl:''}} borderRadius={'50%'} mt={{base:'',md:'',lg:'3.5rem',xl:''}}/>
                <Heading mt={{base:'',md:'',lg:'4rem',xl:''}} ml={{base:'0.4rem',md:'',lg:'3px',xl:''}} color='white'>Safiri Africa</Heading>
            </Flex>
        </Box>

        <Box p={{base:'1rem',xmd:'2rem',md:'2rem',lg:'2rem',xl:'2rem'}} borderWidth={{base:'3px',xxm:'3px',xm:'3px',sm:'3px',xmd:'3px',md:'3px',lg:'0',xl:'0'}} width={{base:'20rem',xxm:'21.6rem',xm:'23.3rem',sm:'25rem',xmd:'37rem',md:'40rem',lg:'',xl:'25rem'}} ml={{base:'-0.5rem',xxm:'0rem',xm:'0rem',sm:'0rem',xmd:'5rem',md:'5.5rem',lg:'-11rem',xl:'-5rem',xxl:'-10rem'}} mr={{base:'',md:'',lg:'4rem',xl:'-5rem',xxl:'-14rem'}} mt={{base:'5.4rem',xxm:'14.9rem',xm:'19rem',sm:'21.6rem',xmd:'29rem',md:'33rem',lg:'9rem',xl:'4.5rem',xxl:'11rem'}} borderRadius={{base:'10px',md:'10px',lg:'',xl:'0px'}}  bgColor='white' height={{base:'',md:'45vh',lg:'',xl:'80vh'}}>
          <form onSubmit={handleLogin}>

            <Heading textAlign={'center'} color='#F55E00' mt={{base:'',md:'1rem',lg:'',xl:'4rem'}}>Sign In</Heading>    
            <FormControl mt={{base:'4',md:'3rem',lg:'4',xl:'6'}} isRequired>
              <FormLabel >Email</FormLabel>
              <Input placeholder='' focusBorderColor="#FF4500" name='email' value={formData.email} onChange={handleInputChange} borderWidth={{base:'1px',xxm:'1px',xm:'1px',sm:'1px',xmd:'1px',md:'1px',lg:'2px',xl:'2px'}}/>
            </FormControl>

            <FormControl mt={{base:'4',md:'',lg:'4',xl:'4'}} isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input placeholder='' focusBorderColor="#FF4500" name='password' value={formData.password} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} borderWidth={{base:'1px',xxm:'1px',xm:'1px',sm:'1px',xmd:'1px',md:'1px',lg:'2px',xl:'2px'}}/>
                <InputRightElement onClick={handlePassword}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button type='submit' mt={{base:'2rem',md:'',lg:'2rem',xl:'2rem'}} width={{base:'17.6rem',xxm:'19.3rem',xm:'21rem',sm:'22.7rem',xmd:'32.7rem',md:'35.7rem',lg:'26rem',xl:'21rem'}} bgColor='#F58549' colorScheme="#F58549">Sign In</Button>

            <Flex mt={{base:'1rem',md:'1rem',lg:'1rem',xl:'2rem'}} ml={{base:'1.5rem',xxm:'2.3rem',sm:'4rem',xmd:'10rem',md:'10rem',lg:'6rem',xl:'3.5rem'}}>
            <Text >Don't have an account?</Text>
            <Link textDecoration={'underline'} color='#F58549' ml='0.5rem' onClick={handleSignUp}>Sign Up</Link>
            </Flex>

          </form>
        </Box>
        </Flex>
        </Box> 
        </Flex>
        </>
    )
}
export default SignIn;