import React from 'react'

const MessageList = ({ messages}) => { 
    return (
        <div className="message-list">
            {messages.map((messages, index) => {
                <div key={index} className="message-item">
                    {messages[index].message}
                </div>
            })}
        </div> 

    );
};

export default MessageList;  