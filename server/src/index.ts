import dotenv from "dotenv";
const filename = process.env.ENV === 'test' ? '.env.test' : '.env'
dotenv.config({path: filename});

const MONGO_URL: string | undefined = process.env.MONGO_URL;
console.log(MONGO_URL)

import {mongoose} from './models';
import express, { Express } from "express";
import cors from "cors";
import serverRouter from "./router";

const corsConfig = {
  origin: 'http://127.0.0.1:5173',
};

const PORT: Number = 3000;
const app: Express = express();

app.use(cors(corsConfig));
app.use(express.json());
app.use(serverRouter);

// Server only runs if the database can connect.
console.time('Server loaded in: ')
mongoose.connect(`${MONGO_URL}`)
        .then(() => {
          console.log("🟢 Database connected successfully.")
          app.listen(PORT, () => console.log(`🟢 Server listening on port ${PORT}.`))})
        .catch(error => console.log('🔴 Database failed to connect.\n', error))
console.timeEnd('Server loaded in: ')

const test = 1706139304538 + (3600*1000)
console.log(test)