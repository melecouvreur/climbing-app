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
const setTop = () => {
  setChecked(settings.top = !settings.top)

  setSettings((state) => ({
    ...state}))
  console.log(settings)
  }

const setLead = () => {
  setChecked(settings.lead = !settings.lead)

  setSettings((state) => ({
      ...state}))
  console.log(settings)
  }

//sets status days in daysOfWeekArray to checked/unchecked (true/false)
//setsDays to checked/true days from DaysofWeek array to create obj.req array
//push name prop (string) in days array only
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
  handleChangeView("List")
  navigate("/matches")
}

useEffect(() => {
//setDays()
//getRecommendations()
//console.log(days)
}, [])

  return (

    <div className="d-flex h-100 w-100 p-3 text-center">
     {/*<h2 className="text-center"> Settings </h2>*/}

      <form onSubmit={handleSubmit}>
      <div className="grid p-3 text-center">

      <div className="row">

         <div className="row p-3">
          <label> Location </label>
          <input
            type="text"
            name="location"
            value={settings.location}
            placeholder="Set location"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
          </div>

           <div className="row p-3">
           <label> Level </label>
           <select 
            className="form-control"
            id="level"
            type="text"
            name="level"
            value={settings.level}
            placeholder="Set level"
            onChange={(e) => handleInputChange(e)}
            >
            <option> Beginner </option>
            <option> Intermediate </option>
            <option> Advanced </option>
          </select>
          </div>

        <div className="row p-3">
           
           <div className="checkbox">
           <label className="p-2"> Top-rope </label>
           <input 
           type="checkbox" 
           className="custom-input" 
           name="top"
           value={settings.top}
           checked={settings.top === true}
           onChange={() => setTop(settings.top)}
           />
          </div>


          <div className="custom-control custom-checkbox">
           <label className="p-2"> Lead </label>
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
        
         <div className="row p-3 list-group-horizontal">
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
       
          <div className="row-md p-3">
          <button className="btn btn-m btn-warning">Submit</button>
          </div>

        
      </div>
      </div>
      </form>

    </div>
  );
}

export default Preferences;
