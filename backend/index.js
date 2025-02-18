import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";


import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app } from "./SocketIO/server.js";
import { server } from "./SocketIO/server.js";

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors());


const port = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI);
    console.log("connected to mongodb");
} catch (error) {
    console.log(error)
}

// routes
app.use("/api/user", userRoute)
app.use("/api/message", messageRoute)

// deployement code
if(process.env.NODE_ENV === "production"){
    const dirPath = path.resolve();
    app.use(express.static("./frontend/dist"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(dirPath, "./frontend/dist","index.html"));
    })
}

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})