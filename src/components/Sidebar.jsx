import React from "react";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Welcome to our online booking</h2>

      <button className="sidebar-button" onClick={() => navigate("/health-history")}>
        Health History
      </button>

      <button className="sidebar-button" onClick={() => navigate("/booking")}>
        Booking Page
      </button>

      <button className="sidebar-button" onClick={() => navigate("/full-calendar-view")}>
        Full Calendar
      </button>
    </aside>
  );
};

export default Sidebar;
