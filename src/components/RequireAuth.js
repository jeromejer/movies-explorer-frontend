import React from 'react';
import { Navigate, useLocation} from "react-router-dom";

const RequireAuth = ({ loggedIn, children }) => {
  const location = useLocation();
  // const fromPage = location.state?.from?.pathname || '/';
  return (
    loggedIn ? children : <Navigate to="/signin"/>
  )
};

export default RequireAuth;