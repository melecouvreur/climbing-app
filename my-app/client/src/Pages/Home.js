import React from "react";
import "../App.css"
import logo from "../Images/logo.png"
function Home() {

return (
    <div className="bg-4 d-flex flex-column h-100 w-100 p-3 justify-content-center">

      <div className="align-self-center p-5">
      <img
      className="home-logo" 
      src={logo}
      alt="logo"/>
      </div>


       <div className="align-self-center p-5">
        <p className="display-4 strapline font-italic"> 
        "Get matched with a belay partner" </p>
       </div>



       </div>
  )
}

export default Home;
