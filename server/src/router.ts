import {Router} from "express";

const serverRouter: Router = Router();
const controller = require("./controller");

serverRouter.post("/savePlaylist", controller.savePlaylist);
serverRouter.get("/getCollections", controller.getCollections);


export default serverRouter;
