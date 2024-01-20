import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import cors from "cors";
import serverRouter from "./router";

const corsConfig = {
  origin: 'http://localhost:5173',
};

const PORT: Number = 3000;
const app: Express = express();

app.use(cors(corsConfig));
app.use(express.json());
app.use(serverRouter);

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT} 💋`);
});
