import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/admin/Header/Header.js";
import { Sidebar } from "../components/admin/Sidebar/Sidebar.js";

export const AdminLayout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </>
  );
};
