import React,{useState,useEffect} from "react";
import { Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,FormControl,FormLabel,Input,ModalFooter,useDisclosure, Textarea,Select,Flex,Avatar,Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/UseStore";


const Post = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const {loggedInUser} = useStore();
    const [formData,setFormData] = useState({
      title:'',
      location:'',
      description:'',
      type:'',
      region:'',
      url:'',
      username:loggedInUser
    })
    // const {profileUrl} = useStore();

    const navigate = useNavigate();

    // console.log(profileUrl)


    const handleSubmit = (e) => {
      e.preventDefault();
      
      const formDataToSend = new FormData();
      formDataToSend.append('title',formData.title);
      formDataToSend.append('location',formData.location);
      formDataToSend.append('description',formData.description);
      formDataToSend.append('type',formData.type);
      formDataToSend.append('region',formData.region);
      formDataToSend.append('url',formData.url)
      formDataToSend.append('username',formData.username)

      // fetch('http://127.0.0.1:5555/destinations',{
      fetch('https://safiri-africa-api.onrender.com/destinations',{
        method:'POST',
        body: formDataToSend,
      })
      .then(res => {
        if(!res.ok){
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((dest) => {
        setFormData({
          title:'',
          location:'',
          description:'',
          type:'',
          region:'',
          url:'',
          username: loggedInUser
        });  

        navigate('/postMessage');
      })
      // .then(data => {
      //   console.log(data);
      //   alert('Destination created successfully')
      // })
      .catch(e => console.log(e))
    }

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]:e.target.value,
      });
    }

    const handleImageChange = (e) => {
      setFormData({
        ...formData,
        url:e.target.files[0],
      });
    }

    return (
        <>
        <Button onClick={onOpen} bgColor={'#F58549'} mt={{base:'2.5rem',md:'',lg:'4rem',xl:''}} ml={{base:'',md:'',slg:'1rem',lg:'1.5rem',xl:'',xxl:'3rem'}} width={{base:'30vw',md:'19vw',lg:'19vw',xl:'19vw'}} colorScheme="#F58549" color=''>Create Post</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent mt='1rem' width='60rem'>
          <Flex mt='2rem' p='1rem'> 
            <Heading color='#FF4500' size='lg' ml='0.5rem'  mt='0.5rem'>Create New Post</Heading>
            <Avatar size='md' ml='7rem' name={loggedInUser} />
          </Flex>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input ref={initialRef} placeholder='Destination title' focusBorderColor="#FF4500" name='title' value={formData.title} onChange={handleChange}/>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Location</FormLabel>
              <Input placeholder='Location' focusBorderColor="#FF4500" name='location' value={formData.location} onChange={handleChange}/>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder='Description' focusBorderColor="#FF4500" name='description' value={formData.description} onChange={handleChange}/>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Type</FormLabel>
              <Select focusBorderColor="#FF4500" name='type' value={formData.type} onChange={handleChange}>
                <option>Select media type</option>
                <option>image</option>
                <option>video</option>
              </Select>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Region</FormLabel>
              <Select focusBorderColor="#FF4500" name='region' value={formData.region} onChange={handleChange}>
                <option>Select African region</option>
                <option>Nothern Africa</option>
                <option>Western Africa</option>
                <option>Central Africa</option>
                <option>East Africa</option>
                <option>Souther Africa</option>
              </Select>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Image/Video</FormLabel>
              <Input type="file" placeholder='Image/Video' p='0.3rem' name='url' onChange={handleImageChange}/>
            </FormControl>

            <ModalFooter mt='1rem' mr='-1.4rem'>
            <Button type='submit' colorScheme='#FF4500' bgColor='#F58549' color='' mr={3} >
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>

            </form>
          </ModalBody>

        </ModalContent>
      </Modal>
        </>
    )
}
export default Post;