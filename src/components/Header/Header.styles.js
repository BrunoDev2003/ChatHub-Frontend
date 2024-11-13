import styled from "styled-components";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light: '#e1f5fe',
            main: '#e1f5fe',
            dark: '#03a9f4',
            dark_mode: '#01040c',
            contrastText: '#000',
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
                contrastText: '#212121',
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