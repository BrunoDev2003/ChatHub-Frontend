import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import ChatApp from './components/ChatApp/ChatApp';
import { UserProvider, useUser, UserContext } from './UserContext';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const { setUser } = useUser();

    const handleLogin = (username) => {
        setIsAuthenticated(true);
        setUser({username});
    };

  return (
      <Router>
        <Routes>
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="/chat" element={isAuthenticated ? <ChatApp /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
  );
}

export default App;
