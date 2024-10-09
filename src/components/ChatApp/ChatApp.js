import React, { useEffect, useState } from 'react';
import { Container } from './ChatApp.styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import { useUser } from '../../UserContext';

const ChatApp = ({ username, userId }) => {
    const { user } = useUser();
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const pollStatusUpdates = async () => {
            try{
                const response = await axios.get('http://localhost:8080/users/status-updates');
                if (response.status === 204) {
                    console.log('No update status available');
                } else if(response.data) {
                    const [ receivedUserId, status] = response.data.split(':');
                    console.log('Dados recebidos: ', response.data);
                    console.log('Status: ', status);
                    console.log('UserId: ', receivedUserId);
                    console.log('User: ', user.username);  
                    console.log('receivedUserId: ', receivedUserId);
                    if(user.id.toString() === receivedUserId) { //comparamos o UserId logado com o userId recebido de /status-updates
                        console.log('Updating online status:', status.trim() === 'online');
                        setIsOnline(status.trim() === 'online' );
                        console.log(status);
                    }

                }
                setTimeout(pollStatusUpdates, 5000); // atualizar denovo com o pooling após 5 segundos de espera;
            } catch (error) {
                console.error('Erro ao buscar atualizações de status', error);
                setTimeout(pollStatusUpdates, 5000); // Dar um retry após 5 segundos se um erro ocorrer;
            }
        };

        pollStatusUpdates(); // Iniciar o pooling;
    }, [ userId, username]);

    useEffect(() => {
        console.log('isOnline status atualizado: ', isOnline);
    }, [isOnline]);
    return (
        <Container>
            <Header userName={user.username} isUserOnline={isOnline}>
            </Header>
            <div>ChatApp</div>
        </Container>
    );
};

export default ChatApp;