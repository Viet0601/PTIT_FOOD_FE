import React, { useState, useEffect } from "react";

import "./AdminLayout.scss";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
  import PerfectScrollbar from 'react-perfect-scrollbar'
const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  
  useEffect(() => {
  const handleResize = () => {
    if(window.innerWidth<=768)
    {
        setIsMobile(true)
        setIsSidebarOpen(false);
    }
    else 
    {
        setIsMobile(false)
        setIsSidebarOpen(true)
    }
   
   
  };
  handleResize();

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  return (
    <div className="admin-layout">
    <div className={`${isSidebarOpen ? "sidebar_cover_open":"sidebar_cover_close"} ${isMobile ? "sidebar_cover_open_moblie":""}`}>
          <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        isMobile={isMobile}
      />
    </div>
      <div className="main-content">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="page-content">
           
                  <Outlet/>
           
          
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
