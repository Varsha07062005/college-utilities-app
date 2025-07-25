// src/components/dashboard/StudyGroupFinder.jsx
import React, { useState } from 'react';
import { Box, Typography, Button, Chip, Avatar, TextField, Select, MenuItem, InputLabel, FormControl, Divider, Tabs, Tab, Badge } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Add as AddIcon, Group as GroupIcon, School as SubjectIcon, Schedule as ScheduleIcon, Place as LocationIcon } from '@mui/icons-material';

const subjects = ['Calculus', 'Physics', 'Chemistry', 'Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Biology'];
const studySpots = ['Library', 'Cafeteria', 'Hostel Common Room', 'Department Lounge', 'Online'];

const StudyGroupFinder = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newGroup, setNewGroup] = useState({
    subject: '',
    topic: '',
    date: '',
    time: '',
    location: '',
    maxMembers: 5,
    description: '',
  });

  // Mock data - replace with real data from API
  const studyGroups = [
    {
      id: 1,
      subject: 'Computer Science',
      topic: 'Data Structures - Trees',
      date: '2023-10-15',
      time: '14:00',
      location: 'Library',
      members: 3,
      maxMembers: 6,
      creator: 'Jane Doe',
      description: 'Studying for the upcoming midterm on tree data structures. All skill levels welcome!',
    },
    {
      id: 2,
      subject: 'Physics',
      topic: 'Quantum Mechanics Basics',
      date: '2023-10-16',
      time: '16:00',
      location: 'Department Lounge',
      members: 2,
      maxMembers: 4,
      creator: 'John Smith',
      description: 'Going through the fundamentals before the lab session next week.',
    },
    // Add more groups...
  ];

  const filteredGroups = studyGroups.filter(group => {
    // Filter by search query
    const matchesSearch = group.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         group.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by active tab
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'my-groups' && group.creator === 'Current User') || // Replace with actual user check
                      (activeTab === 'upcoming' && new Date(group.date) >= new Date());
    
    return matchesSearch && matchesTab;
  });

  const handleCreateGroup = () => {
    // Here you would typically send the data to your backend
    console.log('Creating group:', newGroup);
    setOpenDialog(false);
    // Reset form
    setNewGroup({
      subject: '',
      topic: '',
      date: '',
      time: '',
      location: '',
      maxMembers: 5,
      description: '',
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Study Groups
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            borderRadius: 4,
            textTransform: 'none',
            px: 3,
            py: 1,
            fontWeight: 'bold',
          }}
        >
          Create Group
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search study groups..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            sx: { borderRadius: 4 },
          }}
          sx={{ mr: 2, width: 300 }}
        />
        
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            ml: 'auto',
            '& .MuiTabs-indicator': {
              height: 3,
            },
          }}
        >
          <Tab label="All Groups" value="all" />
          <Tab label="Upcoming" value="upcoming" />
          <Tab 
            label={
              <Badge badgeContent={2} color="primary">
                My Groups
              </Badge>
            } 
            value="my-groups" 
          />
        </Tabs>
      </Box>
      
      <Box sx={{ display: 'grid', gap: 3 }}>
        <AnimatePresence mode="wait">
          {filteredGroups.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                p: 6,
                textAlign: 'center',
                border: '1px dashed',
                borderColor: 'divider',
                borderRadius: 4,
              }}>
                <GroupIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  No study groups found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {activeTab === 'my-groups' ? 
                    "You haven't joined or created any study groups yet" : 
                    "Be the first to create a study group for this subject"}
                </Typography>
                <Button 
                  variant="outlined" 
                  startIcon={<AddIcon />} 
                  sx={{ mt: 3, borderRadius: 4 }}
                  onClick={() => setOpenDialog(true)}
                >
                  Create Study Group
                </Button>
              </Box>
            </motion.div>
          ) : (
            filteredGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <Paper sx={{ p: 3, borderRadius: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <SubjectIcon />
                    </Avatar>
                    
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {group.topic}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {group.subject} • Created by {group.creator}
                      </Typography>
                    </Box>
                    
                    <Chip 
                      label={`${group.members}/${group.maxMembers} members`}
                      color={group.members >= group.maxMembers ? 'default' : 'primary'}
                      variant="outlined"
                      size="small"
                      sx={{ mr: 2 }}
                    />
                    
                    <Button 
                      variant={group.members >= group.maxMembers ? 'outlined' : 'contained'}
                      disabled={group.members >= group.maxMembers}
                      sx={{ borderRadius: 4 }}
                    >
                      {group.members >= group.maxMembers ? 'Full' : 'Join'}
                    </Button>
                  </Box>
                  
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {group.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ScheduleIcon color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {new Date(group.date).toLocaleDateString()} • {group.time}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationIcon color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {group.location}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </Box>
      
      {/* Create Group Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Create New Study Group
          </Typography>
        </DialogTitle>
        
        <DialogContent dividers>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Subject</InputLabel>
            <Select
              value={newGroup.subject}
              label="Subject"
              onChange={(e) => setNewGroup({ ...newGroup, subject: e.target.value })}
            >
              {subjects.map(subject => (
                <MenuItem key={subject} value={subject}>{subject}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            label="Topic/Title"
            fullWidth
            value={newGroup.topic}
            onChange={(e) => setNewGroup({ ...newGroup, topic: e.target.value })}
            sx={{ mb: 3 }}
          />
          
          <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newGroup.date}
              onChange={(e) => setNewGroup({ ...newGroup, date: e.target.value })}
            />
            
            <TextField
              label="Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newGroup.time}
              onChange={(e) => setNewGroup({ ...newGroup, time: e.target.value })}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={newGroup.location}
                label="Location"
                onChange={(e) => setNewGroup({ ...newGroup, location: e.target.value })}
              >
                {studySpots.map(spot => (
                  <MenuItem key={spot} value={spot}>{spot}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Max Members</InputLabel>
              <Select
                value={newGroup.maxMembers}
                label="Max Members"
                onChange={(e) => setNewGroup({ ...newGroup, maxMembers: e.target.value })}
              >
                {[2, 3, 4, 5, 6, 7, 8].map(num => (
                  <MenuItem key={num} value={num}>{num}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newGroup.description}
            onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
            placeholder="What will you be studying? Any specific requirements?"
          />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ borderRadius: 4 }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleCreateGroup}
            disabled={!newGroup.subject || !newGroup.topic || !newGroup.date || !newGroup.time || !newGroup.location}
            sx={{ borderRadius: 4 }}
          >
            Create Group
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudyGroupFinder;