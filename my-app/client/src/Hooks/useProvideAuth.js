import { useState } from "react";
import { useNavigate} from "react-router-dom";
//import axios from "axios";

// this is a custom hook that provides a reactive state to know if the user is authenticated or not
// it also provides two functions to login and logout
// and keeps the user info for use throughout the app
function useProvideAuth() {

const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
const [currentUser, setCurrentUser] = useState({name: "you", email: "you@something.com"});
const [isRegistered, setIsRegistered] = useState(false)
const [isSetUp, setSetUp] = useState(false)
const [message, setMessage] = useState("");

const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  })

const navigate = useNavigate() 

//if isRegistered = false register view & func will appear
const register = async () => {
    try {
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          };
      const result = await fetch("/register", options);
      const data  = await result.json();
      if (!result.ok) {
      setMessage(data.error);
      console.log(data.message) 
     } 
      else {
      console.log(data.message)
      //Sets registered status to true once successful & directs user to login
      setIsRegistered(true)
      setSetUp(false)
      console.log(isSetUp)
      
      }
     }
     catch (err) {
      console.log(err.message)
    }
  };



//FIXME: useEffect to load user data every time page reloads (also needs a GET /user route on backend)

  /*//Axios syntax
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
        isSetUp === false ? navigate("private/setup") : navigate("private/home")
        //navigate("/private/home");
        console.log("userdata from login", user)
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
    navigate("/")
  };

  return {
    isLoggedIn,
    login,
    register,
    logout,
    currentUser,
    credentials,
    setCredentials,
    message,
    isSetUp,
    setSetUp,
    isRegistered,
    setIsRegistered,
  };
}

export default useProvideAuth;
