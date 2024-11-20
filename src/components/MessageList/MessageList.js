import React, {useRef} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';
import { Skeleton} from "@mui/material";
import axiosInstance from '../../axiosInstance';
import { IconButton } from "@mui/material";
import  DeleteForeverRoundedIcon  from "@mui/icons-material/DeleteForever";


/**
 * @typedef {Object} Message
 * @property {string} from
 * @property {number} date
 * @property {string} text
 * @property {string} roomId
 */

/**
 * * @param {Object} props
 *  * @param {Message[]} props.messages
 * * @param {Function} props.setMessages
 * */

const MessageList = ({ messages, setMessages, messageListRef }) => {
  const theme = useTheme();
  if (!Array.isArray(messages)) {
    console.error("Expected an array for messages, but got:", messages);
    return null; // Ou renderizar uma mensagem de erro ou UI alternativa;
  }

  const handleDelete = async (message) => {
    try {
      let roomId;
      console.log("object message", message);
      console.log("roomId message", message.roomId);

      if (message.roomId) {
        roomId = `rooms:${message.roomId}`;
      } else if (message.data) {
        const parsedData = JSON.parse(message.data);
        roomId = `rooms:${parsedData.roomId}`;
      } else { 
        throw new Error("Message data is undefined"); 
      }
      console.log("roomId parsedData", roomId);
      console.log("Serialized message data for removal:", JSON.stringify(message));
      const response = await axiosInstance.delete(`rooms/${roomId}/messages`, { 
        data: message,
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log("Response:", response.data); //deleção de mensagem bem sucedida!;

      //Atualizar UI para remover a mensagem deletada do state de mensagens;
      setMessages((prevMessages) => prevMessages.filter((msg) => msg !== message));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  }

  
  return (
    <List
      ref={messageListRef}
      sx={{
        maxHeight: "calc(100vh - 150px)",
        overflow: "auto",
        marginBottom: "50px",
      }}
    >
      <div className="message-list">
        {messages.map((message, index) => {
          console.log("Full Message Object:", message); // Logar o message object;
          console.log("Message date:", message.date); // Logar a data;

          let date, from, text;
          if (message.data) {
            try {
              const parsedData = JSON.parse(message.data);
              from = parsedData.from;
              text = parsedData.text;
              date = new Date(parsedData.date).toLocaleString();
            } catch (error) {
              console.error("Error parsing date:", error);
              from = message.from || "No last message";
              text = message.text || "no text available";
              date =
                new Date(message.date).toLocaleString() || "no date available";
            }
          } else {
            from = message.from;
            text = message.text;
            date = new Date(message.date).toLocaleString();
          }

          console.log("Full Message Object:", message); // Logar o message object;
          console.log("ParsedData date:", date); // Logar a data;
          return (
            message ? (
              <ListItem key={index} sx={{ 
                  alignItems: "flex-start",
                  backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.primary.light,
                }}>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline",
                          fontWeight: 'bold',
                          color: theme.palette.mode === 'light' ? theme.palette.primary.boldText : theme.palette.text.primary, 
                        }}
                        component="span"
                        variant="body2"
                      >
                        {from}
                      </Typography>
                      {`: ${text}`}
                    </React.Fragment>
                  }
                  secondary={date}
                />
                <IconButton edge="end" aria-label="deletar" onClick={() => handleDelete(message)}>
                  <DeleteForeverRoundedIcon />
                </IconButton>
              </ListItem>
            ) : (
              <Skeleton variant="circular" sx={{fontSize: '1rem'}} />
            )
          );
        })}
      </div>
    </List>
  );
};

export default MessageList;
