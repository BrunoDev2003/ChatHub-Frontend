import React, {useState} from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <form>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
      <button type="submit">Login</button>
    </form>
  )
  
}

export default LoginPage