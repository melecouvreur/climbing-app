import {React} from "react";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import "../App.css"

function AccountSetUp() {

let {profile, setProfile, userId, climbingCert, certifications, setCert, location, setLocation, days, setDays, daysOfWeek, setSelected, navigate } = useContext(UserContext)

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
    
  //Toggles checked/unchecked prop of selected days in 'daysOfWeek []'
  //pushes "checked days" in 'days []' via setDays()
  //'days []' => obj.req for setDBDays & getRecommendations function
  // NB - pushes value of name (string) in 'days []' only. 
  const handleDaysChange = (d) => {
    setSelected(d.selected = !d.selected)
    //console.log(daysOfWeek)
    //console.log(d.selected)
    setDays(daysOfWeek)
    console.log("days", days)
  }

  const handleCertChange = (c) => {
    setSelected(c.selected = !c.selected)
    //console.log(climbingCert)
    //console.log(c.selected)
    setCert(climbingCert)
    console.log("certifications", certifications)
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
          email: profile.email,
          location,
          level: profile.level, 
          gender: profile.gender,
          pronouns: profile.pronouns, 
          avatar: profile.avatar,
          bio: profile.bio
        }) 
      });
      let newProfile = await results.json();
      console.log(newProfile)
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
      let newDays = await results.json();
      console.log(newDays)
      }
      catch (error) {
      console.log(error)
    } 
  };

  const setDBCert = async () => {
    try {
      let id = userId
      let results = await fetch(`/cert/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ certifications }) 
      });
      let newCert = await results.json();
      console.log(newCert)
      }
      catch (error) {
      console.log(error)
    } 
  };


const handleSubmit = (e) => {
    e.preventDefault();
    //setDBProfile()
    setDBDays()
    //setDBCert()
    navigate("/private/profile")
  }

return (

<div className="bg-1 p-4 d-flex justify-content-center text-left">
    <form 
    onSubmit={handleSubmit}
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

           {climbingCert.map(c => (
            <div
            key={c.name}
            className="form-group col-md-4 px-2">
            <label> {c.name} </label>
            <input
            type="checkbox" 
            className="m-1 control-input list-group-item flex-fill"
            name="cert"
            value={c.name}
            checked={c.checked}
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

export default AccountSetUp;
