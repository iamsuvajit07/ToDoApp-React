import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  Switch
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CompleteIcon,
  RadioButtonUnchecked as PendingIcon,
  ClearAll as ClearAllIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon
} from "@mui/icons-material";
import { useThemeMode } from "./App";

const ToDoList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { mode, toggleTheme } = useThemeMode();

  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editDialog, setEditDialog] = useState({ open: false, item: null, index: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  // Load items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('todoItems');
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        setItems(parsedItems);
      } catch (error) {
        console.error('Error loading saved items:', error);
      }
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('todoItems', JSON.stringify(items));
    }
  }, [items]);

  // Update statistics
  useEffect(() => {
    const completed = items.filter(item => item.completed).length;
    const pending = items.filter(item => !item.completed).length;
    setStats({
      total: items.length,
      completed,
      pending
    });
  }, [items]);

  const showSnackbar = useCallback((message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleInputChange = (event) => {
    setItem(event.target.value);
  };

  const addItem = () => {
    if (item.trim() === "") {
      showSnackbar("Please enter a task!", "warning");
      return;
    }

    const newItem = {
      id: Date.now(),
      text: item.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'medium'
    };

    setItems(prevItems => [...prevItems, newItem]);
    setItem("");
    showSnackbar("Task added successfully!");
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addItem();
    }
  };

  const deleteItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    showSnackbar("Task deleted!");
  };

  const toggleComplete = (id) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const editItem = (itemToEdit, index) => {
    setEditDialog({ open: true, item: itemToEdit, index });
  };

  const saveEdit = () => {
    if (editDialog.item && editDialog.item.text.trim() === "") {
      showSnackbar("Task cannot be empty!", "warning");
      return;
    }

    setItems(prevItems => 
      prevItems.map((item, index) => 
        index === editDialog.index ? editDialog.item : item
      )
    );
    setEditDialog({ open: false, item: null, index: null });
    showSnackbar("Task updated successfully!");
  };

  const clearCompleted = () => {
    const completedCount = items.filter(item => item.completed).length;
    if (completedCount === 0) {
      showSnackbar("No completed tasks to clear!", "info");
      return;
    }
    
    setItems(prevItems => prevItems.filter(item => !item.completed));
    showSnackbar(`Cleared ${completedCount} completed task${completedCount > 1 ? 's' : ''}!`);
  };

  const filteredItems = items.filter(item => {
    if (filter === "completed") return item.completed;
    if (filter === "pending") return !item.completed;
    return true;
  });

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Advanced Todo Manager
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip 
                label={`Total: ${stats.total}`} 
                color="default" 
                size="small" 
                variant="outlined"
              />
              <Chip 
                label={`Done: ${stats.completed}`} 
                color="success" 
                size="small" 
                variant="outlined"
              />
              <Chip 
                label={`Pending: ${stats.pending}`} 
                color="warning" 
                size="small" 
                variant="outlined"
              />
            </Box>
            
            {/* Theme Toggle */}
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <LightModeIcon 
                sx={{ 
                  fontSize: 20, 
                  color: mode === 'light' ? 'warning.main' : 'text.secondary',
                  mr: 1 
                }} 
              />
              <Switch
                checked={mode === 'dark'}
                onChange={toggleTheme}
                color="secondary"
                size="small"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: mode === 'dark' ? 'secondary.main' : 'default',
                  },
                }}
              />
              <DarkModeIcon 
                sx={{ 
                  fontSize: 20, 
                  color: mode === 'dark' ? 'secondary.main' : 'text.secondary',
                  ml: 1 
                }} 
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
            My Tasks
          </Typography>

          {/* Add Task Section */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Add a new task"
                  value={item}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="What needs to be done?"
                  size={isMobile ? "small" : "medium"}
                  // sx={{
                  //   '& .MuiInputLabel-root': {
                  //     fontSize: isMobile ? '0.875rem' : '1rem',
                  //     fontWeight: 500,
                  //     color: theme.palette.text.secondary,
                  //     '&.Mui-focused': {
                  //       color: theme.palette.primary.main,
                  //     },
                  //   },
                  //   '& .MuiOutlinedInput-input': {
                  //     fontSize: isMobile ? '0.875rem' : '1rem',
                  //     padding: isMobile ? '12px 14px' : '16px 14px',
                  //   },
                  //   '& .MuiOutlinedInput-notchedOutline': {
                  //     borderColor: theme.palette.divider,
                  //     borderWidth: '1px',
                  //   },
                  //   '&:hover .MuiOutlinedInput-notchedOutline': {
                  //     borderColor: theme.palette.primary.main,
                  //   },
                  //   '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  //     borderColor: theme.palette.primary.main,
                  //     borderWidth: '2px',
                  //   },
                  // }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={addItem}
                  size={isMobile ? "small" : "medium"}
                  sx={{ height: isMobile ? '40px' : '56px' }}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Filter and Actions */}
          <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Filter</InputLabel>
              <Select
                value={filter}
                label="Filter"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="all">All Tasks</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
            
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ClearAllIcon />}
              onClick={clearCompleted}
              size="small"
            >
              Clear Completed
            </Button>
          </Box>

          {/* Task List */}
          <List sx={{ width: '100%' }}>
            {filteredItems.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  {filter === "all" ? "No tasks yet. Add your first task above!" : 
                   filter === "completed" ? "No completed tasks." : 
                   "No pending tasks. Great job!"}
                </Typography>
              </Box>
            ) : (
              filteredItems.map((todoItem, index) => (
                <Card key={todoItem.id} sx={{ mb: 2, elevation: 1 }}>
                  <CardContent sx={{ pb: 1 }}>
                    <ListItem sx={{ p: 0 }}>
                      <IconButton
                        edge="start"
                        onClick={() => toggleComplete(todoItem.id)}
                        color={todoItem.completed ? "success" : "default"}
                      >
                        {todoItem.completed ? <CompleteIcon /> : <PendingIcon />}
                      </IconButton>
                      <ListItemText
                        primary={todoItem.text}
                        sx={{
                          textDecoration: todoItem.completed ? 'line-through' : 'none',
                          color: todoItem.completed ? 'text.secondary' : 'text.primary',
                          ml: 1
                        }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => editItem(todoItem, items.indexOf(todoItem))}
                          color="primary"
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={() => deleteItem(todoItem.id)}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </CardContent>
                </Card>
              ))
            )}
          </List>
        </Paper>
      </Container>

      {/* Edit Dialog */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, item: null, index: null })} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task"
            fullWidth
            variant="outlined"
            value={editDialog.item?.text || ""}
            onChange={(e) => setEditDialog(prev => ({ 
              ...prev, 
              item: prev.item ? { ...prev.item, text: e.target.value } : null 
            }))}
            sx={{
              '& .MuiInputLabel-root': {
                fontSize: '1rem',
                fontWeight: 500,
                color: theme.palette.text.secondary,
                '&.Mui-focused': {
                  color: theme.palette.primary.main,
                },
              },
              '& .MuiOutlinedInput-input': {
                fontSize: '1rem',
                padding: '16px 14px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.divider,
                borderWidth: '1px',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
                borderWidth: '2px',
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, item: null, index: null })}>
            Cancel
          </Button>
          <Button onClick={saveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ToDoList;
