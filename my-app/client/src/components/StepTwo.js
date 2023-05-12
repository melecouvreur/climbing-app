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

   
    <div className="form-group col-md-4 px-2">
         <label> What level do you climb? </label>
           <select 
            className="form-control"
            id="level"
            type="text"
            name="level"
            value={profile.level}
            placeholder="Set level"
            onChange={(e) => props.handleInputChangeCB(e)}
            >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          </div>

        <button className="btn btn-m btn-warning">Submit
        </button>
        </form>
     
    </div>
     
  );
} 

export default StepTwo;