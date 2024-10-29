import React from 'react'

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
        console.error('Expected an array for messages, but got:', messages);
        return null; // Or render some fallback UI
    }

    return (
        <div className="message-list">
            {messages.map((message, index) => {
                console.log("Full Message Object:", message); // Log the full message object
                console.log("Message date:", message.date); // Log the date

                        let date, from, text;
                        if (message.date) {
                            from = message.from;
                            text = message.text;
                            date = new Date(message.date).toLocaleString();
                        } else {
                            //nested date field 
                            try{
                                const parsedData = JSON.parse(message.data);
                                from = parsedData.from;
                                text = parsedData.text;
                                date = new Date(parsedData.date).toLocaleString();
                            } catch (error) {
                                console.error('Error parsing date:', error);
                                date = 'Data inválida';
                            }
                        }

                        console.log("Full Message Object:", message); // Log the full message object
                        console.log("ParsedData date:", date); // Log the date
                            return (
                                <div key={index} className="message">
                                    <strong>{from}</strong>: {text}
                                    <span>{date}</span>
                                </div>
                            );
                    
                })}
            </div> 

    );
};

export default MessageList;  