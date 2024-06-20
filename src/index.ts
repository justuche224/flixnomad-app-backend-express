import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Movie from "./models/movies";
import TrendingMovie from "./models/trending";
import NewMovie from "./models/newMovie";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api/movies", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.perPage as string) || 10;
  const type = req.query.type as string | undefined;
  const year = parseInt(req.query.year as string) || undefined;

  const filter: any = {};
  if (type) filter.type = type;
  if (year) filter.year = year;

  try {
    const movies = await Movie.find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage);

    const total = await Movie.countDocuments(filter);

    res.json({
      movies,
      pagination: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/trending", async (req: Request, res: Response) => {
  try {
    const trendingMovies = await TrendingMovie.find();
    res.json(trendingMovies);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/new-movies", async (req: Request, res: Response) => {
  try {
    const newMovies = await NewMovie.find();
    res.json(newMovies);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/movies", async (req: Request, res: Response) => {
  const {
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
  } = req.body;

  const movie = new Movie({
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
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/api/trending", async (req: Request, res: Response) => {
  const {
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
  } = req.body;

  const trendingMovie = new TrendingMovie({
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
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/api/new-movies", async (req: Request, res: Response) => {
  const {
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
  } = req.body;

  const newMovie = new NewMovie({
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
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
