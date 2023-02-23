import React, { useState} from "react";

function Settings( {settings, setSettings, handleChangeView, days, setDays, setChecked }) {

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
setChecked = (d) => {
  d.checked = !d.checked
  console.log(d)
  console.log(daysOfWeek)
}

//setsDays to checked/true days from DaysofWeek array to create obj.req array
//push name prop (string) in days array only
const handleSubmit = (e) => {
  e.preventDefault();

  setDays(() => (daysOfWeek.filter((d) => d.checked === true).map(d => d.name)))
  console.log(days)

  handleChangeView("Profile")
}

/* old version

/*
///handles days selection - old version
const handleDaysChange = (d) => {
 //first find clickedDay
  let index = daysOfWeek.findIndex((day) => day.name === d.name)
  let cDay = daysOfWeek[index]

 //then add clicked day to selectedDays array
  setSelectedDays((state) => ([
    ...state, 
    cDay,
  ]) ) 
 console.log(selectedDays)
 
//Toggle checked/unchecked i.e. true/false status of days in selectedDays Array
 setChecked(cDay.checked = !cDay.checked)
 console.log(cDay)
}


//handles form submit and updates settings state var on parent. 
//selected days only passed to settings state var once submitted
const handleSubmit = (e) => {
  e.preventDefault();
  //console.log(settings);
  //console.log(selectedDays)

  //filter days with true/checked status from selectedDays Array
  //push name prop (string) in days array
  let sDays = selectedDays.filter((d) => d.checked === true).map(d => d.name)
  console.log(sDays)
  setDays(() => (sDays))
  console.log(days)

  handleChangeView("Profile")
}
*/

//useEffect(() => {
//setDays();
//console.log(days)
//}, [daysOfWeek])

  return (

    <div className="d-flex h-100 w-100 p-3 text-center">
     {/*<h2 className="text-center"> Settings </h2>*/}

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
          onChange={() => setChecked(d)}/>
          {/*onChange={() => handleDaysChange(d)}/>*/}
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

export default Settings;
