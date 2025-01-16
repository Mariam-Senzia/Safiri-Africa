import React,{useState,useEffect} from "react";
import { Heading,FormControl,FormLabel,Input,InputGroup,InputRightElement,Box,Button,Flex,Alert,AlertIcon,Image,Text} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../home/Navbar";
import { ViewIcon,ViewOffIcon } from "@chakra-ui/icons";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:''
    })
    const navigate = useNavigate();
    const [alertStatus, setAlertStatus] = useState(false)
    const [showPassword,setShowpassword] = useState(false)
    const [existingEmails,setExistingEmails] = useState([]);      //existing emails
    const [names,setNames] = useState([]);     // existing uernames
    const [errors,setErrors] = useState({});          // form validation errors


    // fetch users and update existing emails state
    useEffect(() => {
        // fetch('http://127.0.0.1:5555/users')
        fetch('https://safiri-africa-api.onrender.com/users')
        .then(resp => resp.json())
        .then(data => {
            const emails = data.map((user) => user.email)
            const username = data.map((user) => user.name)
            setExistingEmails(emails)
            setNames(username)
        })
    },[])
    // console.log(existingEmails)
    // console.log(names)

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });

        setErrors('')
    }
    // console.log(formData.name)

    const handlePassword = () => {
        setShowpassword(!showPassword)
    }

    //form validation
    const validateForm = () => {
        const newErrors = {}

        //username exists
        if (names.includes(formData.name)){
            newErrors.name = 'Username already exists'
        }

        // email format
        const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!emailFormat.test(formData.email)){
            newErrors.email = "Please enter a valid email address";
        }

        // email esists
        if (existingEmails.includes(formData.email)){
            newErrors.email = 'Email already exists';
        }

        // password conatins 8 characters,atleast 1 letter, atleast 1 number
        const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordFormat.test(formData.password)){
            newErrors.password = 'Password must be at least 8 characters long and contain at least 1 letter and 1 number'
        }

        setErrors(newErrors);

        // return true if there are no errors
        return Object.keys(newErrors).length === 0;
    }


    const handleSubmitForm = (e) => {
        e.preventDefault();

        //validation before submission
        if(validateForm()){
            // fetch('http://127.0.0.1:5555/users',{
            fetch('https://safiri-africa-api.onrender.com/users',{
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
                    // use the browser's localStorage to store the user's name after sign-up and retrieve it later when needed
                    // localStorage.setItem('username',formData.name);
                    setTimeout(() => {
                        navigate('/signIn')
                    },2000)
                   
                }else {
                    throw new Error('Failed to create new user')
                }
            })
            .catch(e => console.log(e))

        }
    }

    return(
        <Flex backgroundImage={{base:'https://i.pinimg.com/564x/6f/73/6e/6f736e3f397c68b5eb80f12306e3b66e.jpg',md:'https://i.pinimg.com/564x/6f/73/6e/6f736e3f397c68b5eb80f12306e3b66e.jpg',slg:'none',lg:'none',xl:'none'}} backgroundSize='cover' height={{base:'100vh',md:'',lg:'',xl:'100vh'}} backgroundPosition={{base:'center',md:'center',lg:'',xl:''}} bgColor={{base:'none',md:'none',lg:'',xl:''}}>
            {/* <Navbar /> */}
        <Box ml={{base:'0.5rem',md:'',lg:'16rem',xl:'16rem',dm:''}} width={{base:'',md:'',lg:'70rem',xl:'70rem'}}>   
        {alertStatus && (
           <Alert status='success' width={{base:'20rem',xxm:'22.5rem',xm:'23.5rem',sm:'24.5rem',md:'25rem',lg:'30rem',xl:'30rem'}} ml={{base:'-0.5rem',xxm:'rem',xm:'0.1rem',sm:'rem',xmd:'11rem',md:'13rem',slg:'36rem',lg:'30rem',xl:'37rem',xxl:'50rem'}} mr={{base:'',md:'',lg:'',xl:''}} mt={{base:'1.5rem',xmd:'20rem',md:'25rem',slg:'2rem',lg:'1rem',xl:'1rem'}} mb={{base:'-5rem',xmd:'-25rem',md:'-28rem',slg:'-5rem',lg:'-3rem',xl:'-4rem'}} borderRadius='10px'>
            <AlertIcon ml='-0.7rem' />
            Welcome to Safiri Africa {formData.name}
           </Alert> 
        )}

        <Flex justifyContent='space-between'>
        <Box display={{base:'none',md:'none',slg:'block',lg:'block',xl:'block'}}>
          <Image src='https://i.pinimg.com/564x/6f/73/6e/6f736e3f397c68b5eb80f12306e3b66e.jpg' height={{slg:'100vh',lg:'100vh'}}  width={{slg:'31rem',lg:'90rem',xl:'60.5rem',dm:'63rem',xxl:'70rem'}} mt={{lg:''}} ml={{slg:'-0.5rem',lg:'-16rem'}} />
          <Flex ml={{base:'rem',md:'',slg:'8.5rem',lg:'-4.5rem',xl:'-2.5rem',xxl:'2rem'}} mt={{slg:'-10rem',lg:'-17rem',xl:'-17rem',xxl:'-17rem'}}>
                <Image src='https://i.pinimg.com/736x/b7/d0/a6/b7d0a6e3daf09aa075e12ad0215acb89.jpg' height={{base:'40px',md:'',lg:'60px',xl:''}} width={{base:'40px',md:'',lg:'60px',xl:''}} borderRadius={'50%'} mt={{base:'',md:'',lg:'3.5rem',xl:''}}/>
                <Heading mt={{base:'',md:'',lg:'4rem',xl:''}} ml={{base:'0.4rem',md:'',lg:'3px',xl:''}} color='white'>Safiri Africa</Heading>
            </Flex>
        </Box>

        <Box p={{base:'1rem',xmd:'2rem',md:'2rem',lg:'2rem',xl:'2rem'}} borderWidth={{base:'3px',xxm:'3px',xm:'3px',sm:'3px',xmd:'3px',md:'3px',slg:'0',lg:'0',xl:''}} width={{base:'20rem',xxm:'22.5rem',xm:'24.4rem',sm:'100vw',xmd:'36rem',md:'40rem',slg:'24rem',lg:'',xl:'25rem',dm:''}} ml={{base:'-0.5rem',xxm:'rem',xmd:'5rem',xm:'rem',sm:'rem',md:'5.5rem',lg:'-10.5rem',xl:'-4rem',dm:'',xxl:'-10rem'}} mr={{base:'',md:'',lg:'4rem',xl:'-2rem',xxl:'-15rem'}} mt={{base:'1.5rem',xxm:'10.9rem',xm:'14.5rem',sm:'18.5rem',xmd:'25rem',md:'34rem',slg:'4rem',lg:'9rem',xl:'4.5rem',xxl:'10rem'}} borderRadius={{base:'10px',md:'10px',lg:'',xl:''}}  bgColor='white' height={{base:'',md:'',lg:'',xl:'80vh'}}>
          <form onSubmit={handleSubmitForm}>

            <Heading textAlign={'center'} color='#F55E00' mt={{base:'',md:'',lg:'',xl:'4rem'}}>Sign Up</Heading>  

            <FormControl mt={4} isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input placeholder='' focusBorderColor="#FF4500" name='name' value={formData.name} onChange={handleInputChange} borderWidth={{base:'1px',xxm:'1px',xm:'1px',sm:'1px',xmd:'1px',md:'1px',lg:'2px',xl:'2px'}}/>
              {errors.name && <Text color='red.500'>{errors.name}</Text>}
            </FormControl>
 
            <FormControl mt={4} isRequired isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input placeholder='' focusBorderColor="#FF4500" name='email' value={formData.email} onChange={handleInputChange} borderWidth={{base:'1px',xxm:'1px',xm:'1px',sm:'1px',xmd:'1px',md:'1px',lg:'2px',xl:'2px'}}/>
              {/* only display if there's an error */}
              {errors.email && <Text color='red.500'>{errors.email}</Text>} 
            </FormControl>

            <FormControl mt={4} isRequired isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input placeholder='' focusBorderColor="#FF4500" name='password' value={formData.password} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} borderWidth={{base:'1px',xxm:'1px',xm:'1px',sm:'1px',xmd:'1px',md:'1px',lg:'2px',xl:'2px'}}/>
                <InputRightElement onClick={handlePassword}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </InputRightElement>
              </InputGroup>
              {errors.password && <Text color='red.500'>{errors.password}</Text>}
            </FormControl>

            <Button type='submit' mt={{base:'2rem',md:'',lg:'2rem',xl:'2rem'}} width={{base:'17.7rem',xxm:'20.3rem',xm:'22.1rem',sm:'23.7rem',xmd:'31.8rem',md:'35.7rem',slg:'20rem',lg:'26rem',xl:'21rem'}} bgColor='#F58549' colorScheme="#F58549" mb='1rem'>Sign Up</Button>

          </form>
        </Box>
        </Flex>

        </Box> 
        </Flex>
    )
}
export default SignUp;