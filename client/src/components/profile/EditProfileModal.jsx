import React,{useState} from "react";
import { Box,Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,FormControl,FormLabel,Input,ModalFooter,useDisclosure, Textarea} from "@chakra-ui/react";

const EditProfileModal = () => {
    const [formData,setFormData] = useState({
      name:'',
      description:'',
      profile_url:''
    })
    const [alertStatus,setAlertStatus] = useState(false)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]:e.target.value
      });
    }

    const handleImageChange = (e) => {
      setFormData({
        ...formData,
        profile_url:e.target.files[0]
      })
    }

    const handleSubmitForm = (e) => {
      e.preventDefault();

      const updatedFormData = new FormData()
      updatedFormData.append('name',formData.name);
      updatedFormData.append('description',formData.description);
      updatedFormData.append('profile_url',formData.profile_url)

      fetch('http://127.0.0.1:5555/userProfile',{
        method:'POST',
        body: updatedFormData,
      })
      .then(resp => {
        if(resp.ok){
          setFormData({
            name:'',
            description:'',
            profile_url:'',
          });
          setAlertStatus(true)
        }else{
          throw new Error('Error editing profile')
        }
      })
      .catch(e => console.log(e))
    }
  
    return (
      <>
        <Button onClick={onOpen} width='16rem' bgColor='#48C9B0' colorScheme="#48C9B0">Edit Profile</Button>
    
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color='#FF4500' textAlign='center' fontSize='1.5rem'>Edit Your Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form onSubmit={handleSubmitForm}>
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input ref={initialRef} placeholder='' focusBorderColor="#48C9B0" name='name' value={formData.name} onChange={handleInputChange}/>
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>About Yourself</FormLabel>
                <Textarea placeholder='' focusBorderColor="#48C9B0" name='description' value={formData.description} onChange={handleInputChange}/>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Profile Photo</FormLabel>
                <Input type='file' p='0.3rem' focusBorderColor="#48C9B0" name='profile_ur' onChange={handleImageChange}/>
              </FormControl>

              <ModalFooter>
              <Button type='submit' colorScheme='#48C9B0' mr={3} color='' bgColor='#48C9B0'>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>

              </form>
            </ModalBody>
           
          </ModalContent>
        </Modal>
    </>  
)}
export default EditProfileModal;