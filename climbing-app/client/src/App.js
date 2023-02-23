import React, {useState, useEffect} from "react";
import Settings from "./components/Settings"
import List from "./components/List"
import Profile from "./components/Profile";
import Preferences from "./components/Preferences";
import './App.css';
import { Routes, Route, Link, NavLink, useNavigate} from "react-router-dom";


function App() {

  const [isView, setView] = useState("home") // changes userview to different components
  const [isChecked, setChecked] = useState(false) // updates active user top/lead settings field
  const [recommendations, setRecommendations] = useState([]) // Sets list of recommended climbers based on match criteria
  const [days, setDays] = useState(["Monday", "Tuesday"]) // Sets days  "Active user" climbs
  const navigate = useNavigate()

  //"Active user" default settings. Move to settings comp?
  const [settings, setSettings] = useState({ 
    firstName: "Mele",
    lastName: "Couvreur",
    userName: "m_couvreur",
    email: "dummy@gmail.com",
    pronouns: "she/her",
    bio: "Sometimes I make myself proud, sometimes I put my keys in the fridge. Coffee, climbing and coding-fanatic",
    img: "https://www.climbing.com/wp-content/uploads/2017/11/womenclimbingtimeline.jpg?crop=16:9&width=1500",
    location: "London",
    top: false,
    lead: false,
   }
 )

useEffect(() => {
  handleChangeView("home")
  setSettings((state) => ({
    ...state}
    ));
  //getRecommendations();
}, [])

 const handleChangeView = (isView) => {
  setView(isView)
}
  //Fetches all users. No filters applied. This is for testing
  /*
  const getRecommendations = () => {
    fetch("/users")
    .then(response => response.json())
    .then(users => {
    setRecommendations(users)
    handleChangeView("List")
    })
    .catch(error => {
      console.log(error)
    })
  };
  */

// Generates list of recommended climbers based on match criteria i.e. location & days. 
// To do - insert top/lead
  const getRecommendations = async () => {
    try {
      let results = await fetch("/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: settings.location, days}) //change to days state var?
      });
      let users = await results.json();
      console.log(users)
      //if db query successful > updates recommended climber state var
      setRecommendations(users)
      console.log(recommendations)
      navigate("/matches")
    }
    catch (error) {
      console.log(error)
    }
  };
  
  
  return (

    <div className="d-flex h-100 text-center">

    <div className="cover-container d-flex w-100 h-100 p-2 flex-column">
 
    <div className="position-absolute p-1">
    <NavLink to="/settings"><button
        onClick={() => handleChangeView("Settings")} //remove
        className= {isView === "Settings" ? "btn btn-m btn-danger m-1" 
        : "btn btn-m btn-warning m-1"}>
        Edit Profile</button></NavLink>
    </div>
    
    <header className="mb-auto">
    <div>
    <img 
    className= "App-logo img-fluid" 
    src="https://cdn-icons-png.flaticon.com/512/5064/5064233.png"
    alt="carabina"
    onClick={() => handleChangeView("home")}/> 

    <h1 className="float-md-start"> BelayMe </h1>

      <nav className="nav nav-masthead justify-content-center float-md-end p-3">
        
        <NavLink to="/preferences"><button
        onClick={() => handleChangeView("Preferences")} //remove
        className= {isView === "Preferences" ? "btn btn-m btn-danger m-1" 
        : "btn btn-m btn-warning m-1"}>
        myPreferences</button></NavLink>

        <NavLink to="/profile"><button
        onClick={() => handleChangeView("Profile")} // remove
        className= {isView === "Profile" ? "btn btn-m btn-danger m-1" 
        : "btn btn-m btn-warning m-1"} >
        myProfile </button></NavLink>

        <NavLink to="/matches"><button
        onClick={() => handleChangeView("Matches")} // remove
        className= {isView === "Matches" ? "btn btn-m btn-danger m-1" 
        : "btn btn-m btn-warning m-1"} >
        myMatches </button></NavLink>
        </nav>
    </div>
    </header>

    <div className="grid px-3">
       {isView === "home" && (
       <div className="row p-5 justify-content-center">
        <p className="col-3"> 
        "Get matched with a belay partner with BelayMe" </p>
       </div>)}
       </div>

    <Routes>
      <Route path="/settings" 
        element={
        <Settings
        settings={settings}
        setSettings={setSettings}
        handleChangeView={handleChangeView}
        days={days}
        setDays={setDays}
        setChecked={setChecked}
        navigate={navigate}
        />
        }>
        </Route>

        <Route path="/preferences" 
        element={
        <Preferences
        settings={settings}
        setSettings={setSettings}
        handleChangeView={handleChangeView}
        days={days}
        setDays={setDays}
        setChecked={setChecked}
        navigate={navigate}
        />
        }>
        </Route>
  

        <Route path="/profile"
         element={
         <Profile
       settings={settings}
       getRecommendations={getRecommendations}
       recommendations={recommendations}
       days={days}/>
       }>
       </Route>

      <Route path="/matches" 
          element={<List
          handleChangeView={handleChangeView}
          isView={isView}
          recommendations={recommendations}
          getRecommendations={getRecommendations}/>}>
          </Route>
     </Routes>
      
       
      
{/*
      <div className="container text-center">
        {isView === "Settings" && 
        (<Settings
        settings={settings}
        setSettings={setSettings}
        handleChangeView={handleChangeView}
        days={days}
        setDays={setDays}
        setChecked={setChecked}
        />)}
      </div>
        */}

  
      
{/*
      {isView === "Profile" && (
      <div className="card p-3 justify-content-center float-md-end border-0">
      <h2 className="p-3"> My Profile </h2>

      <h5 className="card-title"> {settings.userName} </h5>
      <span className="card-text"> {settings.pronouns} </span>

      <img className="card-img-top p-4" src={settings.img} alt="profile"/>

      <span> {settings.location} </span>
      <span> {settings.top} </span>
      <span> {settings.lead} </span>
      <p className="card-body"> {settings.bio} </p>

      <div>
      <button 
      className="row btn btn-m btn-warning m-1"
      onClick={getRecommendations}
      > Find NewPartners </button>
      </div>
      
      <div>
      <button
      className="row btn btn-m btn-warning m-1">
        My Partners
      </button>
      </div>

      </div>
       )}
      */}

      {/*
        {isView === "List" && (
        <div>
          <List
          handleChangeView={handleChangeView}
          isView={isView}
          recommendations={recommendations}
          getRecommendations={getRecommendations}/>
        </div>
      )}
        */}

         
     </div>
    </div>
  )
}

export default App;
