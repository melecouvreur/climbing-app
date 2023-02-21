import React, {useState} from "react";
import Settings from "./components/Settings"
import List from "./components/List"
import './App.css';


function App() {

  const [isView, setView] = useState("home") 
  const [isChecked, setChecked] = useState(false)
  const [recommendations, setRecommendations] = useState([]) // Sets list of recommended climbers based on match criteria

  const uID = 0
  const [days, setDays] = useState([])

  //"Active user" default settings. Move to settings comp later
  const [settings, setSettings] = useState({ 
    uID: uID,
    firstName: "Mele",
    lastName: "Couvreur",
    userName: "m_couvreur",
    email: "dummy@gmail.com",
    pronouns: "she/her",
    bio: "Sometimes I make myself proud, sometimes I put my keys in the fridge. Coffee, climbing and coding-fanatic",
    img: "https://www.climbing.com/wp-content/uploads/2017/11/womenclimbingtimeline.jpg?crop=16:9&width=1500",
    location: "London",
    top: isChecked,
    lead: isChecked,
    days: ["Saturday", "Sunday", "Tuesday", "Sunday", "Monday"],
    //to insert days state var
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

    <div className="d-flex h-100 p-3 text-center text-bg-dark">

    <div className="cover-container d-flex w-100 h-100 p-3 flex-column">
    
    <header className="mb-auto">
    <div>
    <img className= "App-logo img-fluid" src="https://cdn-icons-png.flaticon.com/512/5064/5064233.png"/> 
    <h1 className="float-md-start"> BelayMe </h1>
      <nav className="nav nav-masthead justify-content-center float-md-end p-3">
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
    </div>
    </header>

       {isView === "home" && (<div className="px-3">
        
        <h2> Welcome! </h2>

        <p> 
        "BelayMe is an app for finding belay partners" </p>
       </div>)}




      <div className="container text-center">
        {isView === "Settings" && 
        (<Settings
        settings={settings}
        setSettings={setSettings}
        handleChangeView={handleChangeView}
        days={days}
        setDays={setDays}
        isChecked={isChecked}
        setChecked={setChecked}
        />)}
      </div>

      
      {isView === "Profile" && (
      <div className="card p-3 justify-content-center float-md-end border-warning">
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

        {isView === "List" && (
        <div>
          <List
          handleChangeView={handleChangeView}
          isView={isView}
          recommendations={recommendations}/>
        </div>
      )}

         
     
     </div>
    </div>
  )
}

export default App;
