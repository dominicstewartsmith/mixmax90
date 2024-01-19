import {Router} from "express";
import {savePlaylist, getCollections} from "./controller";

const serverRouter: Router = Router();

serverRouter.post("/savePlaylist", savePlaylist);
serverRouter.get("/getCollections", getCollections);


export default serverRouter;
