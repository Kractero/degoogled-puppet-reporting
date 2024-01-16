import express from "express";
import { getSubmissions, submit } from "../controllers/submissions.controller.js";

const submitRouter = express.Router();

submitRouter.get('/submit', submit);
submitRouter.get('/submissions', getSubmissions)

export default submitRouter;