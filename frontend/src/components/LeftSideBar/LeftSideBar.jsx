import React from "react";
import "./LeftSideBar.css";
import { useNavigate } from "react-router-dom";

function LeftSideBar() {
  const navigate = useNavigate();
  const leftSideNavBar = [
    { text: "Manager Dashboard", pageUrl: "admin" },
    { text: "Manage Patient", pageUrl: "admin/patient/create" },
    { text: "Create Diet Chart", pageUrl: "admin/patient/create-diet" },
    { text: "Manage Pantry", pageUrl: "admin/pantry/manage" },
    { text: "Track Deliveries", pageUrl: "admin/deliveries/track" },
    { text: " + Add Staff", pageUrl: "admin/add-staff" },
    { text: " + Add Pantry Task", pageUrl: "admin/pantry-staff/create" },
  ];

  const sidebarHandler = (pageUrl) => {
    navigate(`/${pageUrl}`); // Ensures a consistent and correct path
  };

  return (
    <div className="leftSideBar h-screen overflow-hidden">
      <h1 className="font-bold LFTADMNnameDis py-8">Admin Dashboard</h1>
      <div className="managerTaskList h-screen">
        {leftSideNavBar.map((singleNavbarItem, index) => (
          <div
            onClick={() => sidebarHandler(singleNavbarItem?.pageUrl)}
            key={index}
            className="singleNavitem"
          >
            <div className="singleNavLink flex items-center">
              <span>{singleNavbarItem.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeftSideBar;
