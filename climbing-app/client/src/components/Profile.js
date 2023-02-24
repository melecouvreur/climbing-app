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
       
      <div className="profile p-3 justify-content-center float-md-end border-0">
      <h2 className="profile p-3"> My Profile </h2>

      <h5 className="profile card-title"> {settings.userName} </h5>
      <span className="profile card-text"> {settings.pronouns} </span>

      <img className="profile-pic img-fluid" src={settings.img} alt="profile"/>

      <p className="profile p-3"> {settings.location} </p>
      <span> {settings.lead} </span>
      <p className="profile card-body justify-content-center p-5"> {settings.bio} </p>

      <div className="profile">
      <button 
      className="row btn btn-m btn-warning m-1"
      onClick={findPartners}
      > Find NewPartners </button>
      </div>
      
      <div className="profile">
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
