import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import connectMongoDb from "./dbConnection.js";
import { app, server } from "./lib/socket.js";
import path from "path";

//Database connection
connectMongoDb(process.env.MONGO_URL)
  .then(() => console.log("CONNECTED TO MONGODB SUCCESSFULLY"))
  .catch((err) => console.log("error in connecting to database", err));

const __dirname = path.resolve();

//Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded(true));
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/:path", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(process.env.PORT, () =>
  console.log(`SERVER + SOCKET.IO STARTED AT PORT ${process.env.PORT}`)
);
