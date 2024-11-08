import styled from "styled-components";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: 'light',
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
    },
});

export const darkTheme = createTheme({
    palette: {
            mode: 'dark',
            primary: {
                main: '#ff5252',
                action: {
                    active: '#fff',
                    selected: (255, 255, 255, 0.16),
                    disabledBackground: (255, 255, 255, 0.12),
                    hover: (255, 255, 255, 0.08),
                    disabled: (255, 255, 255, 0.3),
                },
                light: '#3d3636',
                dark: '#121212',
                text: '#fff',
                contrastText: '#fff',
            },
            secondary: {
                main: '#ff5252',
                light: '#3d3636',
                dark: '#545b5b',
                text: (255, 255, 255, 0.7),
                contrastText: '#fff',
            },
            background: {
                default: '#121212',
                paper: '#121212',
            },
            divider: (255, 255, 255, 0.12),
            disabled: {
                text: (255, 255, 255, 0.5)
            }
        },
    });