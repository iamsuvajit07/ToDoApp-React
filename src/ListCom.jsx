import React from "react";
import { 
  ListItem, 
  ListItemText, 
  IconButton, 
  ListItemSecondaryAction,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CompleteIcon,
  RadioButtonUnchecked as PendingIcon
} from "@mui/icons-material";

const ListCom = ({ 
  item, 
  onDelete, 
  onEdit, 
  onToggleComplete,
  index 
}) => {
  return (
    <Card sx={{ mb: 2, elevation: 1 }}>
      <CardContent sx={{ pb: 1 }}>
        <ListItem sx={{ p: 0 }}>
          <IconButton
            edge="start"
            onClick={() => onToggleComplete(item.id)}
            color={item.completed ? "success" : "default"}
            size="small"
          >
            {item.completed ? <CompleteIcon /> : <PendingIcon />}
          </IconButton>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                sx={{
                  textDecoration: item.completed ? 'line-through' : 'none',
                  color: item.completed ? 'text.secondary' : 'text.primary',
                  wordBreak: 'break-word'
                }}
              >
                {item.text}
              </Typography>
            }
            secondary={
              <Typography variant="caption" color="text.secondary">
                {new Date(item.createdAt).toLocaleDateString()}
              </Typography>
            }
            sx={{ ml: 1 }}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              onClick={() => onEdit(item, index)}
              color="primary"
              size="small"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              onClick={() => onDelete(item.id)}
              color="error"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </CardContent>
    </Card>
  );
};

export default ListCom;
