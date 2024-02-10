"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteToken = exports.retrieveToken = exports.saveToken = exports.deletePlaylist = exports.getCollections = exports.savePlaylist = void 0;
const models_1 = require("./models");
const mongoose_1 = __importDefault(require("mongoose"));
async function savePlaylist(req, res) {
    try {
        const data = req.body;
        //check if there is already an artist by the given name,
        const result = await models_1.Collection.findOne({
            artistName: data.artistName,
        });
        if (result) {
            // if there is, push the tracks to the playlist array
            await models_1.Collection.updateOne({ artistName: data.artistName }, { $push: { playlists: data.playlists } });
        }
        else {
            // if not, create a new CollectionModel for that artist
            await models_1.Collection.create(data);
        }
        res.status(201).send("Created");
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
exports.savePlaylist = savePlaylist;
async function deletePlaylist(req, res) {
    try {
        let { parent, playlist } = req.body;
        parent = new mongoose_1.default.Types.ObjectId(parent);
        playlist = new mongoose_1.default.Types.ObjectId(playlist);
        const doesExist = await models_1.Collection.findOne({ "_id": parent });
        if ((doesExist === null || doesExist === void 0 ? void 0 : doesExist.playlists.length) === 1) {
            await models_1.Collection.findByIdAndDelete({ "_id": parent });
        }
        else {
            await models_1.Collection.updateOne({ "_id": parent }, { $pull: { "playlists": { "_id": playlist } } });
        }
        res.status(200).send("Deleted");
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
exports.deletePlaylist = deletePlaylist;
async function getCollections(req, res) {
    try {
        const collections = await models_1.Collection.find();
        res.status(200).send(collections);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
exports.getCollections = getCollections;
async function saveToken(req, res) {
    try {
        await models_1.TokenModel.deleteMany();
        await models_1.TokenModel.create(req.body);
        res.status(201).send("Created");
    }
    catch (error) {
        console.log(error);
    }
}
exports.saveToken = saveToken;
async function retrieveToken(req, res) {
    try {
        const response = await models_1.TokenModel.findOne();
        if (response) {
            res.status(200).send(response);
        }
        else
            res.status(200).send('null');
    }
    catch (error) {
        console.log(error);
    }
}
exports.retrieveToken = retrieveToken;
async function deleteToken(req, res) {
    try {
        await models_1.TokenModel.deleteMany();
        res.status(200).send('OK');
    }
    catch (error) {
        console.log(error);
    }
}
exports.deleteToken = deleteToken;
