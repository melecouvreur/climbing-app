import React, {useState} from "react";
//import Box from "./Box"
import "../App.css"
import { ToastContainer, toast } from 'react-toastify'; // imports toastify to create pop-up messages
import 'react-toastify/dist/ReactToastify.css';

function List( {recommendations}) {

const [featured, setFeatured] = useState({}) //not finished

//When user clicks 'send request' btn, message appears
const showToast = () => {
  toast.success(`Request been sent!`, {
      position: toast.POSITION.TOP_RIGHT
  });
}

//Not finished - probably remove as not useful feature for App
async function featureUser(id) {
  try {
    let results = await fetch(`/users/${id}`);
    let user = await results.json();
    console.log(user)
    //if db query succesfull > sets featured user
    setFeatured(user)
    console.log(featured)
  }
  catch (err) {
    console.log(err)
  }
} 
  return (
    
    <div className="bg-3 d-flex justify-content-center align-items-center">
      <div className="card-deck">

{/*if user from db matches preferences criteria, recommendations [] != empty, shows list.
If empty shows default message*/}
      {recommendations.length > 0 ? (
       recommendations.map(user => (
        <div
         key={user.uID}
         className="card"
         onClick={() => featureUser(user.uID)}>

     <div className="user text-center">
     <div className="profile">
      <img 
        src={user.avatar} 
        alt="user_avatar"
        className="rounded-circle" 
        width="100"/>
    </div>
   </div>

  <div className="mt-5 text-center">
   <h4 className="p-2 mb-0"> {user.username} </h4>
   <span className="d-block mb-2"> {user.pronouns}</span>

   <button 
   className="btn btn-warning btn-sm follow m-2"
   onClick={showToast}>
   Send Request
   </button>

   <ToastContainer/>

   <div className="d-flex justify-content-between align-items-center mt-4 px-4">
       <span className="bio col-12 text-center">{user.bio}
      </span>
   </div>

   <div className="d-flex justify-content-between align-items-start mt-4 px-4">

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
      ))) : (
      <div className="card justify-content-center align-items-center">
        <h4 className="p-4 display-4"> No matches found :( </h4>
        <span> Try expanding your search </span>
      </div>

      )}
</div>

    </div>
  );
}

export default List;
