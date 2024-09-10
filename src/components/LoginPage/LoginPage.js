import React, {useState} from 'react';
import { Container, Header, Form, Input, Button } from './components/LoginPage/LoginPage.styles';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Container>
      <Header> ChatHub - Login</Header>
      <Form onSubmit={handleSubmit}>
        <Input type="email"
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        />

        <Input type="password" 
        placeholder="Senha" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        />

        <Button type="submit">Login</Button>
      </Form>
    </Container>
  )
  
}

export default LoginPage;