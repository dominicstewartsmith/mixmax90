const CollectionModel = require("./models");

async function savePlaylist(req, res) {
  try {
    const data = req.body;
    console.log(data)
    //check if there is already an artist by the given name,
    const result = await CollectionModel.findOne({ artistName: data.artistName })
    console.log(result)

    if (result) {
      // if there is, push the tracks to the playlist array
      const update = await CollectionModel.updateOne(
        { artistName: data.artistName },
        { $push: { "playlists": data.playlists } }
      )
    } else {
      // if not, create a new CollectionModel for that artist
      await CollectionModel.create(data)
    }

    res.status(201).send('Created')
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  }

  async function getCollections(req, res) {
    try {
      const collections = await CollectionModel.find({});
      res.status(200).send(collections)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  }

  const controllers = { savePlaylist, getCollections }
  module.exports = controllers;