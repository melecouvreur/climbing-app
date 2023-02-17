import React, { useState} from "react";

function Settings() {

const uID = 0
const [isChecked, setIsChecked] = useState(false)

const [settings, setSettings] = useState({
   uID: uID,
   firstName: "",
   lastName: "",
   userName: "",
   email: "",
   pronouns: "",
   bio: "",
   img: "",
   location: "",
   typeOne: isChecked,
   typeTwo: isChecked,
   days: "",
  }
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

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(settings);
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
            placeholder="Set location"
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
           value={settings.typeOne}
           checked={isChecked}
           onChange={handleCheck}
           />
          </div>

       

          <div className="custom-control custom-checkbox">
           <label className="custom-control-label"> Lead </label>

           <input 
           type="checkbox" 
           className="custom-control-input" 
           name="typeTwo"
           value={settings.typeTwo}
           checked={isChecked}
           onChange={handleCheck}
           />
           
          </div>
          </div>
        
          <div className="row p-3">
           <label> Days </label>
           <input
            type="text"
            name="days"
            value={settings.days}
            placeholder="Set location"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
           />
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
