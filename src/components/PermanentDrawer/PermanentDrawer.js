import React from 'react';
import { Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import { theme } from '../Header/Header.styles';

const PermanentDrawer = ({chatUsers}) => {
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
                {chatUsers.map((user) => (
                    <ListItem button key={user.id}>
                        <ListItemText primary={user.username} />
                    </ListItem>
                ))}
                <ListItem button={true}>
                    <ListItemText primary="Chats" />
                </ListItem>
                <ListItem button={true}>
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

export default PermanentDrawer;