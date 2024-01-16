import express from "express";
import { authenticate, login } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get('/login', login);
authRouter.post('/authenticate', authenticate)

export default authRouter;