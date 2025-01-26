import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/user/headers/Header";
import { Footer } from "../components/user/Footer";
  

export const UserLayout = () => {
  return (
    <>
     <Header />
     <Outlet />
     <Footer />
    </>
  );
};
