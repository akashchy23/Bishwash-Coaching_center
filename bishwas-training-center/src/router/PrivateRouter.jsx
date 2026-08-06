import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Loader from '../Pages/Loader';
import { Navigate, useLocation } from 'react-router';

const PrivateRouter = ({children}) => {
    const {user,loading}= use(AuthContext);
    const loacation = useLocation()
    console.log(location)
    if(loading) return <Loader/>
    if(!user) return <Navigate state={loacation.pathname} to='/login'></Navigate>
    return children
};

export default PrivateRouter;