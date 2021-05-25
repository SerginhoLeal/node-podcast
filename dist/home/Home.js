"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const s3 = new aws_sdk_1.default.S3();
const HomeSchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true
    },
    artist: {
        type: String,
        require: true
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Creator',
        require: true
    },
    category: {
        type: String,
        require: true
    },
    key: String,
    file: {
        artwork: {
            type: String,
            require: true
        },
        url: {
            type: String,
            require: true
        },
        time: {
            type: Number,
            require: true
        }
    },
    id: {
        type: String,
        require: true,
        unique: true
    },
    views: []
}, {
    timestamps: true
});
HomeSchema.pre('save', function () {
    if (!this.url) {
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
});
HomeSchema.pre('remove', function () {
    if (process.env.STORAGE_TYPE === 's3') {
        return s3.deleteObject({
            Bucket: process.env.BUCKET,
            Key: this.key
        }).promise();
    }
    else {
        return util_1.promisify(fs_1.default.unlink)(path_1.default.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key));
    }
});
exports.default = mongoose_1.default.model('Home', HomeSchema);
