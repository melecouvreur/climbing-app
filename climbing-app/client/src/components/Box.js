import React from "react";

function Box( {featured}) {
 {/*not finished. Probably remove as not necessary functionality*/}
  return (
    <div className="justify-content">
      <h2> Name Climber </h2>
      {featured.username && (
      <div>
      <span>{featured.firstname} {featured.lastname} </span>
      <span> {featured.location} </span>

      {featured.days}
      </div>)}
    </div>
     
  );
}

export default Box;
