// src/components/dashboard/DepartmentChat.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Badge
} from '@mui/material';
import { Send as SendIcon, Circle as OnlineIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion'; // ✅ Import fixed
import { useAuth } from '../../context/AuthContext';

const DepartmentChat = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey team! Project deadline updated.', sender: 'Ananya' },
    { id: 2, text: 'Noted! Let’s meet at 4 PM?', sender: 'Kiran' },
    { id: 3, text: 'Works for me.', sender: 'Varsha 🤍' }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: user?.name || 'You'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        boxShadow: 3
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Department Chat
      </Typography>

      <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
        <List>
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.2 }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <OnlineIcon sx={{ color: '#44b700', fontSize: 10 }} />
                      }
                    >
                      <Avatar>{msg.sender.charAt(0)}</Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={msg.sender}
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {msg.text}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </motion.div>
            ))}
          </AnimatePresence>
        </List>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          sx={{ mr: 1 }}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DepartmentChat;
