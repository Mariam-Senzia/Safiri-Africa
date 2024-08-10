import create from 'zustand'

const useStore = create((set) => ({
   loggedInUser: '' || localStorage.getItem('loggedInUser') ,     //username initially empty
   setLoggedInUser: (user) => {
      set({loggedInUser: user}),
      localStorage.setItem('loggedInUser', user)   //persist the username
   },

   randomColor: '',    //user profile
   setRandomColor: (color) => set({randomColor: color}),

}));
export default useStore;