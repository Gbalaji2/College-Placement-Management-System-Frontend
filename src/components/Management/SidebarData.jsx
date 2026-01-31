// Filename: components/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "./SidebarData";

function Sidebar() {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  // Toggle submenu open/close
  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen shadow-lg sticky top-0 overflow-auto">
      <div className="p-4 text-2xl font-bold text-center border-b border-gray-700">
        CPMS Dashboard
      </div>

      <ul className="mt-4">
        {SidebarData.map((item, index) => (
          <li key={index}>
            {item.subNav ? (
              <>
                {/* Main item with submenu */}
                <div
                  className={`flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-700 ${
                    openMenus[item.title] ? "bg-gray-700" : ""
                  }`}
                  onClick={() => toggleMenu(item.title)}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {openMenus[item.title] ? item.iconOpened : item.iconClosed}
                </div>

                {/* Submenu */}
                <ul
                  className={`pl-8 overflow-hidden transition-all duration-300 ${
                    openMenus[item.title] ? "max-h-96" : "max-h-0"
                  }`}
                >
                  {item.subNav.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={subItem.path}
                        className={`flex items-center gap-2 px-4 py-2 my-1 rounded hover:bg-gray-600 ${
                          location.pathname === subItem.path ? "bg-gray-600 font-semibold" : ""
                        }`}
                      >
                        {subItem.icon}
                        <span>{subItem.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              // Single item without submenu
              <Link
                to={item.path}
                className={`flex items-center gap-2 px-4 py-3 my-1 rounded hover:bg-gray-700 ${
                  location.pathname === item.path ? "bg-gray-700 font-semibold" : ""
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarData;