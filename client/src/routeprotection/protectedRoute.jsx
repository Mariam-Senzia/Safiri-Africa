import React from "react";
import { Navigate } from "react-router-dom";
import useStore from "../store/UseStore";

const protectedRoute = ({children}) => {
    const {accessToken} = useStore();

    if(!token){
        return <Navigate to='/signIn' replace/>
    }

    return children;
}
export default protectedRoute;