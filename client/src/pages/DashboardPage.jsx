// src/pages/DashboardPage.jsx
import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import DashboardCard from '../components/dashboard/DashboardCard';
import QuickLinks from '../components/dashboard/QuickLinks';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import RecentAnnouncements from '../components/dashboard/RecentAnnouncements';
import WeatherWidget from '../components/dashboard/WeatherWidget';

const DashboardPage = () => {
  const theme = useTheme();

  const cardData = [
    {
      title: 'Announcements',
      count: 12,
      icon: '📢',
      color: theme.palette.primary.main,
      link: '/announcements',
    },
    {
      title: 'Lost Items',
      count: 5,
      icon: '🔍',
      color: theme.palette.secondary.main,
      link: '/lost-and-found',
    },
    {
      title: 'Upcoming Classes',
      count: 3,
      icon: '🕒',
      color: '#4CAF50',
      link: '/timetable',
    },
    {
      title: 'Pending Complaints',
      count: 2,
      icon: '⚠️',
      color: '#FF5722',
      link: '/hostel-complaints',
    },
  ];

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={4}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DashboardCard {...card} />
            </motion.div>
          </Grid>
        ))}
        
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <RecentAnnouncements />
          </motion.div>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Grid container spacing={4} direction="column">
            <Grid item>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <WeatherWidget />
              </motion.div>
            </Grid>
            <Grid item>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <QuickLinks />
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <UpcomingEvents />
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;