import React from "react";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";

function StepTwo(props) {
 
    let {profile, setProfile, userId, climbingCert, certifications, setCert, location, setLocation, days, setDays, daysOfWeek, setSelected} = useContext(UserContext)
  
    function handleStepTwoSubmit(e) {
        e.preventDefault();
        props.onSubmit()
        console.log("Step Two completed");
      }


    return (
    <div className="justify-content">

    <h2> Step 2 </h2>

    <form onSubmit={handleStepTwoSubmit}>

        <button className="btn btn-m btn-warning">Submit
        </button>
        </form>
     
    </div>
     
  );
} 

export default StepTwo;