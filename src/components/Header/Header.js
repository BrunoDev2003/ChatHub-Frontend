import React from 'react'
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { theme } from './Header.styles';
import { useUser } from '../../UserContext';
import { Logout } from '@mui/icons-material';
import axiosInstance from '../../axiosInstance';
import  axios  from 'axios';
import { Palette } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import MessageList from '../MessageList/MessageList';


const Header = ({isUserOnline}) => {
    const navigate = useNavigate();
    const { user } = useUser();
    const theme = useTheme();

    const handleScrollToBottom = () => {
        const messageList = document.querySelector('.message-list');
            messageList.scrollTo({ top: messageList.scrollHeight, behavior: 'smooth' });
        
        

    };

    const handleLogout = async () => {
        try {
            await axiosInstance.post('http://localhost:8080/api/logout');
            navigate('/login');
        } catch (error) {
            console.error('Erro ao fazer logout', error);
        }
    };

    return (
        <AppBar 
            position="static" 
            sx={{
                borderBottom: '1px solid #000',
                backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.dark
            }}
            >
                <Typography variant="h8" sx={{ color: theme.palette.mode === 'light' ? theme.palette.primary.contrastText : theme.palette.text.primary, flexDirection: 'column-reverse' }}>
                    { user.username } 
                </Typography>
                <Toolbar>
                <Typography variant="h8" sx={{ flexGrow: 1, color: "green"}}>
                    {isUserOnline ? ' (Online)' : ' (Offline)'}
                </Typography>
                <Button variant="outlined" color="error" startIcon={<Logout />} onClick={handleLogout}>
                    Logout
                </Button>
                <Link href="mailto:brunogusmao43@gmail.com" color="secondary" sx={{marginRight: 20, paddingLeft:2}}>
                    Contato
                </Link>
                <Link href="https://github.com/BrunoDev2003" color="secondary" sx={{marginRight: 20}}>
                    Github
                </Link>
                <Link href="https://brunodev-portfolio.herokuapp.com" color="secondary" sx={{marginRight: 20}}>
                    Portfolio 
                </Link>
                <Button color="success" onClick={() => navigate('/login')}>
                    Histórico
                </Button>
                <Button color="success" onClick={handleScrollToBottom}>
                    Ir para o final
                </Button>
            </Toolbar>
            
        </AppBar>
    )
}

export default Header;