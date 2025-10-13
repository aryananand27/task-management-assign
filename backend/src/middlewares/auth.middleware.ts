import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user'
dotenv.config();
interface Jwt{
    username:string;
     iat: number;
  exp: number;
}

export const authMiddleware = async(req:Request, resp:Response, next:NextFunction) => {
  try {
    const authHeader=req.headers['authorization'];
    if (!authHeader){
         return resp.status(401).json({message:"Authorization header missing"});
    }
    const token=authHeader.split(' ')[1];
    if (!token){
         return resp.status(401).json({message:"Token missing"});
    }
    const secret=process.env.JWT_SECRET;
    if (!secret){
         return resp.status(500).json({message:"JWT_SECRET not set"});
    }
    const decoded=jwt.verify(token, secret) as Jwt;
    console.log(decoded);
    const user=await User.findOne({where:{username:decoded.username}});
    if (!user){
         return resp.status(401).json({message:"User not found"});
    }
    next();
  } catch (err:any) {
    return resp.status(401).json({message:"Invalid token",err});
  }
};