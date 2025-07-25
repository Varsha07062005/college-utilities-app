// src/components/layout/MainLayout.jsx
import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import NotificationBar from '../common/NotificationBar';

const MainLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <NotificationBar />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          px: { xs: 2, md: 4 },
        }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </Box>
      
      <Footer />
    </Box>
  );
};

export default MainLayout;