import react,{useState, useEffect} from 'react'
import Homepage from './pages/HomePage'
import HomeDefault from './pages/HomeDefault'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import ExploreCountryDetails from './components/explore/ExploreCountryDetails'
import PostMessage from './components/home/PostMessage'
import SignUp from './components/SignUp/SignUp'
import PostDestinations from './components/home/PostDestinations'
import UpdateProfile from './components/profile/UpdateProfile'
import FilteredDestinations from './components/home/FilteredDestinations'


function App() {
  const [destinations,setDestinations] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/destinations')
    .then((res) => res.json())
    .then((data) => setDestinations(data))
  },[])

  return (
    <>
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path={'/'} element={<Homepage />} />
          <Route path={'/homeDefault'} element={<HomeDefault destinations={destinations}/>}/>
          <Route path={'/explore'} element={<Explore />}/>
          <Route path={'/profile'} element={<Profile />}/>
          <Route path={'/signIn'} element={<SignIn />}/>
          <Route path={'/exploreCountryDetails/:countryName'} element={<ExploreCountryDetails />}/>
          <Route path={'/postMessage'} element={<PostMessage />} />
          <Route path={'/signUp'} element={<SignUp />}/>
          <Route path={'/postDestinations'} element={<PostDestinations />} />
          <Route path={'/updateProfile'} element={<UpdateProfile />} />

        </Routes>
      </Router>
    </ChakraProvider>
    </>
  )
}

export default App
