import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';  // Import Home page
import AdminLayout from './layout/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';  // Import Dashboard page
import Courses from './pages/Courses';
import Users from './pages/Users';
import Payments from './pages/Payments';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { auth } from './firebase';  // Firebase import

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);  // Update authentication state based on user presence
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/dashboard" 
               element={isAuthenticated ? <AdminLayout><Dashboard /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="/courses" 
               element={isAuthenticated ? <AdminLayout><Courses /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="/users" 
               element={isAuthenticated ? <AdminLayout><Users /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="/payments" 
               element={isAuthenticated ? <AdminLayout><Payments /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="/analytics" 
               element={isAuthenticated ? <AdminLayout><Analytics /></AdminLayout> : <Navigate to="/login" />} />
        <Route path="/settings" 
               element={isAuthenticated ? <AdminLayout><Settings /></AdminLayout> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
