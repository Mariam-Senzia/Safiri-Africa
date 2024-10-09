import React,{useState, useEffect} from 'react'
import Homepage from './pages/HomePage'
import HomeDefault from './pages/HomeDefault'
import { BrowserRouter as Router,Routes,Route,useNavigate } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import ExploreCountryDetails from './components/explore/ExploreCountryDetails'
import PostMessage from './components/home/PostMessage'
import SignUp from './components/SignUp/SignUp'
import PostDestinations from './components/home/PostDestinations'
import UpdateProfile from './components/profile/UpdateProfile'
import theme from './theme/customBreakpoints'
import protectedRoute from './routeprotection/protectedRoute'
// import { useNavigate } from 'react-router-dom'
import useStore from './store/UseStore'
import {jwtDecode} from 'jwt-decode'


function App() {
  const [destinations,setDestinations] = useState([]);
  const {accessToken} = useStore();
  const {loggedInUser} = useStore();
  const navigate = useNavigate();

  // console.log(accessToken)

 // Fetch destinations
  useEffect(() => {
    // fetch('http://127.0.0.1:5555/destinations')
    fetch('https://safiri-africa-api.onrender.com/destinations')
    .then((res) => res.json())
    .then((data) => setDestinations(data))
  },[])
  console.log(destinations)

  useEffect(() => {
    if(accessToken){
      // Decode the token to get user's identity
      const decodedToken = jwtDecode(accessToken);
      const tokenUsername = decodedToken.sub.name;

      console.log(decodedToken)
      console.log(tokenUsername)

      if(tokenUsername === loggedInUser){
        navigate('/homeDefault')
      }
     
    } else {
      navigate('/')
    }
  },[])

  return (
    <>
    <ChakraProvider theme={theme}>
      {/* <Router> */}
        <Routes>
          {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/homeDefault"
          element={
            <protectedRoute>
              <HomeDefault destinations={destinations} />
            </protectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <protectedRoute>
              <Explore />
            </protectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <protectedRoute>
              <Profile />
            </protectedRoute>
          }
        />
        {/* Add ProtectedRoute to other private routes similarly */}
        <Route
          path="/exploreCountryDetails/:countryName"
          element={
            <protectedRoute>
              <ExploreCountryDetails />
            </protectedRoute>
          }
        />
        <Route
          path="/postMessage"
          element={
            <protectedRoute>
              <PostMessage />
            </protectedRoute>
          }
        />
        <Route
          path="/postDestinations"
          element={
            <protectedRoute>
              <PostDestinations />
            </protectedRoute>
          }
        />
        <Route
          path="/updateProfile"
          element={
            <protectedRoute>
              <UpdateProfile />
            </protectedRoute>
          }
        />

        </Routes>
      {/* </Router> */}
    </ChakraProvider>
    </>
  )
}

export default App
