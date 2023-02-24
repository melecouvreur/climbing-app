import React, {useState} from "react";
function Home( {navigate}) {

const [isView, setView] = useState("home") // SetsView 

//remove later
const handleChangeView = (isView) => {
  setView(isView)
}

return (

    <div className="d-flex h-100 text-center">
    <div className="cover-container d-flex w-100 h-100 p-2 flex-column">
    <div className="grid px-3">
       <div className="row p-5 justify-content-center">
        <p className="col-3"> 
        "Get matched with a belay partner with BelayMe" </p>
       </div>
       </div>

    
     </div>
    </div>
  )
}

export default Home;
