import React, {useEffect} from "react";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import "../App.css"

function Preferences( {preferences, setPreferences, getRecommendations }) {

  let {location, setLocation, navigate, daysOfWeek, setDaysOfWeek, days, setDays, setSelected, climbingCert, setClimbingCert, certifications, setCert} = useContext(UserContext)

//Updates props in 'preferences {}'
  const handlePrefChange = (e) => {
    setSelected(e.selected = !e.selected)
    const value = e.selected;
    const name = e.name;
    setPreferences((state) => ({
      ...state,
    [name]: value,}))
    console.log(
     "gender", preferences.gender,
     "level", preferences.level, 
     "cert", preferences.cert,
     "days", preferences.days)
  }

//Allows user to edit location inititally fetched via external geolocation api
const handleLocationChange = (e) => {
  setLocation(e.target.value);
  e.preventDefault();
    }

//Toggles checked/unchecked prop of selected days in 'daysOfWeek []'
//pushes "checked days" in 'days []' via setDays()
//'days []' => obj.req for getRecommendations function
// NB - pushes value of name (string) in 'days []' only. 
const handleDaysChange = (d) => {
  setSelected(d.selected = !d.selected)
  console.log(daysOfWeek, d.name, d.selected)
  setDaysOfWeek((state) => [...state])
  console.log("days", daysOfWeek)
}

const handleCertChange = (c) => {
  setSelected(c.selected = !c.selected)
  console.log(climbingCert, c.name, c.selected)
  console.log(c.selected)
  setClimbingCert((state) => [...state])
  console.log("certifications", climbingCert)
}

const handleSubmit = (e) => {
  e.preventDefault();
  //getRecommendations()
  //navigate("/matches")
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

          </div>
         

          <div className="form-group row px-2 m-2 list-group-horizontal">
          <div className="form-row px-4 pt-4">
          {preferences.days.map(d => (
            <div 
            key={d.name}> 
            <label className="px-2"> {d.name} </label>
            <div className="col">
            <input
            type="checkbox"
            name="days"
            value={d.name}
            checked={d.selected}
            className="m-2 px-2 control-input list-group-item flex-fill"
            onChange={() => handlePrefChange(d)}/>
            </div>
            </div>
            ))}
          </div>
          </div>

            <div className="form-row px-4 pt-4">
            {preferences.gender.map(g => (
            <div className="form-group col-md-4 px-2">
            <label> {g.name} </label>
            <input
            key={g.name}
            type="checkbox" 
            className="m-1 control-input list-group-item flex-fill"
            name="gender"
            value={g.name}
            checked={g.selected}
            onChange={() => handlePrefChange(g)}
              >
            </input>
            </div> ))}
            </div>

            <div className="form-row px-4 pt-4">
            {preferences.level.map(l => (
            <div className="form-group col-md-4 px-2">
            <label> {l.name} </label>
            <input
            key={l.name}
            type="checkbox" 
            className="m-1 control-input list-group-item flex-fill"
            name="gender"
            value={l.name}
            checked={l.selected}
            onChange={() => handlePrefChange(l)}
              >
            </input>
            </div> ))}
            </div>

            <div className="form-row px-4 pt-4">
            {preferences.cert.map(c => (
            <div className="form-group col-md-4 px-2">
            <label> {c.name} </label>
            <input
            key={c.name}
            type="checkbox" 
            className="m-1 control-input list-group-item flex-fill"
            name="cert"
            value={c.name}
            checked={c.selected}
            onChange={() => handlePrefChange(c)}
              >
            </input>
            </div> ))}
            </div>
          
          <div className="form-row justify-content-center">
          <button className="btn btn-m btn-warning">Submit</button>
          </div>

      </form>

    </div>
  );
}

export default Preferences;
