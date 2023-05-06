import {React, useEffect, useState} from "react";
import "../App.css"

function Profile( {location, navigate, settings, getRecommendations}) {

const [profile, setProfile] = useState([])
//Fetches users from db based on level, gender, lead props in preferences {}, days [] & location
const getProfile = async () => {
  try {
    let results = await fetch("/profile");
    let user = await results.json();
    console.log(user)
    //if db query successful > fetches users get pushed into profile []
    setProfile((user) => ({...user}))
    //setProfile(user)
    console.log(profile)
    }
  catch (error) {
    console.log(error)
  } 
};

useEffect(() => {
  //getProfile((state) => ({
  //  ...state}
  //  ));
  getProfile()
}, []) 


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
        src={settings.img} 
        alt="profile_avatar"
        className="rounded-circle" 
        width="100"/>
    </div>
   </div>

  <div className="mt-5 text-center">
   <h4 className="p-2 mb-0"> {} </h4>
   <span className="d-block mb-2"> {}</span>

   <button 
   className="btn btn-warning btn-sm follow"
   onClick={findPartners}>
    Get Matched
   </button>

   <div className="d-flex justify-content-between align-items-center mt-4 px-4">
       <span className="bio col-12 text-center">{}
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
       <span> {} 
       </span>
     </div>
    
     </div>

</div>
</div> 
</div>
  );
}

export default Profile;
