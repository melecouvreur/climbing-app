import React, {useState, useEffect} from "react";
import Home from "./components/Home"
import Settings from "./components/Settings"
import List from "./components/List"
import Profile from "./components/Profile";
import Preferences from "./components/Preferences";
import logo from "./images/logo.png"
import './App.css';
import { Routes, Route, Link, NavLink, useNavigate} from "react-router-dom";


function App() {

  const [isChecked, setChecked] = useState(false) // Sets top/lead within Preferences of "active user"
  const [recommendations, setRecommendations] = useState([]) // SetsRecommendations array (= recommended climbers) based on Preferences/filters
  const [days, setDays] = useState(["Saturday", "Monday", "Tuesday", "Friday"]) // Setsdays within Preferences/filter of "active user"
  const navigate = useNavigate()

  //"active user" default settings. Move to settings comp?
  const [settings, setSettings] = useState({ 
    firstName: "Mele",
    lastName: "Couvreur",
    userName: "m_couvreur",
    email: "dummy@gmail.com",
    gender: "Female",
    pronouns: "she/her",
    bio: "Sometimes I make myself proud, sometimes I put my keys in the fridge",
    img: "https://www.climbing.com/wp-content/uploads/2017/11/womenclimbingtimeline.jpg?crop=16:9&width=1500",
    location: "London",
    level: "Advanced",
    lead: false, 
   }
 )

const [preferences, setPreferences] = useState({
    gender: "Female",
    location: "London",
    level: "Advanced",
    lead: false, 
})

 const [daysOfWeek, setDaysOfWeek] = useState(
  [
    {name: "Monday", checked: true} ,
    {name: "Tuesday", checked: true} ,
    {name: "Wednesday", checked: false} ,
    {name: "Thursday", checked: false} ,
    {name: "Friday", checked: false} ,
    {name: "Saturday", checked: false} ,
    {name: "Sunday", checked: false}
  ])


useEffect(() => {
  setSettings((state) => ({
    ...state}
    ));
    setPreferences((state) => ({
      ...state}
      ));
  getRecommendations() // makes sure myMatches is not empty when first loading app. Matched based on default values in Prefrences stateVar
  navigate("/")
}, [])


//Fetches climbers from db based on Preferences
  const getRecommendations = async () => {
    try {
      let results = await fetch("/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: preferences.location, days, level: preferences.level, gender: preferences.gender}) 
      });
      let users = await results.json();
      console.log(users)
      //if db query successful > SetsRecommendations array with fetched climbers
      setRecommendations(users)
      console.log(recommendations)
      }
    catch (error) {
      console.log(error)
    }
  
  };

  let activeClassName = "btn btn-sm btn-warning"
  
  return (
    <div className="main container-fluid text-center">
      
    <div className="flex-row">

    <div>
    <NavLink to="/">
    <img
    className="logo m-2" 
    src={logo}
    alt="logo"
    onClick={() => navigate("/")}/> 
    </NavLink>
    </div>
  
    <nav className="nav navbar nav-masthead p-2">
    
    <div className="align-self-start">
       <NavLink 
        to="/settings"
        className={({isActive}) => 
        isActive ? activeClassName : undefined }>
       <span className="nav-item material-symbols-outlined m-2 icon">
       settings
       </span>
       </NavLink>
    </div>

    <div className="align-self-center">
        <NavLink 
        to="/preferences"
        className={({isActive}) => 
        isActive ? activeClassName : undefined }
        ><button
        //onClick={() => handleChangeView("Preferences")} //remove
        className="text-white btn m-1">
        myPreferences</button></NavLink>

        <NavLink to="/profile"
         className={({isActive}) => 
         isActive ? activeClassName : undefined }
         ><button
        //onClick={() => handleChangeView("Profile")} // remove
        className="text-white btn m-1" >
        myProfile </button></NavLink>

        <NavLink to="/matches"
        className={({isActive}) => 
        isActive ? activeClassName : undefined }
        ><button
        onClick={() => getRecommendations} 
        className="text-white btn m-1">
        myMatches </button></NavLink>
    </div>

       <div className="align-self-right">
      
        <NavLink 
        to="/"
        className={({isActive}) => 
        isActive ? activeClassName : undefined }>
       <span className="material-symbols-outlined m-2 icon">
       home
       </span>
       </NavLink>
       </div>
        </nav>

    </div>
   

    <Routes>
      <Route path="/"
        element={<Home
        navigate={navigate}/>}>
    </Route>

      <Route path="/settings" 
        element={
        <Settings
        settings={settings}
        setSettings={setSettings}
        preferences={preferences}
        setPreferences={setPreferences}
        days={days}
        setDays={setDays}
        setChecked={setChecked}
        navigate={navigate}
        getRecommendations={getRecommendations}
        daysOfWeek={daysOfWeek}
        />
        }>
        </Route>

        <Route path="/preferences" 
        element={
        <Preferences
        settings={settings}
        setSettings={setSettings}
        preferences={preferences}
        setPreferences={setPreferences}
        days={days}
        setDays={setDays}
        setChecked={setChecked}
        navigate={navigate}
        getRecommendations={getRecommendations}
        daysOfWeek={daysOfWeek}
        />
        }>
        </Route>
  

        <Route path="/profile"
         element={
         <Profile
        settings={settings}
        getRecommendations={getRecommendations}
        recommendations={recommendations}
        days={days}
        navigate={navigate}/>
       }>
       </Route>

      <Route path="/matches" 
        element={<List
        recommendations={recommendations}
        getRecommendations={getRecommendations}/>}>
          </Route>

     </Routes>
         

     <footer className="p-2 text-white text-left">
      <p className="p-2 font-italic"> CodeOp Project 2023 </p>
     </footer>
     </div>
  )
}

export default App;
