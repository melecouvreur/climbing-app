import React, {useState, useEffect} from "react";
import Settings from "./components/Settings"
import List from "./components/List"
import Profile from "./components/Profile";
import Preferences from "./components/Preferences";
import './App.css';
import { Routes, Route, Link, NavLink, useNavigate} from "react-router-dom";


function App() {

  const [isView, setView] = useState("home") // SetsView 
  const [isChecked, setChecked] = useState(false) // Sets top/lead within Preferences of "active user"
  const [recommendations, setRecommendations] = useState([]) // SetsRecommendations array (= recommended climbers) based on Preferences/filters
  const [days, setDays] = useState(["Tuesday"]) // Setsdays within Preferences/filter of "active user"
  const navigate = useNavigate()

  //"active user" default settings. Move to settings comp?
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

//remove later with route
const handleChangeView = (isView) => {
  setView(isView)
}

useEffect(() => {
  handleChangeView("Home")
  setSettings((state) => ({
    ...state}
    ));
  //getRecommendations();
}, [])

/*
  //Fetches all users. No filters applied. For testing.
  const showUsers = () => {
    fetch("/users")
    .then(response => response.json())
    .then(users => {
    setRecommendations(users)
    //handleChangeView("List")
    })
    .catch(error => {
      console.log(error)
    })
  };
*/

//Fetches climbers based on Preferences/filter from db
//To do - insert top/lead
  const getRecommendations = async () => {
    try {
      let results = await fetch("/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: settings.location, days}) 
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
    onClick={() => handleChangeView("Home")}/> 

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
        onClick={() => getRecommendations} 
        className= {isView === "Matches" ? "btn btn-m btn-danger m-1" 
        : "btn btn-m btn-warning m-1"} >
        myMatches </button></NavLink>
        </nav>
    </div>
    </header>

    <div className="grid px-3">
       {isView === "Home" && (
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
        getRecommendations={getRecommendations}
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
        getRecommendations={getRecommendations}
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
          handleChangeView={handleChangeView}
          isView={isView}
          recommendations={recommendations}
          getRecommendations={getRecommendations}/>}>
          </Route>
     </Routes>
         
     </div>
    </div>
  )
}

export default App;
