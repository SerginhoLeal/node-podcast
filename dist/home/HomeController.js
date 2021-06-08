"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const Home_1 = __importDefault(require("./Home"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3();
class HomeController {
    async index(req, res) {
        const { _limit } = req.headers;
        const docs = await Home_1.default.find().sort({ createAt: -1 }).limit(Number(_limit));
        return res.json(docs);
    }
    async search(req, res) {
        const docs = await Home_1.default.findById(req.params.id);
        return res.json(docs);
    }
    async create(req, res) {
        const { artist, title, category } = req.body;
        const docs = await Home_1.default.find();
        try {
            const create = await Home_1.default.create({
                title,
                artist,
                creator: req.userId,
                key: req.file.key,
                category,
                file: {
                    artwork: 'xxx',
                    url: req.file.location,
                    time: 3654
                },
                id: docs.length + 1
            });
            return res.json({ create });
        }
        catch (error) {
            if (process.env.STORAGE_TYPE === 's3') {
                s3.deleteObject({
                    Bucket: 'azdq8fpodcast',
                    Key: req.file.key
                }).promise();
            }
            return res.json({ error });
        }
    }
    async delete(req, res) {
        const removeVideo = await Home_1.default.findById(req.params.id);
        await removeVideo.remove();
        return res.json({ removido: true });
    }
}
exports.HomeController = HomeController;
