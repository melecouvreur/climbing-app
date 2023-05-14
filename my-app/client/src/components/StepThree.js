import React from "react";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";

function StepThree(props) {
   
    let {daysOfWeek} = useContext(UserContext)

     function handleStepThreeSubmit(e) {
        e.preventDefault();
        props.onSubmit()
        console.log("Step Three completed");
      }

  return (
    <div className="justify-content">

    <h2> Step 3 </h2>


    <form onSubmit={handleStepThreeSubmit}>

    <div className="form-group row px-2 m-2 list-group-horizontal">
          {daysOfWeek.map(d => (
            <div 
            key={d.name}> 
            <label className="px-1"> {d.name} </label>
            <div className="col">
            <input
            type="checkbox"
            name="days"
            value={d.name}
            checked={d.checked}
            className="m-1 control-input list-group-item flex-fill"
            onChange={() => props.handleDaysChangeCB(d)}/>
            </div>
            </div>
            ))}
          </div>

        <button className="btn btn-m btn-warning">Submit
        </button>
        </form>
     
    </div>
     
  );
} 

export default StepThree;