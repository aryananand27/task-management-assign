export interface AuthRequest{
    username:string;
    password:string;
} 
export interface LogoutRequest {
    username?:string;
    password?:string;
    refreshToken?:string;
}