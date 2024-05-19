import http from "./http";
import { Task, TaskList } from "../types";

export const getLists = async (): Promise<TaskList[]> => {
  try {
    const res = await http.get("/todos");
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch task lists");
  }
};

export const addList = async (title: string): Promise<number> => {
  try {
    const res = await http.post("/todos", { title });
    return res.status;
  } catch (error) {
    throw new Error("Failed to add task list");
  }
};

export const deleteList = async (id: string): Promise<number> => {
  try {
    const res = await http.delete(`/todos/${id}`);
    return res.status;
  } catch (error) {
    throw new Error("Failed to delete task list");
  }
};

export const updateList = async (id: string, title: string): Promise<TaskList | undefined> => {
  try {
    const res = await http.put(`/todos/${id}`, { title });
    return res.data;
  } catch (error) {
    throw new Error("Failed to update task list");
  }
};

export const addTask = async (id: string, name: string, due: Date): Promise<Task> => {
  try {
    const res = await http.post(`/todos/${id}/tasks`, { name, due });
    return res.data;
  } catch (error) {
    throw new Error("Failed to add task");
  }
};

export const updateTask = async (taskListId: string, taskId: string, name: string, due: Date, completed: boolean): Promise<Task | undefined> => {
  try {
    const res = await http.put(`/todos/${taskListId}/tasks/${taskId}`, { name, due, completed });
    return res.data;
  } catch (error) {
    throw new Error("Failed to update task");
  }
};

export const deleteTask = async (taskListId: string, taskId: string): Promise<number> => {
  try {
    const res = await http.delete(`/todos/${taskListId}/tasks/${taskId}`);
    return res.status;
  } catch (error) {
    throw new Error("Failed to delete task");
  }
};