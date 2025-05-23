import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectUserAccessToken,
  selectUserInfo,
} from "../../features/auth/userAuthSelectors";
import toast from "react-hot-toast";

export const UserPrivateRoute = ({ children }) => {
  const user = useSelector(selectUserInfo);
  const accessToken = useSelector(selectUserAccessToken);

  
  // If both are explicitly null or undefined, redirect to login
  if (!user || !accessToken) {
    toast.error("You need to login first");  
    return <Navigate to="/login" />;  
  }

  // If both exist, render children
  return children;
 
};
