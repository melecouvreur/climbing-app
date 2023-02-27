import React, { useState, useEffect} from "react";
import "./Profile.css"

function Settings( {daysOfWeek, getRecommendations, navigate, settings, setSettings, days, setDays, setChecked }) {



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


//Toggles checked/unchecked prop of days in daysOfWeek []
//pushes "checked days" in days [] via SetDays()
//new days [] => obj.req for getRecommendations function
//NB - pushes name prop (string) in days [] only
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
  navigate("/profile")
}

useEffect(() => {
//setDays();
//getRecommendations()
},[])
 
  return (

  <div className="bg-1 p-4 d-flex justify-content-center text-left">

    <form 
    onSubmit={handleSubmit}
    className="py-2"
    >

    <div className="form-row">
        <div className="form-group col-md-6 p-2">
            <label> First name </label>
            <input
              type="text"
              name="firstName"
              value={settings.firstName}
              placeholder="Type first name"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
            />
        </div>
          
        <div className="form-group col-md-6 p-2">
            <label> Last name </label>
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
    
    <div className="form-row">
       <div className="form-group col-md-6 p-2">
            <label> User name </label>
            <input
              type="text"
              name="userName"
              value={settings.userName}
              placeholder="Type user name"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
            />
       </div>
     
       <div className="form-group col-md-6 p-2">
          <label> Email </label>
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
        
      <div className="form-row">
         <div className="form-group col-md-6 p-2">
            <label> Image </label>
            <input
              type="text"
              name="img"
              value={settings.img}
              placeholder="https://example.com/users/"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
            />
        </div>

         <div className="form-group col-md-6 p-2">
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

          <div className="form-group col-md-4 p-2">
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
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          </div>

          <div className="form-group col-md-4 p-2">
          <label> Gender </label>
            <select 
              className="form-control"
              id="gender"
              type="text"
              name="gender"
              value={settings.gender}
              placeholder="Set level"
              onChange={(e) => handleInputChange(e)}
              >
              <option>Male</option>
              <option>Female</option>
              <option>Non-binary</option>
              <option>Trans</option>
            </select>
            </div>

          <div className="form-group col-md-4 p-2">
            <label> Lead </label>
            <input 
            type="checkbox" 
            className="form-row m-2" 
            name="lead"
            value={settings.lead}
            checked={settings.lead === true}
            onChange={() => setLead(settings.lead)}
            />
            </div>

        </div>
  
        <div className="form-row">
          <div className="form-group col-md-12 p-2">
            <label> Bio </label>
            <input
              type="text"
              name="bio"
              value={settings.bio}
              placeholder="Type bio"
              className="form-control p-5"
              onChange={(e) => handleInputChange(e)}
            />
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
        
          <div className="form-row justify-content-center">
            <button className="btn btn-m btn-warning">Submit
            </button>
          </div>

     
      </form>

    </div>
  );
}

export default Settings;
