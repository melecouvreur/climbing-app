import React, {useState} from "react";
import Box from "./Box"

function List( {recommendations, handleChangeView, isView}) {

const [featured, setFeatured] = useState({})

async function featureUser(id) {
  try {
    let results = await fetch(`/users/${id}`);
    let user = await results.json();
    console.log(user)
    //if db query succesfull > sets featured user
    setFeatured(user)
    console.log(featured)
    
    handleChangeView("Featured")
    console.log(isView)
  }
  catch (err) {
    console.log(err)
  }
}

  return (
    <div className="justify-content">
      <h2> My Matches </h2>
      {recommendations.map(user => (
        <div
         key={user.uID}
         className="card p-3 list-group-item center-align border-0"
         onClick={() => featureUser(user.uID)}>

         <h5 className="card-title"> {user.username} </h5>
         <h5 className="card-text">{user.firstname} {user.lastname} </h5>
         <img className="profile-pic card-img p-2" src={user.avatar} alt="profile"/>
         <span> {user.top} </span>
         <p className="card-body"> {user.bio} </p>
       </div>
      ))}

      {isView === "Featured" && (
      <Box
       featured={featured}/>
       )}

    </div>
  );
}

export default List;
