import React from "react";
import "../App.css"

function Preferences( {location, setLocation, preferences, setPreferences, daysOfWeek, getRecommendations, navigate, setDays, setSelected }) {

//Updates props in 'preferences {}'
const handleInputChange = (event) => {
  const value = event.target.value;
  const name = event.target.name;

  setPreferences((state) => ({
    ...state,
  [name]: value,}
  ))
  }

//Allows user to edit location inititally fetched via external geolocation api
const handleLocationChange = (e) => {
  setLocation(e.target.value);
  e.preventDefault();
    }

//sets true/false status for lead prop in 'preferences {}'
const setLead = () => {
  setSelected(preferences.lead = !preferences.lead)
  setPreferences((state) => ({
      ...state}))
  //console.log(settings)
  }

//Toggles checked/unchecked prop of selected days in 'daysOfWeek []'
//pushes "checked days" in 'days []' via setDays()
//'days []' => obj.req for getRecommendations function
// NB - pushes value of name (string) in 'days []' only. 
const handleDaysChange = (d) => {
  setSelected(d.selected = !d.selected)
    //console.log(daysOfWeek)
    //console.log(d)
  setDays(() => (daysOfWeek.filter((d) => d.selected === true).map(d => d.name)))
    //console.log(days)
  }

const handleSubmit = (e) => {
  e.preventDefault();
  getRecommendations()
  navigate("/matches")
}

  return (

    <div className="bg-1 d-flex p-4 justify-content-center text-left">

      <form 
      className="p-form align-self-center"
      onSubmit={handleSubmit}>


      <div className="form-row px-4 pt-4">
         <div className="form-group col-md-6 px-2">
            <label> Location </label>
            <input
              type="text"
              value={location}
              placeholder="Set location"
              className="form-control"
              onChange={(e) => handleLocationChange(e)}
            />
         </div>

           <div className="form-group col-md-6 px-2">
            <label> Level </label>
            <select 
              className="form-control"
              id="level"
              type="text"
              name="level"
              value={preferences.level}
              placeholder="Set level"
              onChange={(e) => handleInputChange(e)}
              >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            </div>
          </div>
         

          <div className="form-group row px-2 m-2 list-group-horizontal">
          {daysOfWeek.map(d => (
            <div 
            key={d.name}> 
            <label className="px-2"> {d.name} </label>
            <div className="col">
            <input
            type="checkbox"
            name="days"
            value={d.name}
            checked={d.checked}
            className="m-2 px-2 control-input list-group-item flex-fill"
            onChange={() => handleDaysChange(d)}/>
            </div>
            </div>
            ))}
          </div>

          <div className="form-row px-2">
          <div className="form-group col-md-6 px-3">
          <label> Gender </label>
            <select 
              className="form-control"
              id="gender"
              type="text"
              name="gender"
              value={preferences.gender}
              placeholder="Set level"
              onChange={(e) => handleInputChange(e)}
              >
              <option>Male</option>
              <option>Female</option>
              <option>Non-binary</option>
              <option>Trans</option>
            </select>
            </div>
            </div>

            <div className="form-group form-check col-md-6 px-4 pt-2">
            <label> Lead certified </label>
            <input 
            type="checkbox" 
            className="form-check-input m-2 form-check-inline p-2" 
            name="lead"
            value={preferences.lead}
            checked={preferences.lead === true}
            onChange={() => setLead(preferences.lead)}
            />
            </div>
        
       
          <div className="form-row justify-content-center">
          <button className="btn btn-m btn-warning">Submit</button>
          </div>

      </form>

    </div>
  );
}

export default Preferences;
