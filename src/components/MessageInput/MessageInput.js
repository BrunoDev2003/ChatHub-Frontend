import React, {useState} from 'react'

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
            <input
                type="text"
                value={message}
                placeholder="Enviar mensagem"
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Enviar</button>
        </div>
    );
};

export default MessageInput;