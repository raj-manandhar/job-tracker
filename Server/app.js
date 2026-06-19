import dotenv from "dotenv";

import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import connectDB from "./configs/database.js";
import cors from "cors";

import applicationRouter from "./routes/application.route.js";
import Application from "./models/application.model.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  express.static(path.join(dirname(fileURLToPath(import.meta.url)), "public")),
);

app.use("/applications", applicationRouter);

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
