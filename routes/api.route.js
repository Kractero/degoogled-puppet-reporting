import express from "express";
import { getOwnersPuppets, getPuppetOwner } from "../controllers/api.controller.js";

const apiRouter = express.Router();

apiRouter.get('/puppet/:name', getPuppetOwner);
apiRouter.get('/owner/:name', getOwnersPuppets)

export default apiRouter;