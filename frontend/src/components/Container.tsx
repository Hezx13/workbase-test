import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
    alignItems: 'flex-start',
  overflowX: 'auto',
  overflowY: 'hidden',
  height: '100%',
  padding: '16px',
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
});

const List = styled(Paper)({
  minWidth: '300px',
  maxWidth: '300px',
  marginRight: '16px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
});

const Task = styled(Typography)({
  boxShadow: '1px 1px 1px 1px #00000020',
  margin: '0.5rem 0',
  padding: '8px',
  borderRadius: '4px',
});

const TodoContainer = () => {
  // Dummy data for lists and tasks
  const lists = [
    { id: 11, title: 'To Do', tasks: ['Task 1', 'Task 2', 'Task 3'] },
    { id: 1, title: 'To Do', tasks: ['Task 1', 'Task 2', 'Task 3'] },
    { id: 17, title: 'To Do', tasks: ['Task 1', 'Task 2', 'Task 3'] },
    { id: 2, title: 'In Progress', tasks: ['Task 4', 'Task 5'] },
    { id: 3, title: 'Done', tasks: ['Task 6'] },
  ];

  return (
    <StyledContainer>
      {lists.map((list) => (
        <List key={list.id}>
          <Typography variant="h6" gutterBottom>
            {list.title}
          </Typography>
          {list.tasks.map((task, index) => (
            <Task key={index} variant="body1">
              {task}
            </Task>
          ))}
        </List>
      ))}
      <Button>
        Add list
      </Button>
    </StyledContainer>
  );
};

export default TodoContainer;
