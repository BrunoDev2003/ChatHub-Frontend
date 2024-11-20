import React, {useRef} from 'react'
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
import { Avatar } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';


const Header = ({isUserOnline, messageListRef}) => {
    const navigate = useNavigate();
    const { user } = useUser();
    const theme = useTheme();

    const handleScrollToBottom = () => {
        if(messageListRef.current) {
            messageListRef.current.scrollTo({top: messageListRef.current.scrollHeight, behavior: 'smooth' });
        }
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
                <Typography variant="h5" component="div" display="flex" alignItems="center" sx={{ color: theme.palette.mode === 'light' ? theme.palette.primary.usernameColor : theme.palette.text.primary, alignContent: 'center' }}>
                <Avatar
                    sx={{ width: 60, height: 60}}
                > 
                    { user.username } 
                </Avatar> 
                <CircleRoundedIcon sx={{color: theme.palette.mode === 'light' ? 'green' : 'cyan'}} />
                    {isUserOnline ? ' (Online)' : ' (Offline)'}
                </Typography>
                <Toolbar>
                <Typography variant="h8" component="div" display="flex" alignItems={'center'}>
                <Button variant="outlined" color="error" startIcon={<Logout />} onClick={handleLogout} sx={{marginLeft: 5, alignContent:'space-evenly'}}>
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
                <Button color="success" variant="outlined" size="small" onClick={() => navigate('/login')} sx={{marginLeft: 5, alignContent:'space-evenly'}}>
                    Histórico
                </Button>
                <ArrowCircleDownIcon color="info" variant="outlined" size="medium" cursor="pointer" onClick={handleScrollToBottom} sx={{marginLeft: 5, alignContent:'space-evenly'}}>
                </ArrowCircleDownIcon>
                </Typography>
            </Toolbar>
            
        </AppBar>
    )
}

export default Header;