type Task = {
    id: string
    name: string
    due: Date
    completed: boolean   
}

type TaskList = {
    id: string
    title: string
    tasks: Task[]
}