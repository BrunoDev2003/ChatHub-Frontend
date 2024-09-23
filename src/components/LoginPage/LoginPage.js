import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Header, Form, Input, Button, Footer } from './LoginPage.styles';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/health')
      .then(response => {
        console.log('backend está rodando...', response.data)
      })
      .catch(error => { 
        console.error('Ocorreu um erro a conexão com o back...', error)
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/login', { username, password })
    .then(response => {
      console.log('Usuário logado com sucesso!', response.data);
      onLogin();
      navigate('/chat');
    })
    .catch(error => {
      console.error('Ocorreu um erro ao fazer login...', error)
    });
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <Container>
      <Header> ChatHub - Login</Header>
      <Form onSubmit={handleSubmit}>
        <Input type="text"
        placeholder="Nome de usuário" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        />

        <Input type="password" 
        placeholder="Senha" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        />

        <Button type="submit">Login</Button>
      </Form>
      <Footer>© 2024 ChatHub - Bruno Mendonça Gusmão BrunoDev2003</Footer>
    </Container>
  );
  
};

export default LoginPage;