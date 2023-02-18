import React from "react";

function Box( {featured}) {

  return (
    <div className="justify-content">
      <h2> Name Climber </h2>
      {featured.length > 0 && (
      <div>
      {featured[0].firstname} {featured[0].lastname}
      </div>)}
    </div>
     
  );
}

export default Box;
