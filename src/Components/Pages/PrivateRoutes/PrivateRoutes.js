
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useFirebase from '../../Hooks/useFirebase';


const PrivateRoutes = ({children, ...rest}) => {

    const { currentUser, isLoading } = useFirebase();
    const location = useLocation();

    if( isLoading  ){ return <p>Loading . . .</p>};

    if( currentUser?.email ){
        return children;
    }
    return <Navigate to="/" replace state={{from: location }} />
};

export default PrivateRoutes;