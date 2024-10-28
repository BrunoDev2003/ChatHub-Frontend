import React from 'react'

/**
 * @typedef {Object} Message 
 * @property {string} from 
 * @property {number} date 
 * @property {string} text 
 * @property {string} roomId 
 */

const MessageList = ({ messages, currentUserId, otherUserId, userMessagesRoomFilter }) => { 
    if (!Array.isArray(messages)) {
        console.error('Expected an array for messages, but got:', messages);
        return null; // Or render some fallback UI
    }

    const filteredMessages = userMessagesRoomFilter(messages, currentUserId, otherUserId);

    return (
        <div className="message-list">
            {filteredMessages.map((message, index) => {
                console.log("Full Message Object:", message); // Log the full message object
                console.log("Message date:", message.date); // Log the date
                console.log("Parsed Date:", new Date(message.date)); // Log parsed date

                const parsedData = JSON.parse(message.data);
                const date = new Date(parsedData.date).toLocaleTimeString();
                console.log("Full Message Object:", message); // Log the full message object
                console.log("Parsed Date:", date); // Log parsed date
                return (
                    <div key={index} className="message">
                        <strong>{parsedData.from}</strong>: {parsedData.text}
                        <span>{date}</span>
                    </div>
                );
            })}
        </div> 

    );
};

export default MessageList;  