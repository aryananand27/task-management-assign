import { Router } from "express";
import { register,login,logout } from "../controllers/auth.controllers";

const router=Router();

router.post('/register',register)
router.post('/login',login)
router.post('/logout/:id',logout);

export default router;