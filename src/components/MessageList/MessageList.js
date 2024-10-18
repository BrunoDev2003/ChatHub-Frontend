import React from 'react'

const MessageList = ({ messages}) => { 
    if (!Array.isArray(messages)) {
        console.error('Expected an array for messages, but got:', messages);
        return null; // Or render some fallback UI
    }
    return (
        <div className="message-list">
            {messages.map((message, index) => {
                <div key={index} className="message">
                    <strong>{message.user}</strong>: {message.content}
                    <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                </div>
            })}
        </div> 

    );
};

export default MessageList;  