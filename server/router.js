const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/savePlaylist", controller.savePlaylist);


// router.get("/toptracks", controller.getTopTracks);
// router.post("/toptracks", controller.addTopTracks);
// router.post("/collection", controller.addToCollection);
// // router.delete("/collection/:id", controller.updateItem);
// // router.delete("/collection/:id", controller.deleteItem);

module.exports = router;
