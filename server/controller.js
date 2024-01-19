const Collection = require("./models");

async function savePlaylist(req, res) {
  try {
    const data = req.body;
    console.log(data)
    //check if there is already an artist by the given name,
    const result = await Collection.findOne({ artistName: data.artistName })
    console.log(result)

    if (result) {
      // if there is, push the tracks to the playlist array
      const update = await Collection.updateOne(
        { artistName: data.artistName },
        { $push: { "playlists": data.playlists } }
      )
    } else {
      // if not, create a new collection for that artist
      await Collection.create(data)
    }

    res.status(201).send('Created')
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}

const controller = { savePlaylist }
module.exports = controller;

// async function addTopTracks(req, res) {
//   try {
//     // console.log("in post");
//     const tracks = req.body;
//     // console.log(tracks[0])
//     // await TopTracks.deleteMany({})
//     const topTracks = await TopTracks.create({tracks}) // {tracks:tracks}
//      res.status(201).json({msg:'tracks added'});
//   } catch (error) {
//      console.error(error);
//      res.status(500).send("Internal Server Error");
//     }
// }

// async function getTopTracks(req, res) {
//   try {
//     console.log("in get");
//     // const tracks = res.body;

//     // const newTopTracks = await TopTracks.find({ tracks }) // {tracks:tracks}
//     const newTopTracks = await TopTracks.find({ }) // {tracks:tracks}
//     res.send(newTopTracks)
//     console.log('in getTop',newTopTracks)
//     res.status(201)
//     // res.status(201).json({msg:'tracks added'});
//   } catch (error) {
//      console.error(error);
//      res.status(500).send("Internal Server Error");
//     }
//   }

//   async function reloadTopTracks() {
//     try {
//       //clicking 'reload' overwrites current mix collection
//     } catch (error) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
//   }

// //in App.jsx funnction getCurrentMix
//   // const response = await fetch("http://localhost:3000/mix");
//   // const mix = await response.json();
//   // console.log(mix);
//   // setEvents(
//   //   events
//   //     .filter((event) => new Date(event.date) > new Date())
//   //     .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
//   // );



// // async function getCollection(req, res) {
// //   try {
// //     const collection = await Collection.find();
// //     res.status(200).json(collection);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send("Internal Server Error");
// //   }
// // }

// async function addToCollection(req, res) {
//   try {
//     console.log("in post");
//     const { title, contents } = req.body;
//     const newItem = await Collection.create({
//       title,
//       contents,
//     });
//     res.status(201).send(newItem);
//   } catch (err) {
//     console.log(err);
//     res.status(500); //<-server error>
//   }
// }

// async function updateItem() {}

// async function deleteItem() {}

// module.exports = { addTopTracks, getTopTracks, addToCollection, deleteItem, updateItem };

// // module.exports = { getCollection, addToCollection, deleteItem, updateItem };

// // search button adds mixModel - persist on refresh
// //reload button updates current mixmodel - persist on refresh
// // heart
