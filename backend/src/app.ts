import express,{Application,Request,Response} from "express";
import cors from 'cors';
import authRoutes from './routes/auth.routes'
import taskRoutes from './routes/task.routes'
const app:Application=express();



app.use(cors())
app.use(express.json());
app.get('/',(req:Request,resp:Response)=>{
    resp.send("This is the demo first page for task management api.");
})
app.use('/api/auth',authRoutes);
app.use('/api/tasks',taskRoutes);

export default app;
