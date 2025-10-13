import User from "../models/user";
import { Request,Response } from "express";
import bcyrpt from 'bcrypt';
import {generateAccessToken,generateRefreshToken} from '../utils/jwtUtils'
import { AuthRequest} from "../types/user";


export const register=async(req:Request,resp:Response)=>{
   try{
         const {username,password} =req.body as AuthRequest;

    if(typeof username !== 'string' || typeof password !=='string'){
        return resp.status(400).json({message:"Username and Password must be in string format"});
    }

    const user= await User.findOne({where:{username}});
    if(user){
        return resp.status(400).json({message:"User Already Exists"});
    }

    const hashedPassword= await bcyrpt.hash(password,10);
    const userCreated= await User.create({username,password:hashedPassword});
    
    return resp.status(201).json({message:"User Created Successfully",userCreated});
   
}
catch(err:any){
        return resp.status(500).json({message:"Internal Server Error",err});
   }
};

export const login=async(req:Request,resp:Response)=>{
    try {
        const{username,password} =req.body as AuthRequest;
        console.log({username,password});

    if(typeof username !== 'string' || typeof password !=='string'){
        return resp.status(400).json({message:"Username and Password must be in string format"});
    }
     const user= await User.findOne({where:{username}});
     if(!user){
        return resp.status(404).json({message:"User Not Found"});
     }

     const isMatch = await bcyrpt.compare(password,user.get("password") as string);
     console.log({isMatch})
     if(!isMatch){
        return resp.status(401).json({message:"Wrong User Credentials"});
     }
     const accessToken= generateAccessToken(user.get("username") as string);
     const refreshToken= generateRefreshToken(user.get("username") as string);
     user.set("refreshToken",refreshToken);
     await user.save();

     return resp.status(200).json({message:"Login Successful", refreshToken,accessToken,user});

    } 
    catch (err:any) {
        return resp.status(500).json({message:"Internal Server Error",err});
    }
}

export const logout=async(req:Request,resp:Response)=>{
    try{
        const id=parseInt(req.params.id);
        if(isNaN(id)){
            return resp.status(400).json({message:"Invalid userId provided"})
        }
        const user= await User.findByPk(id);
        if(!user){
            return resp.status(404).json({message:"User not found"})
        }
        user.set("refreshToken",null);
        await user.save();
        return resp.status(200).json({message:"User logout"});
    }
     catch (err:any) {
       return resp.status(500).json({message:"Internal Server Error",err}); 
    }
}

