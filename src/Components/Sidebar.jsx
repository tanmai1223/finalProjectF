import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaFileAlt, FaChartBar, FaCog } from "react-icons/fa"; // blue styled icons
import "../Style/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <span className="sidebar-title">API Management</span>
      <hr />
      <ul className="sidebar-menu">
        <li className="menu-item">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            <FaHome className="icon" /> Home
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/tracer" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaFileAlt className="icon" /> Tracer
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/analytics" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaChartBar className="icon" /> Analysis
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/config" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaCog className="icon" /> Configuration
          </NavLink>
        </li>
      </ul>
      <hr />
    </div>
  );
}

export default Sidebar;
