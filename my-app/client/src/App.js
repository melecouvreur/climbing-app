
import React, {useState, useEffect} from "react";
import prefTemplate from "./Data/prefTemplate"
import daysTemplate from "./Data/daysTemplate";
import certTemplate from "./Data/certTemplate";
import PrivateRoute from "./Components/PrivateRoute";
import Home from "./Pages/Home"
import Splash from "./Pages/Splash";
import Settings from "./Components/Settings"
import Matches from "./Pages/Matches"
import Profile from "./Pages/Profile";
import NavBar from "./Components/NavBar";
import AccountSetUp from "./Components/AccountSetUp";
import Preferences from "./Components/Preferences";
import { UserContext } from "./Context/userContext";
import { AuthContext } from "./Context/AuthContext";
import useProvideAuth from "./Hooks/useProvideAuth";
import './App.css';
import { Routes, Route, useNavigate} from "react-router-dom";

function App() {

  //const [userId, setUserId] = useState(0)
  //const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profile, setProfile] = useState({
      username: "",
      email: "",
      level: "", 
      gender: "",
      pronouns: "", 
      avatar: "",
      bio: "",
  })

  const [days, setDays] = useState([])
  const [location, setLocation] = useState("London")
  const [certifications, setCert] = useState([])
  const [recommendations, setRecommendations] = useState([]) 
//SetsRecommendations [] (= recommended climbers) based on preferences {}.
  const [isSelected, setSelected] = useState(false) 
  const navigate = useNavigate() 

//Sets user matching criteria. days, cert, gender and level in preferences can differ from cert, gender, level, days in Settings/Db
//i.e. User can be level = intermediate, but choose to match with advanced. Idem gender, cert and days
 const [preferences, setPreferences] = useState(prefTemplate)
 const [daysOfWeek, setDaysOfWeek] = useState(daysTemplate)
 const [climbingCert, setClimbingCert] = useState(certTemplate)


let dayNames = days.filter((d) => d.selected == true).map((d) => d.day)
//console.log(dayNames)
let levelNames = preferences.level.filter((l) => l.selected == true).map((l) => l.name)
//console.log(levelNames)
let genderNames = preferences.gender.filter((g) => g.selected == true).map((g) => g.name)
//console.log(genderNames)

  const getProfile = async () => {
    let options = {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      const response = await fetch("/profile", options);
  
      if (response.ok) {
        const data = await response.json();
        setProfile(data[0]);
        console.log(data[0]);
        console.log("getProfile", profile)
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDays = async () => {
    let options = {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      const response = await fetch("/days", options);
  
      if (response.ok) {
        const data = await response.json();
        setDays(data);
        console.log(data);
        console.log("getDays", days)
        
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCert = async () => {
    let options = {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      const response = await fetch("/cert", options);
  
      if (response.ok) {
        const data = await response.json();
        setCert(data);
        console.log(data);
        console.log("getCert", certifications)
        
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.log(error);
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
    profile, setProfile,
    location, setLocation,
    days, setDays, 
    daysOfWeek, setDaysOfWeek,
    setSelected,
    certifications, setCert,
    climbingCert, setClimbingCert,
    preferences, setPreferences,
    recommendations, getRecommendations,
    navigate,
    }
  
  const auth = useProvideAuth();
  
  useEffect(() => {
    getProfile()
    getDays()
    getCert()
    setPreferences((state) => ({
        ...state}
        ));
    getRecommendations() //Makes sure myMatches is not empty when first loading. 
    //getLocation() // sets "active user" geolocation when first loading
    //navigate("/")
  },[]) 
  
//TO DO - Move navbar, ensure setup page is only rendered once
  return (

    <div className="main container-fluid text-center">
    
    <AuthContext.Provider value={auth}>
    <UserContext.Provider value={userObj}>
     <NavBar/>

     <Routes>
      <Route path="/" element={<Splash/>} />

      <Route path="/private" element={<PrivateRoute/>}>
    
        <Route path="home" element={<Home/>}/>
        <Route path="setup" element={<AccountSetUp/>} />
        <Route path="settings" element={<Settings/>}/>
        <Route path="preferences" element={<Preferences/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="matches" element={<Matches/>}/>

    </Route>
  
    </Routes>

     </UserContext.Provider>
     </AuthContext.Provider>
     
     
    </div>
  )
}

export default App;
