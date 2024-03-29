import {React} from "react";
import { NavLink} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import logo from "../Images/logo.png"
import useProvideAuth from "../Hooks/useProvideAuth";
import "../App.css"

//re-usable component replicated across pages nested in PrivateRoute
function NavOptionOne(props) {

let {getRecommendations,navigate} = useContext(UserContext)
const auth = useProvideAuth();

let activeClassName = props.activeClassName

    return (
        <div className="flex-row">
       
        <div>
        <NavLink to="private/home">
        <img
        className="nav-logo m-2" 
        src={logo}
        alt="logo"
        onClick={() => navigate("private/home")}/> 
        </NavLink>
        </div>
      
        <nav className="nav navbar nav-masthead p-2">
        
        <div className="align-self-start">
           <NavLink 
            to="private/settings"
            className={({isActive}) => 
            isActive ? activeClassName : undefined }>
           <span className="nav-item material-symbols-outlined m-2 p-1 icon">
           settings</span></NavLink>
        </div>
    
        <div className="align-self-center">
            <NavLink 
            to="private/preferences"
            className={({isActive}) => 
            isActive ? activeClassName : undefined }
            ><button
            className="text-white btn m-1">
            myPreferences</button></NavLink>
    
            <NavLink to="private/profile"
             className={({isActive}) => 
             isActive ? activeClassName : undefined }
             ><button
            className="text-white btn m-1" >
            myProfile </button></NavLink>
    
           {/*Switches to different view AND fetches new recommendations*/}
            <NavLink to="private/matches"
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
            onClick={() => auth.logout()} 
            className="text-white btn m-1">
            logOut </button></NavLink>
       
    
           <div className="align-self-right">
            <NavLink 
            to="private/home"
            className={({isActive}) => 
            isActive ? activeClassName : undefined }>
           <span className="material-symbols-outlined m-2 p-1 icon">
           home</span></NavLink>
           </div>
        </nav>
    
        </div>
        
    )
}

export default NavOptionOne;
