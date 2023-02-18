import React, {useState} from "react";
import Box from "./Box"


function List( {recommendations}) {

const [featured, setFeatured] = useState([])


async function featureUser(id) {
  try {
    let results = await fetch(`/users/${id}`);
    let user = await results.json();
    console.log(user)
    setFeatured(user)
    console.log(featured)
  }
  catch (err) {
    console.log(err)
  }
}

  return (
    <div className="justify-content">
      <h2> My Recommendations </h2>

      <ul>
      {recommendations.map(user => (
        <li
         key={user.uID}>

          <span
          onClick={() => featureUser(user.uID)}>
          {user.firstname} {user.lastname}
          </span>

        </li>
      ))}
      </ul>
      <Box
       featured={featured}/> 
    </div>
     
  );
}

export default List;
