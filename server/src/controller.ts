import { Collection, ICollection } from "./models";
import { Request, Response } from "express";
import mongoose from "mongoose";
import {Types} from "mongoose";

//TODO Error handling & send correct success/failure HTTP response codes

async function savePlaylist(req: Request, res: Response) {
  try {
    const data: ICollection = req.body;

    //check if there is already an artist by the given name,
    const result: ICollection | null = await Collection.findOne({
      artistName: data.artistName,
    });

    if (result) {
      // if there is, push the tracks to the playlist array
      await Collection.updateOne(
        { artistName: data.artistName },
        { $push: { playlists: data.playlists } }
      );
    } else {
      // if not, create a new CollectionModel for that artist
      await Collection.create(data);
    }

    res.status(201).send("Created");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function deletePlaylist(req: Request, res: Response) {
  try {
    //TODO check types?
    let {parent, playlist} = req.body
    parent = new mongoose.Types.ObjectId(parent);
    playlist = new mongoose.Types.ObjectId(playlist);

    const doesExist = await Collection.findOne({"_id": parent});
    if (doesExist?.playlists.length === 1) {
      await Collection.findByIdAndDelete({"_id": parent});
    } else {
      await Collection.updateOne(
        {"_id": parent},
        {$pull: {"playlists": {"_id": playlist}}}
        );
    }

    res.status(200).send("Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function getCollections(req: Request, res: Response) {
  try {
    const collections: ICollection[] = await Collection.find();
    res.status(200).send(collections);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export { savePlaylist, getCollections, deletePlaylist };
