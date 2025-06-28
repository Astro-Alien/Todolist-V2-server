export interface ITask {
    id: number,
    title: string,
    description: string,
    completed: boolean,
    user_id: number,
}

export interface ITaskBody {
    title: string,
    description: string,
}