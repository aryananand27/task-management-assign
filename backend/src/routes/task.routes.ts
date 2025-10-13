import { Router } from "express";
import {createTask,getTaskById,getAllTasks,updateTask,deleteTask} from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
const router=Router();
router.use(authMiddleware);

router.post('/',createTask)
router.get('/:id',getAllTasks);
router.get('/find-single/:id',getTaskById);
router.put('/:id',updateTask);
router.delete('/:id',deleteTask);

export default router;