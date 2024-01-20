import {Router} from "express";
import {savePlaylist, getCollections, deletePlaylist} from "./controller";

const serverRouter: Router = Router();

serverRouter.post("/savePlaylist", savePlaylist);
serverRouter.get("/getCollections", getCollections);
serverRouter.delete("/deletePlaylist", deletePlaylist)


export default serverRouter;
