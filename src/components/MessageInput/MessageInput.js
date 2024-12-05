import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import KeyboardAltSharpIcon from "@mui/icons-material/KeyboardAltSharp";
const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const theme = useTheme();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [layoutName, setLayoutName] = useState("default");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage(""); // Limpa o input;
    }
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleToggleKeyboard = () => {
    setKeyboardOpen((prev) => !prev);
  };

  const handleKeyboardInput = (input) => {
    setMessage(input);
  };

  const handleLayoutChange = () => {
    setLayoutName((prevLayout) =>
      prevLayout === "default" ? "shift" : "default"
    );
  };

  const keyboardRef = React.useRef();
  return (
    <div className="message-input" style={{ display: "flex", flexDirection: "column", width: "100%", flexFlow: "row wrap-reverse"}}>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          position: "fixed",
          bottom: keyboardOpen ? 320 : 50,
          left: 240,
          width: "calc(100% - 240px)",
          background:
            theme.palette.mode === "light"
              ? theme.palette.primary.dark
              : theme.palette.secondary.contrastText,
          borderTop: "1px solid #ccc",
          padding: "5px",
          boxSizing: "border-box",
          borderRadius: 3,
          zIndex: 1000,
        }}
      >
        <TextField
          sx={{ flexGrow: 1, marginRight: 2, width: "73%" }}
          id="Icon-textfield"
          label="Enviar-Mensagem"
          type="text"
          value={message}
          onChange={handleInputChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            },
          }}
          variant="standard"
        />

        <Button
          onClick={handleSendMessage}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Enviar
        </Button>
        <KeyboardAltSharpIcon
          sx={{ cursor: "pointer" }}
          onClick={handleToggleKeyboard}
        />
      </Box>
      {keyboardOpen && (
        <div style={{ position:"fixed", bottom: 50, width: "100%", background:"blue", left: 240, width: "calc(100% - 240px)",}}>
          <Keyboard
            keyboardRef={(r) => (keyboardRef.current = r)}
            layoutName={layoutName}
            onChange={handleKeyboardInput}
            layout={{
              default: [
                "1 2 3 4 5 6 7 8 9 0",
                "q w e r t y u i o p",
                "a s d f g h j k l ç",
                "z x c v b n m , . -",
                "{space}",
              ],
              shift: [
                "! @ # $ % ^ & * ( )",
                "Q W E R T Y U I O P",
                "A S D F G H J K L Ç",
                "Z X C V B N M < > _",
                "{space}",
              ],
            }}
          />
          <Button onClick={handleLayoutChange}>Shift</Button>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
