import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import type { Request, Response, NextFunction } from 'express';
// Database
import connectDB from './configs/db';
connectDB();
//import socket.io
import { Server } from 'socket.io';

// Routes
import AuthRoute from './routes/AuthRoute';
import TaskRoute from './routes/TaskRoute';
import LogRoute from './routes/LogRoute';

// Initialize express app
const app = express();

//setup socket.io
const server=http.createServer(app)
export const io = new Server(server,{
  cors:{
    origin:"https://collab-board-alpha.vercel.app/",
    methods:["GET","POST","PUT","DELETE"]
  }
})

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors({
  origin: "https://collab-board-alpha.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use('/api/auth',AuthRoute);
app.use('/api/tasks',TaskRoute);
app.use('/api/logs',LogRoute);

//socket.io events
io.on("connection",(socket)=>{
  console.log("New client connected",socket.id)

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Set port and start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
