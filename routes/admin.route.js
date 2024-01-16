import express from "express";
import { auth } from "../middleware/auth.js";
import { add, admin, deleteItem } from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.get('/', auth, admin);
adminRouter.post('/add', auth, add)
adminRouter.post('/delete', auth, deleteItem)

export default adminRouter;