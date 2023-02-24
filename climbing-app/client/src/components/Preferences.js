import React, { useState, useEffect} from "react";

function Preferences( {getRecommendations, navigate, settings, setSettings, handleChangeView, days, setDays, setChecked }) {

const [daysOfWeek, setDaysOfWeek] = useState(
  [
    {name: "Monday", checked: false} ,
    {name: "Tuesday", checked: false} ,
    {name: "Wednesday", checked: false} ,
    {name: "Thursday", checked: false} ,
    {name: "Friday", checked: false} ,
    {name: "Saturday", checked: false} ,
    {name: "Sunday", checked: false}
  ])

//handles form input for fields != checkbox
const handleInputChange = (event) => {
  const value = event.target.value;
  const name = event.target.name;

  setSettings((state) => ({
    ...state,
  [name]: value,}
  ))
  }

//sets true/false status for top and rope fields
//updates settings
//TO DO - refactor

const setLead = () => {
  setChecked(settings.lead = !settings.lead)
  setSettings((state) => ({
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
  handleChangeView("List")
  navigate("/matches")
}

useEffect(() => {
//setDays()
//getRecommendations()
}, [])

  return (

    <div className="d-flex p-3 justify-content-center">
     {/*<h2 className="text-center"> Settings </h2>*/}

      <form onSubmit={handleSubmit}
      className="d-flex p-3 m-1">

      <div className="grid p-3">

         <div className="form-group row p-3">
          <label className="col-3"> Location </label>
          <div className="col-9">
          <input
            type="text"
            name="location"
            value={settings.location}
            placeholder="Set location"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
          </div>
          </div>

           <div className="form-group row p-3">
           <label className="col-3"> Level </label>
           <div className="col-9">
           <select 
            className="form-control"
            id="level"
            type="text"
            name="level"
            value={settings.level}
            placeholder="Set level"
            onChange={(e) => handleInputChange(e)}
            >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          </div>
          </div>
         

         <div className="form-group row p-3 m-3 list-group-horizontal">
         {daysOfWeek.map(d => (
          <div key={d.name}> 
          <label className="p-1"> {d.name} </label>
          <input
          type="checkbox"
          name="days"
          value={d.name}
          checked={daysOfWeek.checked}
          className="p-1 control-input list-group-item flex-fill"
          onChange={() => handleDaysChange(d)}/>
          </div>
          ))}
          </div>

          <div className="form-group row p-3">
          <div className="custom-control custom-checkbox">
           <label className="p-3"> Lead </label>
           <input 
           type="checkbox" 
           className="custom-input" 
           name="lead"
           value={settings.lead}
           checked={settings.lead === true}
           onChange={() => setLead(settings.lead)}
           />
          
          </div>


        
          </div>
       
          <div className="form-group row-md p-3">
          <button className="btn btn-m btn-warning">Submit</button>
          </div>

       
      </div>
      </form>

    </div>
  );
}

export default Preferences;
