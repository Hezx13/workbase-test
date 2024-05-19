import { Dispatch } from 'redux';
import http from '../api/http';
import { Task, TaskList } from '../types';

// Action types
export const FETCH_TASKLISTS_SUCCESS = 'FETCH_TASKLISTS_SUCCESS';
export const ADD_TASKLIST_SUCCESS = 'ADD_TASKLIST_SUCCESS';
export const DELETE_TASKLIST_SUCCESS = 'DELETE_TASKLIST_SUCCESS';
export const UPDATE_TASKLIST_SUCCESS = 'UPDATE_TASKLIST_SUCCESS';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';

// Action creators
export const fetchTaskListsSuccess = (taskLists: TaskList[]): { type: string; payload: TaskList[] } => ({
  type: FETCH_TASKLISTS_SUCCESS,
  payload: taskLists
});

export const addTaskListSuccess = (taskList: TaskList): { type: string; payload: TaskList } => ({
  type: ADD_TASKLIST_SUCCESS,
  payload: taskList
});

export const deleteTaskListSuccess = (id: string): { type: string; payload: string } => ({
  type: DELETE_TASKLIST_SUCCESS,
  payload: id
});

export const updateTaskListSuccess = (taskList: TaskList): { type: string; payload: TaskList } => ({
  type: UPDATE_TASKLIST_SUCCESS,
  payload: taskList
});

export const addTaskSuccess = (taskListId: string, newTask: Task): { type: string; payload: { taskListId: string; newTask: Task } } => ({
  type: ADD_TASK_SUCCESS,
  payload: { taskListId, newTask }
});

export const deleteTaskSuccess = (taskListId: string, taskId: string): { type: string; payload: { taskListId: string; taskId: string } } => ({
  type: DELETE_TASK_SUCCESS,
  payload: { taskListId, taskId }
});

export const updateTaskSuccess = (taskListId: string, newTask: Task): { type: string; payload: { taskListId: string; newTask: Task } } => ({
  type: UPDATE_TASK_SUCCESS,
  payload: { taskListId, newTask }
});

// Thunk action creators
export const fetchTaskLists = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await http.get('/todos');
      dispatch(fetchTaskListsSuccess(response.data));
    } catch (error) {
      console.error('Failed to fetch task lists', error);
    }
  };
};

export const createTaskList = (title: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await http.post('/todos', { title });
      console.log(response.data)
      dispatch(addTaskListSuccess(response.data));
    } catch (error) {
      console.error('Failed to create task list', error);
    }
  };
};

export const removeTaskList = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await http.delete(`/todos/${id}`);
      dispatch(deleteTaskListSuccess(id));
    } catch (error) {
      console.error('Failed to delete task list', error);
    }
  };
};

export const editTaskList = (id: string, title: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await http.put(`/todos/${id}`, { title });
      console.log(response.data)

      dispatch(updateTaskListSuccess(response.data));
    } catch (error) {
      console.error('Failed to update task list', error);
    }
  };
};

export const createTask = (taskListId: string, name: string, due: Date) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await http.post(`/todos/${taskListId}/tasks`, { name, due });
      dispatch(addTaskSuccess(taskListId, response.data));
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };
};

export const editTask = (taskListId: string, taskId: string, name: string, due: Date, completed: boolean) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await http.put(`/todos/${taskListId}/tasks/${taskId}`, { name, due, completed });
      console.log(response)
      dispatch(updateTaskSuccess(taskListId, response.data));
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };
};

export const removeTask = (taskListId: string, taskId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await http.delete(`/todos/${taskListId}/tasks/${taskId}`);
      dispatch(deleteTaskSuccess(taskListId, taskId));
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };
};
