import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

const MessageInput = ({ onSendMessage}) => { 
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if(message.trim() !== '') {
            onSendMessage(message);
            setMessage(''); // Limpa o input;
        }
    };
    return (
        <div className="message-input">
            <Box sx={{ '& > :not(style)': { m: 1}}}>
                <InputLabel htmlFor="message"> Mensagem com adornment icon </InputLabel>
                <Input
                    id="adornment-message"
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                />
                <button onClick={handleSendMessage}>Enviar</button>
                <TextField
                    id="Icon-textfield"
                    label="Enviar-Mensagem"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        },
                    }}
                    variant='standard'
                />
                <button onClick={handleSendMessage}>Enviar</button>
            </Box>
        </div>
    );
};

export default MessageInput;