import React, { useState} from "react";

function Settings( {settings, setSettings, isChecked, setIsChecked, isTop, isLead, setIsTop, setIsLead, handleChangeView}) {

const [days, setDays] = useState([])


const [daysOfWeek, setDaysOfWeek] = useState(
  [
    {checked: false,
     name: "Monday"},
    {checked: false,
     name: "Tuesday"},
    {checked: false,
     name: "Wednesday"},
     {checked: false,
     name: "Thursday"},
     {checked: false,
      name: "Friday"},
     {checked: false,
      name: "Saturday"},
     {checked: false,
      name: "Sunday"}
    ]
)

const handleInputChange = (event) => {
  const value = event.target.value
  const name = event.target.name;
  setSettings((state) => ({
    ...state,
    [name]: value,}
  ))
  }

const handleCheck = () => {
  setIsChecked(!isChecked)
  console.log(isChecked)
}

const handleDaysChange = (e) => {
  console.log(daysOfWeek)
  //let selectedDays = daysOfWeek.filter((day) => day.checked)
  setDays((state) => ([
    ...state,
    e.target.value,
  ]
  ))
  console.log(days)
}

console.log(days)

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(settings);
  handleChangeView("Profile")
}

  return (

    <div className="justify-content">
      <h2> Settings </h2>

      <form onSubmit={handleSubmit}>
      <div className="grid p-3 text-center">
        <div className="row">

          <div className="row p-3">
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

          <div className="row p-3">
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

          <div className="row p-3">
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

          <div className="row p-3">
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

          <div className="row p-3">
          <label> Bio </label>
          <input
            type="text"
            name="bio"
            value={settings.bio}
            placeholder="Type bio"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
          </div>

          <div className="row p-3">
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
           <label> Type </label>
           <div className="custom-control custom-checkbox">
           <label className="custom-control-label"> Top-rope </label>
           <input 
           type="checkbox" 
           className="custom-control-input" 
           name="typeOne"
           value={settings.top}
           checked={isTop}
           onChange={()=> setIsTop(!isTop)}
           />
          </div>


          <div className="custom-control custom-checkbox">
           <label className="custom-control-label"> Lead </label>

           <input 
           type="checkbox" 
           className="custom-control-input" 
           name="typeTwo"
           value={settings.lead}
           //checked={!isChecked}
           onChange={handleCheck}
           />
           
          </div>
          </div>
        {/*
         {daysOfWeek.map((day) => (
          <div 
          className="row p-3"
          key={day.name}>
          <label> {day.name} </label>
          <input
          type="radio"
          name="days"
          value={day.name}
          //checked={day.checked}
          className="control-input"
          onChange={handleDaysChange}
          //onChange={(e) => setDays(e.target.value)}
          />
          </div>))}
         */}
       
          <div className="row p-3">
           <label> Days</label>
           
           <label> Monday </label>
           <input 
           className="control-input"
           type="radio" 
           name="days" 
           value="Monday"
           //checked={daysOfWeek[0].checked}
           onChange={handleDaysChange}
           ></input>
          
           <label> Tuesday </label>
           <input 
           className="control-input"
           type="radio" 
           name="days" 
           value="Tuesday"
           //checked={daysOfWeek[1].checked}
           onChange={handleDaysChange}
           ></input>
           
           <label> Wednesday </label>
           <input 
           type="radio" 
           name="days" 
           value="Wednesday"
           onChange={handleDaysChange}
           ></input>
          
          <label> Thursday </label>
           <input 
           type="radio" 
           name="days" 
           value="Thursday"
           onChange={handleDaysChange}>
           </input>
           
           <label> Friday </label>
           <input
           type="radio" 
           name="days" 
           value="Friday"
           onChange={handleDaysChange}
           ></input>
          </div> 
         
        </div>
       

          <div className="row-md p-3">
          <button className="col-2 btn btn-m btn-warning">Submit</button>
          </div>

      </div>
      </form>
    </div>
     
  );
}

export default Settings;
