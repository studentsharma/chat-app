import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import socketHandler from './sockets/socket.js';
import connectDB from "./db/connectDB.js"
import messageroute from "./routes/message.route.js" 
import userroute from "./routes/user.route.js"
import cookieParser from "cookie-parser";
import { protect } from './middleware/auth.middleware.js';

dotenv.config();

const app = express();

// app.use(cors({
//   origin: "https://chat-frontend-eypj.onrender.com", 
//   credentials: true 
// }));

app.use(cors({
  origin: "https://chat-frontend-eypj.onrender.com",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  optionsSuccessStatus: 200
}));

// Add this RIGHT AFTER the cors middleware:
app.options('*', cors({
  origin: "https://chat-frontend-eypj.onrender.com",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);
socketHandler(server)

app.get("/", (req, res) => {
    res.send("working");
})

app.use("/main", userroute)
// app.use("/messages", protect ,messageroute)
app.use("/messages" ,messageroute)


const PORT = process.env.PORT || 5000;
server.listen(PORT , '0.0.0.0', () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
