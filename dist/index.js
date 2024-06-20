"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const movies_1 = __importDefault(require("./models/movies"));
const trending_1 = __importDefault(require("./models/trending"));
const newMovie_1 = __importDefault(require("./models/newMovie"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const uri = process.env.MONGO_URI;
mongoose_1.default
    .connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/api/movies", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const type = req.query.type;
    const year = parseInt(req.query.year) || undefined;
    const filter = {};
    if (type)
        filter.type = type;
    if (year)
        filter.year = year;
    try {
        const movies = await movies_1.default.find(filter)
            .skip((page - 1) * perPage)
            .limit(perPage);
        const total = await movies_1.default.countDocuments(filter);
        res.json({
            movies,
            pagination: {
                total,
                page,
                perPage,
                totalPages: Math.ceil(total / perPage),
            },
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
app.get("/api/trending", async (req, res) => {
    try {
        const trendingMovies = await trending_1.default.find();
        res.json(trendingMovies);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
app.get("/api/new-movies", async (req, res) => {
    try {
        const newMovies = await newMovie_1.default.find();
        res.json(newMovies);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
app.post("/api/movies", async (req, res) => {
    const { image, name, year, details, downloadLink, trailer, genre, releaseDate, runtime, director, rated, type, quality, } = req.body;
    const movie = new movies_1.default({
        image,
        name,
        year,
        details,
        downloadLink,
        trailer,
        genre,
        releaseDate,
        runtime,
        director,
        rated,
        type,
        quality,
    });
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
app.post("/api/trending", async (req, res) => {
    const { image, name, year, details, downloadLink, trailer, genre, releaseDate, runtime, director, rated, type, quality, } = req.body;
    const trendingMovie = new trending_1.default({
        image,
        name,
        year,
        details,
        downloadLink,
        trailer,
        genre,
        releaseDate,
        runtime,
        director,
        rated,
        type,
        quality,
    });
    try {
        const newTrendingMovie = await trendingMovie.save();
        res.status(201).json(newTrendingMovie);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
app.post("/api/new-movies", async (req, res) => {
    const { image, name, year, details, downloadLink, trailer, genre, releaseDate, runtime, director, rated, type, quality, } = req.body;
    const newMovie = new newMovie_1.default({
        image,
        name,
        year,
        details,
        downloadLink,
        trailer,
        genre,
        releaseDate,
        runtime,
        director,
        rated,
        type,
        quality,
    });
    try {
        const newAddedMovie = await newMovie.save();
        res.status(201).json(newAddedMovie);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
