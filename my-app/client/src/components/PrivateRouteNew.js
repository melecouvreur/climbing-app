import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import {AuthContext} from "../Context/AuthContext";

// A wrapper for components that redirects to the login
// screen if you're not yet authenticated.
function PrivateRouteNew({ children }) {

  let auth = useContext(AuthContext);

  return auth.isLoggedIn ? children : <Navigate to="/" />;
}

export default PrivateRouteNew;
