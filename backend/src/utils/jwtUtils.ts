import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const generateAccessToken=(username:string):string=>{
    const accessToken = jwt.sign({username}, process.env.JWT_SECRET!,{expiresIn:"2h"});
    return accessToken;
}
export const generateRefreshToken=(username:string):string=>{
    const refreshToken = jwt.sign({username}, process.env.REFRESH_TOKEN_SECRET!,{expiresIn:"7d"});
    return refreshToken;
}
