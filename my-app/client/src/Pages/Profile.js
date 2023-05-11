import {React, useEffect, useState} from "react";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import "../App.css"

function Profile() {

let {profile, getRecommendations, navigate, location} = useContext(UserContext)


//Fetches recommended climbers from db and sets 'recommendations []'
//Switches to myMatches view where user sees recommendations 
const findPartners = () => {
    getRecommendations()
    navigate("/matches")
  }

  return (

<div className="bg-2 d-flex justify-content-center align-items-center">
       
  <div 
    className="card">

    <div className="user text-center">
     <div className="profile">
      <img 
       //fix image local storage
        src={profile.avatar} 
        alt="profile_avatar"
        className="rounded-circle" 
        width="100"/>
    </div>
   </div>

  <div className="mt-5 text-center">
   <h4 className="p-2 mb-0"> {profile.username} </h4>
   <span className="d-block mb-2"> {profile.pronouns}</span>

   <button 
   className="btn btn-warning btn-sm follow"
   onClick={findPartners}>
    Get Matched
   </button>

   <div className="d-flex justify-content-between align-items-center mt-4 px-4">
       <span className="bio col-12 text-center">{profile.bio}
      </span>
   </div>

   <div className="d-flex justify-content-between align-items-center mt-4 px-4">
     <div className="stats">
       <h6 className="mb-0"> Location </h6>
       <span> {location}
       </span>
     </div>

     <div className="stats">
       <h6 className="mb-0"> Level </h6>
       <span> {profile.level} 
       </span>
     </div>
    
     </div>

</div>
</div> 
</div>
  );
}

export default Profile;
