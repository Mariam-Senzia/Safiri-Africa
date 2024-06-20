import React from "react";
import { Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,FormControl,FormLabel,Input,ModalFooter,useDisclosure } from "@chakra-ui/react";


const Post = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

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
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
    )
}
export default Post;