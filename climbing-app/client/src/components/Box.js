import React from "react";

function Box( {featured}) {

  return (
    <div className="justify-content">
      <h2> Name Climber </h2>
      {featured.firstname && (
      <div>
      <span>{featured.firstname} {featured.lastname} </span>
      <span> {featured.location} </span>

      {featured.days}
      </div>)}
    </div>
     
  );
}

export default Box;
