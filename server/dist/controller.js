var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const CollectionModel = require("./models");
function savePlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            console.log(data);
            //check if there is already an artist by the given name,
            const result = yield CollectionModel.findOne({ artistName: data.artistName });
            console.log(result);
            if (result) {
                // if there is, push the tracks to the playlist array
                const update = yield CollectionModel.updateOne({ artistName: data.artistName }, { $push: { "playlists": data.playlists } });
            }
            else {
                // if not, create a new CollectionModel for that artist
                yield CollectionModel.create(data);
            }
            res.status(201).send('Created');
        }
        catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    });
}
function getCollections(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collections = yield CollectionModel.find({});
            res.status(200).send(collections);
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
}
const controllers = { savePlaylist, getCollections };
module.exports = controllers;
