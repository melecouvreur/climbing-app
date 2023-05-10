
import React, {useState, useEffect} from "react";
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

  const [isSelected, setSelected] = useState(false) 
  //Sets lead prop in preferences & settings {}'s. 
  const [recommendations, setRecommendations] = useState([]) 
  //SetsRecommendations [] (= recommended climbers) based on preferences {}. 
  const [days, setDays] = useState([]) 
  //Setsdays "active user" wants to climb based on daysOfWeek []. daysOfWeeks gets modified in Preferences & Settings forms
  const [location, setLocation] = useState("London")
  const [certifications, setCert] = useState([])
  //setsLocation "active user" profile.
  const navigate = useNavigate() 

//"active user" default preferences. Sets user matching criteria. 
//NB - cert, gender and level prop value in preferences can differ from cert, gender, level prop in Settings.
//i.e. User can be level = intermediate, but choose to match with advanced. Idem gender and cert

const [preferences, setPreferences] = useState({
      days: [
        {name: "Monday", selected: false} ,
        {name: "Tuesday", selected: false} ,
        {name: "Wednesday", selected: false} ,
        {name: "Thursday", selected: false} ,
        {name: "Friday", selected: false} ,
        {name: "Saturday", selected: false} ,
        {name: "Sunday", selected: false}
      ],
      gender: [
        {name: "Male", selected: false},
        {name: "Female", selected: false},
        {name: "Trans", selected: false},
        {name: "Non-binary", selected: false},
        ],
      level: [
      {name: "Advanced", selected: false},
      {name: "Intermediate", selected: false},
      {name: "Beginner", selected: false}
      ],
      cert: [
        {name: "Lead certified", selected: false},
        {name: "Top certified", selected: false},
        {name: "None", selected: false}
      ]
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

  const [climbingCert, setClimbingCert] = useState(
    [
      {name: "Lead certified", selected: false} ,
      {name: "Rope certified", selected: false} ,
      {name: "None", selected: false}
    ])

  const [profile, setProfile] = useState([])
  const [userId, setUserId] = useState(1)
  
  let dayNames = days.filter((d) => d.selected == true).map((d) => d.day)
  console.log(dayNames)

  let levelNames = preferences.level.filter((l) => l.selected == true).map((l) => l.name)
  console.log(levelNames)
  
  let genderNames = preferences.gender.filter((g) => g.selected == true).map((g) => g.name)
  console.log(genderNames)


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
        body: JSON.stringify({ location, dayNames, levelNames, genderNames}) 
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
      <Route path="/"
        element={
        <Home/>}>
      </Route>

      <Route path="/login" element={<DashBoard/>} />

      <Route path="/setup" element={<SetUp
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
        getRecommendations={getRecommendations}
        location={location}
        navigate={navigate}/>
        }>
       </Route>

      <Route path="/matches" 
        element={
        <Matches
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
