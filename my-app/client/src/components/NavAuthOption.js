import {React} from "react";
import { NavLink} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import logo from "../Images/logo.png"
import "../App.css"

//re-usable component replicated across pages nested in PrivateRoute
function NavOptionThree() {

let {navigate} = useContext(UserContext)

    return (
        <div className="flex-row">
       
        <div>
        <NavLink to="private/home">
        <img
        className="nav-logo m-2" 
        src={logo}
        alt="logo"/> 
        </NavLink>
        </div>
    
        </div>
        
    )
}

export default NavOptionThree;
