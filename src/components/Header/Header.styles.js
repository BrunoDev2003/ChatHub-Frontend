import styled from "styled-components";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            light: '#dd33fa',
            main: '#d500f9',
            dark: '#9500ae',
            dark_mode: '#01040c',
            contrastText: '#fff',
        },
        secondary: {
            light: '#af52bf',
            main: '#9c27b0',
            dark: '#6d1b7b',
            contrastText: '#000',
        },
        mode: 'light',
    },
});

export const darkTheme = createTheme({
    palette: {
            mode: 'dark',
            primary: {
                main: theme.palette.primary.dark_mode,
            },
            secondary: {
                main: theme.palette.secondary.dark,
            },
        },
    });