// src/pages/TimetablePage.jsx
import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, FormControl, Chip, Paper } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TimetableDayColumn from '../components/dashboard/TimetableDayColumn';
import EmptyState from '../components/common/EmptyState';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const classTypes = ['Lecture', 'Lab', 'Tutorial', 'Workshop', 'Seminar'];

const TimetablePage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [timetable, setTimetable] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });
  const [newClass, setNewClass] = useState({
    subject: '',
    type: 'Lecture',
    startTime: null,
    endTime: null,
    location: '',
    teacher: '',
    day: 'Monday',
  });

  const handleAddClass = () => {
    if (!newClass.subject || !newClass.startTime || !newClass.endTime) return;
    
    const updatedTimetable = { ...timetable };
    if (editIndex !== null) {
      // Replace existing class
      updatedTimetable[newClass.day][editIndex] = newClass;
    } else {
      // Add new class
      updatedTimetable[newClass.day].push(newClass);
    }
    
    setTimetable(updatedTimetable);
    setOpenDialog(false);
    resetForm();
  };

  const handleEditClass = (day, index) => {
    const classToEdit = timetable[day][index];
    setNewClass({
      ...classToEdit,
      day: day,
    });
    setEditIndex(index);
    setOpenDialog(true);
  };

  const handleDeleteClass = (day, index) => {
    const updatedTimetable = { ...timetable };
    updatedTimetable[day].splice(index, 1);
    setTimetable(updatedTimetable);
  };

  const resetForm = () => {
    setNewClass({
      subject: '',
      type: 'Lecture',
      startTime: null,
      endTime: null,
      location: '',
      teacher: '',
      day: 'Monday',
    });
    setEditIndex(null);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    
    if (!destination) return;
    
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    
    const sourceDay = source.droppableId;
    const destDay = destination.droppableId;
    const movedClass = timetable[sourceDay][source.index];
    
    const updatedTimetable = { ...timetable };
    updatedTimetable[sourceDay].splice(source.index, 1);
    updatedTimetable[destDay].splice(destination.index, 0, {
      ...movedClass,
      day: destDay,
    });
    
    setTimetable(updatedTimetable);
  };

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          My Timetable
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
          Add Class
        </Button>
      </Box>
      
      {Object.values(timetable).every(day => day.length === 0) ? (
        <EmptyState 
          title="Your timetable is empty"
          description="Add your classes to get started"
          icon="🕒"
        />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)' },
            gap: 2,
            overflowX: 'auto',
            pb: 2,
          }}>
            {days.map(day => (
              <Droppable key={day} droppableId={day}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <TimetableDayColumn 
                      day={day}
                      classes={timetable[day]}
                      onEdit={handleEditClass}
                      onDelete={handleDeleteClass}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </Box>
        </DragDropContext>
      )}
      
      {/* Add/Edit Class Dialog */}
      <Dialog open={openDialog} onClose={() => { setOpenDialog(false); resetForm(); }} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            {editIndex !== null ? 'Edit Class' : 'Add New Class'}
          </Typography>
        </DialogTitle>
        
        <DialogContent dividers>
          <TextField
            label="Subject"
            fullWidth
            value={newClass.subject}
            onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
            sx={{ mb: 3 }}
          />
          
          <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Class Type</InputLabel>
              <Select
                value={newClass.type}
                label="Class Type"
                onChange={(e) => setNewClass({ ...newClass, type: e.target.value })}
              >
                {classTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Day</InputLabel>
              <Select
                value={newClass.day}
                label="Day"
                onChange={(e) => setNewClass({ ...newClass, day: e.target.value })}
              >
                {days.map(day => (
                  <MenuItem key={day} value={day}>{day}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
              <TimePicker
                label="Start Time"
                value={newClass.startTime}
                onChange={(newValue) => setNewClass({ ...newClass, startTime: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              
              <TimePicker
                label="End Time"
                value={newClass.endTime}
                onChange={(newValue) => setNewClass({ ...newClass, endTime: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
                minTime={newClass.startTime}
              />
            </Box>
          </LocalizationProvider>
          
          <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <TextField
              label="Location"
              fullWidth
              value={newClass.location}
              onChange={(e) => setNewClass({ ...newClass, location: e.target.value })}
            />
            
            <TextField
              label="Teacher"
              fullWidth
              value={newClass.teacher}
              onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
            />
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => { setOpenDialog(false); resetForm(); }} sx={{ borderRadius: 4 }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleAddClass}
            disabled={!newClass.subject || !newClass.startTime || !newClass.endTime}
            sx={{ borderRadius: 4 }}
          >
            {editIndex !== null ? 'Update' : 'Add'} Class
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TimetablePage;