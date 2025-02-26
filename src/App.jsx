import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import PublicView from './components/PublicView';
import Config from './components/Config';
import Admin from './components/Admin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role);
      } catch (error) {
        console.error("Error al decodificar token:", error);
      }
    } else {
      setUserRole(null);
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-10 bg-gray-100">
      <Routes>
        <Route path="/" element={<PublicView />} />
        <Route path="/config" element={
          isAuthenticated && userRole === "OWNER"
            ? <Config />
            : <Navigate to="/login" replace />
        } />
        <Route path="/admin" element={
          isAuthenticated && userRole === "SUPERUSER"
            ? <Admin />
            : <Navigate to="/login" replace />
        } />
        <Route path="/login" element={
          isAuthenticated
            ? <Navigate to={userRole === "SUPERUSER" ? "/admin" : "/config"} replace />
            : <Login onLoginSuccess={handleLoginSuccess} />
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

