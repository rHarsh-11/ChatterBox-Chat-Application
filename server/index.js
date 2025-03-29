import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import UserRoute from "./routes/userRoute.js"
import MessageRoute from "./routes/messageRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";

dotenv.config({});

const PORT  = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: 'http://localhost:5173' ,
  credentials : true
};
app.use(cors(corsOption));

//routes
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/message", MessageRoute);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server listening at port ${PORT}`)
})