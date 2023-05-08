import {React, useEffect, useState} from "react";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import "../App.css"

function ProfileSetUp( {location, setLocation, daysOfWeek, navigate, settings, setSettings, days, setDays, setSelected}) {

let {profile, getProfile, setProfile, userId} = useContext(UserContext)

//updates props in 'settings {}'
const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setProfile((state) => ({
      ...state,
    [name]: value,}
    ))
    console.log(profile)
    }
  
  //Allows user to edit location inititally fetched via external geolocation api
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    e.preventDefault();
      }
    
  //sets true/false status for lead prop in 'settings {}'
  const setLead = () => {
    setSelected(settings.lead = !settings.lead)
    setSettings((state) => ({
      ...state}))
    console.log(settings)
    }
  
  //Toggles checked/unchecked prop of selected days in 'daysOfWeek []'
  //pushes "checked days" in 'days []' via setDays()
  //'days []' => obj.req for getRecommendations function
  // NB - pushes value of name (string) in 'days []' only. 
  const handleDaysChange = (d) => {
    setSelected(d.selected = !d.selected)
    console.log(daysOfWeek)
    console.log(d.selected)
    setDays(daysOfWeek)
  //setDays(() => (daysOfWeek.filter((d) => d.selected === true).map(d => d)))
  //setDaysToDelete(() => daysOfWeek.filter((d) => d.selected === false).map(d => d.name))
  //console.log("deleted days", daysToDelete)
  console.log("active days", days)
  }


const setDBProfile = async () => {
    try {
      let id = userId
      let results = await fetch(`/profile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          username: profile.username, 
          firstname: profile.firstname,
          lastname: profile.lastname,
          email: profile. email,
          location, days, 
          level: profile.level, 
          gender: profile.gender, 
          cert: settings.lead, 
          pronouns: profile.pronouns, 
          avatar: profile.avatar,
          bio: profile.bio
        }) 
      });
      let updatedProfile = await results.json();
      console.log(updatedProfile)
      }
      catch (error) {
      console.log(error)
    } 
  };

  const setDBDays = async () => {
    try {
      let id = userId
      let results = await fetch(`/days/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ days }) 
      });
      let updatedDays = await results.json();
      console.log(updatedDays)
      }
      catch (error) {
      console.log(error)
    } 
  };

useEffect(() => {
  getProfile()
  console.log(profile)
}, []) 


const handleSubmit = (e) => {
    e.preventDefault();
    setDBProfile()
    //setDBDays()
    setDBDays()
    //deleteDays(userId, daysToDelete)
    //setProfile()
    //getRecommendations()
    //navigate("/profile")
  }

  return (

<div className="bg-1 p-4 d-flex justify-content-center text-left">
    <p>{profile.username}</p>
    <form 
    onSubmit={handleSubmit}
    className="p-3 s-form align-self-center"
    >

    <div className="form-row px-2">
        <div className="form-group col-md-6 px-2">
            <label> First name </label>
            <input
              type="text"
              name="firstname"
              value={profile.firstname}
              placeholder="Type first name"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
            />
        </div>
          
        <div className="form-group col-md-6">
            <label> Last name </label>
            <input
              type="text"
              name="lastname"
              value={profile.lastname}
              //value={settings.lastName}
              placeholder="Type last name"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
            />
        </div>
    </div>
    
    <div className="form-row px-2">
       <div className="form-group col-md-6 px-2">
            <label> User name </label>
            <input
              type="text"
              name="username"
              value={profile.username}
              //value={settings.userName}
              placeholder="Type user name"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
            />
       </div>
     
       <div className="form-group col-md-6 px-2">
          <label> Email </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              //value={settings.email}
              placeholder="Type email"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
            />
        </div>
    </div>
        
      <div className="form-row px-2">
         <div className="form-group col-md-6 px-2">
            <label> Image </label>
            <input
              type="text"
              name="avatar"
              value={profile.avatar}
              //value={settings.img}
              placeholder="https://example.com/users/"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
            />
        </div>

        {/* <div className="form-group col-md-6 px-2">
          <label> Location </label>
          <input
            type="text"
            name="location"
            value={settings.location}
            placeholder="Set location"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
          </div>*/}

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

          <div className="form-group col-md-4 px-2">
         <label> Level </label>
           <select 
            className="form-control"
            id="level"
            type="text"
            name="level"
            value={profile.level}
            //value={settings.level}
            placeholder="Set level"
            onChange={(e) => handleInputChange(e)}
            >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          </div>

          <div className="form-group col-md-4 px-2">
          <label> Gender </label>
            <select 
              className="form-control"
              id="gender"
              type="text"
              name="gender"
              value={profile.gender}
              //value={settings.gender}
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
  
        <div className="form-row px-2">
          <div className="form-group col-md-12 px-2">
            <label> Bio </label>
            <input
              type="text"
              name="bio"
              value={profile.bio}
              //value={settings.bio}
              placeholder="Type bio"
              className="form-control p-4"
              onChange={(e) => handleInputChange(e)}
            />
         </div>
      </div>

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
            onChange={() => handleDaysChange(d)}/>
            </div>
            </div>
            ))}
          </div>
        
          <div className="form-row justify-content-center p-3">
            <button className="btn btn-m btn-warning">Submit
            </button>
          </div>

     
      </form>

    </div>
  );
}

export default ProfileSetUp;
