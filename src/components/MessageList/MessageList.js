import React, {useRef} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';


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
 * */

const MessageList = ({ messages, messageListRef }) => {
  const theme = useTheme();
  if (!Array.isArray(messages)) {
    console.error("Expected an array for messages, but got:", messages);
    return null; // Ou renderizar uma mensagem de erro ou UI alternativa;
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
            <ListItem key={index} sx={{ 
                alignItems: "flex-start",
                backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.background.paper,
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
            </ListItem>
          );
        })}
      </div>
    </List>
  );
};

export default MessageList;
