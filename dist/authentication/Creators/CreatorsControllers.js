"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatorController = void 0;
const Creators_1 = __importDefault(require("./Creators"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authConfig = process.env.GERANDO_TOKEN_LISTENER;
function generateToken(params = {}) {
    return jsonwebtoken_1.default.sign(params, authConfig, {
        expiresIn: 86400
    });
}
class CreatorController {
    async login(req, res) {
        const { nickname, password } = req.body;
        try {
            const Auth = await Creators_1.default.findOne({ nickname }).select('+password');
            if (!Auth)
                return res.status(400).send({ inexistente: true });
            if (!await bcrypt_1.default.compare(password, Auth.password))
                return res.status(400).send({ inexistente: true });
            Auth.password = undefined;
            return res.send({ Auth, token: generateToken({ id: Auth.id }) });
        }
        catch (e) {
            return res.status(400).send({ error: e });
        }
    }
    async create(req, res) {
        const { name, nickname, password, confPass, contact, cpf } = req.body;
        if (password !== confPass)
            return res.status(400).json({ message: 'Senha não bate' });
        try {
            const Auth = await Creators_1.default.create({
                name,
                nickname,
                password,
                contact,
                cpf
            });
            if (Auth)
                return res.status(200).json({ success: true });
        }
        catch (err) {
            if (err.keyValue.nickname)
                return res.json({ nickname_not_available: true });
            if (err.keyValue.contact)
                return res.json({ contact_not_available: true });
        }
    }
}
exports.CreatorController = CreatorController;
