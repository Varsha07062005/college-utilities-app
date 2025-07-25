// src/pages/AnnouncementsPage.jsx
import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, TextField, IconButton, Chip, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';
import AnnouncementCard from '../components/dashboard/AnnouncementCard';
import EmptyState from '../components/common/EmptyState';

const categories = ['All', 'Academic', 'Events', 'Exams', 'Holidays', 'Sports', 'Others'];

const AnnouncementsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const theme = useTheme();

  // Mock data - replace with real data from API
  const announcements = [
    {
      id: 1,
      title: 'Midterm Exam Schedule',
      content: 'The midterm exams for all departments will be conducted from October 15th to October 25th.',
      category: 'Exams',
      date: '2023-10-01',
      author: 'Examination Department',
      important: true,
    },
    {
      id: 2,
      title: 'College Cultural Fest',
      content: 'Annual cultural fest "Spectra" will be held on November 10th-12th. Registrations open now!',
      category: 'Events',
      date: '2023-09-28',
      author: 'Cultural Committee',
      important: false,
    },
    // Add more announcements...
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    // Filter by search query
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by selected categories
    const matchesCategory = selectedCategories.length === 0 || 
                          selectedCategories.includes(announcement.category);
    
    // Filter by active tab
    const matchesTab = activeTab === 0 || 
                      (activeTab === 1 && announcement.important) || 
                      (activeTab === 2 && !announcement.important);
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  const handleCategoryToggle = (category) => {
    if (category === 'All') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev =>
        prev.includes(category)
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    }
  };

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        Announcements
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
              height: 3,
            },
          }}
        >
          <Tab label="All" />
          <Tab label="Important" />
          <Tab label="Regular" />
        </Tabs>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
              sx: { borderRadius: 4 },
            }}
            sx={{ mr: 2, width: 250 }}
          />
          
          <IconButton onClick={() => setShowFilters(!showFilters)}>
            <FilterIcon />
          </IconButton>
        </Box>
      </Box>
      
      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden', marginBottom: 16 }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {categories.map(category => (
              <Chip
                key={category}
                label={category}
                onClick={() => handleCategoryToggle(category)}
                variant={selectedCategories.includes(category) || (category === 'All' && selectedCategories.length === 0) ? 'filled' : 'outlined'}
                color={selectedCategories.includes(category) ? 'primary' : 'default'}
                sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
            ))}
          </Box>
        </motion.div>
      )}
      
      {filteredAnnouncements.length === 0 ? (
        <EmptyState 
          title="No announcements found"
          description="Try adjusting your search or filters"
          icon="📢"
        />
      ) : (
        <Box sx={{ display: 'grid', gap: 3 }}>
          <AnimatePresence>
            {filteredAnnouncements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <AnnouncementCard announcement={announcement} />
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>
      )}
    </Box>
  );
};

export default AnnouncementsPage;