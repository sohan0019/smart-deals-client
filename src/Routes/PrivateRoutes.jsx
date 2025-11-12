import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {

  const {user, loading} = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner text-success"></span>
  }

  if (user && user.email) {
   return children; 
  } 

  return <Navigate state={location?.pathname} to="/register"></Navigate>

};

export default PrivateRoutes;