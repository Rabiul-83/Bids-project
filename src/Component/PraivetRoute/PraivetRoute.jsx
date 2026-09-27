import React, { use } from 'react';
import { AuthContext } from '../../Authcontext/Authcontext';
import { Navigate, useLocation } from 'react-router';

const PraivetRoute = ({children}) => {
    const {user,loading}=use(AuthContext)
    const location =useLocation()
   if (loading) {
        return <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }
    if (user) {
        return children;
    }
    return <Navigate to="/register" state={location.pathname}></Navigate>;
};

export default PraivetRoute;