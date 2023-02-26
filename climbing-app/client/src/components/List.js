import React, {useState} from "react";
import Box from "./Box"
import "./Profile.css"

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
    
    <div className="bg-3 d-flex justify-content-center align-items-center">
      <div className="card-deck">
      {recommendations.map(user => (
        <div
         key={user.uID}
         className="card"
         onClick={() => featureUser(user.uID)}>

     <div className="user text-center">
     <div className="profile">
      <img 
        src={user.avatar} 
        className="rounded-circle" 
        width="100"/>
    </div>
   </div>

  <div className="mt-5 text-center">
   <h4 className="p-2 mb-0"> {user.username} </h4>
   <p className="d-block mb-2"> {user.firstname} {user.lastname} </p>
   <span className="d-block mb-2"> {user.pronouns}</span>

   <button 
   className="btn btn-warning btn-sm follow m-3">
    Send Request
   </button>

   <div className="d-flex justify-content-between align-items-center mt-4 px-4">

     <div className="stats">
       <h6 className="mb-0"> Location </h6>
       <span> {user.location}</span>
     </div>

     <div className="stats">
       <h6 className="mb-0"> Level </h6>
       <span> {user.level} </span>
     </div>

   </div>

</div>
</div> 
      ))}
</div>
      {isView === "Featured" && (
      <Box
       featured={featured}/>
       )}

    </div>
  );
}

export default List;
