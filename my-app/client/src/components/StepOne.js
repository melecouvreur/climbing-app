import React from "react";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";

function StepOne(props) {

    let {profile, setProfile, userId, climbingCert, certifications, setCert, location, setLocation, days, setDays, daysOfWeek, setSelected} = useContext(UserContext)
 
    function handleStepOneSubmit(e) {
        e.preventDefault();
        props.onSubmit()
        console.log("Step One completed");
      }

  return (
    <div className="justify-content">

        <h2> Step 1 </h2>

        <div className="form-group col-md-4 px-2">
          <label> Gender </label>
            <select 
              className="form-control"
              id="gender"
              type="text"
              name="gender"
              value={profile.gender}
              placeholder="Set level"
              onChange={(e) => props.handleInputChangeCB(e)}
              >
              <option>Male</option>
              <option>Female</option>
              <option>Non-binary</option>
              <option>Trans</option>
            </select>
            </div>

            <div className="form-group col-md-4 px-2">
          <label> Pronouns </label>
            <select 
              className="form-control"
              id="pronouns"
              type="text"
              name="pronouns"
              value={profile.pronouns}
              placeholder="Set pronouns"
              onChange={(e) => props.handleInputChangeCB(e)}
              >
              <option>She/Her</option>
              <option>He/Him</option>
              <option>They/Them</option>
            </select>
            </div>

            <div className="form-group col-md-6 px-2">
            <label> Location </label>
            <input
              type="text"
              value={location}
              placeholder="Set location"
              className="form-control"
              onChange={(e) => props.handleLocationChangeCB(e)}
            />
         </div>

        <form onSubmit={handleStepOneSubmit}>

        <button className="btn btn-m btn-warning">Submit
        </button>
        </form>

    </div>
     
  );
} 

export default StepOne;