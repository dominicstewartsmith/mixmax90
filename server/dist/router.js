const server = require("express");
const serverRouter = server.Router();
const controller = require("./controller");
serverRouter.post("/savePlaylist", controller.savePlaylist);
serverRouter.get("/getCollections", controller.getCollections);
module.exports = serverRouter;
