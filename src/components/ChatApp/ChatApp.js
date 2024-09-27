import React from 'react';
import { Container } from './ChatApp.styles';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const ChatApp = ({username}) => {
    return (
        <Container>
            <Header userName={username}>
            <div>ChatApp</div>
            </Header>
        </Container>
    )
}

export default ChatApp;