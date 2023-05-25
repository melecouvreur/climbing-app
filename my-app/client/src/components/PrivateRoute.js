import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import {AuthContext} from "../Context/AuthContext";
import { Outlet } from "react-router-dom";

// A wrapper for components that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute() {

  let auth = useContext(AuthContext);

  return auth.isLoggedIn ? <Outlet/> : <Navigate to="/" />;
}

export default PrivateRoute;
