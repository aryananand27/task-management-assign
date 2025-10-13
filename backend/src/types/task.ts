export interface TaskRequests{
    userId:number;
    title:string;
    description:string;
    status?:boolean;
}
export interface TaskUpdates{
    userId:number;
    title:string;
    description:string;
    status?:boolean;
}