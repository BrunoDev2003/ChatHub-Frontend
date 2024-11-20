import styled from 'styled-components'; 
import { useTheme } from '@mui/material/styles';

export const Container = styled.div`
    align-items: center;
    background-color: #f8f9fa;
    display:flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;

`;

export const Header = styled.h1`
    background-color: ${({ theme }) => useTheme().palette.primary.dark};
    border-radius: 8px;
    color: #000;
    overflow: hidden;
    padding: 2rem 1rem;
    text-align: top;
`;

export const Form = styled.form`
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    padding: 2rem;
`;

export const Input = styled.input`
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
    padding: 0.5rem;
`;

export const Button = styled.button`
    background-color: #007bff;
    border-radius: 4px;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
`;
export const Footer = styled.footer`
    background-color: ${({ theme }) => useTheme().palette.primary.light};
    bottom: 0;
    color: ${({ theme }) => useTheme().palette.primary.boldText};
    height: 30px;
    position: fixed;
    text-align: center;
    width: 100%;
`;