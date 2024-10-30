import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

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

const MessageList = ({ messages }) => {
    if (!Array.isArray(messages)) {
        console.error("Expected an array for messages, but got:", messages);
        return null; // Ou renderizar uma mensagem de erro ou UI alternativa;
    }

    return (
        <List
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
                if (message.date) {
                    from = message.from;
                    text = message.text;
                    date = new Date(message.date).toLocaleString();
                } else {
                    //campo data ninhado em JSON;
                    try {
                        const parsedData = JSON.parse(message.data);
                        from = parsedData.from;
                        text = parsedData.text;
                        date = new Date(parsedData.date).toLocaleString();
                    } catch (error) {
                        console.error("Error parsing date:", error);
                        date = "Data inválida";
                    }
                }

            console.log("Full Message Object:", message); // Logar o message object;
            console.log("ParsedData date:", date); // Logar a data;
                return (
                <ListItem key={index} sx={{ alignItems: "flex-start" }}>
                    <ListItemText
                    primary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: "inline", fontWeight: "bold" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
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
