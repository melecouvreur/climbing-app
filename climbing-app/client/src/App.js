import React, {useState} from "react";
import Settings from "./components/Settings"
import List from "./components/List"
import './App.css';


function App() {

  const [isView, setView] = useState("profile")
  const [recommendations, setRecommendations] = useState([])
  const handleChangeView = (isView) => {
    setView(isView)
  }

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
  
  
  return (

    <div className="justify-content-md-start">

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
        {isView === "Settings" && (<Settings/>)}
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
