import express from "express";
import { getAll, getOwnersPuppets, getPuppetOwner } from "../controllers/api.controller.js";

const apiRouter = express.Router();

apiRouter.get('/puppet/:name', getPuppetOwner);
apiRouter.get('/owner/:name', getOwnersPuppets)
apiRouter.get('/data', getAll)

export default apiRouter;