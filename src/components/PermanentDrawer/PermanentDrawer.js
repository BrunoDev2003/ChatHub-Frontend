import React from 'react';
import { Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { theme } from '../Header/Header.styles';

const PermanentDrawer = ({chatUsers, onRoomChange, onFilterMessage, messages}) => {
    return(
        <Drawer
        variant="permanent"
        anchor="left"
            sx={{
                width: 240,
                height: '100%',
                flexShrink: 0,
            }}
            PaperProps={{
                sx: {
                    backgroundColor: theme.palette.primary.main,
                },
                style: {
                    width: 240,
                    position: 'relative',
                }
            }}
        >
            <List>
                {chatUsers && chatUsers.length > 0 ? (
                    chatUsers.map(user => {
                        const lastMessage = onFilterMessage({desiredUserId: user.id, messages});
                        return (
                        <ListItem 
                        button key={user.id}
                        onClick={() => onRoomChange(user.id)} 
                        sx={({
                            '&:hover': {
                                cursor: 'pointer',
                                backgroundColor: theme.palette.primary.light,
                            },
                        })}>
                            <ListItemText
                            primary={user.username} 
                            secondary={lastMessage ? lastMessage.text : 'Sem mensagens'}
                            />
                        </ListItem>
                        );
                    })
                ) : (
                    <ListItem>
                        <ListItemText primary={"Usuarios indísponiveis"}></ListItemText>
                    </ListItem>
                )} 
                <ListItem button={true} sx={({
                    '&:hover': {
                        cursor: 'pointer',
                        backgroundColor: theme.palette.primary.light,
                    },
                })}>
                    <ListItemText primary="Chats" />
                </ListItem>
                <ListItem button={true} sx={({
                    '&:hover': {
                        cursor: 'pointer',
                        backgroundColor: theme.palette.primary.light,
                    },
                })}>
                    <ListItemText primary="Contatos" />
                </ListItem>
            </List>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        position: 'absolute',
                        bottom: 10,
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                    onClick={() => console.log('Create group chat...')}
                >
                    Criar grupo
                </Button>
        </Drawer>
    );
};

PermanentDrawer.propTypes = {
    chatUsers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        lastMessage: PropTypes.shape({
            content: PropTypes.string
        })
    })).isRequired,
};

export default PermanentDrawer;