export type Task = {
    id: string;
    name: string;
    due: Date;
    completed: boolean;
  };
  
  export type TaskList = {
    id: string;
    title: string;
    tasks: Map<string, Task>;
  };