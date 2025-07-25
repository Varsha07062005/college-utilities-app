// src/components/dashboard/CampusMap.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, IconButton, Paper, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Place as PlaceIcon, Directions as DirectionsIcon, Close as CloseIcon } from '@mui/icons-material';

const locations = [
  { id: 'library', name: 'Library', x: 30, y: 40, description: 'Main college library with study spaces and resources' },
  { id: 'cafeteria', name: 'Cafeteria', x: 60, y: 70, description: 'Food court and dining area' },
  { id: 'admin', name: 'Administration', x: 20, y: 80, description: 'College administration offices' },
  { id: 'hostel-a', name: 'Hostel A', x: 80, y: 30, description: 'Boys hostel block A' },
  { id: 'hostel-b', name: 'Hostel B', x: 85, y: 35, description: 'Girls hostel block B' },
  { id: 'sports', name: 'Sports Complex', x: 70, y: 20, description: 'Indoor and outdoor sports facilities' },
];

const CampusMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const mapRef = useRef(null);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setShowSearchResults(false);
    
    // Scroll to the location on the map (simulated)
    if (mapRef.current) {
      mapRef.current.scrollTo({
        left: location.x * 5 - 100,
        top: location.y * 5 - 100,
        behavior: 'smooth',
      });
    }
  };

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ position: 'relative', height: 600, overflow: 'hidden' }}>
      {/* Search Bar */}
      <Paper sx={{ 
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 10,
        width: 300,
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: 3,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
          <SearchIcon sx={{ ml: 1, mr: 1, color: 'text.secondary' }} />
          
          <input
            type="text"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(e.target.value.length > 0);
            }}
            style={{
              border: 'none',
              outline: 'none',
              flex: 1,
              padding: '8px 0',
              background: 'transparent',
              fontSize: '0.875rem',
            }}
          />
          
          {searchQuery && (
            <IconButton onClick={() => {
              setSearchQuery('');
              setShowSearchResults(false);
            }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
        
        <AnimatePresence>
          {showSearchResults && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden' }}
            >
              <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
                {filteredLocations.length > 0 ? (
                  filteredLocations.map(location => (
                    <ListItem
                      key={location.id}
                      button
                      onClick={() => handleLocationClick(location)}
                      sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
                    >
                      <PlaceIcon color="primary" sx={{ mr: 2 }} />
                      <ListItemText 
                        primary={location.name} 
                        secondary={location.description} 
                        secondaryTypographyProps={{ noWrap: true }}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No locations found" />
                  </ListItem>
                )}
              </List>
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
      
      {/* Map Canvas */}
      <Box
        ref={mapRef}
        sx={{
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(to right, #f5f5f5 1px, transparent 1px), linear-gradient(to bottom, #f5f5f5 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          backgroundColor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
        }}
      >
        {/* Simulated map with locations */}
        <Box sx={{ 
          width: '500px',
          height: '500px',
          position: 'relative',
          background: 'linear-gradient(145deg, #e1f5fe, #b3e5fc)',
          borderRadius: 2,
          m: '50px',
          boxShadow: 3,
        }}>
          {locations.map(location => (
            <motion.div
              key={location.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'absolute',
                left: `${location.x}%`,
                top: `${location.y}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
              }}
              onClick={() => handleLocationClick(location)}
            >
              <PlaceIcon
                fontSize="large"
                color={selectedLocation?.id === location.id ? 'primary' : 'action'}
                sx={{
                  filter: selectedLocation?.id === location.id ? 'drop-shadow(0 0 8px rgba(0, 0, 255, 0.4))' : 'none',
                }}
              />
            </motion.div>
          ))}
          
          {/* Paths between locations (simulated) */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
            <line 
              x1="30%" y1="40%" 
              x2="20%" y2="80%" 
              stroke="#90caf9" 
              strokeWidth="2" 
              strokeDasharray="5,5" 
            />
            <line 
              x1="30%" y1="40%" 
              x2="60%" y2="70%" 
              stroke="#90caf9" 
              strokeWidth="2" 
              strokeDasharray="5,5" 
            />
            {/* Add more paths as needed */}
          </svg>
        </Box>
      </Box>
      
      {/* Location Details Panel */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10,
              width: 300,
            }}
          >
            <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  {selectedLocation.name}
                </Typography>
                
                <IconButton onClick={() => setSelectedLocation(null)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 2 }}>
                {selectedLocation.description}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label="Library" size="small" />
                <Chip label="Study" size="small" />
                <Chip label="Quiet Zone" size="small" />
              </Box>
              
              <Button 
                variant="contained"
                fullWidth
                startIcon={<DirectionsIcon />}
                sx={{ borderRadius: 4 }}
              >
                Get Directions
              </Button>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Popular routes from here:
                </Typography>
                
                <List dense sx={{ p: 0 }}>
                  {locations
                    .filter(loc => loc.id !== selectedLocation.id)
                    .slice(0, 3)
                    .map(loc => (
                      <ListItem 
                        key={loc.id} 
                        button 
                        sx={{ 
                          borderRadius: 2,
                          '&:hover': { backgroundColor: 'action.hover' },
                        }}
                        onClick={() => handleLocationClick(loc)}
                      >
                        <ListItemText 
                          primary={loc.name} 
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                </List>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default CampusMap;