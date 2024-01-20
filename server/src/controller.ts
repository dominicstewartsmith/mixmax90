import { Collection, ICollection } from "./models";
import { Request, Response } from "express";

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
    res.status(400).send(error);
  }
}

async function deletePlaylist(req: Request, res: Response) {
  try {
    const id: string = req.body;
    await Collection.findByIdAndDelete(id);
  } catch (error) {
    
  }
}

async function getCollections(req: Request, res: Response) {
  try {
    const collections: ICollection[] = await Collection.find({});
    res.status(200).send(collections);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export { savePlaylist, getCollections, deletePlaylist };
