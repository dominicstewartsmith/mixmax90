import {Router} from "express";
import {savePlaylist, getCollections, deletePlaylist, saveToken, retrieveToken, deleteToken} from "./controller";

const serverRouter: Router = Router();

serverRouter.post("/savePlaylist", savePlaylist);
serverRouter.get("/getCollections", getCollections);
serverRouter.delete("/deletePlaylist", deletePlaylist)

serverRouter.post("/saveToken", saveToken)
serverRouter.get("/retrieveToken", retrieveToken)
serverRouter.delete('/deleteToken', deleteToken)

export default serverRouter;
