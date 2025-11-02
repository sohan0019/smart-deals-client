import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { NavLink, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {

  const {user} = use(AuthContext);
  const location = useLocation();

  if (user && user.email) {
   return children; 
  } else {
    return <NavLink state={location.pathname} to="/login"></NavLink>
  }

};

export default PrivateRoutes;