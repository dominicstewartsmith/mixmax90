const MONGO_URL = process.env.MONGO_URL;
const mongoose = require("mongoose");
mongoose.connect(`${MONGO_URL}`).then(() => {
    console.log("DB connected 🪩");
});
module.exports = mongoose;
