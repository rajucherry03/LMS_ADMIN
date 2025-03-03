import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center py-12 px-6">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4">Welcome to LMS Admin Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6">
          Manage courses, users, payments, analytics, and more from one centralized dashboard.
        </p>

        <div className="bg-white p-8 shadow-lg rounded-lg w-96">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Our Courses</h2>
          <p className="text-gray-600 mb-4">
            Access and manage a variety of courses with ease. Enroll students, track progress, and more!
          </p>
          <div className="flex justify-center">
            <Link to="/login">
              <button className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all">
                Login to Admin Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
