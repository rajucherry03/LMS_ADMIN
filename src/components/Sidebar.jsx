import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="p-4 text-white bg-indigo-800 md:hidden focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 h-screen bg-indigo-800 text-white transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block`}
      >
        <div className="flex flex-col p-6 space-y-4">
          <Link to="/dashboard" className="text-lg hover:text-teal-400 transition-all">
            Dashboard
          </Link>
          <Link to="/courses" className="text-lg hover:text-teal-400 transition-all">
            Courses
          </Link>
          <Link to="/users" className="text-lg hover:text-teal-400 transition-all">
            Users
          </Link>
          <Link to="/payments" className="text-lg hover:text-teal-400 transition-all">
            Payments
          </Link>
          <Link to="/analytics" className="text-lg hover:text-teal-400 transition-all">
            Analytics
          </Link>
          <Link to="/settings" className="text-lg hover:text-teal-400 transition-all">
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
