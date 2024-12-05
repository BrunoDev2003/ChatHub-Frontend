import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import ChatApp from './components/ChatApp/ChatApp';
import { useUser } from './UserContext';
import { useState } from 'react';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { setUser } = useUser();
    const [activeRoom, setActiveRoom] = useState(null);

    const handleLogin = (loggedUser) => {
        setIsAuthenticated(true);
        setUser(loggedUser);
        setActiveRoom(`rooms:${loggedUser.roomId}`);
    };

  return (
      <Router>
        <Routes>
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="/chat" element={isAuthenticated ? (
                <ChatApp activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
              ) : <Navigate to="/login" />} 
              />
              <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
  );
}

export default App;
