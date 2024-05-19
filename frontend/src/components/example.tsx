import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../store/reducers';
import { TaskList } from '../types';
import { fetchTaskLists, createTaskList, removeTaskList, editTaskList, createTask, editTask, removeTask } from '../store/actions';

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

const ExampleComponent: React.FC<Props> = ({ taskLists, fetchTaskLists, createTaskList, removeTaskList, editTaskList, createTask, editTask, removeTask }) => {
  useEffect(() => {
    fetchTaskLists();
  }, [fetchTaskLists]);

  const handleAddList = () => {
    const title = prompt('Enter list title');
    if (title) {
      createTaskList(title);
    }
  };

  const handleAddTask = (listId: string) => {
    const name = prompt('Enter task name');
    const due = new Date(prompt('Enter task due date') || '');
    if (name && due) {
      createTask(listId, name, due);
    }
  };

  return (
    <div>
      {Object.values(taskLists).map(list => (
        <div key={list.id}>
          <h3>{list.title}</h3>
          <button onClick={() => removeTaskList(list.id)}>Delete</button>
          <button onClick={() => editTaskList(list.id, prompt('New title') || list.title)}>Update</button>
          <button onClick={() => handleAddTask(list.id)}>Add Task</button>
          <ul>
            {Object.values(list.tasks).map(task => (
              <li key={task.id}>
                {task.name}
                <button onClick={() => removeTask(list.id, task.id)}>Delete</button>
                <button onClick={() => editTask(list.id, task.id, prompt('New task name') || task.name, new Date(prompt('New due date') || task.due.toISOString()), !task.completed)}>
                  Toggle Complete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={handleAddList}>Add List</button>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExampleComponent);
