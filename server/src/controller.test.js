const express = require("express")
const { default: serverRouter } = require("./router")
const supertest = require("supertest")
const {Collection} = require("./models")

const mongoose = require("mongoose")
const data = require("./test-data/abba-data")

const dotenv = require("dotenv");
const filename = process.env.NODE_ENV === 'test' ? ".env.test" : ".env";
dotenv.config({path: filename});

describe('Integration tests', () => {
    const app = express();
    app.use(express.json());
    app.use(serverRouter);
    const request = supertest(app);

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL);
    })

    afterEach(async () => {
        await Collection.deleteMany();
    })

    afterAll(() => {
        mongoose.disconnect();
    })

    it('should save collection to the database', async () => {
        const artist = data;
        await request.post('/savePlaylist').send(artist).expect(201);

        const resDB = await Collection.findOne({artistName: "ABBA"})
        expect(resDB).not.toBeNull();

        if (resDB !== null) {
            expect(resDB.artistName).toBe(artist.artistName)
        }
    })

    it('should add playlist to existing artist', async () => {
        const collection = data;

        await request.post('/savePlaylist').send(collection).expect(201);
        await request.post('/savePlaylist').send(collection).expect(201);

        const resDB = await Collection.findOne({artistName: "ABBA"})
        expect(resDB.playlists.length).toBe(2)
    });

    it('should get all collections from db', async () => {
        const collection = data;

        collection.artistName = "Queen"
        await request.post('/savePlaylist').send(collection).expect(201);

        collection.artistName = "Beatles"
        await request.post('/savePlaylist').send(collection).expect(201);

        collection.artistName = "RATM"
        await request.post('/savePlaylist').send(collection).expect(201);

        const resDB = await request.get('/getCollections').expect(200);
        expect(resDB.body.length).toBe(3);

        expect(resDB.body[0].artistName).toBe("Queen");
        expect(resDB.body[2].artistName).toBe("RATM");
    });

    it("should delete a playlist inside a collection", async () => {
        const collection = data;

        await request.post("/savePlaylist").send(collection).expect(201);

        const resDB = await request.get("/getCollections").expect(200);

        const parentID = resDB.body[0]._id;
        const playlistID = resDB.body[0].playlists[0]._id;
        const payload = {
            parent: parentID,
            playlist: playlistID
        }

        await request.post("/savePlaylist").send(collection).expect(201);
        await request.post("/savePlaylist").send(collection).expect(201);

        await request.delete("/deletePlaylist").send(payload).expect(200);

        const collectionResponse = await request.get("/getCollections").expect(200);

        expect(collectionResponse.body[0].playlists.length).toBe(2);
      });
})

