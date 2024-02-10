"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const serverRouter = (0, express_1.Router)();
serverRouter.post("/savePlaylist", controller_1.savePlaylist);
serverRouter.get("/getCollections", controller_1.getCollections);
serverRouter.delete("/deletePlaylist", controller_1.deletePlaylist);
exports.default = serverRouter;
