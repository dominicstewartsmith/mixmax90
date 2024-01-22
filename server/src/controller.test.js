const express = require("express")
const { default: serverRouter } = require("./router")
const supertest = require("supertest")
const {Collection} = require("./models")

const mongoose = require("mongoose")
const data = require("./test-data/abba-data")

describe('Integration tests', () => {
    const app = express();
    app.use(express.json());
    app.use(serverRouter);
    const request = supertest(app);

    beforeAll(async () => {
        await mongoose.connect("mongodb+srv://dominicstewartsmith:pWlC5mllh7DfTLej@cluster0.yegtkhq.mongodb.net/test");
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
    })



})

