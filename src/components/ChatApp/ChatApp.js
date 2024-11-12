import React, { useEffect, useState } from "react";
import { Container, MainContent, ContentArea } from "./ChatApp.styles";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import axios from "axios";
import Header from "../Header/Header";
import { useUser } from "../../UserContext";
import MessageInput from "../MessageInput/MessageInput";
import MessageList from "../MessageList/MessageList";
import PermanentDrawer from "../PermanentDrawer/PermanentDrawer";
import ChatRoomList from "../ChatRoomList/ChatRoomList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme, darkTheme } from "../Header/Header.styles";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

//current GET error on /chat/emit: GRAVE: Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed: com.google.gson.JsonSyntaxException: java.lang.NumberFormatException: Expected an int but was 1729214070107 at line 1 column 70 path $.date] with root cause
//java.lang.NumberFormatException: Expected an int but was 1729214070107 at line 1 column 70 path $.date

const ChatApp = () => {
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
    setCurrentRoomId(roomId);
    setMessages([]); // limpar o state das messages;
    const user = chatUsers.find((user) => user.id === roomId);
    setSelectedUser(user); // setar o usuário selecionado como o usuário do chat atual;

    try {
      const response = await axiosInstance.get(
        `http://localhost:8080/rooms/messages/${roomId}`
      );
      setMessages(response.data);
    } catch {
      console.error("Erro ao buscar mensagens", roomId, error);
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
        //const finalDataJSON = JSON.parse(parsedMessage.data);
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
        <Header userName={user.username} isUserOnline={isOnline}></Header>
        {error && <div>{error}</div>}
        <MainContent>
          <PermanentDrawer
            chatUsers={chatUsers}
            onRoomChange={handleRoomChange}
            onFilterMessage={userMessagesFilter}
            messages={messages}
          />
          <ContentArea sx={{color: theme.palette.mode ==='light' ? theme.palette.primary.dark_mode : theme.palette.text.primary}}>
            <Typography sx={{color: theme.palette.mode ==='light' ? theme.palette.primary.dark_mode : theme.palette.text.primary}}>
              {selectedUser ? selectedUser.username : "ChatHub"}
            </Typography>
              
            <MessageList
              messages={messages}
              currentUserId={user.id}
              otherUserId={currentRoomId} 
              userMessagesRoomFilter={userMessagesRoomFilter}
            />
            <MessageInput onSendMessage={handleSendMessage} />
          </ContentArea>
          </MainContent>
      <Button 
      variant="contained" 
      onClick={() => setIsDarkMode(!isDarkMode)}>
        Trocar para Modo Escuro.
      </Button>
      </Container>
    </ThemeProvider>
  );
};

export default ChatApp;
