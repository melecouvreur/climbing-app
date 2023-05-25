import React, { useState} from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate} from "react-router-dom";

function Auth() {
  
  const [isRegistered, setIsRegistered] = useState(false)
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  })

 const [message, setMessage] = useState("");
 const navigate = useNavigate() 

 const auth = useContext(AuthContext);

  //Toggles between login / register view & funct
  const changeRegistered = () => {
    auth.setIsRegistered(auth.isRegistered === true ? false : true)
    console.log(auth.isRegistered)
  }

  //Sets credentials for login() and register() 
  const handleChange = (e) => {
    const { name, value } = e.target;
    auth.setCredentials({ ...auth.credentials, [name]: value });
  }; 

  //if isRegistered = false register view & func will appear
  /*const register = async () => {
    try {
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          };
      const result = await fetch("/register", options);
      const data  = await result.json();
      if (!result.ok) {
      setMessage(data.error);
      console.log(data.message) 
     } 
      else {
      console.log(data.message)
      //Sets registered status to true once successful & directs user to login
      changeRegistered()
      setSetUp(true)
      console.log(isSetUp)
      navigate("private/setup")
      }
     }
     catch (err) {
      console.log(err.message)
    }
  };
*/
  return (
    <div className="d-flex p-4 justify-content-center text-left">
      {!auth.isRegistered ? 
      (
      <div className="align-self-center">
        <div className="bg-warning px-5 p-2">
        <h3 className="p-2"> Register </h3>

       
        <label className="p-2"> Username </label>
        <input
          value={auth.credentials.username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
        />

       <label className="p-2"> Email </label>
       <input
          value={auth.credentials.email}
          onChange={handleChange}
          name="email"
          type="email"
          className="form-control mb-2 p-2"
        />

        <label className="p-2"> Password </label>
        <input
          value={auth.credentials.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2 p-2"
        />
        <button className="p-2 m-2 btn btn-primary" onClick={() => auth.register(auth.credentials)}>
        Register
        </button>
        </div>

        <div className="bg-light pt-3">
        <h6 className="p-2">Already have an account? </h6>
        <button 
        className="pt-2 btn btn-primary ml-2"
        onClick={changeRegistered} >
        Login
        </button>
        </div>
    
      </div> ) : 
      (
      <div className="align-self-center">

      <div className="bg-warning px-5 p-2">
      <h3 className="p-3"> Sign-in </h3>
   
        <label className="p-2"> Username </label>
        <input
          value={auth.credentials.username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2 p-2"
        />
         <label className="p-2"> Password </label>
        <input
          value={auth.credentials.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-3 p-2"
        />
         <button className="pt-2 btn btn-primary mb-2 ml-2" onClick={() => auth.login(auth.credentials)}>
          Log in
        </button>
        </div>
     
        <p className="p-2"> {auth.message}</p>

        <p className="p-2"> Don't have an account? </p>
        <button 
        className="p-2 btn btn-primary ml-2"
        onClick={changeRegistered} >
        Register
        </button>

      </div>
      )}
    
    </div>
  );
}

export default Auth;
