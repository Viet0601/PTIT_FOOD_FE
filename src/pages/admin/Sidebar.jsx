import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import { Link, useLocation } from "react-router";
import { LINK } from "../../utils/constant";

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const location = useLocation();

  const computeActive = (path) => {
    if (path === LINK.ADMIM || path === "/admin") return "DASHBOARD";
    if (path.startsWith(LINK.ADMIN_MANAGE_FOOD)) return "FOOD";
    if (path.startsWith(LINK.ADMIN_MANAGE_ORDER)) return "ORDER";
    if (path.startsWith(LINK.ADMIN_FEEDBACK)) return "FEEDBACK";
    return "DASHBOARD";
  };

  const [active,setActive]=useState(() => computeActive(location.pathname));

  useEffect(() => {
    setActive(computeActive(location.pathname || ""));
  }, [location.pathname])
  return (
    <div 
      className={`sidebar ${isOpen ? "open" : "closed"} `}
    >
      <h2 className="logo-admin d-flex align-items-center justify-content-between px-4">  Admin   <button  hidden={!isMobile} className="toggle-btn" onClick={()=>setIsOpen(!isOpen)}>
        ☰
      </button></h2>
        {isOpen &&   <ul className="menu">
        <Link onClick={()=>setActive("DASHBOARD")}  to={LINK.ADMIM}><li className={`${active==="DASHBOARD" ?"active":"" }`}>📊 Dashboard</li></Link>
        <Link onClick={()=>setActive("FOOD")} to={LINK.ADMIN_MANAGE_FOOD}><li className={`${active==="FOOD" ?"active":"" }`}>🍔 Quản lý món ăn</li></Link>
        <Link onClick={()=>setActive("ORDER")} to={LINK.ADMIN_MANAGE_ORDER}><li className={`${active==="ORDER" ?"active":"" }`}>📦 Quản lý đơn hàng</li></Link> 
        <Link onClick={()=>setActive("FEEDBACK")} to={LINK.ADMIN_FEEDBACK}><li className={`${active==="FEEDBACK" ?"active":"" }`}>💬 Phản hồi</li></Link>
      </ul>}
      {/* {isMobile && isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
      )} */}
   
    </div>
  );
};

export default Sidebar;
