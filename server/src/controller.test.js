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

    it('should save collection to the database', async () => {
        const artist = data;
        await request.post('/savePlaylist').send(artist);

        const resDB = await Collection.findOne({artistName: "ABBA"})
        expect(resDB).not.toBeNull();

        if (resDB !== null) {
            expect(resDB.artistName).toBe(artist.artistName)
        }
    })

})

