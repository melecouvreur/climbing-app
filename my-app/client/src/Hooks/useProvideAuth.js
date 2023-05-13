import { useState } from "react";
//import axios from "axios";

// this is a custom hook that provides a reactive state to know if the user is authenticated or not
// it also provides two functions to login and logout
// and keeps the user info for use throughout the app
function useProvideAuth() {

const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
const [currentUser, setCurrentUser] = useState({name: "you", email: "you@something.com"});

  //FIXME: useEffect to load user data every time page reloads (also needs a GET /user route on backend)

  /*
  const login = async (user) => {
    try {
      const { data } = await axios.post("/login", user);

      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      setCurrentUser(data.user);
    } 
    catch (err) {
      throw err.response.data.message;
    }
  };
*/
  
  const login = async (user) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        const { token, user } = await response.json();
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        setCurrentUser(user);
      } else {
        const { message } = await response.json();
        throw message;
      }
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(null);
    setCurrentUser({});
  };

  return {
    isLoggedIn,
    login,
    logout,
    currentUser
  };
}

export default useProvideAuth;
