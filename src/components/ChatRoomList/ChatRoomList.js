import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import handleRoomChange from '../ChatApp/ChatApp';

const ChatRoomList = ({ rooms, onRoomChange }) => {
    <List>
        {rooms.map(room => (
            <ListItem button key={room.id} onClick={() => handleRoomChange(room.id)}>
                <ListItemText primary={room.name} />
            </ListItem>
        ))}
    </List>
}

export default ChatRoomList;