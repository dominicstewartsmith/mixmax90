"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const filename = process.env.ENV === 'test' ? '.env.test' : '.env';
dotenv_1.default.config({ path: filename });
const MONGO_URL = process.env.MONGO_URL;
console.log(MONGO_URL);
const models_1 = require("./models");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const corsConfig = {
    origin: 'http://127.0.0.1:5173',
};
const PORT = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsConfig));
app.use(express_1.default.json());
app.use(router_1.default);
// Server only runs if the database can connect.
console.time('Server loaded in: ');
models_1.mongoose.connect(`${MONGO_URL}`)
    .then(() => {
    console.log("🟢 Database connected successfully.");
    app.listen(PORT, () => console.log(`🟢 Server listening on port ${PORT}.`));
})
    .catch(error => console.log('🔴 Database failed to connect.\n', error));
console.timeEnd('Server loaded in: ');
