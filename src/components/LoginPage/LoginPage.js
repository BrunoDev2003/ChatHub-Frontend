import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import axios from 'axios';
import { Container, Header, Form, Input, Button, Footer } from './LoginPage.styles';
import { useUser } from '../../UserContext';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, FilledInput, InputAdornment, InputLabel, IconButton } from '@mui/material';
import { CheckCircleOutline, Visibility, VisibilityOff } from '@mui/icons-material';
const LoginPage = ({ onLogin }) => {

  const theme = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    axiosInstance.get('http://localhost:8080/api/health')
      .then(response => {
        console.log('backend está rodando...', response.data)
      })
      .catch(error => { 
        console.error('Ocorreu um erro a conexão com o back...', error)
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post('http://localhost:8080/api/login', { username, password })
    .then(response => {
      const loggedUser = response.data;
      console.log('Usuário logado com sucesso!', loggedUser);
      setUser({ id: loggedUser.id, username: loggedUser.username, isOnline: true});// setar userContext
      onLogin(loggedUser); // grava o userId e username logado
      setSuccess('Login bem-sucedido! Redirecionando...');
      setError('');
      setTimeout(() => navigate('/chat'), 2000); //redireciona para a rota /chat após 2 segundos;
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        setError('Senha inválida!');
        setSuccess('');
      } else {
        setError('Nome de usuário inválido!');
        setSuccess('');
      }
      console.error('Ocorreu um erro ao fazer login...', error);
    });
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <ThemeProvider theme={useTheme()}>
    <Container>
      <Header> ChatHub - Login</Header>
      {error && <Alert iconMapping={{ success: <CheckCircleOutline fontSize="inherit"/>}} variant="filled" severity="error">{error}</Alert>}
      {success && <Alert iconMapping={{ success: <CheckCircleOutline fontSize="inherit"/>}} variant="filled" severity="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <InputLabel>Nome de usuário:</InputLabel>
        <FilledInput 
        sx={{width: '100%', marginBottom: '1rem'}}
        value={username} 
        onChange={(e) => setUsername(e.target.value)}>
        </FilledInput>
        <InputLabel>Senha:</InputLabel>
        <FilledInput
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton 
            aria-label={
              showPassword ? 'Esconder senha' : 'Mostrar senha'
            }
            onClick={handleClickShowPassword}
            edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        onChange={(e) => setPassword(e.target.value)}>
        </FilledInput>

        <Button type="submit">Login</Button>
      </Form>
      <Footer theme={theme}>© 2024 ChatHub - Bruno Mendonça Gusmão BrunoDev2003</Footer>
    </Container>
    </ThemeProvider>
  );
  
};

export default LoginPage;