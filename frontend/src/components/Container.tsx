import { Box, Button, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { getLists } from '../api/todos-api';
import { useEffect, useState } from 'react';
import { TaskList } from '../types';

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
  const [lists, setLists] = useState<TaskList[]>([])

  useEffect(()=>{
    get()
  },[])

  const get = async ()=>{
    const res = await getLists()
    console.log(res)
    setLists(res)
  }

  return (
    <StyledContainer>
    {lists.map((list) => (
      <List key={list.id}>
        <Typography variant="h6" gutterBottom>
          {list.title}
        </Typography>
        {Object.values(list.tasks).map((task) => ( // Use Object.values() to iterate over task objects
          <Task key={task.id} variant="body1">
            {task.name}
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
