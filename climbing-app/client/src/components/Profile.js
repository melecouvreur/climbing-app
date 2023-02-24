import React from "react";

function Profile( {navigate, settings, getRecommendations}) {

//Fetches recommended climbers from db and setsRecommendations array
//Switches to myMatches screen where user sees recommendations 
const findPartners = () => {
    getRecommendations()
    navigate("/matches")
  }

  return (
    <div className="justify-content">
       
      <div className="card p-3 justify-content-center float-md-end border-0">
      <h2 className="p-3"> My Profile </h2>

      <h5 className="card-title"> {settings.userName} </h5>
      <span className="card-text"> {settings.pronouns} </span>

      <img className="card-img-top p-4" src={settings.img} alt="profile"/>

      <span> {settings.location} </span>
      <span> {settings.lead} </span>
      <p className="card-body"> {settings.bio} </p>

      <div>
      <button 
      className="row btn btn-m btn-warning m-1"
      onClick={findPartners}
      > Find NewPartners </button>
      </div>
      
      <div>
      <button
      className="row btn btn-m btn-warning m-1">
        My Partners
      </button>
      </div>

      </div>

    </div>
  );
}

export default Profile;
