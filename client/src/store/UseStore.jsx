import create from 'zustand'

const useStore = create((set) => ({
   loggedInUser: '' || localStorage.getItem('loggedInUser') ,     //username initially empty
   setLoggedInUser: (user) => {
      set({loggedInUser: user}),
      localStorage.setItem('loggedInUser', user)   //persist the username
   },

   randomColor: '',    //user profile
   setRandomColor: (color) => set({randomColor: color}),

   accessToken: '' || localStorage.getItem('accessToken'),       // access token
   setAccessToken: (token) => {
      set({accessToken: token})
      localStorage.setItem('accessToken', token)
   },

   userId: '' || localStorage.getItem('userId'),       // user id
   setUserId: (id) => {
      set({'userId': id})
      localStorage.setItem('userId', id)
   },

   profileUrl: '' || localStorage.getItem('profileUrl'),       // profile url
   setProfileUrl: (url) => {
      set({profileUrl: url})
      localStorage.setItem('profileUrl', url)
   }

}));
export default useStore;