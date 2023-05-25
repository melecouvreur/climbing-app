import {React, useState, useEffect} from "react";
import { useLocation} from "react-router-dom";
import "../App.css"
import NavOptionOne from "./NavOptionOne";
import NavOptionTwo from "./NavOptionTwo";

//re-usable component
function Navbar() {

let location = useLocation()
const [navBar, setNavBar] = useState()

useEffect(() => {
    if (location.pathname === "/setup") {
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
        
    )
}

export default Navbar;
