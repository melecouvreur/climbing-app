import React from "react";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";

function StepFour(props) {

let {climbingCert} = useContext(UserContext)
 
    function handleStepFourSubmit(e) {
        e.preventDefault();
        props.onSubmit()
        console.log("Step Four completed");
      }

  return (
    <div className="justify-content">

        <h2> Step 4 </h2>

    
        <form onSubmit={handleStepFourSubmit}>

        {climbingCert.map(c => (
            <div
            key={c.name}
            className="form-group col-md-4 px-2">
            <label> {c.name} </label>
            <input
            type="checkbox" 
            className="m-1 control-input list-group-item flex-fill"
            name="cert"
            value={c.name}
            checked={c.checked}
            placeholder="Set certifications"
            onChange={() => props.handleCertChangeCB(c)}
              >
            </input>
            </div> ))}

        <button className="btn btn-m btn-warning">Submit
        </button>
        </form>

    </div>
     
  );
} 

export default StepFour;