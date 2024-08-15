import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <main className="">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
