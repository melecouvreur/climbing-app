
import React, {useState, useEffect} from "react";
import prefTemplate from "./Data/prefTemplate"
import daysTemplate from "./Data/daysTemplate";
import certTemplate from "./Data/certTemplate";
import Home from "./Pages/Home"
import NavBar from "./Components/NavBar"
import DashBoard from "./Pages/DashBoard";
import Settings from "./Components/Settings"
import Matches from "./Pages/Matches"
import Profile from "./Pages/Profile";
import SetUp from "./Components/SetUp";
import Preferences from "./Components/Preferences";
import { UserContext } from "./Context/userContext";
import './App.css';
import { Routes, Route, useNavigate} from "react-router-dom";

function App() {

  const [userId, setUserId] = useState(1)
  const [profile, setProfile] = useState({})
  const [days, setDays] = useState([])
  const [location, setLocation] = useState("London")
  const [certifications, setCert] = useState([])
  const [recommendations, setRecommendations] = useState([]) 
//SetsRecommendations [] (= recommended climbers) based on preferences {}.
  
  const [isSelected, setSelected] = useState(false) 
  const navigate = useNavigate() 

//"active user" default preferences. Sets user matching criteria. 
//NB - cert, gender and level prop value in preferences can differ from cert, gender, level prop in Settings.
//i.e. User can be level = intermediate, but choose to match with advanced. Idem gender and cert
 const [preferences, setPreferences] = useState(prefTemplate)
 const [daysOfWeek, setDaysOfWeek] = useState(daysTemplate)
 const [climbingCert, setClimbingCert] = useState(certTemplate)


let dayNames = days.filter((d) => d.selected == true).map((d) => d.day)
//console.log(dayNames)
let levelNames = preferences.level.filter((l) => l.selected == true).map((l) => l.name)
//console.log(levelNames)
let genderNames = preferences.gender.filter((g) => g.selected == true).map((g) => g.name)
//console.log(genderNames)


  const getDBProfile = async () => {
    try {
      let id = userId
      let results = await fetch(`/profile/${id}`);
      let user = await results.json();
      //console.log(user[0])
      //if db query successful > fetched user get pushed into profile []
      let userInfo = user[0]
      //console.log(userInfo)
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
      //console.log(userDays[0])
      //if db query successful > fetched days get pushed into days []
      //console.log(userDays)
      setDays(userDays)
      console.log("days", days)
      }
    catch (error) {
    console.log(error)
    } 
  };

  const getDBCert = async () => {
    try {
      let id = userId
      let results = await fetch(`/cert/${id}`);
      let userCert = await results.json();
      //console.log(userCert[0])
      //if db query successful > fetched cert get pushed into certifications []
      //console.log(userCert)
      setCert(userCert)
      console.log("cert", certifications)
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

//Fetches users from db based on level, gender, cert props in preferences {}, days [] & location
//NB - still need to add cert
  const getRecommendations = async () => {
    try {
      let results = await fetch("/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location, dayNames, levelNames, genderNames}) 
      });
      let matchedUsers = await results.json();
      //console.log(users)
      //if db query successful > fetched users get pushed into recommendations []
      setRecommendations(matchedUsers)
      console.log("recommendations", recommendations)
      }
    catch (error) {
      console.log(error)
    } 
  };

 
  let userObj = {
    userId, setUserId, 
    profile, setProfile,
    getDBProfile,  
    location, setLocation,
    days, setDays, 
    daysOfWeek, setDaysOfWeek,
    setSelected,
    certifications, setCert,
    climbingCert, setClimbingCert,
    preferences, setPreferences,
    recommendations, getRecommendations,
    navigate
    }

  useEffect(() => {
    getDBProfile()
    getDBDays()
    getDBCert()
    setPreferences((state) => ({
        ...state}
        ));
    getRecommendations() //Makes sure myMatches is not empty when first loading. 
    //Matched based on default values preferences {}, days [] & location.
    //getLocation() // sets "active user" geolocation when first loading
    //navigate("/") //nagivates to homescreen when first loading.
  }, []) 

  
  return (

    <div className="main container-fluid text-center">
    <NavBar/>
   
    <UserContext.Provider value={userObj}>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<DashBoard/>} />
      <Route path="/setup" element={<SetUp/>} />

      <Route path="/settings" element={<Settings/>}/>
      <Route path="/preferences" element={<Preferences/>}/>
   
  
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/matches" element={<Matches/>}/>
    
     </Routes>

     </UserContext.Provider>
     
     
      <footer className="p-2 text-white text-left">
      <p> </p>
      <p className="p-2 font-italic"> CodeOp Project 2023 </p>
     </footer>
     </div>
  )
}

export default App;
