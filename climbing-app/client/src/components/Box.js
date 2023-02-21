import React from "react";

function Box( {featured}) {

  return (
    <div className="justify-content">
      <h2> Name Climber </h2>
      {featured.length > 0 && (
      <div>
      <span>{featured[0].firstname} {featured[0].lastname} </span>
      <span> {featured[0].location} </span>

      {featured[0].days}
      </div>)}
    </div>
     
  );
}

export default Box;
