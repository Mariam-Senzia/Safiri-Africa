import React from "react";
import { Button,Modal,ModalOverlay,ModalHeader,ModalCloseButton,ModalFooter,ModalContent,ModalBody,Flex,useDisclosure} from "@chakra-ui/react";
import {FacebookShareButton,TwitterShareButton,WhatsappShareButton,PinterestShareButton,TelegramShareButton, FacebookIcon,TwitterIcon,WhatsappIcon,PinterestIcon, TelegramIcon,} from "react-share"


const ShareModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const shareUrl = window.location.href //fetches current url of the page
    const mediaUrl = window.location.href //fetches current url of the page;pinterest

    return (
    <>
      <Button onClick={onOpen} bgColor='white'  color='' >Share</Button>

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent mt='24.5rem' ml='28rem' width=''>
          <ModalHeader>Share to</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap='2' mt='-1rem' mb='1rem'>
                <FacebookShareButton url={shareUrl}>
                    <FacebookIcon borderRadius='50px' size='2rem' />
                </FacebookShareButton>

                <TwitterShareButton url={shareUrl}>
                    <TwitterIcon borderRadius='50px' size='2rem' />
                </TwitterShareButton>

                <WhatsappShareButton url={shareUrl}>
                    <WhatsappIcon borderRadius='50px' size='2rem' />
                </WhatsappShareButton>

                <TelegramShareButton url={shareUrl}>
                    <TelegramIcon borderRadius='50px' size='2rem'/>
                </TelegramShareButton>

                <PinterestShareButton url={shareUrl} media={mediaUrl}>
                    <PinterestIcon borderRadius='50px' size='2rem' />
                </PinterestShareButton>
            </Flex>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  )
}
export default ShareModal;