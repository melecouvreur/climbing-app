import React, { useState, useEffect} from "react";

function Settings( {getRecommendations, navigate, settings, setSettings, handleChangeView, days, setDays, setChecked }) {

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
  handleChangeView("Profile")
  navigate("/profile")
}

useEffect(() => {
//setDays();
//getRecommendations()
},[])
 
  return (

    <div className="d-flex h-100 w-100 p-3 justify-content-center">

      <form onSubmit={handleSubmit}>
      <div className="d-flex p-3 m-1">

      <div className="grid p-3">

          <div className="form-group row p-3">
          <label className="col-3 p-3"> First name </label>
          <div className="col-9 p-3">
          <input
            type="text"
            name="firstName"
            value={settings.firstName}
            placeholder="Type first name"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
          </div>
         

          <label className="col-3 p-3"> Last name </label>
          <div className="col-9 p-3">
          <input
            type="text"
            name="lastName"
            value={settings.lastName}
            placeholder="Type last name"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
          </div>
          </div>

          <div className="form-group row p-3">
          <label className="col-3 p-3"> User name </label>
          <div className="col-9 p-3">
          <input
            type="text"
            name="userName"
            value={settings.userName}
            placeholder="Type user name"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
          </div>


          <label className="col-3 p-3"> Email </label>
          <div className="col-9 p-3">
          <input
            type="email"
            name="email"
            value={settings.email}
            placeholder="Type email"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
          </div>
          </div>

          <div className="form-group row p-3">
          <label className="col-3 p-3"> Bio </label>
          <div className="col-9 p-3">
          <input
            type="text"
            name="bio"
            value={settings.bio}
            placeholder="Type bio"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
          </div>
        


          <label className="col-3 p-3"> Image </label>
          <div className="col-9 p-3">
          <input
            type="text"
            name="img"
            value={settings.img}
            placeholder="https://example.com/users/"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
          </div>
        </div>

         <div className="form-group row p-3">
          <label className="col-3 p-3"> Location </label>
          <div className="col-9 p-3">
          <input
            type="text"
            name="location"
            value={settings.location}
            placeholder="Set location"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
          </div>
         

          
           <label className="col-3 p-3"> Level </label>
           <div className="col-9 p-3">
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
       
          <div className="form-group row-md p-3">
          <button className="btn btn-m btn-warning">Submit</button>
          </div>

        
      </div>
      </div>
      </form>

    </div>
  );
}

export default Settings;
