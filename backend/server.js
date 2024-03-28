import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import messageRoutes from "./routes/message.routes.js"
import authRoutes from "./routes/auth.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000

dotenv.config()

app.use(cookieParser());
app.use(express.json()); //to parse the incoming requests with JSON payloads
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes)


app.get("/", (req, res) => {
    //root route
    res.send("Hello worldx");
})

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
});