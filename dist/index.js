"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const routes_1 = require("./routes");
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
mongoose_1.default.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use('/api', routes_1.routes);
app.listen(process.env.PORT || 5000);
