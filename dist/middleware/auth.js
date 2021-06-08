"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authConfig = process.env.GERANDO_TOKEN_LISTENER;
exports.default = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(511).send({ not_provided: 'No token provided' });
    const parts = authHeader.split(' ');
    if (parts.length !== 2)
        return res.status(511).send({ error: 'Token error' });
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme))
        return res.status(511).send({ error: 'Token malformatted' });
    jsonwebtoken_1.default.verify(token, authConfig, (err, decoded) => {
        if (err)
            return res.status(511).send({ inspired_session: 'Token invalided' });
        req.userId = decoded.id;
        return next();
    });
};
