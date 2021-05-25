"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const CreatorSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    cpf: {
        type: Number,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});
CreatorSchema.pre('save', async function (next) {
    const hashPass = await bcrypt_1.default.hash(this.password, 10);
    this.password = hashPass;
    next();
});
exports.default = mongoose_1.default.model('Creator', CreatorSchema);
