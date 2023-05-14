import {React, useState, useEffect} from "react";
import { NavLink, useLocation} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import useProvideAuth from "../Hooks/useProvideAuth";
import logo from "../Images/logo.png"
import "../App.css"
import NavOptionOne from "./NavOptionOne";
import NavOptionTwo from "./NavOptionTwo";

//re-usable component replicated across pages nested in PrivateRoute
function Navbar() {

let location = useLocation()
const [navBar, setNavBar] = useState()

let {getRecommendations,navigate, logout} = useContext(UserContext)
const auth = useProvideAuth();

let activeClassName = "btn btn-sm btn-warning"


const [isLoggedIn, setIsLoggedIn] = useState(true)

useEffect(() => {
    if (location.pathname === "/private/setup") {
      setNavBar(<NavOptionTwo/>);
    }
    else {
      setNavBar(<NavOptionOne/>);
    }
  }, [location.pathname]);

    return (
        <div className="flex-row">
        <div> {navBar} </div>
        </div>
        /*
        <NavLink to="home">
        <img
        className="nav-logo m-2" 
        src={logo}
        alt="logo"
        onClick={() => navigate("/home")}/> 
        </NavLink>
        </div>
      
        <nav className="nav navbar nav-masthead p-2">
        
        <div className="align-self-start">
           <NavLink 
            to="settings"
            className={({isActive}) => 
            isActive ? activeClassName : undefined }>
           <span className="nav-item material-symbols-outlined m-2 p-1 icon">
           settings</span></NavLink>
        </div>
    
        <div className="align-self-center">
            <NavLink 
            to="preferences"
            className={({isActive}) => 
            isActive ? activeClassName : undefined }
            ><button
            className="text-white btn m-1">
            myPreferences</button></NavLink>
    
            <NavLink to="profile"
             className={({isActive}) => 
             isActive ? activeClassName : undefined }
             ><button
            className="text-white btn m-1" >
            myProfile </button></NavLink>
    
       
            <NavLink to="matches"
            className={({isActive}) => 
            isActive ? activeClassName : undefined }
            ><button
            onClick={() => getRecommendations} 
            className="text-white btn m-1">
            myMatches </button></NavLink>
        </div>
    
        <NavLink to="/"
            className={({isActive}) => 
            isActive ? activeClassName : undefined }
            ><button
            onClick={() => logout()} 
            className="text-white btn m-1">
            logOut </button></NavLink>
       
    
           <div className="align-self-right">
            <NavLink 
            to="home"
            className={({isActive}) => 
            isActive ? activeClassName : undefined }>
           <span className="material-symbols-outlined m-2 p-1 icon">
           home</span></NavLink>
           </div>
        </nav>
        </div>*/
        
    )
}

export default Navbar;
