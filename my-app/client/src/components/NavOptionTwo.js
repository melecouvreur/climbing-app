import {React, useState} from "react";
import { NavLink, useLocation} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import logo from "../Images/logo.png"
import "../App.css"

//re-usable component replicated across pages nested in PrivateRoute
function NavOptionTwo(props) {

let location = useLocation()
let {navigate, logout} = useContext(UserContext)

let activeClassName = props.activeClassName

const [isLoggedIn, setIsLoggedIn] = useState(true)

    return (
        <div className="flex-row">
       
        <div>
        <NavLink to="home">
        <img
        className="nav-logo m-2" 
        src={logo}
        alt="logo"
        onClick={() => navigate("/home")}/> 
        </NavLink>
        </div>
      
        <nav className="nav navbar nav-masthead p-2">
    
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
    
        </div>
        
    )
}

export default NavOptionTwo;
