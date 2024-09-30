import styled from "styled-components";
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            light: '#dd33fa',
            main: '#d500f9',
            dark: '#9500ae',
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