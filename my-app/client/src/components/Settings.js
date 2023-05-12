import {React, useState, useEffect} from "react";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import "../App.css"

function Settings() {

let {profile, setProfile, getDBProfile, getDBDays, getDBCert, userId, location, setLocation, navigate, days, setDays, setSelected, certifications, setCert} = useContext(UserContext)

//updates profile
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

//Toggles checked/unchecked prop of selected days fetched from db
//pushes updated "checked/undchecked days" in 'days []' via setDays()
//'days []' => obj.req for updateDBDays
// NB - pushes value of name (string) and selected (boolean) in 'days []' 
const handleDaysChange = (d) => {
  setSelected(d.selected = !d.selected)
  console.log(d.selected)
  setDays((state) => [...state])
  console.log("days", days, d.day, d.selected)
}

const handleCertChange = (c) => {
  setSelected(c.selected = !c.selected)
  console.log(c.selected)
  setCert((state) => [...state])
  console.log("certifications", certifications, c.type, c.selected)
}

const updateDBProfile = async () => {
  try {
    let id = userId
    let results = await fetch(`/profile/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        username: profile.username, 
        email: profile.email,
        location, 
        level: profile.level, 
        gender: profile.gender, 
        pronouns: profile.pronouns, 
        avatar: profile.avatar,
        bio: profile.bio
      }) 
    });
    let updatedProfile = await results.json();
    console.log("updatedProfile", updatedProfile)
    }
    catch (error) {
    console.log(error)
  } 
};

const updateDBDays = async () => {
  try {
    let id = userId
    let results = await fetch(`/days/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ days }) 
    });
    let updatedDays = await results.json();
    console.log("updatedDays", updatedDays)
    }
    catch (error) {
    console.log(error)
  } 
};

const updateDBCert = async () => {
  try {
    let id = userId
    let results = await fetch(`/cert/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ certifications }) 
    });
    let updatedCert = await results.json();
    console.log("updatedCert", updatedCert)
    }
    catch (error) {
    console.log(error)
  } 
};


const deleteDays = async (userId, daysToDelete) => {
  try {
    const response = await fetch(`/days/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ daysToDelete })
    });

    if (response.status === 204) {
      console.log("Days deleted successfully");
    } else if (response.ok) {
      const deletedDays = await response.json();
      console.log(deletedDays);
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleSettingSubmit = (e) => {
  e.preventDefault();
  updateDBProfile()
  console.log(profile)
  updateDBDays()
  console.log(days)
  updateDBCert()
  console.log(certifications)
  //getRecommendations()
  navigate("/private/profile")
}

useEffect(() => {
  //getDBProfile()
  //getDBDays()
  //getDBCert()
  //Matched based on default values preferences {}, days [] & location.
  //getLocation() // sets "active user" geolocation when first loading
  //navigate("/") //nagivates to homescreen when first loading.
}, []) 
 

  return (

  <div className="bg-1 p-4 d-flex justify-content-center text-left">
    <form 
    onSubmit={handleSettingSubmit}
    className="p-3 s-form align-self-center"
    >
    
    <div className="form-row px-2">
       <div className="form-group col-md-6 px-2">
            <label> User name </label>
            <input
              type="text"
              name="username"
              value={profile.username}
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
              placeholder="Set level"
              onChange={(e) => handleInputChange(e)}
              >
              <option>Male</option>
              <option>Female</option>
              <option>Non-binary</option>
              <option>Trans</option>
            </select>
            </div>

            <div className="form-group col-md-4 px-2">
          <label> Pronouns </label>
            <select 
              className="form-control"
              id="pronouns"
              type="text"
              name="pronouns"
              value={profile.pronouns}
              placeholder="Set pronouns"
              onChange={(e) => handleInputChange(e)}
              >
              <option>She/Her</option>
              <option>He/Him</option>
              <option>They/Them</option>
            </select>
            </div>

          {/*
          <div className="form-group col-md-4 px-2">
            <label> Lead certified </label>
            <input 
            type="checkbox" 
            className="form-row form-check-input mx-3" 
            name="lead"
            value={settings.lead}
            checked={settings.lead === true}
            onChange={() => setLead(settings.lead)}
            />
          </div>
        */}
            
            {certifications.map(c => (
            <div
            key={c.cID}
            className="form-group col-md-4 px-2">
            <label> {c.type} </label>
            <input
            type="checkbox" 
            className="m-1 control-input list-group-item flex-fill"
            name="cert"
            value={c.type}
            checked={c.selected}
            placeholder="Set certifications"
            onChange={() => handleCertChange(c)}
              >
            </input>
            </div> ))}

        </div>

       
  
        <div className="form-row px-2">
          <div className="form-group col-md-12 px-2">
            <label> Bio </label>
            <input
              type="text"
              name="bio"
              value={profile.bio}
              placeholder="Type bio"
              className="form-control p-4"
              onChange={(e) => handleInputChange(e)}
            />
         </div>
      </div>

         <div className="form-group row px-2 m-2 list-group-horizontal">
          {days.map(d => (
            <div 
            key={d.dID}> 
            <label className="px-1"> {d.day} </label>
            <div className="col">
            <input
            type="checkbox"
            name="days"
            value={d.day}
            checked={d.selected}
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

export default Settings;
