// src/pages/HostelComplaintsPage.jsx
import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, FormControl, Chip, Avatar, Badge } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Add as AddIcon, PriorityHigh as PriorityIcon, CheckCircle as ResolvedIcon, HourglassEmpty as PendingIcon, Build as InProgressIcon } from '@mui/icons-material';
import ComplaintCard from '../components/dashboard/ComplaintCard';
import EmptyState from '../components/common/EmptyState';

const complaintTypes = ['Electricity', 'Water', 'Cleaning', 'Furniture', 'Internet', 'Security', 'Other'];
const complaintStatus = {
  pending: { label: 'Pending', color: 'warning', icon: <PendingIcon /> },
  'in-progress': { label: 'In Progress', color: 'info', icon: <InProgressIcon /> },
  resolved: { label: 'Resolved', color: 'success', icon: <ResolvedIcon /> },
};

const HostelComplaintsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    description: '',
    type: '',
    location: '',
    priority: 'medium',
    images: [],
  });

  // Mock data - replace with real data from API
  const complaints = [
    {
      id: 1,
      title: 'Water Leak in Bathroom',
      description: 'There is a constant water leak from the ceiling in the shared bathroom of Hostel A, 2nd floor.',
      type: 'Water',
      location: 'Hostel A, 2nd Floor, Bathroom 3',
      priority: 'high',
      status: 'pending',
      date: '2023-10-10',
      user: 'John Doe',
      comments: [],
    },
    {
      id: 2,
      title: 'Broken Study Table',
      description: 'The study table in room 205 has a broken leg and is unstable.',
      type: 'Furniture',
      location: 'Hostel B, Room 205',
      priority: 'medium',
      status: 'in-progress',
      date: '2023-10-08',
      user: 'Jane Smith',
      comments: [
        {
          id: 1,
          text: 'We have ordered the replacement part. Expected to arrive by Oct 15.',
          author: 'Maintenance Team',
          date: '2023-10-09',
        },
      ],
    },
    // Add more complaints...
  ];

  const filteredComplaints = complaints.filter(complaint => {
    if (activeTab === 'all') return true;
    if (activeTab === 'my-complaints') return complaint.user === 'Current User'; // Replace with actual user check
    return complaint.status === activeTab;
  });

  const handleSubmitComplaint = () => {
    // Here you would typically send the data to your backend
    console.log('Submitting complaint:', newComplaint);
    setOpenDialog(false);
    // Reset form
    setNewComplaint({
      title: '',
      description: '',
      type: '',
      location: '',
      priority: 'medium',
      images: [],
    });
  };

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Hostel Complaints
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
          New Complaint
        </Button>
      </Box>
      
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{
          mb: 3,
          '& .MuiTabs-indicator': {
            height: 3,
          },
        }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="All" value="all" />
        <Tab 
          label={
            <Badge badgeContent={complaints.filter(c => c.status === 'pending').length} color="warning">
              Pending
            </Badge>
          } 
          value="pending" 
        />
        <Tab 
          label={
            <Badge badgeContent={complaints.filter(c => c.status === 'in-progress').length} color="info">
              In Progress
            </Badge>
          } 
          value="in-progress" 
        />
        <Tab 
          label={
            <Badge badgeContent={complaints.filter(c => c.status === 'resolved').length} color="success">
              Resolved
            </Badge>
          } 
          value="resolved" 
        />
        <Tab label="My Complaints" value="my-complaints" />
      </Tabs>
      
      <Box sx={{ display: 'grid', gap: 3 }}>
        <AnimatePresence mode="wait">
          {filteredComplaints.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EmptyState 
                title={`No ${activeTab === 'all' ? '' : activeTab + ' '}complaints found`}
                description={activeTab === 'my-complaints' ? 
                  "You haven't submitted any complaints yet" : 
                  "All issues are currently resolved"}
                icon="🏠"
              />
            </motion.div>
          ) : (
            filteredComplaints.map((complaint, index) => (
              <motion.div
                key={complaint.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <ComplaintCard complaint={complaint} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </Box>
      
      {/* New Complaint Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Register New Complaint
          </Typography>
        </DialogTitle>
        
        <DialogContent dividers>
          <TextField
            label="Complaint Title"
            fullWidth
            value={newComplaint.title}
            onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
            sx={{ mb: 3 }}
          />
          
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newComplaint.description}
            onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
            sx={{ mb: 3 }}
          />
          
          <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Complaint Type</InputLabel>
              <Select
                value={newComplaint.type}
                label="Complaint Type"
                onChange={(e) => setNewComplaint({ ...newComplaint, type: e.target.value })}
              >
                {complaintTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={newComplaint.priority}
                label="Priority"
                onChange={(e) => setNewComplaint({ ...newComplaint, priority: e.target.value })}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <TextField
            label="Location (Room No./Area)"
            fullWidth
            value={newComplaint.location}
            onChange={(e) => setNewComplaint({ ...newComplaint, location: e.target.value })}
            sx={{ mb: 3 }}
          />
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Upload Images (Optional)
            </Typography>
            
            <Button
              variant="outlined"
              component="label"
              startIcon={<AddIcon />}
              sx={{ mr: 2 }}
            >
              Add Images
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setNewComplaint({ ...newComplaint, images: [...newComplaint.images, ...files] });
                }}
              />
            </Button>
            
            {newComplaint.images.length > 0 && (
              <Chip
                label={`${newComplaint.images.length} image(s) selected`}
                onDelete={() => setNewComplaint({ ...newComplaint, images: [] })}
                sx={{ mt: 1 }}
              />
            )}
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ borderRadius: 4 }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmitComplaint}
            disabled={!newComplaint.title || !newComplaint.type || !newComplaint.location}
            sx={{ borderRadius: 4 }}
            startIcon={<PriorityIcon color={newComplaint.priority === 'high' ? 'error' : 
                                        newComplaint.priority === 'medium' ? 'warning' : 'inherit'} />}
          >
            Submit Complaint
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HostelComplaintsPage;