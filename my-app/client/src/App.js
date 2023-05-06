
import React, {useState, useEffect} from "react";
import Home from "./components/Home"
import DashBoard from "./components/DashBoard";
import Settings from "./components/Settings"
import List from "./components/List"
import Profile from "./components/Profile";
import Preferences from "./components/Preferences";
import logo from "./images/logo.png"
import './App.css';
import { Routes, Route, NavLink, useNavigate} from "react-router-dom";

function App() {

  const [isChecked, setChecked] = useState(false) 
  //Sets lead prop in preferences & settings {}'s. 
  const [recommendations, setRecommendations] = useState([]) 
  //SetsRecommendations [] (= recommended climbers) based on preferences {}. 
  const [days, setDays] = useState(["Saturday", "Monday", "Tuesday", "Friday"]) 
  //Setsdays "active user" wants to climb based on daysOfWeek []. daysOfWeeks gets modified in Preferences & Settings forms
  const [location, setLocation] = useState("London")
  //setsLocation "active user" profile.
  const navigate = useNavigate() 

//"active user" default settings. Displayed on Profile page
  const [settings, setSettings] = useState({ 
    firstName: "Mele",
    lastName: "Couvreur",
    userName: "m_couvreur",
    email: "dummy@gmail.com",
    gender: "Female",
    pronouns: "She/Her",
    bio: "Sometimes I make myself proud and sometimes I put my keys in the fridge",
    img: "https://www.climbing.com/wp-content/uploads/2017/11/womenclimbingtimeline.jpg?crop=16:9&width=1500",
    level: "Intermediate",
    lead: false, 
   }
 )

//"active user" default preferences. Sets user matching criteria. 
// NB - lead, gender and level prop value in preferences can differ from lead, gender, levelprop in Settings.
// i.e. User can be level = intermediate, but choose to match with advanced. Idem gender and lead.
const [preferences, setPreferences] = useState({
    gender: "Female",
    level: "Advanced",
    lead: false, 
})

//"active user" default days of climbing. 
//Replicated across settings and preferences forms i.e. Users must have matching days.
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
        body: JSON.stringify({ location, days, level: preferences.level, gender: preferences.gender, top: preferences.lead}) 
      });
      let users = await results.json();
      console.log(users)
      //if db query successful > fetched users get pushed into recommendations []
      setRecommendations(users)
      console.log(recommendations)
      }
    catch (error) {
      console.log(error)
    } 
  };

  useEffect(() => {
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
   

    <Routes>
      <Route path="/"
        element={
        <Home/>}>
      </Route>

      <Route path="/login" element={<DashBoard/>} />

      <Route path="/settings" 
        element={
        <Settings
        settings={settings}
        setSettings={setSettings}
        days={days}
        setDays={setDays}
        setChecked={setChecked}
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
        setChecked={setChecked}
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
         

     <footer className="p-2 text-white text-left">
      <p className="p-2 font-italic"> CodeOp Project 2023 </p>
     </footer>
     </div>
  )
}

export default App;
