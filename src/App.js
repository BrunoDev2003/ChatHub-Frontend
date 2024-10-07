import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import ChatApp from './components/ChatApp/ChatApp';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [username, setUsername] = useState('');

    const handleLogin = (username) => {
        setIsAuthenticated(true);
        setUsername(username);
    };

  return (
    <Router>
      <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/chat" element={isAuthenticated ? <ChatApp username={username} /> : <ChatApp username={username} Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
