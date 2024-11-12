import styled from "styled-components";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light: '#e0e0e0',
            main: '#90caf9',
            dark: '#9500ae',
            dark_mode: '#01040c',
            contrastText: '#fff',
            boldText: '#673ab7',
        },
        secondary: {
            light: '#af52bf',
            main: '#9c27b0',
            dark: '#6d1b7b',
            contrastText: '#000',
        },
    },
});

export const darkTheme = createTheme({
    palette: {
            mode: 'dark',
            primary: {
                main: theme.palette.primary.dark_mode,
                contrastText: '#fff',
            },
            secondary: {
                main: '#ff5252',
                light: '#3d3636',
                dark: '#121212',
                contrastText: '#fff',
            },
            background: {
                default: '#121212',
                paper: '#121212',
            },
            text: {
                primary: '#fff',
                secondary: 'rgba(255, 255, 255, 0.7)',
            },
            action: {
                active: '#fff',
                selected: 'rgba(255, 255, 255, 0.16)',
                disabledBackground: 'rgba(255, 255, 255, 0.12)',
                hover: 'rgba(255, 255, 255, 0.08)',
                disabled: 'rgba(255, 255, 255, 0.3)',
            },
            divider: 'rgba(255, 255, 255, 0.12)',
        },
    });