import React, { useEffect, useRef, useState } from "react";
import { Container, MainContent, ContentArea } from "./ChatApp.styles";
import axiosInstance from "../../axiosInstance";
import Header from "../Header/Header";
import { useUser } from "../../UserContext";
import MessageInput from "../MessageInput/MessageInput";
import MessageList from "../MessageList/MessageList";
import PermanentDrawer from "../PermanentDrawer/PermanentDrawer";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme, darkTheme } from "../Header/Header.styles";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import ChatRoomList from "../ChatRoomList/ChatRoomList";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BorderTop } from "@mui/icons-material";
import  Box  from "@mui/material/Box";

const ChatApp = ({ activeRoom, setActiveRoom}) => {
  /**
   * @typedef {Object} Message
   * @property {string} from
   * @property {number} date
   * @property {string} text
   * @property {string} roomId
   */

  /**
   * @typedef {Object} User
   * @property {number} id
   * @property {string} username
   * @property {boolean} isOnline
   * @property {Object} [lastMessage]
   */
  const { user } = useUser();
  const [isOnline, setIsOnline] = useState(true);
  const [chatUsers, setChatUsers] = useState(/** @type {User[]}  */ ([]));
  const [messages, setMessages] = useState(/**  @type {Message[]} */ ([]));
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentRoomId, setCurrentRoomId] = useState("initialRoomId");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messageListRef = useRef(null);

  const userMessagesFilter = ({ desiredUserId, messages }) => {
    const userMessages = messages.filter(
      (message) => message.user && message.user.id === desiredUserId
    );
    return userMessages.sort(
      (message1, message2) => message1.date - message2.date
    )[0]; //pegar a ultima mensagen enviada usando a data como ponto de ordenação das mensagens;
  };

  const userMessagesRoomFilter = (messages, userId1, userId2) => {
    return messages.filter(
      (message) =>
        message.user &&
        (message.user.id === userId1 || message.user.id === userId2)
    );
  };
  const handleRoomChange = async (roomId) => {

    if (!user || !user.id) { console.error("User not initialized or user ID is missing"); return; }
    const currentUserId = user.id;
    const roomKey = currentUserId < roomId ? `${currentUserId}:${roomId}` : `${roomId}:${currentUserId}`;
    setCurrentRoomId(roomKey);
    setActiveRoom(roomKey);
    setMessages([]); // limpar o state das messages;
    const selectedChatUser = chatUsers.find((user) => user.id === roomId);
    setSelectedUser(selectedChatUser); // setar o usuário selecionado como o usuário do chat atual;

    try {
      const response = await axiosInstance.get(
        `http://localhost:8080/api/rooms/messages/${roomKey}`
      );
      setMessages(response.data);
    } catch {
      console.error("Erro ao buscar mensagens", roomKey, error);
    }
  };

  const handleSendMessage = async (message) => {
    console.log("Usuario:", user);
    if (!user.id) {
      console.error("User ID is undefined");
      return;
    }
    const newMessage = {
      "@class": "com.chathub.chathub.model.ChatRoomMessage",
      user: {
        "@class": "com.chathub.chathub.model.User",
        id: user.id,
        username: user.username,
        isOnline: user.isOnline,
      },
      type: "message",
      data: JSON.stringify({
        from: user.username,
        text: message,
        roomId: currentRoomId,
        date: new Date().getTime(),
      }),
    };
    try {
      await axiosInstance.post("http://localhost:8080/chat/emit", newMessage, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.log("Erro ao enviar mensagem", error);
    }
  };

  useEffect(() => {
    const handleUserConnected = async () => {
      const connectMessage = {
        "@class": "com.chathub.chathub.model.ChatRoomMessage",
        user: {
          "@class": "com.chathub.chathub.model.User",
          id: user.id,
          username: user.username,
          isOnline: true,
        },
        type: "user_connected",
        data: JSON.stringify({
          username: user.username,
          isOnline: true,
        }),
      };
      try {
        await axiosInstance.post(
          "http://localhost:8080/chat/emit",
          connectMessage,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.log("Erro ao enviar mensagem de conexão", error);
      }
    };
    const handleUserDisconnected = async () => {
      const disconnectMessage = {
        "@class": "com.chathub.chathub.model.ChatRoomMessage",
        user: {
          "@class": "com.chathub.chathub.model.User",
          id: user.id,
          username: user.username,
          isOnline: false,
        },
        type: "user_disconnected",
        data: JSON.stringify({
          username: user.username,
          isOnline: false,
        }),
      };
      try {
        await axiosInstance.post(
          "http://localhost:8080/chat/emit",
          disconnectMessage,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.log("Erro ao enviar mensagem de desconexão", error);
      }
    };

    handleUserConnected();
    window.addEventListener("beforeunload", handleUserDisconnected);

    return () => {
      window.removeEventListener("beforeunload", handleUserDisconnected);
      handleUserDisconnected(); // Garantindo que a conexão seja fechada ao desmontar(unmount) o componente;
    };
  }, [user.id]);

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:8080/users/all"
        );
        setChatUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
        setError("Falha ao buscar usuários");
      }
    };

    fetchChatUsers();
    const pollStatusUpdates = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:8080/users/status-updates"
        );
        if (response.status === 204) {
          console.log("No update status available");
        } else if (response.data) {
          const [receivedUserId, status] = response.data.split(":");
          console.log("Dados recebidos: ", response.data);
          console.log("Status: ", status);
          console.log("UserId: ", receivedUserId);
          console.log("User: ", user.username);
          console.log("receivedUserId: ", receivedUserId);
          if (user && user.id && user.id.toString() === receivedUserId) {
            //comparamos o UserId logado com o userId recebido de /status-updates
            console.log("Updating online status:", status.trim() === "online");
            setIsOnline(status.trim() === "online");
            console.log(status);
          }
        }
        setTimeout(pollStatusUpdates, 5000); // atualizar denovo com o pooling após 5 segundos de espera;
      } catch (error) {
        console.error("Erro ao buscar atualizações de status", error);
        setTimeout(pollStatusUpdates, 5000); // Dar um retry após 5 segundos se um erro ocorrer;
      }
    };

    pollStatusUpdates(); // Iniciar o pooling;
  }, [user.id]);

  useEffect(() => {
    const fetchUserMessages = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:8080/chat/emit"
        );
        setMessages((prevMessages) => prevMessages.concat(response.data));
      } catch (error) {
        console.error("Erro ao buscar mensagens", error);
      }
    };

    fetchUserMessages();
  }, []); // array de dependencia vazio para esse side effect rodar apenas uma vez após o mount;

  useEffect(() => {
    if (!user.id) return;
    const eventSource = new EventSource(
      `http://localhost:8080/chat/stream?userId=${user.id}`
    );

    eventSource.onmessage = (event) => {
      try {
        const parsedMessage = JSON.parse(event.data);
        let finalDataJSON;
        const newMessage = {
          ...parsedMessage,
          data: finalDataJSON,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        console.error("Erro ao fazer parse da mensagem", event.data);
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [user.id]);

  useEffect(() => {
    console.log("isOnline status atualizado: ", isOnline);
  }, [isOnline]);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
      <CssBaseline />
      <Container>
        <Header userName={user.username} isUserOnline={isOnline} messageListRef={messageListRef}></Header>
        {error && <div>{error}</div>}
        <MainContent>
          <PermanentDrawer
            chatUsers={chatUsers}
            onRoomChange={handleRoomChange}
            onFilterMessage={userMessagesFilter}
            messages={messages}
          />
          <ChatRoomList rooms={chatUsers} onRoomChange={handleRoomChange} />
          <ContentArea sx={{color: theme.palette.mode ==='light' ? theme.palette.primary.dark_mode : theme.palette.text.primary}}>
            <Typography sx={{color: theme.palette.mode ==='light' ? theme.palette.primary.dark_mode : theme.palette.text.primary}}>
                <AccountCircleIcon sx={{fontSize:'45px'}}>
                </AccountCircleIcon>
                {selectedUser ? selectedUser.username : "ChatHub"}
            </Typography>
              
            <MessageList
              messages={messages}
              setMessages={setMessages}
              currentUserId={user.id}
              otherUserId={currentRoomId} 
              userMessagesRoomFilter={userMessagesRoomFilter}
              messageListRef={messageListRef}
              activeRoom={activeRoom} user={user}
            />
            <MessageInput onSendMessage={handleSendMessage} />
          </ContentArea>
          </MainContent>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 240,
          width: "calc(100% - 240px)",
          padding: '10px',
          color: theme.palette.mode === "light" ? theme.palette.info : theme.palette.primary.dark,
          background: theme.palette.mode === "light" ? theme.palette.primary.dark : theme.palette.primary.dark,
          borderTop: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      >
      <Button 
      sx={{
        color: theme.palette.mode ==='light' ? theme.palette.info : theme.palette.text.primary,
        background: theme.palette.mode ==='light' ? theme.palette.primary.info : theme.palette.secondary.dark,
      }}
      variant="contained"
      onClick={() => setIsDarkMode(!isDarkMode)}>
        Trocar para Modo Escuro.
      </Button>
      </Box>    
      </Container>
    </ThemeProvider>
  );
};

export default ChatApp;
