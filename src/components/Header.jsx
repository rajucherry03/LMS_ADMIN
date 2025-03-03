import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import NotificationPopup from "./NotificationPopup"; // Ensure this component exists
import { Bell, LogOut, User } from "lucide-react"; // Lucide icons for better design

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => navigate("/"))
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <header className="bg-indigo-800 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Dashboard Title */}
      <h1 className="text-lg font-semibold tracking-wide">Admin Dashboard</h1>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 rounded-full hover:bg-indigo-700 transition"
        >
          <Bell className="w-6 h-6" />
        </button>

        {showNotifications && (
          <div className="absolute top-16 right-16 w-72 bg-white text-black shadow-lg rounded-lg p-4">
            <NotificationPopup />
          </div>
        )}

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2"
          >
            <img
              src="/path-to-profile-icon.svg"
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-teal-400"
            />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-lg shadow-lg border border-gray-200">
              <ul className="py-2">
                <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                  <User className="w-5 h-5" /> Profile
                </li>
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
