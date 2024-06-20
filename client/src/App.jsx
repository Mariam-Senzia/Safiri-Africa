import react,{useState, useEffect} from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import SearchDestination from './components/home/SearchDestination'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import ExploreCountryDetails from './components/explore/ExploreCountryDetails'

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
          <Route path={'/searchDestination'} element={<SearchDestination />}/>
          <Route path={'/explore'} element={<Explore />}/>
          <Route path={'/profile'} element={<Profile />}/>
          <Route path={'/signIn'} element={<SignIn />}/>
          <Route path={'/exploreCountryDetails/:countryName'} element={<ExploreCountryDetails />}/>

        </Routes>
      </Router>
    </ChakraProvider>
    </>
  )
}

export default App
