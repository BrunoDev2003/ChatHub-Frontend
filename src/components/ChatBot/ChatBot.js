import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { Button, TextField, List, ListItem, ListItemText } from "../../@mui/material";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([""]);

  const handleMessage = async (message) => {
    const newMessage = {
      from: "User",
      text: message,
      date: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const response = await axiosInstance.post("/chat/bot", { message });
      const botMessage = {
        from: "Bot",
        text: response.data.reply,
        date: new Date().getTime(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setMessage("");
  };
  return (
    <div>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${msg.from}: ${msg.text}`}
              secondary={new Date(msg.date).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        label="Mandar mensagem pelo bot"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={() => handleMessage(message)}>Enviar</Button>
    </div>
  );
};

export default ChatBot;
