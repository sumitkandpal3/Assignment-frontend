import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import AdminHeader from "./AdminHeader";
import Footer from "../Footer";

const AdminLayout = () => {
  return (
    <main className="lg:pl-[270px]">
      <SideBar />
      <AdminHeader />
      <Outlet />
      <Footer />
    </main>
  );
};

export default AdminLayout;
