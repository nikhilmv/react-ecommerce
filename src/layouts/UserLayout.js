import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/user/Headers/Header";
  

export const UserLayout = () => {
  return (
    <>
     <Header />
     <Outlet />
    </>
  );
};
