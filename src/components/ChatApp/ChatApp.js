import React from 'react';
import { Container } from './ChatApp.styles';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const ChatApp = ({ username, isOnline }) => {
    return (
        <Container>
            <Header userName={username} isUserOnline={isOnline}>
            </Header>
            <div>ChatApp</div>
        </Container>
    )
}

export default ChatApp;