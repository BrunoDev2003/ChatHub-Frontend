import React from 'react'

/**
 * @typedef {Object} Message 
 * @property {string} from 
 * @property {number} date 
 * @property {string} text 
 * @property {string} roomId 
 */

/**
 * @param {Object} props
 * @param {Message[]} props.messages
 */

const MessageList = ({ messages }) => { 
    if (!Array.isArray(messages)) {
        console.error('Expected an array for messages, but got:', messages);
        return null; // Or render some fallback UI
    }
    return (
        <div className="message-list">
            {messages.map((message, index) => {
                <div key={index} className="message">
                    <strong>{message.from}</strong>: {message.text}
                    <span>{new Date(message.date).toLocaleTimeString()}</span>
                </div>
            })}
        </div> 

    );
};

export default MessageList;  