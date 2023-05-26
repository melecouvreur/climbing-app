import {React, useState, useEffect} from "react";
import { useLocation} from "react-router-dom";
import "../App.css"
import NavFullOption from "./NavFullOption";
import NavSetUpOption from "./NavSetUpOption";
import NavAuthOption from "./NavAuthOption";

//re-usable component
function Navbar() {

let location = useLocation()
const [navBar, setNavBar] = useState()


useEffect(() => {
    if (location.pathname === "/") {
        setNavBar(<NavAuthOption/>);
    }
    else if (location.pathname === "/private/setup") {
      setNavBar(<NavSetUpOption/>);
    }
    else {
      setNavBar(<NavFullOption/>);
    }
  }, [location.pathname]);

    return (
        <div className="flex-row">
        <div> {navBar} </div>
        </div>
        
    )
}

export default Navbar;
