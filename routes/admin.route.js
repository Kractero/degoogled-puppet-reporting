import express from "express";
import { auth } from "../middleware/auth.js";
import { add, admin, deleteItem, query } from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.get('/', auth, admin);
adminRouter.post('/add', auth, add)
adminRouter.post('/delete', auth, deleteItem)
adminRouter.post('/query', auth, query)

export default adminRouter;