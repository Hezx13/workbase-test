import { combineReducers } from 'redux';
import * as actions from './actions';
import { Task, TaskList } from '../types';

interface TaskListsState {
  taskLists: { [id: string]: TaskList };
}

const initialTaskListsState: TaskListsState = {
  taskLists: {}
};

const taskListsReducer = (state = initialTaskListsState, action: any): TaskListsState => {
  switch (action.type) {
    case actions.FETCH_TASKLISTS_SUCCESS:
      const fetchedLists = action.payload.reduce((acc: { [id: string]: TaskList }, list: TaskList) => {
        acc[list.id] = list;
        return acc;
      }, {});
      return { taskLists: fetchedLists };

    case actions.ADD_TASKLIST_SUCCESS:
      return { taskLists: { ...state.taskLists, [action.payload.id]: action.payload } };

      case actions.DELETE_TASKLIST_SUCCESS:
        const { [action.payload]: deletedList, ...rest } = state.taskLists;
        return { taskLists: rest };
    

        case actions.ADD_TASK_SUCCESS:
          case actions.UPDATE_TASK_SUCCESS:
          case actions.DELETE_TASK_SUCCESS: {
            const { taskListId, newTask, taskId } = action.payload;
            const taskList = state.taskLists[taskListId];
            if (taskList) {
              let updatedTasks;
              if (action.type === actions.ADD_TASK_SUCCESS) {
                updatedTasks = [...taskList.tasks, newTask];
              } else if (action.type === actions.UPDATE_TASK_SUCCESS) {
                updatedTasks = taskList.tasks.map(task => 
                  task.id === newTask.id ? newTask : task
                );
              } else if (action.type === actions.DELETE_TASK_SUCCESS) {
                updatedTasks = taskList.tasks.filter(task => task.id !== taskId);
              }
          
              return { 
                taskLists: { 
                  ...state.taskLists, 
                  [taskListId]: { 
                    ...taskList, 
                    tasks: updatedTasks 
                  } 
                } 
              };
            }
            return state;
          }
          

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  taskLists: taskListsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
