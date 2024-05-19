import { Request, Response, Router } from 'express';
import { v4 as uuid } from 'uuid';
import { Task, TaskList } from '../types';

class TodosController {
  public router = Router();
  public taskLists: Map<string, TaskList>;

  constructor() {
    this.initializeRoutes();
    this.taskLists = new Map()
  }

  private initializeRoutes() {
    this.router.post('/', this.createList.bind(this));
    this.router.get('/', this.getLists.bind(this));
    this.router.delete('/:id', this.deleteList.bind(this));
    this.router.put('/:id', this.updateList.bind(this));

    // Task routes
    this.router.post('/:id/tasks', this.addTask.bind(this));
    this.router.put('/:taskListId/tasks/:taskId', this.updateTask.bind(this));
    this.router.delete('/:taskListId/tasks/:taskId', this.deleteTask.bind(this));
  }

  // BEGIN LISTS OPERATIONS
  createList(req: Request, res: Response) {
    const { title } = req.body;
    const id = uuid();
    const newTaskList: TaskList = { id, title, tasks: new Map() };
    this.taskLists.set(id, newTaskList);
    res.status(201).json(newTaskList);
  }

  getLists(req: Request, res: Response) {
    res.json(Array.from(this.taskLists.values()));
  }

  deleteList(req: Request, res: Response) {
    const { id } = req.params;
    if (this.taskLists.delete(id)) {
      res.status(204).send();
    } else {
      res.status(404).send('Task list not found');
    }
  }

  updateList(req: Request, res: Response) {
    const { id } = req.params;
    const { title } = req.body;
    const taskList = this.taskLists.get(id);
    if (taskList) {
      taskList.title = title || taskList.title;
      res.json(taskList);
    } else {
      res.status(404).send('Task list not found');
    }
  }
  // END LISTS OPERATIONS

  // BEGIN TASK OPERATIONS
  addTask(req: Request, res: Response) {
    const { id } = req.params;
    const { name, due } = req.body;
    const taskList = this.taskLists.get(id);
    if (taskList) {
      const taskId = uuid();
      const newTask: Task = { id: taskId, name, due: new Date(due), completed: false };
      taskList.tasks.set(taskId, newTask);
      res.status(201).json(newTask);
    } else {
      res.status(404).send('Task list not found');
    }
  }

  updateTask(req: Request, res: Response) {
    const { taskListId, taskId } = req.params;
    const { name, due, completed } = req.body;
    const taskList = this.taskLists.get(taskListId);
    if (taskList) {
      const task = taskList.tasks.get(taskId);
      if (task) {
        task.name = name || task.name;
        task.due = due ? new Date(due) : task.due;
        task.completed = completed !== undefined ? completed : task.completed;
        res.json(task);
      } else {
        res.status(404).send('Task not found');
      }
    } else {
      res.status(404).send('Task list not found');
    }
  }

  deleteTask(req: Request, res: Response) {
    const { taskListId, taskId } = req.params;
    const taskList = this.taskLists.get(taskListId);
    if (taskList) {
      if (taskList.tasks.delete(taskId)) {
        res.status(204).send();
      } else {
        res.status(404).send('Task not found');
      }
    } else {
      res.status(404).send('Task list not found');
    }
  }
  // END TASK OPERATIONS
}

const todosRouter = new TodosController()

export default todosRouter.router;
