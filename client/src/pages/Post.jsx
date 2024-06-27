import React,{useState} from "react";
import { Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,FormControl,FormLabel,Input,ModalFooter,useDisclosure, Textarea,Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const Post = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [formData,setFormData] = useState({
      title:'',
      location:'',
      description:'',
      type:'',
      region:'',
      url:''
    })

    const navigate = useNavigate();


    const handleSubmit = (e) => {
      e.preventDefault();
      
      const formDataToSend = new FormData();
      formDataToSend.append('title',formData.title);
      formDataToSend.append('location',formData.location);
      formDataToSend.append('description',formData.description);
      formDataToSend.append('type',formData.type);
      formDataToSend.append('region',formData.region);
      formDataToSend.append('url',formData.url)

      fetch('http://127.0.0.1:5555/destinations',{
        method:'POST',
        body: formDataToSend,
      })
      .then(res => {
        if(!res.ok){
          throw new Error('Network response was not ok');
        }
        navigate('/postMessage')
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
        <Button onClick={onOpen} bgColor={'#F58549'} mt={{base:'',md:'',lg:'2.5rem',xl:''}} ml={{base:'',md:'',lg:'1.5rem',xl:''}}width='19vw' colorScheme="#F58549" color=''>Create Post</Button>
      {/* <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button> */}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent mt='1rem' width='60rem'>
          <ModalHeader color='#FF4500'>Create New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input ref={initialRef} placeholder='Destination title' focusBorderColor="#FF4500" name='title' value={formData.title} onChange={handleChange}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Location</FormLabel>
              <Input placeholder='Location' focusBorderColor="#FF4500" name='location' value={formData.location} onChange={handleChange}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder='Description' focusBorderColor="#FF4500" name='description' value={formData.description} onChange={handleChange}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Type</FormLabel>
              <Select focusBorderColor="#FF4500" name='type' value={formData.type} onChange={handleChange}>
                <option>Select media type</option>
                <option>image</option>
                <option>video</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Region</FormLabel>
              <Select focusBorderColor="#FF4500" name='region' value={formData.region} onChange={handleChange}>
                <option>Select African region</option>
                <option>Nothern Africa</option>
                <option>Western Africa</option>
                <option>Central africa</option>
                <option>East africa</option>
                <option>Souther Africa</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
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