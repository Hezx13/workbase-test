
import { FC, useEffect, useState } from 'react';
import { TaskList } from '../types';
import { Typography, Button, Box, IconButton, Chip, Dialog, TextField  } from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import { createTask, createTaskList, editTask, editTaskList, fetchTaskLists, removeTask, removeTaskList } from '../store/actions';
import { List, StyledContainer, Task } from './styled/styled';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store/reducers';
import EditDialog from './EditDialog';

const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric',
    timeZone: 'UTC' // Assuming the input string is in UTC timezone
};

interface Props {
    taskLists: { [id: string]: TaskList };
    fetchTaskLists: () => void;
    createTaskList: (title: string) => void;
    removeTaskList: (id: string) => void;
    editTaskList: (id: string, title: string) => void;
    createTask: (taskListId: string, name: string, due: Date) => void;
    editTask: (taskListId: string, taskId: string, name: string, due: Date, completed: boolean) => void;
    removeTask: (taskListId: string, taskId: string) => void;
  }

// i know its ugly, but time started to be a problem :)
// TODO: REFACTOR
const TodoContainer: FC<Props> = ({ taskLists, fetchTaskLists, createTaskList, removeTaskList, editTaskList, createTask, editTask, removeTask }) => {
    const [taskEditData, setTaskEditData] = useState<any>(null)
    const [dialogMode, setDialogMode] = useState<'add' | 'update'>('add')
    useEffect(() => {
        fetchTaskLists();
      }, []);
      console.log(taskLists)
      const handleAddList = () => {
        const title = prompt('Enter list title');
        if (title) {
          createTaskList(title);
        }
      };
    
      const handleAddTask = (list, name, due) => {
        if (name && due) {
          createTask(list.listId, name, due);
        }
        setTaskEditData(null)
      };

      const handleEditTask = (task, newTaskName, newDueDate, completed) => {
        editTask(task.listId, task.taskId, newTaskName, newDueDate, completed)
        setTaskEditData(null)
      }
    
  return (
    <StyledContainer>
    {Object.values(taskLists).map((list) => (
      <List key={list.id} sx={{margin: '0.5rem', padding: '0.5rem', border: '1px solid green'}}>
        <Typography variant="h6" gutterBottom>
          {list.title}
            <IconButton size="small" onClick={() => removeTaskList(list.id)}><Delete /></IconButton>
            <IconButton size="small" onClick={() => editTaskList(list.id, prompt('New title') || list.title)}><Edit /></IconButton>
            <IconButton size="small" onClick={() => {
                setTaskEditData({listId: list.id})
                setDialogMode('add')
            }}><Add /></IconButton>
        </Typography>
        {Object.values(list.tasks).map((task) => (
            <Box  key={task.id} sx={{border: '1px solid blue', marginBottom: '0.5rem'}}>
                <Task variant="body1">
                    {task.name} 
                    <br></br>
                    
                    {new Date(task.due).toLocaleDateString('en-US', 
                    //@ts-ignore
                    options)}
                </Task>
                <IconButton size="small" onClick={() => removeTask(list.id, task.id)}><Delete /></IconButton>
                <IconButton 
                    size="small" 
                    onClick={()=>{
                        setTaskEditData({listId: list.id, taskId: task.id})
                        setDialogMode('update')
                    }}
                >
                <Edit/>
            </IconButton>

            </Box>
        ))}
      </List>
    ))}
    <Button size="large" variant="contained" onClick={handleAddList}>
      Add list
    </Button>
    <EditDialog
        taskEdit={taskEditData}
        onCloseEdit={()=>setTaskEditData(false)}
        onSubmit={dialogMode === 'add' ? handleAddTask : handleEditTask}
    />
  </StyledContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
    taskLists: state.taskLists.taskLists
  });
  
  const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, AnyAction>) => ({
    fetchTaskLists: () => dispatch(fetchTaskLists()),
    createTaskList: (title: string) => dispatch(createTaskList(title)),
    removeTaskList: (id: string) => dispatch(removeTaskList(id)),
    editTaskList: (id: string, title: string) => dispatch(editTaskList(id, title)),
    createTask: (taskListId: string, name: string, due: Date) => dispatch(createTask(taskListId, name, due)),
    editTask: (taskListId: string, taskId: string, name: string, due: Date, completed: boolean) => dispatch(editTask(taskListId, taskId, name, due, completed)),
    removeTask: (taskListId: string, taskId: string) => dispatch(removeTask(taskListId, taskId))
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
