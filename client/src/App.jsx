import react,{useState, useEffect} from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import ExploreCountryDetails from './components/explore/ExploreCountryDetails'
import PostMessage from './components/home/PostMessage'
import SignUp from './components/SignUp/SignUp'
import PostDestinations from './components/home/PostDestinations'

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

          <Route path={'/'} element={<Home destinations={destinations}/>}/>
          <Route path={'/explore'} element={<Explore />}/>
          <Route path={'/profile'} element={<Profile />}/>
          <Route path={'/signIn'} element={<SignIn />}/>
          <Route path={'/exploreCountryDetails/:countryName'} element={<ExploreCountryDetails />}/>
          <Route path={'/postMessage'} element={<PostMessage />} />
          <Route path={'/signUp'} element={<SignUp />}/>
          <Route path={'/postDestinations'} element={<PostDestinations />} />

        </Routes>
      </Router>
    </ChakraProvider>
    </>
  )
}

export default App
