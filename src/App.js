import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import ChatApp from './components/ChatApp/ChatApp';
import { UserProvider } from './UserContext';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const { setUser } = setUser();

    const handleLogin = (username) => {
        setIsAuthenticated(true);
        setUser(username);
    };

  return (
    <UserProvider>
      <Router>
        <Routes>
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="/chat" element={isAuthenticated ? <ChatApp /> : <ChatApp Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
