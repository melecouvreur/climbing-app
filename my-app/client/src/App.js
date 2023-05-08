
import React, {useState, useEffect} from "react";
import Home from "./components/Home"
import DashBoard from "./components/DashBoard";
import Settings from "./components/Settings"
import List from "./components/List"
import Profile from "./components/Profile";
import ProfileSetUp from "./components/ProfileSetUp";
import Preferences from "./components/Preferences";
import logo from "./images/logo.png"
import { UserContext } from "./Context/userContext";
import './App.css';
import { Routes, Route, NavLink, useNavigate} from "react-router-dom";

function App() {

  const [isSelected, setSelected] = useState(false) 
  //Sets lead prop in preferences & settings {}'s. 
  const [recommendations, setRecommendations] = useState([]) 
  //SetsRecommendations [] (= recommended climbers) based on preferences {}. 
  const [days, setDays] = useState([]) 
  //Setsdays "active user" wants to climb based on daysOfWeek []. daysOfWeeks gets modified in Preferences & Settings forms
  const [location, setLocation] = useState("London")
  //setsLocation "active user" profile.
  const navigate = useNavigate() 

//"active user" default settings. Displayed on Profile page
  const [settings, setSettings] = useState({ lead: false})

//"active user" default preferences. Sets user matching criteria. 
//NB - lead, gender and level prop value in preferences can differ from lead, gender, levelprop in Settings.
//i.e. User can be level = intermediate, but choose to match with advanced. Idem gender and lead.
const [preferences, setPreferences] = useState({
    gender: "Female",
    level: "Advanced",
    lead: false, 
})

//"active user" default days of climbing. 
//Replicated across settings and preferences forms i.e. Users must have matching days.
 const [daysOfWeek, setDaysOfWeek] = useState(
  [
    {name: "Monday", selected: false} ,
    {name: "Tuesday", selected: false} ,
    {name: "Wednesday", selected: false} ,
    {name: "Thursday", selected: false} ,
    {name: "Friday", selected: false} ,
    {name: "Saturday", selected: false} ,
    {name: "Sunday", selected: false}
  ])

  const [profile, setProfile] = useState([])
  const [userId, setUserId] = useState(1)

  const getDBProfile = async () => {
    try {
      let id = userId
      let results = await fetch(`/profile/${id}`);
      let user = await results.json();
      console.log(user[0])
      //if db query successful > fetched user get pushed into profile []
      let userInfo = user[0]
      console.log(userInfo)
      setProfile(userInfo)
      console.log("profile", profile)
      }
    catch (error) {
      console.log(error)
    } 
  };

  const getDBDays = async () => {
    try {
      let id = userId
      let results = await fetch(`/days/${id}`);
      let userDays = await results.json();
      console.log(userDays[0])
      //if db query successful > fetched days get pushed into days []
      console.log(userDays)
      setDays(userDays)
      console.log("days", userDays)
      }
    catch (error) {
    console.log(error)
    } 
  };
  
//Fetches and setsLocation of "active user" using external API.
//Replicated across settings and preferences forms i.e. Users must have matching location.
  const getLocation = () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY ,
        'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
      }
    };
    
    fetch('https://ip-geo-location.p.rapidapi.com/ip/check?format=json', options)
      .then(response => response.json())
      .then(response => {
        console.log(JSON.stringify(response.city.name))
        setLocation(response.city.name)
      })
       .catch(err => console.error(err));
  
  }

//Fetches users from db based on level, gender, lead props in preferences {}, days [] & location
  const getRecommendations = async () => {
    try {
      let results = await fetch("/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location, days, level: preferences.level, gender: preferences.gender}) 
      });
      let users = await results.json();
      console.log(users)
      //if db query successful > fetched users get pushed into recommendations []
      setRecommendations(users)
      console.log("recommendations", recommendations)
      }
    catch (error) {
      console.log(error)
    } 
  };

  let userObj = {
    userId, setUserId, profile, 
    getDBProfile, setProfile, 
    location, setLocation,
    days, setDays, 
    daysOfWeek,
    setSelected,
    preferences, setPreferences,
    settings, setSettings,
    recommendations, getRecommendations,
    navigate
    }

  const logout = () => {
    localStorage.removeItem("token")
    //setIsLoggedIn(false)
    navigate("/login")
    console.log("logged out")
  };

  useEffect(() => {
    getDBProfile()
    getDBDays()
    setSettings((state) => ({
      ...state}
      ));
    setPreferences((state) => ({
        ...state}
        ));
    getRecommendations() //Makes sure myMatches is not empty when first loading. 
    //Matched based on default values preferences {}, days [] & location.
    //getLocation() // sets "active user" geolocation when first loading
    //navigate("/") //nagivates to homescreen when first loading.
  }, []) 

  let activeClassName = "btn btn-sm btn-warning"
  
  return (

    <div className="main container-fluid text-center">
      
    <div className="flex-row">
   
   {/*Switches to different views using React Router Navlink*/}
    <div>
    <NavLink to="/">
    <img
    className="nav-logo m-2" 
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
       <span className="nav-item material-symbols-outlined m-2 p-1 icon">
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
        className="text-white btn m-1">
        myPreferences</button></NavLink>

        <NavLink to="/profile"
         className={({isActive}) => 
         isActive ? activeClassName : undefined }
         ><button
        className="text-white btn m-1" >
        myProfile </button></NavLink>

       {/*Switches to different view AND fetches new recommendations*/}
        <NavLink to="/matches"
        className={({isActive}) => 
        isActive ? activeClassName : undefined }
        ><button
        onClick={() => getRecommendations} 
        className="text-white btn m-1">
        myMatches </button></NavLink>
    </div>

    <NavLink to="/login"
        className={({isActive}) => 
        isActive ? activeClassName : undefined }
        ><button
        onClick={() => logout()} 
        className="text-white btn m-1">
        logOut </button>
    </NavLink>
   

       <div className="align-self-right">
        <NavLink 
        to="/"
        className={({isActive}) => 
        isActive ? activeClassName : undefined }>
       <span className="material-symbols-outlined m-2 p-1 icon">
       home
       </span>
       </NavLink>
       </div>
        </nav>

    </div>
   
    <UserContext.Provider value={userObj}>
    <Routes>
      <Route path="/"
        element={
        <Home/>}>
      </Route>

      <Route path="/login" element={<DashBoard/>} />

      <Route path="/setup" element={<ProfileSetUp
      settings={settings}
      setSettings={setSettings}
      days={days}
      setDays={setDays}
      setSelected={setSelected}
      navigate={navigate}
      daysOfWeek={daysOfWeek}
      location={location}
      setLocation={setLocation}
      />} />

      <Route path="/settings" 
        element={
        <Settings
        settings={settings}
        setSettings={setSettings}
        days={days}
        setDays={setDays}
        setSelected={setSelected}
        navigate={navigate}
        daysOfWeek={daysOfWeek}
        location={location}
        setLocation={setLocation}
        />
        }>
      </Route>

        <Route path="/preferences" 
        element={
        <Preferences
        preferences={preferences}
        setPreferences={setPreferences}
        setDays={setDays}
        setSelected={setSelected}
        navigate={navigate}
        getRecommendations={getRecommendations}
        daysOfWeek={daysOfWeek}
        location={location}
        setLocation={setLocation}
        />
        }>
        </Route>
  
        <Route path="/profile"
         element={
         <Profile
        settings={settings}
        getRecommendations={getRecommendations}
        location={location}
        navigate={navigate}/>
        }>
       </Route>

      <Route path="/matches" 
        element={
        <List
        recommendations={recommendations}/>
        }>
      </Route>

     </Routes>
     </UserContext.Provider>

     <footer className="p-2 text-white text-left">
      <p className="p-2 font-italic"> CodeOp Project 2023 </p>
     </footer>
     </div>
  )
}

export default App;
