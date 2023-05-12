import React from "react";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";

function StepThree(props) {
   
    let {profile, setProfile, userId, climbingCert, certifications, setCert, location, setLocation, days, setDays, daysOfWeek, setSelected} = useContext(UserContext)

     function handleStepThreeSubmit(e) {
        e.preventDefault();
        props.onSubmit()
        console.log("Step Three completed");
      }


  return (
    <div className="justify-content">

    <h2> Step 3 </h2>


    <form onSubmit={handleStepThreeSubmit}>

        <button className="btn btn-m btn-warning">Submit
        </button>
        </form>
     
    </div>
     
  );
} 

export default StepThree;