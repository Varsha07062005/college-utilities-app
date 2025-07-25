// src/pages/LostAndFoundPage.jsx
import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, FormControl, Chip, Avatar } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Add as AddIcon, Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import LostItemCard from '../components/dashboard/LostItemCard';
import EmptyState from '../components/common/EmptyState';

const categories = ['Electronics', 'Stationery', 'Clothing', 'Accessories', 'Documents', 'Others'];
const locations = ['Library', 'Cafeteria', 'Main Building', 'Hostel A', 'Hostel B', 'Sports Complex', 'Parking Lot'];

const LostAndFoundPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    images: [],
    type: 'lost', // or 'found'
  });
  const [previewImages, setPreviewImages] = useState([]);

  // Mock data - replace with real data from API
  const lostItems = [
    {
      id: 1,
      title: 'Lost Calculus Textbook',
      description: 'Lost my calculus textbook near the library. Has my name written on the first page.',
      category: 'Stationery',
      location: 'Library',
      date: '2023-10-05',
      images: ['https://via.placeholder.com/150'],
      type: 'lost',
      contact: 'john.doe@college.edu',
      status: 'not-found',
    },
    // Add more items...
  ];

  const foundItems = [
    {
      id: 101,
      title: 'Found Black Wallet',
      description: 'Found a black leather wallet in the cafeteria. Contains some cards and cash.',
      category: 'Accessories',
      location: 'Cafeteria',
      date: '2023-10-06',
      images: ['https://via.placeholder.com/150'],
      type: 'found',
      contact: 'security@college.edu',
      status: 'unclaimed',
    },
    // Add more items...
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviewImages = files.map(file => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewImages]);
    setNewItem({ ...newItem, images: [...newItem.images, ...files] });
  };

  const removeImage = (index) => {
    const newPreviews = [...previewImages];
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
    
    const newImages = [...newItem.images];
    newImages.splice(index, 1);
    setNewItem({ ...newItem, images: newImages });
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Submitting item:', newItem);
    setOpenDialog(false);
    // Reset form
    setNewItem({
      title: '',
      description: '',
      category: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      images: [],
      type: 'lost',
    });
    setPreviewImages([]);
  };

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Lost & Found
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
          Report Item
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
      >
        <Tab label="Lost Items" />
        <Tab label="Found Items" />
        <Tab label="My Reports" />
      </Tabs>
      
      <Box sx={{ display: 'grid', gap: 3 }}>
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {lostItems.length === 0 ? (
                <EmptyState 
                  title="No lost items reported"
                  description="Be the first to report a lost item"
                  icon="🔍"
                />
              ) : (
                lostItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <LostItemCard item={item} />
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
          
          {activeTab === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {foundItems.length === 0 ? (
                <EmptyState 
                  title="No found items reported"
                  description="Be the first to report a found item"
                  icon="🎁"
                />
              ) : (
                foundItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <LostItemCard item={item} />
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
          
          {activeTab === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EmptyState 
                title="No items reported by you"
                description="Report a lost or found item to see it here"
                icon="👤"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
      
      {/* Report Item Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Report {newItem.type === 'lost' ? 'Lost' : 'Found'} Item
          </Typography>
        </DialogTitle>
        
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Button
              variant={newItem.type === 'lost' ? 'contained' : 'outlined'}
              onClick={() => setNewItem({ ...newItem, type: 'lost' })}
              sx={{ mr: 2, borderRadius: 4 }}
            >
              I Lost Something
            </Button>
            <Button
              variant={newItem.type === 'found' ? 'contained' : 'outlined'}
              onClick={() => setNewItem({ ...newItem, type: 'found' })}
              sx={{ borderRadius: 4 }}
            >
              I Found Something
            </Button>
          </Box>
          
          <TextField
            label="Item Title"
            fullWidth
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            sx={{ mb: 3 }}
          />
          
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            sx={{ mb: 3 }}
          />
          
          <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={newItem.category}
                label="Category"
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              >
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={newItem.location}
                label="Location"
                onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
              >
                {locations.map(location => (
                  <MenuItem key={location} value={location}>{location}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <TextField
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newItem.date}
            onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
            sx={{ mb: 3 }}
          />
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Upload Images (Max 3)
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
              {previewImages.map((img, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <Avatar
                    src={img}
                    variant="rounded"
                    sx={{ width: 100, height: 100 }}
                  />
                  <IconButton
                    size="small"
                    sx={{ 
                      position: 'absolute', 
                      top: -8, 
                      right: -8, 
                      backgroundColor: 'background.paper',
                      '&:hover': { backgroundColor: 'background.default' }
                    }}
                    onClick={() => removeImage(index)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              
              {previewImages.length < 3 && (
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AddIcon />
                  <Typography variant="caption">Add Image</Typography>
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </Button>
              )}
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ borderRadius: 4 }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={!newItem.title || !newItem.category || !newItem.location}
            sx={{ borderRadius: 4 }}
          >
            Submit Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LostAndFoundPage;