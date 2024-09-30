import React from 'react'
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { theme } from './Header.styles';
import { Palette } from '@mui/icons-material';

const Header = ({userName}) => {
    const navigate = useNavigate();

    const handleScrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    };

    return (
        <AppBar position="static" style={{ theme }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexgrow: 1}}>
                    {userName}
                </Typography>
                <Link href="mailto:brunogusmao43@gmail.com" color="inherit" style={{marginRight: 20}}>
                    Contato
                </Link>
                <Link href="https://github.com/BrunoDev2003" color="inherit" style={{marginRight: 20}}>
                    Github
                </Link>
                <Link href="https://brunodev-portfolio.herokuapp.com" color="inherit" style={{marginRight: 20}}>
                    Portfolio 
                </Link>
                <Button color="inherit" onClick={() => navigate('/login')}>
                    Histórico
                </Button>
                <Button color="inherit" onClick={handleScrollToBottom}>
                    Ir para o final
                </Button>
            </Toolbar>
            
        </AppBar>
    )
}

export default Header;