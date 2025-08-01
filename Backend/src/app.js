import express from "express";
import { ApiError } from "./utils/ApiError.js";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "https://app.medibridge.services" || "*",
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"))

app.use(cookieParser());

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/user", userRouter);

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
        errors: err.errors
      });
    } else {
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });


export default app;










