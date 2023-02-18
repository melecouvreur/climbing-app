import React, {useState} from "react";
import Settings from "./components/Settings"
import List from "./components/List"
import './App.css';


function App() {

  const [isView, setView] = useState("profile") 
  const [recommendations, setRecommendations] = useState([]) // Sets list of recommended climbers based on match criteria

  const uID = 0
  const [isChecked, setIsChecked] = useState(false)

  //"Active user" default settings. Move to settings comp later
  const [settings, setSettings] = useState({ 
    uID: uID,
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    pronouns: "",
    bio: "",
    img: "",
    location: "London",
    typeOne: isChecked,
    typeTwo: isChecked,
    days: ["Monday", "Saturday"],
   }
 )

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

  // generates list of recommended climbers based on match criteria 
  const getRecommendations = async () => {
    try {
      let results = await fetch("/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: settings.location, days: settings.days })
      });
      let users = await results.json();
      console.log(users)
      //if db query successful > updates recommended climber state var
      setRecommendations(users)
      console.log(recommendations)
      handleChangeView("List")
    }
    catch (error) {
      console.log(error)
    }
  };
  
  
  return (

    <div className="justify-content-md-start">

      {settings.location}

      <nav>
        <button
        onClick={() => handleChangeView("Settings")}
        className= {isView === "Settings" ? "btn btn-m btn-danger m-1" : "btn btn-m btn-warning m-1"}
        >
        Settings</button>
        <button
        onClick={() => handleChangeView("Profile")}
        className= {isView === "Profile" ? "btn btn-m btn-danger m-1" : "btn btn-m btn-warning m-1"}
        >
        myProfile </button>
        </nav>

      <div className="container text-center">
        {isView === "Settings" && 
        (<Settings
        settings={settings}
        setSettings={setSettings}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        handleChangeView={handleChangeView}
        />)}
      </div>

      
      {isView === "Profile" && (
      <div>
      <h1> BelayMe </h1>

      <h2> My Profile </h2>

      <p> Here my profile will be featured </p>

      <button 
      className="btn btn-m btn-warning m-1"
      onClick={getRecommendations}
      > Find Climbers </button>
      </div>
       )}

        {isView === "List" && (
        <div>
          <List
          recommendations={recommendations}/>
        </div>
      )}
     
    </div>
  )
}

export default App;
