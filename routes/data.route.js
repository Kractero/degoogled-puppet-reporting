import { getOwnersPuppets, getPuppetOwner } from "../controllers/data.controller.js";
import express from "express";

const dataRouter = express.Router();

dataRouter.get('/puppet', getPuppetOwner);
dataRouter.get('/owner', getOwnersPuppets)

export default dataRouter;