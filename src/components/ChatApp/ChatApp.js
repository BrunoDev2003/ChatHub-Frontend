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

//current GET error on /chat/emit: GRAVE: Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed: com.google.gson.JsonSyntaxException: java.lang.NumberFormatException: Expected an int but was 1729214070107 at line 1 column 70 path $.date] with root cause
//java.lang.NumberFormatException: Expected an int but was 1729214070107 at line 1 column 70 path $.date


const ChatApp = () => {
    const { user } = useUser();
    const [isOnline, setIsOnline] = useState(true);
    const [ chatUsers, setChatUsers] = useState([]);
    const [ messages, setMessages ] = useState([]);
    const [error, setError] = useState(null);

    const handleSendMessage = async (message) => {
        console.log('Usuario:', user);
        if (!user.id) {
            console.error('User ID is undefined');
            return;
        }
        const newMessage = {
        user: { id: user.id, username: user.username, isOnline: user.isOnline},
        type: 'message',
        data: JSON.stringify({ from: user.username, text: message, roomId: "someRoomId", date: new Date().getTime() }),
    };
    try {
            await axiosInstance.post('http://localhost:8080/chat/emit', newMessage, {
                headers: {
                    'Content-Type': 'application/json'},
            });
            setMessages([...messages, newMessage]);
        } catch (error) {
            console.log('Erro ao enviar mensagem', error);
        }        
    };

    useEffect(() => {
        const handleUserConnected = async () => {
            const connectMessage = {
                user: { id: user.id, username: user.username, isOnline: user.isOnline},
                type: 'user_connected',
                data: JSON.stringify({ username: user.username, isOnline: user.isOnline}),
            };
            try {
                await axiosInstance.post('http://localhost:8080/chat/emit', connectMessage, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } catch (error) {
                console.log('Erro ao enviar mensagem de conexão', error);
            };
        };
        const handleUserDisconnected = async () => {
            const disconnectMessage = {
                user: { id: user.id, username: user.username, isOnline: user.isOnline},
                type: 'user_disconnected',
                data: JSON.stringify({ username: user.username, isOnline: user.isOnline}),
            };
            try {
                await axiosInstance.post('http://localhost:8080/chat/emit', disconnectMessage, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } catch (error) {
                console.log('Erro ao enviar mensagem de desconexão', error);
            };
        };

        handleUserConnected();

        return () => {
            handleUserDisconnected();
        };

    }, [user.id]);

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
                const response = await axiosInstance.get('http://localhost:8080/chat/emit');
                setMessages(response.data);
            } catch (error) {
                console.error('Erro ao buscar mensagens', error);

            }
        };

        fetchUserMessages();
    }, []); // array de dependencia vazio para esse side effect rodar apenas uma vez após o mount;


    useEffect(() => {
        if (!user.id) return;
        const eventSource = new EventSource(`http://localhost:8080/chat/stream?userId=${user.id}`);

        eventSource.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        }
    }, [user.id]);

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