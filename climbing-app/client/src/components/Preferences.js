import React, { useState, useEffect} from "react";
import "./Profile.css"

function Preferences( {preferences, setPreferences, daysOfWeek, getRecommendations, navigate, settings, setSettings, handleChangeView, days, setDays, setChecked }) {



//handles form input for fields != checkbox
const handleInputChange = (event) => {
  const value = event.target.value;
  const name = event.target.name;

  setPreferences((state) => ({
    ...state,
  [name]: value,}
  ))
  }

//sets true/false status for top and rope fields
//updates settings
//TO DO - refactor

const setLead = () => {
  setChecked(preferences.lead = !preferences.lead)
  setPreferences((state) => ({
      ...state}))
  console.log(settings)
  }

//Toggles checked/unchecked prop of days in daysOfWeek Array 
//setsDays to "checked days" from daysOfWeek array to days Array
//days array = obj.req for getRecommendations function
//NB - pushes name prop (string) in days array only
const handleDaysChange = (d) => {
  setChecked(d.checked = !d.checked)
    console.log(daysOfWeek)
    console.log(d)
  setDays(() => (daysOfWeek.filter((d) => d.checked === true).map(d => d.name)))
  console.log(days)
  }

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(days)
  getRecommendations()
  navigate("/matches")
}

useEffect(() => {
//setDays()
//getRecommendations()
}, [])

  return (

    <div className="bg-1 d-flex p-4 justify-content-center text-left">

      <form onSubmit={handleSubmit}>

      <div>
        <p>  </p>
      </div>

      <div className="form-row">
         <div className="form-group col-md-6 p-3">
            <label> Location </label>
            <input
              type="text"
              name="location"
              value={preferences.location}
              placeholder="Set location"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
            />
         </div>

           <div className="form-group col-md-6 p-3">
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
         

          <div className="form-group row p-2 m-2 list-group-horizontal">
          {daysOfWeek.map(d => (
            <div 
            key={d.name}> 
            <label className="p-1"> {d.name} </label>
            <div className="col">
            <input
            type="checkbox"
            name="days"
            value={d.name}
            checked={d.checked}
            className="m-2 control-input list-group-item flex-fill"
            onChange={() => handleDaysChange(d)}/>
            </div>
            </div>
            ))}
          </div>

          <div className="form-row p-3">
          <div className="form-group col-md-6 p-2">
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

            <div className="form-group col-md-6 p-2">
            <label> Lead </label>
            <input 
            type="checkbox" 
            className="form-row m-2" 
            name="lead"
            value={preferences.lead}
            checked={preferences.lead === true}
            onChange={() => setLead(preferences.lead)}
            />
            </div>
          </div>
       
          <div className="form-row justify-content-center">
          <button className="btn btn-m btn-warning">Submit</button>
          </div>

      </form>

    </div>
  );
}

export default Preferences;
