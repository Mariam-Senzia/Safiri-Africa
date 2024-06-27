import React from "react";
import { Alert,AlertIcon,AlertTitle,AlertDescription,Box,Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PostMessage = () => {
    return (
        <Box width='40rem' ml='27rem' mt='15rem'>
            <Alert
            status='success'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
            >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                Post sucessful!
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
                Your destination was posted sucessfully. Explore other amazing places shared by fellow travelers!
            </AlertDescription>

            <Link to='/'>
            <Text color='#FF4500' mt='1rem'>Back to Home</Text>
            </Link>
            </Alert>
                       
        </Box>
    )
}
export default PostMessage;