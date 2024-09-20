import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import ChatApp from './components/ChatApp/ChatApp';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

  return (
    <Router>
    <Switch>
        <Route path="/login">
          <LoginPage onLogin={handleLogin} />
        </Route>
        <Route path="/chat">
          {isAuthenticated ? <ChatApp /> : <Redirect to="/login" />}
        </Route>
        <Redirect from= "/" to="/login" />
    </Switch>  
    </Router>
  );
}

export default App;
