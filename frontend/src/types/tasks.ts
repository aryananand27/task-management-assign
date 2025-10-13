
export interface TaskRequests {
  userId: number;
  title: string;
  description: string;
  status: boolean;
}

export interface TaskUpdates {
   userId:number;
    title:string;
    description:string;
    status?:boolean;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskResponse {
  message: string;
  taskCreated: Task;
}
export interface FetchTasksResponse {
  message: string;
  rows: Task[];
}
export interface UpdateTaskResponse {
  message: string;
  task: Task;
}