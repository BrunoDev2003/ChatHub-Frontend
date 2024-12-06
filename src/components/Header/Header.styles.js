import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light: '#BBDEFB',
            main: '#B3E5FC',
            dark: '#1976D2',
            dark_mode: '#01040c',
            contrastText: '#000',
            boldText: '#673ab7',
            usernameColor: '#546e7a',
        },
        secondary: {
            light: '#af52bf',
            main: '#03A9F4',
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