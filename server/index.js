//server and db connected
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = require("./router");

const PORT = 3000;
const app = express();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(`${MONGO_URL}`).then(() => {
  console.log("DB connected 🪩");
});

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT} 💋`);
});

module.exports = {mongoose}
