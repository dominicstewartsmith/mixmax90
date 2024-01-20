import mongoose from 'mongoose';

const MONGO_URL: string | undefined = process.env.MONGO_URL;

mongoose.connect(`${MONGO_URL}`).then(() => {
  console.log("DB connected 🪩");
});

export default mongoose;