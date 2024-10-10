import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { theme } from '../Header/Header.styles';

const PermanentDrawer = () => {
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
                <ListItem button={true}>
                    <ListItemText primary="Chats" />
                </ListItem>
                <ListItem button={true}>
                    <ListItemText primary="Contatos" />
                </ListItem>
                <ListItem button={true}>
                    <ListItemText primary="Criar grupos" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default PermanentDrawer;