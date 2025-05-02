import epxress from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = epxress();
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import connectMongoDb from "./dbConnection.js";

//Database connection
connectMongoDb(process.env.MONGO_URL)
  .then(() => console.log("CONNECTED TO MONGODB SUCCESSFULLY"))
  .catch((err) => console.log("error in connecting to database", err));

//Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(epxress.urlencoded(true));
app.use(epxress.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(process.env.PORT, () =>
  console.log(`SERVER STARTED AT PORT ${process.env.PORT}`)
);
