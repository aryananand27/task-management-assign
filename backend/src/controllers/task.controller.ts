import Task from "../models/task";
import { Request,Response } from "express";
import { TaskRequests,TaskUpdates } from "../types/task";


export const createTask= async(req:Request,resp:Response)=>{
    try{
        const {userId,title,description,status}= req.body as TaskRequests;
        if( typeof title !=='string' || typeof description !== 'string'){
            return resp.status(400).json({message:"Title and description must be in string format"});
        }

        const taskCreated = await Task.create({title,description,status,userId});
        return resp.status(201).json({message:"Task is created successfully",taskCreated});
    }
    catch(err:any){
        console.log({message:"Error in Creating Task", err});
    }
}

export const getTaskById = async(req:Request,resp:Response)=>{
    try {
        const id=parseInt(req.params.id);
        if(isNaN(id)){
            return resp.status(400).json({message:"Invalid Task Id provided"});
        }
        const task=await Task.findByPk(id);
        if(!task){
            return resp.status(404).json({message:"Task not found"})
        }
        return resp.status(200).json({message:"Task Founded", task});

    } catch (err:any) {
        return resp.status(500).json({message:"Error in finding a Task",err});
    }
}

export const getAllTasks= async(req:Request,resp:Response) =>{
    try {
        const userId= parseInt(req.params.id);
        if(isNaN(userId)){
            return resp.status(400).json({message:"Invalid user Id"})
        }
        const {rows,count}=await Task.findAndCountAll({where:{userId}});
        if(count===0){
            return resp.status(200).json({message:"Nothing found in the db",count})
        }
        return resp.status(200).json({message:"Tasks list fetched",rows})
    }
     catch (err:any) {
        return resp.status(500).json({message:"Error fetching the Tasks list",err})    
    }
}

export const updateTask = async (req: Request, resp: Response) =>{
  try {
    const id=parseInt(req.params.id);
    if (isNaN(id)){
         return resp.status(400).json({ message:"Invalid Task Id provided"})
    }
    const updates=req.body as TaskUpdates;
    const task=await Task.findByPk(id);
     if(!task){
        return resp.status(404).json({message:"Task not found"})
    }
    await task.update(updates);
    return resp.status(200).json({message:"Task successfully updated",task})
  } catch (err:any) {
    return resp.status(500).json({message:"Error in updating the task",err});
  }
}

export const deleteTask = async (req: Request, resp: Response) =>{
  try {
    const id=parseInt(req.params.id);
    if (isNaN(id)){
         return resp.status(400).json({message:"Invalid Task Id provided"});
    }
    const task = await Task.findByPk(id);
   if(!task){
        return resp.status(404).json({message:"Task not found"})
    }
    await task.destroy();
    return resp.status(200).json({message:"Task successfully deleted"});
  } catch (err:any) {
    return resp.status(500).json({message:"Error in deletign the task", err });
  }
}