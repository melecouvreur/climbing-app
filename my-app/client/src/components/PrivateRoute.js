import {React, useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
//import { useContext } from 'react'; 
//import {UserContext}  from './UserContext'

function PrivateRoute() {

const [message, setMessage] = useState("");
const [isLoggenIn, setIsLoggedIn] = useState(true)

//const changeId = (newId) => {
//setUserId(newId)
//}

useEffect(() => {
    requestData();
      },[]);

//sets isLoggedIn based on whether token is present in header or not aka user is logged in
//if isLoggedIn = true shows pages nested in PrivateRoute (see App.js) via <Outlet/> + <NavBar/> comp
//if false, show error (i.e. unauthorized) on screen
const requestData = async () => {
        let options = {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }; 
        try {
          const result = await fetch("/private", options);
          const data = await result.json();
    
          if (!result.ok) {
          console.log(data.error);
          setIsLoggedIn(false)
          setMessage(data.error)
          //console.log(isLoggenIn)
        }
          else {
          console.log(data.message);
          setIsLoggedIn(true)
          console.log("logged-in user:" , data.id, data.name)
        }
    
        } catch (error) {
          console.log(error);
        }
      };

return (
        <div> {!isLoggenIn ? 
        (<h2 className="d-flex p-4 justify-content-center align-self-center pt-5"> {message} </h2>)
        :  (<> <Navbar/> <Outlet/>  </>) } 
        </div>
    )
}

export default PrivateRoute;
