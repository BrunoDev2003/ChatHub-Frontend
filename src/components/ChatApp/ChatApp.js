import React, { useEffect, useState } from 'react';
import { Container, MainContent, ContentArea } from './ChatApp.styles';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import axios from 'axios';
import Header from '../Header/Header';
import { useUser } from '../../UserContext'; 
import MessageInput from '../MessageInput/MessageInput';
import MessageList from '../MessageList/MessageList';
import PermanentDrawer from '../PermanentDrawer/PermanentDrawer';

const ChatApp = () => {
    const { user } = useUser();
    const [isOnline, setIsOnline] = useState(true);
    const [ chatUsers, setChatUsers] = useState([]);
    const [ messages, setMessages ] = useState([]);
    const [error, setError] = useState(null);

    const handleSendMessage = async (message) => {
        const newMessage = { user: user.username, content: message, timestamp: new Date() };
        setMessages([...messages, newMessage]);
        
        try {
            await axiosInstance.post('http://localhost:8080/messages', newMessage);
        } catch (error) {
            console.error('Erro ao enviar mensagem', error);
        }
            
    }
    useEffect(() => {

        const fetchChatUsers = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:8080/users/all');
                setChatUsers(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuários', error);
                setError('Falha ao buscar usuários');

            }
        };

        fetchChatUsers();
        const pollStatusUpdates = async () => {
            try{
                const response = await axiosInstance.get('http://localhost:8080/users/status-updates');
                if (response.status === 204) {
                    console.log('No update status available');
                } else if(response.data) {
                    const [ receivedUserId, status] = response.data.split(':');
                    console.log('Dados recebidos: ', response.data);
                    console.log('Status: ', status);
                    console.log('UserId: ', receivedUserId);
                    console.log('User: ', user.username);  
                    console.log('receivedUserId: ', receivedUserId);
                    if(user && user.id && user.id.toString() === receivedUserId) { //comparamos o UserId logado com o userId recebido de /status-updates
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
    }, [ user.id]);

    useEffect(() => {
        const fetchUserMessages = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:8080/messages');
                setMessages(response.data);
            } catch (error) {
                console.error('Erro ao buscar mensagens', error);

            }
        };

        fetchUserMessages();
    }, []); // array de dependencia vazio para esse side effect rodar apenas uma vez após o mount;

    useEffect(() => {
        console.log('isOnline status atualizado: ', isOnline);
    }, [isOnline]);
    return (
        <Container>
            <Header userName={user.username} isUserOnline={isOnline}>
            </Header>
            {error && <div>{error}</div>}
                <MainContent>
                    <PermanentDrawer chatUsers={chatUsers} />
                        <ContentArea>
                            <div>ChatApp</div>
                            <MessageList messages={messages} />
                            <MessageInput onSendMessage={handleSendMessage} />
                        </ContentArea>
                </MainContent>
        </Container>
    );
};

export default ChatApp;