"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const DownloadLinkSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    link: { type: String, required: true },
});
const TrendingMovieSchema = new mongoose_1.Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    year: { type: Number, required: true },
    details: { type: String, required: true },
    downloadLink: { type: [DownloadLinkSchema], required: true },
    trailer: { type: String, required: true },
    genre: { type: [String], required: true },
    releaseDate: { type: String, required: true },
    runtime: { type: String, required: true },
    director: { type: String, required: true },
    rated: { type: String, required: true },
    type: { type: String, required: true },
    quality: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
const TrendingMovie = mongoose_1.default.model("TrendingMovie", TrendingMovieSchema);
exports.default = TrendingMovie;
