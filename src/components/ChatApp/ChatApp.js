import React, { useEffect, useState } from 'react';
import { Container } from './ChatApp.styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';

const ChatApp = ({ username }) => {
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        const pollStatusUpdates = async () => {
            try{
                const response = await axios.get('http://localhost:8080/users/status-updates');
                const [ userId, status] = response.data.split(':');
                if(username === userId) {
                    console.log('Updating online status:', status === 'online');
                    setIsOnline(status === 'online' );
                    console.log(status);
                }
                pollStatusUpdates(); // atualizar denovo com o pooling;
            } catch (error) {
                console.error('Erro ao buscar atualizações de status', error);
                setTimeout(pollStatusUpdates, 5000); // Dar um retry após 5 segundos se um erro ocorrer;
            }
        };

        pollStatusUpdates(); // Iniciar o pooling;
    }, [username]);
    return (
        <Container>
            <Header userName={username} isUserOnline={isOnline}>
            </Header>
            <div>ChatApp</div>
        </Container>
    );
};

export default ChatApp;