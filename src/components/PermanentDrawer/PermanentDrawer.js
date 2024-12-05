import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Typography from "@mui/material/Typography";
import { useUser } from "../../UserContext";
import "dayjs/locale/pt-br";
const PermanentDrawer = ({
  chatUsers,
  onRoomChange,
  onFilterMessage,
  messages,
}) => {
  const users = [{ id: 1, name: "Joe" }, { id: 2, name: "Bruno" }, { id: 3, name: "Mariana" }, { id: 4, name: "Alex"}];
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        height: "100%",
        flexShrink: 0,
      }}
      PaperProps={{
        sx: {
          backgroundColor:
            theme.palette.primary.mode === "light"
              ? theme.palette.primary.main
              : theme.palette.primary.main,
        },
        style: {
          width: 240,
          position: "relative",
        },
      }}
    >
      <Typography variant="h5" fontStyle={"italic"}>
        Chats
      </Typography>

      <List>
        {chatUsers && chatUsers.length > 0 ? (
          chatUsers.map((user) => {
            const lastMessage = onFilterMessage({
              desiredUserId: user.id,
              messages,
            });
            let date, from, text;
            if (lastMessage) {
              //campo data ninhado em JSON;
              if (lastMessage.data) {
                try {
                  const parsedData = JSON.parse(lastMessage.data);
                  from = parsedData.from;
                  text = parsedData.text;
                  date = new Date(parsedData.date).toLocaleString();
                } catch (error) {
                  console.error("Error parsing date:", error);
                  from = lastMessage.from || "No last message";
                  text = lastMessage.text || "no text available";
                  date =
                    new Date(lastMessage.date).toLocaleString() ||
                    "no date available";
                }
              } else {
                from = lastMessage.from;
                text = lastMessage.text;
                date = new Date(lastMessage.date).toLocaleString();
              }
              console.log("the last message", lastMessage);
              console.log("the last message", lastMessage);
              console.log("from:", from);
              console.log("text:", text);
              console.log("date:", date);
            }
            return (
              <ListItem
                button
                key={user.id}
                onClick={() => onRoomChange(user.id)}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor:
                      theme.palette.primary.mode === "light"
                        ? theme.palette.primary.light
                        : theme.palette.action.hover,
                  },
                }}
              >
                <ListItemText
                  primary={user.username}
                  secondary={text ? text : "Sem mensagens"}
                />
              </ListItem>
            );
          })
        ) : (
          <ListItem>
            <ListItemText primary={"Usuarios indísponiveis"}></ListItemText>
          </ListItem>
        )}
      </List>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt/br">
        <DateTimePicker
          ampm={true}
          label="Agenda de Compromissos"
          format="DD/MM/YYYY, HH:mm:ss"
        />
      </LocalizationProvider>
    </Drawer>
  );
};

PermanentDrawer.propTypes = {
  chatUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      lastMessage: PropTypes.shape({
        content: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default PermanentDrawer;
