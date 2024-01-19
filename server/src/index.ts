//server and db connected
import dotenv from 'dotenv';
dotenv.config();

import express, {Express} from 'express';
import cors from 'cors';
import serverRouter from './router';

const PORT: Number = 3000;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(serverRouter);

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT} 💋`);
});